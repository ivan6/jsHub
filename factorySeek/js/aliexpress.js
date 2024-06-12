

function fetchFactory()
{
    try {


        // fetch('https://spy.lazyor.com/index/task/fetchFactory',{
        //     headers: {
        //     "Accept": "application/json",
        //     },
        //     referrer: "https://spy.lazyor.com/",          
        //     mode: "no-cors",
        //     method: "GET"
        // }
        // )
        // .then(response => {
        //     if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //     }
        //     return response.json(); // 确保在这里调用json方法
        // })
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error('There has been a problem with your fetch operation:', error);
        // });


        let response =  fetch("https://spy.lazyor.com/index/task/fetchFactory", {
          headers: {
            "Accept": "application/json",
            // Firefox 中不需要单独设置 Access-Control-Allow-Origin
          },
          referrer: "https://spy.lazyor.com/",          
          mode: "cors",
          method: "GET"
        });

        
        // // console.log('响应数据3：', result);
        // console.log(' start fetching ');
        // let data =  response.json();

        

        // console.log(' response ',response);
        // console.log(' memberId ',response.memberId);
        
        if (response.status == 200) {
          let data =  response.json();
          if(response.memberId)
          {
              console.log(' location id:', response.memberId);
              let nextpagex = "https://sale.1688.com/factory/card.html?memberId="+response.memberId;
              window.location.href = nextpagex;
          }
          console.log(' fetch data:', data);
        } else {
          console.log("fetch 错误: " + response.status);
        }

      } catch (err) {

        console.log("fetch 错误:" + err);
    }
}

function updatefactory()
{
    console.log(' start aliexpress ');

    let images = document.querySelector("[property='og:image'][content]");
    //document.querySelector('meta[name="description"]').getAttribute('content');
    //document.querySelector("[property~=og:image][content]");

    
    if(images)
    {
        //页面上有的内容，看哪些需要提交到后台的
       
        let image = images.content;

        console.log(' track images :', image);
        fetchFactory();
      
    }
    else
    {
        console.log(' track images null');
        window.setTimeout(updatefactory,2000);
    }

     
}

updatefactory();


