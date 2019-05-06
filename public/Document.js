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

  // return Promise with version data { id, author, message, time }
  store(file, message) {
    return withTmpDir(tmpdir => this._store(file, message, tmpdir));
  }

  // return Promise with array of version data { id, author, message, time }
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
            const history = commits.map(this._versionData);
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

  async _store(file, message, tmpdir) {
    const repo = await nodegit.Clone(this._origin, tmpdir);

    rimraf.sync(path.join(tmpdir, "*"));

    const zip = new AdmZip(file);
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

    const commit = await repo.getCommit(oid);
    return this._versionData(commit);
  }

  _versionData(commit) {
    return {
      id: commit.sha(),
      author: commit.author().name(),
      message: commit.message(),
      timestamp: commit.timeMs()
    };
  }
}

module.exports = Document;
