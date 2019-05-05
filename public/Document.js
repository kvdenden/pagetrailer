const AdmZip = require("adm-zip");
const nodegit = require("nodegit");
const path = require("path");
const rimraf = require("rimraf");

const { withTmpDir } = require("./util");

class Document {
  constructor(origin) {
    this._origin = origin;
  }

  // return Promise with buffer with file contents
  retrieve(version = "HEAD") {
    return withTmpDir(tmpdir => this._retrieve(version, tmpdir));
  }

  // return Promise with version id of saved document
  store(document, message) {
    return withTmpDir(tmpdir => this._store(document, message, tmpdir));
  }

  // return Promise with array of commit data { id, author, message, time }
  history() {
    return new Promise((resolve, reject) => {
      nodegit.Repository.openBare(this._origin)
        .then(repo => repo.getHeadCommit())
        .then(commit => {
          if (commit) {
            return commit.history();
          } else {
            resolve([]);
          }
        })
        .then(eventEmitter => {
          eventEmitter.on("end", commits => {
            const history = commits.map(commit => {
              return {
                id: commit.sha(),
                author: commit.author().name(),
                message: commit.message(),
                time: commit.time()
              };
            });
            resolve(history);
          });

          eventEmitter.on("error", error => {
            reject(error);
          });

          eventEmitter.start();
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  async _retrieve(version, tmpdir) {
    const repo = await nodegit.Clone(this._origin, tmpdir);
    if (version && version !== "HEAD") {
      const commit = await nodegit.Commit.lookup(repo, version);
      await nodegit.Reset(repo, commit, nodegit.Reset.TYPE.HARD);
    }
    const zip = new AdmZip();
    zip.addLocalFolder(tmpdir);
    zip.deleteFile(".git/");
    return zip.toBuffer();
  }

  async _store(document, message, tmpdir) {
    const repo = await nodegit.Clone(this._origin, tmpdir);

    rimraf.sync(path.join(tmpdir, "*"));

    const zip = new AdmZip(document);
    zip.extractAllTo(tmpdir, true);

    const index = await repo.refreshIndex();
    await index.addAll(".");
    await index.write();
    const signature = repo.defaultSignature();

    const oid = await repo.createCommitOnHead(
      null,
      signature,
      signature,
      message
    );

    const origin = await repo.getRemote("origin");
    await origin.push(["refs/heads/master:refs/heads/master"]);

    return oid.tostrS();
  }
}

module.exports = Document;
