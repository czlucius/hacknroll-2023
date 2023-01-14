browser.contextMenus.create({
  id: "overlay-page",
  title: "overlay this page"
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "overlay-page") {
    browser.tabs.executeScript({
      file: "page-editor.js"
    });
  }
});
