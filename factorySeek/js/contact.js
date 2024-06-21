

console.log(' start contact js ');


function findStr()
{
    let module_wrapper = document.querySelector(".module-wrapper");
    if(module_wrapper)
    {
        // console.log(module_wrapper.innerHTML);

        var contactStr = module_wrapper.innerHTML;
        var domain = window.location.href;

        if (domain.includes('.1688.com')) {
            // 使用正则表达式找到包含'.1688.com'的部分
            var match = domain.match(/https?:\/\/([a-zA-Z0-9.-]+)\.1688\.com/);

            // 如果找到匹配，更新输入框的内容
            if (match && match[1]) {
                domain = match[1] + '.1688.com';
            }
        }

        try {
        
            console.log('提交数据：', domain);
      
            fetch("https://spy.lazyor.com/index/task/updatecontact", {
                headers: {
                  "Accept": "application/json",
                  // Firefox 中不需要单独设置 Access-Control-Allow-Origin
                },
                referrer: "https://spy.lazyor.com/",
                body: JSON.stringify({
                  domain:domain,
                  contactStr:contactStr
                }),
                mode: "no-cors",
                method: "POST"
              }).then(
                response=>{
                  if (response.ok) {
                    let data =  response.json;
          
                    console.log(' update data:', data);
                  } else {
                    console.log("update 错误: " + response.json);
                  }
                }
              );
      
            } catch (err) {
              console.log("update 错误-:" + err);
            }


    }
    else
    {
        console.log('setp 2');
        window.setTimeout(findStr,2000);
    }
}

findStr();