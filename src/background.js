browser.contextMenus.create({
  id: "overlay-page",
  title: "Overlay this page"
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "overlay-page") {
    browser.tabs.executeScript({
      file: "content/page-editor.js"
    });
  }
});
