setTimeout(() => {

    const networkScript = document.createElement('script');
    networkScript.setAttribute('type', 'text/javascript');
    networkScript.setAttribute('src', chrome.runtime.getURL('/js/amz123.js'));
    document.head.appendChild(networkScript);

});