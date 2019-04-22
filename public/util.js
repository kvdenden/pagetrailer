const tmp = require("tmp");

exports.withTmpDir = fn => {
  return new Promise((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, (err, tmpdir, cleanup) => {
      err
        ? reject(err)
        : fn(tmpdir)
            .then(result => resolve(result))
            .catch(err => reject(err))
            .finally(() => cleanup());
    });
  });
};
