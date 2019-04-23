const { ipcMain } = require("electron-better-ipc");

ipcMain.answerRenderer("fetchDocuments", () => {
  return [
    {
      id: "01",
      title: "Document 1",
      description: "My first document",
      history: []
    },
    {
      id: "02",
      title: "Document 2",
      description: "My second document",
      history: []
    }
  ];
});
