const { app } = require("electron");
const fs = require("fs-extra");
const nodegit = require("nodegit");
const path = require("path");
const rimraf = require("rimraf");

const Document = require("./Document");

const documentPath = path.join(app.getPath("userData"), "documents");

module.exports = {
  list: () => {
    return fs.readdir(documentPath);
  },

  create: key => {
    const origin = path.join(documentPath, key);
    return nodegit.Repository.init(origin, 1).then(() => new Document(origin));
  },

  delete: key => {
    const origin = path.join(documentPath, key);
    return new Promise((resolve, reject) => {
      rimraf(origin, err => (err ? reject(err) : resolve()));
    });
  },

  get: key => {
    const origin = path.join(documentPath, key);
    return nodegit.Repository.openBare(origin).then(() => new Document(origin));
  }
};
