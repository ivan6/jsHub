
//1、判断当前地址带分页，判断是否有加载的内容，没有，就等时间，有了提交，并点击下一页；判断地址是否有分页，页面是否有内容。循环。


console.log(' start checking-novel ');



checking();

function updateContent(url,str)
{
    try {
        
      console.log('提交数据：', str);

      fetch("https://www.fanfannovel.com/index/task/updateContent", {
          headers: {
            "Accept": "application/json",
            // Firefox 中不需要单独设置 Access-Control-Allow-Origin
          },
          referrer: "https://www.fanfannovel.com/",
          body: JSON.stringify({
            url:url,
            contentStr:str
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


function nextpage()
{
    // 首先获取整个ul元素
    var ulElement = document.getElementById('js-menu-actions');

    // 使用querySelector来找到具有特定title属性的a元素
    if(ulElement)
    {
        var Next = ulElement.querySelector('a[title="Next chapter"]');

        // 检查是否找到了该元素
        if (Next && Next.getAttribute('href')) {
        // 如果找到了，执行跳转
            window.location.href = Next.getAttribute('href');
        } else {
            console.log('没有找到具有"Next chapter" title的链接元素。');
            //等待加载时间，继续
            window.setTimeout(nextpage,2000);
        }
    }
    else
    {
        window.setTimeout(nextpage,2000);
    }
   
}

function checking()
{
    
    var html = document.querySelector('.content-inner');
   
    if(html)
    {
             
        if(html)
        {
            var firstDiv = html.querySelector('div');  // 获取.content-inner下的第一个div元素
            if(firstDiv)
            {
                var firstDivHtml = firstDiv.innerHTML;     // 获取这个div元素的HTML内容
            }
            else
            {
                firstDivHtml = html.innerHTML;
            }
            //页面上有的内容，看哪些需要提交到后台的
            var thisurl = window.location.href;
           
            //规整数据，提交数据
            console.log(' update thisurl:', thisurl);
            console.log(' update Str:', firstDivHtml);
            //提交数据、下一页
            updateContent(thisurl,firstDivHtml);
            return 
            // nextpage();
        }
        else
        {
            
            window.setTimeout(checking,2000);
        }
    }
    else
    {
        window.setTimeout(checking,2000);
    }
    
}