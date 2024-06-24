chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if ( request.callName == 'fetchFactory') {
            console.log('contentStrB-fetchFactory:',request);   
            let urlinfo = null;
            fetch("https://spy.lazyor.com/task/fetchFactory", {
                    "headers": {
                      "accept": "application/json",
                      "Access-Control-Allow-Origin":"*",
                    },
                    "referrer": "https://spy.lazyor.com/",     

                    "body": JSON.stringify({
                        "finalType":request.finalType,
                    }),
                    "mode": "no-cors",
                    "method": "GET"
                  }).then((response)=>{
                    if (response.status === 200) {
                        response.json().then(function(data){                            
                            console.log("data:",data);                                       
                        });
                    }                    
                  }).catch(function(err){
                 console.log("Fetch错误:"+err);
            });
            // sender.urlinfo = document.urlinfo;
            // 这里将tab信息发送给发送者            
            sendResponse(sender);
        };
        
});