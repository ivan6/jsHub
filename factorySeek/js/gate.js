

console.log(' d ',document.documentElement.outerHTML);

let outerHTML = document.documentElement.outerHTML;

if(outerHTML.length>1000)
{
    let response =  fetch("https://spy.lazyor.com/index/task/updateFactoryStr", {
        headers: {
          "Accept": "application/json",
          // Firefox 中不需要单独设置 Access-Control-Allow-Origin
        },
        referrer: "https://spy.lazyor.com/",
        body: JSON.stringify({
          contentStr:outerHTML,
        }),
        mode: "cors",
        method: "POST"
      });
      
      // console.log('响应数据3：', result);
      
      if (response.status === 200) {
        let data =  response.json();

        console.log(' update data:', data);
      } else {
        console.log("update 错误: " + response.status);
      }
}

//提交到服务器