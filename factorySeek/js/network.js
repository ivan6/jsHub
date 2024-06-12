

//  // 创建一个新的input元素
//  var input = document.createElement("input");        
//  // 设置input元素的类型和其他属性
//  input.type = "text";
//  input.name = "hasUpdateInfo";
//  input.value = "0";        
//  // 获取页面中的一个容器元素，比如body
//  var body = document.body;        
//  // 将input元素添加到body中
//  body.appendChild(input); 

//input-btn
addRet();

function addRet()
{
    let content = document.querySelector("[component-name='@ali/cmod-zgc-pc-seo-card-recommend']");
    if(content)
    {
        if(content.innerHTML)
        {
            let alist = content.querySelectorAll("a");
            let alistArr = [];
            
            alist.forEach(function(element,index) {
                
                if(element.host =='sale.1688.com' && element.href.includes('card.html?memberId='))
                {
                    let tmp = [];
                    tmp.url = element.href;
                    tmp.text = element.innerText;
                    alistArr.push(tmp);
                }                
              }
            );
            console.log('contenArrt -', alistArr);
            updatedataarr(alistArr)
            return ;
        }
    }
    window.setTimeout(addRet,2000);
    
}


// document.addEventListener('wheel', function(event) {


//     let content = document.querySelector("[component-name='@ali/cmod-zgc-pc-seo-card-recommend']");

//     console.log(' content -', content.innerHTML);

//     let hasRet  = document.querySelector("input[name='hasUpdateInfo']");

//     if(content.innerHTML)
//     {
//         console.log('hasRet -', hasRet.value);
//         if(hasRet.value==0)
//         {
//             hasRet.value = 1;
//             event.preventDefault();
//         }
//         else
//         {    
//             console.log('content -', content.innerHTML);//如果有html内容，并且 缓存的memberId.time间隔超过5分钟，可以提交
//         }
//     }
//     // 阻止默认的滚动行为（可选）
    
// }, { passive: true }); 


// function tracking()
// {

//    //fetch一个地址，跳转

//   let location = window.location;
//   console.log("window.location:", location.href); 
//   if(location.href.includes("1688.com/page/offerlist.htm"))
//   {
//         let number = document.querySelectorAll("input[type=number]");  
//         let btn = document.querySelectorAll("button");  

//         let imageMain = document.querySelectorAll(".main-picture");  

//         if(number.length>1)
//         {
//             var lastnumber = number[number.length - 1];
//             var lastbtn = btn[btn.length - 2];

//             lastnumber.setAttribute('value',2);


//             //获取新的内容，提交给服务端
//             var computedStyles = window.getComputedStyle(lastbtn);
//             var colorValue = computedStyles.color;
//             console.log("color:", colorValue); 
//             // console.log("imageMain:", imageMain); return;
//             if(imageMain.length>0)
//             {
//                 // console.log("mail:", imageMain[imageMain.length - 1].parents().html()); 
//             }

//             if('rgb(204, 204, 204)'== colorValue)
//             {
               
//                 console.log("lastnumber:", lastnumber); 
//                 console.log("lastbtn:", lastbtn); 
//             }
//             else
//             {
//                 lastbtn.click();                
//                 window.setTimeout(tracking,2000);

//                 // alert(lastbtn.getAttribute('disabled'));
//             }
            

//         }
//         else
//         {

//             console.log("number:", number); 
//             window.setTimeout(tracking,2000);
//             return;
//         }

//   }

// }


// const _requestTools = {
//     formatQueryString(queryString = '') {
//         const result = {};
//         if (queryString.length > 0) {
//             console.log('queryString', queryString)
//             queryString = queryString.split('?')[1].split('&');
//             for (let kv of queryString) {
//                 kv = kv.split('=');
//                 if (kv[0]) result[kv[0]] = decodeURIComponent(kv[1]);
//             }
//         }
//         return result
//     }
// }

