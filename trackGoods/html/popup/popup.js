function onClickExport() {
    document.getElementById('export-btn').disabled = true
    const filename = document.getElementById('filename').value
    const cb = (tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "CHANGE_POPUP_ALLOW_DOWNLOAD", filename });
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const selectedTab = tabs[0];
        // 执行在当前选定标签页上的操作
        console.log(selectedTab);
      });    
}
document.getElementById('export-btn').onclick = onClickExport