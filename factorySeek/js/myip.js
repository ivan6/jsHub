console.log('myip');


//加载完查的html   方法1


function tracking()
{
  let sites_tbl = document.querySelector("#sites_tbl");  

   if(!sites_tbl )
   {
      window.setTimeout(tracking,2000);
      return;
   }
//    console.log("sites_tbl:", sites_tbl.innerHTML); 


   storelist(sites_tbl.innerHTML);  

   

   // 获取当前URL
    var currentUrl = window.location.href;

    // 匹配sites后面的参数
    var match = currentUrl.match(/sites\/(\d+)/);

    if (match) {
        // 获取参数值并加1
        var newParam = parseInt(match[1], 10) + 1;
        
        // 替换旧参数值为新的参数值
        var newUrl = currentUrl.replace(match[0], 'sites/' + newParam);
        
        console.log(newUrl); // 输出新的URL
    } else {
        console.log('No parameter found after "sites/"');
    }

    window.location.href = newUrl;

}

function storelist(tags)
{
    try {        

        fetch("https://spy.lazyor.com/index/taskamz/updatesites", {
                headers: {
                "Accept": "application/json",
                },
                referrer: "https://spy.lazyor.com/",
                body: JSON.stringify({
                    contentStr:tags,
                }),
                mode: "no-cors",
                method: "POST"
            }).then(
                response=>{
                if (response.ok) {
                    let data =  response.json;            
                    console.log(' update data:', data);
                } else {
                    // console.log("update 错误: " + response.json);
                }
                }
            );
    
    } catch (err) {
            // console.log("update 错误-:" + err);
    }

}


tracking();
