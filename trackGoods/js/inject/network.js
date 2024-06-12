
        



function tracking()
{

  let location = window.location;
  console.log("window.location:", location.href); 
  if(location.href.includes("1688.com/page/offerlist.htm"))
  {
        let number = document.querySelectorAll("input[type=number]");  
        let btn = document.querySelectorAll("button");  

        let imageMain = document.querySelectorAll(".main-picture");  


        

        if(number.length>1)
        {
            var lastnumber = number[number.length - 1];
            var lastbtn = btn[btn.length - 2];

            lastnumber.setAttribute('value',2);


            //获取新的内容，提交给服务端
            var computedStyles = window.getComputedStyle(lastbtn);
            var colorValue = computedStyles.color;
            console.log("color:", colorValue); 
            // console.log("imageMain:", imageMain); return;
            if(imageMain.length>0)
            {
                // console.log("mail:", imageMain[imageMain.length - 1].parents().html()); 
            }

            if('rgb(204, 204, 204)'== colorValue)
            {
               
                console.log("lastnumber:", lastnumber); 
                console.log("lastbtn:", lastbtn); 
            }
            else
            {
                lastbtn.click();                
                window.setTimeout(tracking,2000);

                // alert(lastbtn.getAttribute('disabled'));
            }
            

        }
        else
        {

            console.log("number:", number); 
            window.setTimeout(tracking,2000);
            return;
        }

  }

}


const _requestTools = {
    formatQueryString(queryString = '') {
        const result = {};
        if (queryString.length > 0) {
            console.log('queryString', queryString)
            queryString = queryString.split('?')[1].split('&');
            for (let kv of queryString) {
                kv = kv.split('=');
                if (kv[0]) result[kv[0]] = decodeURIComponent(kv[1]);
            }
        }
        return result
    }
}

function _initXMLHttpRequest() {
    // 拦截网络请求方法1
    const open = XMLHttpRequest.prototype.open;
    const _targetApiList = [
        'h5api.m.1688.com/h5/mtop.1688.shop.data.get',
        'h5api.m.1688.com/h5/mtop.taobao.widgetservice.getjsoncomponent',
        'h5api.m.1688.com/h5/mtop.mbox.fc.common.gateway'
    ]
    XMLHttpRequest.prototype.open = function (...args) {
        this.addEventListener('load', function () {


            console.log('url:', this.responseURL);


            // console.log("pageData:", window.pageData); 
            let pageData = window.pageData;

            // 如果当前url并不包含_targetApiList中任意一个地址，则阻止后续操作
            if (!_targetApiList.find(item => this.responseURL.includes(item))) return

            const result = {
                responseHeaders: {},
                responseData: {},
                request: this,
                status: this.status,
                params: _requestTools.formatQueryString(this.responseURL)
            }
            // 格式化响应头
            this.getAllResponseHeaders().split("\r\n").forEach((item) => {
                const [key, value] = item.split(": ");
                if (key) result.responseHeaders[key] = value;
            });
            if (result.responseHeaders["content-type"].includes("application/json")) {
                // 如果响应头是content-type是json，则格式化响应体
                if (this.response?.length) result.responseData = JSON.stringify(this.response);
            }
            // console.log('响应数据2：', result);

            //看是否能直接提交数据到服务器

            try {
                let response =  fetch("http://spy.lazyor.com/index/task/updateInfo1688", {
                  headers: {
                    "Accept": "application/json",
                    // Firefox 中不需要单独设置 Access-Control-Allow-Origin
                  },
                  referrer: "https://spy.lazyor.com/",
                  body: JSON.stringify({
                    memberId:pageData.globalData.memberId,
                    domains:pageData.globalData.domain,
                    pageData:JSON.stringify(pageData),
                    contentStr: result.responseData
                  }),
                  mode: "cors",
                  method: "POST"
                });
                
                // console.log('响应数据3：', result);
                
                if (response.status === 200) {
                  let data =  response.json();

                  console.log(' update 1688 data:', data);
                } else {
                  console.log("update错误: " + response.status);
                }
        
              } catch (err) {
                console.log("update错误:" + err);
              }


            // return ;

            window.setTimeout(tracking,2000);

        })

        return open.apply(this, args);
    };

    // 拦截网络请求方法2
    // 此处的方法拦截在目标网站中并没有遇到
    // const { fetch: originalFetch } = window;
    // window.fetch = async (...args) => {
    //     let [resource, config] = args;

    //     let response = await originalFetch(resource, config);
    //     if (response.status === 200) {
    //         response
    //             .clone()
    //             .json()
    //             .then((data) => {
    //                 console.log('响应数据：', data)
    //             });
    //     }

    //     return response;
    // };

}

_initXMLHttpRequest();