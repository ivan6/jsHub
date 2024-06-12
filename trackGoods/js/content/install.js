setTimeout(() => {
    const pageScript = document.createElement('script');
    pageScript.setAttribute('type', 'text/javascript');
    pageScript.setAttribute('src', chrome.runtime.getURL("/js/inject/page.js"));
    document.head.appendChild(pageScript);

    const networkScript = document.createElement('script');
    networkScript.setAttribute('type', 'text/javascript');
    networkScript.setAttribute('src', chrome.runtime.getURL('/js/inject/network.js'));
    document.head.appendChild(networkScript);

    const excelScript = document.createElement('script');
    excelScript.setAttribute('type', 'text/javascript');
    excelScript.setAttribute('src', chrome.runtime.getURL("/js/inject/pikazExcel.js"));
    document.head.appendChild(excelScript);
});

