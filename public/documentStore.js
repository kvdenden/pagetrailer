const { app } = require("electron");
const Store = require("electron-store");
const nodegit = require("nodegit");
const path = require("path");
const rimraf = require("rimraf");
const shortid = require("shortid");

const Document = require("./Document");

const schema = {
  documents: {
    type: "object",
    additionalProperties: {
      type: "object",
      properties: {
        key: { type: "string" },
        title: { type: "string" },
        description: { type: "string" }
      },
      required: ["key", "title"]
    },
    default: {}
  }
};

const store = new Store({ schema });

const documentPath = path.join(app.getPath("userData"), "documents");

module.exports = {
  list: () => {
    return store.get("documents");
  },

  create: (title, description) => {
    const key = shortid.generate();
    const origin = path.join(documentPath, key);
    return nodegit.Repository.init(origin, 1).then(() => {
      const metadata = { key, title, description };
      store.set(`documents.${key}`, metadata);
      return {
        ...metadata,
        document: new Document(origin)
      };
    });
  },

  delete: key => {
    const origin = path.join(documentPath, key);
    return new Promise((resolve, reject) => {
      rimraf(origin, err => (err ? reject(err) : resolve()));
    }).then(() => store.delete(`documents.${key}`));
  },

  get: key => {
    const origin = path.join(documentPath, key);
    return nodegit.Repository.openBare(origin).then(() => {
      const metadata = store.get(`documents.${key}`);
      return {
        ...metadata,
        document: new Document(origin)
      };
    });
  }
};