function _initXMLHttpRequest() {
  
    const open = XMLHttpRequest.prototype.open;
    const _targetApiList = [
        'urbo-meta.insights.1688.com/meta.js'
    ]
    XMLHttpRequest.prototype.open = function (...args) {

        console.log(' loading:',this.responseURL);


        this.addEventListener('load', function () {


            //页面上有的内容，看哪些需要提交到后台的
            let pageSchema = window.$$pageSchema;
            let pageData = window.$$pageData;
            let memberId =  window.location.href;
                        
            console.log(' loading:',this.responseURL);

            // 如果当前url并不包含_targetApiList中任意一个地址，则阻止后续操作
            
            if (!_targetApiList.find(item => this.responseURL.includes(item))) return

            console.log(' update pageSchema:', pageSchema);
            console.log(' update pageData:', pageData);
            console.log(' update memberId:', memberId);


            uploaddata(memberId,pageData,pageSchema);
            fetchFactory(memberId);

            return ;

        })        

        return open.apply(this, args);
    };

    
}

function updatedataarr(arr)
{
    try {
        
        var obj = {};
        arr.forEach(function(item) {
            obj[item['url']] = item['text'];
        });
        var json = JSON.stringify(obj);

        
        let response =  fetch("https://spy.lazyor.com/index/task/updateFactoryArr", {
          headers: {
            "Accept": "application/json",
            // Firefox 中不需要单独设置 Access-Control-Allow-Origin
          },
          referrer: "https://spy.lazyor.com/",
          body: JSON.stringify({
            arr:json,
          }),
          mode: "no-cors",
          method: "POST"
        });
        
        console.log(' update arr:',json);

        if (response.status === 200) {
          let data =  response.json();

          console.log(' update data:', data);
        } else {
          console.log("update 错误: " + response.status);
        }

      } catch (err) {
        console.log("update 错误:" + err);
      }
}


function uploaddata(memberId,pageData,pageSchema)
{
    try {
        let response =  fetch("https://spy.lazyor.com/index/task/updateFactory", {
          headers: {
            "Accept": "application/json",
            // Firefox 中不需要单独设置 Access-Control-Allow-Origin
          },
          referrer: "https://spy.lazyor.com/",
          body: JSON.stringify({
            memberId:memberId,
            pageSchema:JSON.stringify(pageSchema),
            pageData:JSON.stringify(pageData),
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

      } catch (err) {
        console.log("update 错误:" + err);
      }

}


console.log("start my factory");

function fetchFactory()
{
    try {


        fetch('https://spy.lazyor.com/index/task/fetchFactory',{
            headers: {
            "Accept": "application/json",
            },
            referrer: "https://spy.lazyor.com/",          
            mode: "no-cors",
            method: "GET"
        }
        )
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // 确保在这里调用json方法
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });


        // let response =  fetch("https://spy.lazyor.com/index/task/fetchFactory", {
        //   headers: {
        //     "Accept": "application/json",
        //     // Firefox 中不需要单独设置 Access-Control-Allow-Origin
        //   },
        //   referrer: "https://spy.lazyor.com/",          
        //   mode: "cors",
        //   method: "GET"
        // });

        
        // // console.log('响应数据3：', result);
        // console.log(' start fetching ');
        // let data =  response.json();

        

        // console.log(' response ',response);
        // console.log(' memberId ',response.memberId);
        
        // if (response.status == 200) {
        //   let data =  response.json();
        //   if(response.memberId)
        //   {
        //       console.log(' location id:', response.memberId);
        //       let nextpagex = "https://sale.1688.com/factory/card.html?memberId="+response.memberId;
        //       window.location.href = nextpagex;
        //   }
        //   console.log(' fetch data:', data);
        // } else {
        //   console.log("fetch 错误: " + response.status);
        // }

      } catch (err) {

        console.log("fetch 错误:" + err);
    }
}


function updatefactory()
{
    console.log(' start updatefactory ');
    // this.addEventListener('load', function () {

    // });
    // let rootContent = document.querySelector("#root");  
    let pageSchema = window.$$pageSchema;

    if(pageSchema)
    {
        //页面上有的内容，看哪些需要提交到后台的
       
        let pageData = window.$$pageData;
        let memberId =  window.location.href;

        console.log(' update pageSchema:', pageSchema);
        console.log(' update pageData:', pageData);
        console.log(' update memberId:', memberId);


        if(pageData)
        {
            console.log(' uploaddata-ing ');
            uploaddata(memberId,pageData,pageSchema);
            // fetchFactory();
        }
        else
        {
            console.log(' uploaddata-err no pageData ');
        }
    }
    else
    {
        window.setTimeout(updatefactory,2000);
    }

     
}

updatefactory();


  
// _initXMLHttpRequest();

// fetchFactory();