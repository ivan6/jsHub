
console.log('amz123 s-');


function extractContentAfterStartBeforeEnd(str, start, end) {
    // 查找第一次出现的起始子串'start'的索引
    const startIdx = str.indexOf(start);
    if (startIdx === -1) {
        // 如果没有找到起始子串，返回空字符串
        return '';
    }

    // 查找结束子串'end'的索引，从起始子串之后开始搜索
    const endIdx = str.indexOf(end, startIdx + start.length);
    if (endIdx === -1) {
        // 如果没有找到结束子串，返回空字符串
        return '';
    }

    // 截取从'start'之后到'end'之前的内容
    const contentIdx = startIdx + start.length;
    const contentLen = endIdx - contentIdx;
    return str.substring(contentIdx, contentIdx + contentLen);
}

  

function convertStringToArray(str) {
    // 移除字符串首尾可能存在的空白字符
    str = str.trim();

    // const feedback_30d = extractContentAfterStartBeforeEnd(str,'"feedback_30d":',',');
    // const feedback_90d = extractContentAfterStartBeforeEnd(str,'"feedback_90d":',',');
    // const feedback_12m = extractContentAfterStartBeforeEnd(str,'"feedback_12m":',',');
    const feedback_all = extractContentAfterStartBeforeEnd(str,'"feedback_all":',',');
    // const product_count = extractContentAfterStartBeforeEnd(str,'"product_count":','}');
    const tmp = extractContentAfterStartBeforeEnd(str,'},',',{');

    // console.log('feedback_30d:', feedback_30d);
    // console.log('feedback_90d:', feedback_90d);
    // console.log('feedback_12m:', feedback_12m);
    // console.log('feedback_all:', feedback_all);
    // console.log('tmp:', '{'+tmp+'}');

    const seller_id = extractContentAfterStartBeforeEnd(tmp,'"','"');
    const seller_name = extractContentAfterStartBeforeEnd(tmp,',"','"');

    // console.log('seller_id',seller_id);
    // console.log('seller_name',seller_name);

    const data = {
        'seller_id':seller_id,
        'seller_name':seller_name,
        'countall':feedback_all
    };
  
    return data;
}

function updateAmzItem(seller_id,amzonId)
{
    const domain = window.location.href;
    const updateAmzItemArray = {
        "seller_id":seller_id,
        "amzonId":amzonId
    };
    fetch("https://spy.lazyor.com/index/taskamz/updateAmzItem", {
            headers: {
            "Accept": "application/json",
            },
            referrer: "https://spy.lazyor.com/",
            body: JSON.stringify({
            domain:domain,
            contentStr:{updateAmzItemArray}
            }),
            mode: "no-cors",
            method: "POST"
        }).then(
            response=>{
            if (response.ok) {
                let data =  response.json;            
            } else {
                console.log("updateAmzItem 错误: " + response.json);
            }
            }
        );
}

function amzId(seller_id)
{
        // API的URL
        const apiUrl = 'https://api.amz123.com/search/v1/seller_rank/decryption';

        // 请求的参数
        const params = {
        "seller_id": seller_id
        };

        // 使用fetch发送POST请求
        fetch(apiUrl, {
            method: 'POST', // 或者使用'GET'，根据API要求
            headers: {
                // 设置请求头，根据API要求可能需要添加认证令牌或内容类型
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params) // 将参数对象转换为JSON字符串
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {

            updateAmzItem(seller_id,data.data.seller_id);
            console.log(seller_id,data.data.seller_id); // 处理返回的数据
                        
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}



function goToNextPage() {
    // 获取当前页面的URL
    const currentPageUrl = window.location.href;

    // 假设分页是通过URL的路径部分来识别的，例如 /usseller-2
    const pageSection = window.location.pathname.match(/\/[a-z]+seller-(\d+)/);

    if (pageSection && pageSection[1]) {
        // 如果找到了分页部分，尝试获取当前页码
        const currentPageNumber = parseInt(pageSection[1], 10);

        // 计算下一页的页码
        const nextPageNumber = currentPageNumber + 1;

        // 构造下一页的URL
        const nextPageUrl = window.location.origin + window.location.pathname.replace('seller-'+currentPageNumber, 'seller-'+nextPageNumber);

        console.log(nextPageUrl);
        // 延迟1秒后跳转到下一页
        setTimeout(() => {
            window.location.href = nextPageUrl;
        }, 1000);
    } else {
        console.error('无法识别当前页面的分页部分');
    }
}


// function goToNextPage() {
//     // 获取当前页面的URL
//     const currentPageUrl = window.location.href;
//     const pagePattern = /\/[a-z]+seller-(\d+)/; // 匹配 /<countryCode>seller-<pageNumber>

//     // 使用正则表达式提取当前页码
//     const currentPageMatch = currentPageUrl.match(pagePattern);

//     if (currentPageMatch && currentPageMatch[1]) {
//         // 获取当前页码
//         const currentPageNumber = parseInt(currentPageMatch[1], 10);

//         // 计算下一页的页码
//         const nextPageNumber = currentPageNumber + 1;

//         // 构造下一页的URL
//         const nextPageUrl = currentPageUrl.replace(pagePattern, (match, p1) => `/ ${p1}/${nextPageNumber}`);

//         // 延迟1秒后跳转到下一页
//         setTimeout(() => {
//             window.location.href = nextPageUrl;
//         }, 1000);
//     } else {
//         console.error('无法识别当前页面的分页部分');
//     }
// }


function postamzid()
{
    const stri = '';

    let array = stri.split(',');

    // 使用forEach方法遍历数组
    array.forEach(function(item, index) {
        amzId(item);
    });
}


function parseSellers(str) {
    // 使用"seller_id":作为分隔符分割字符串
    const parts = str.split('"seller_id":');
    
    // 移除分割后数组中可能存在的空字符串
    parts.shift(); // 移除第一个空元素
  
    // 处理分割后的每一部分，转换为JSON对象
    const sellers = parts.map(part => {
      // 去除每个部分末尾的逗号(如果存在)
      let trimmedPart = part.trim();
    //   if (trimmedPart.endsWith(',')) {
    //     trimmedPart = trimmedPart.slice(0, -1);
    //   }
  
      // 将处理后的字符串转换为JSON对象
      try {

        return convertStringToArray(part);

      } catch (e) {
        console.error('Failed to parse JSON:', part);
        return null; // 如果转换失败，返回null
      }
    });
  
    // 过滤掉null值
    return sellers.filter(seller => seller !== null);
  }
  

// 内容脚本，注入到页面中
document.addEventListener('DOMContentLoaded', function() {
    const sellerTableBody = document.querySelector('.seller-table-body');
    if (sellerTableBody) {
        const sellerItems = sellerTableBody.querySelectorAll('.seller-table-item');
        const formattedData = [];
        const sellersArray = [];

        const nuxtDataScript = document.getElementById('__NUXT_DATA__');
  
        // // 检查元素是否存在
        if (nuxtDataScript) {
            // 获取script标签的文本内容，这通常是一个JSON字符串
            const jsonData = nuxtDataScript.textContent || nuxtDataScript.innerText;

            // 将JSON字符串转换为JavaScript对象
            // const dataObject = JSON.parse(jsonData);
            // 现在你可以使用dataObject中的数据
            // console.log(dataObject);

            //截取
             const TextData = extractContentAfterStartBeforeEnd(jsonData,'"seller_id":','"$sneedRefreshToken"');

            //  console.log("TextData:",TextData);

             const data = parseSellers('"seller_id":'+TextData);
             sellersArray.push(data);
            //  console.log(sellersArray);


        } else {
            console.log('未找到id为__NUXT_DATA__的script元素');
        }
        
        
        // postamzid();
        // return false;

        sellerItems.forEach(item => {
            // 提取店铺名称
            const shopName = item.querySelector('.shopW').textContent.trim();
    
            // 提取公司名称
            const companyName = item.querySelector('.companyW').textContent.trim();
    
            // 提取国家
            const country = item.querySelector('.text-center').textContent.trim();
    
            // 提取评价数量（假设为第一个数字）
            const reviewCount = item.querySelector('.text-end').textContent.trim();
    
            // 提取销售数量（假设为第二个数字）
            // const salesCount0 = item.querySelectorAll('.text-end').textContent.trim();
            const salesCount = item.querySelectorAll('.text-end')[1].textContent.trim();
    
            // 提取总评分数（假设为第三个数字）
            const totalRatings = item.querySelectorAll('.text-end')[2].textContent.trim();
    
            // 提取最后更新时间
            const lastUpdated = item.querySelector('.grow').textContent.trim();
    
            // 构造数据对象
            const data = {
                'shopName':shopName,
                'companyName':companyName,
                'country':country,
                'reviewCount':reviewCount,
                // salesCount0,
                'salesCount':salesCount,
                'totalRatings':totalRatings,
                'lastUpdated':lastUpdated
            };
    
            // 执行你需要的操作，比如发送到后台或打印到控制台
            // console.log(data);
            formattedData.push(data);
            // 发送数据到后台
            // chrome.runtime.sendMessage({ data: data });
        });

        // console.log(formattedData);
        // console.log(sellersArray[0]);
        //formattedData和sellersArray合并
        const combinedArray = [];

        for (let i = 0; i < sellersArray[0].length; i++) {
            // 确保两个数组在当前索引处都有元素

              //const theamzId = amzId(sellersArray[0][i].seller_id);
             
              const combineitem = {
                'seller_id':sellersArray[0][i].seller_id,
                'seller_name':sellersArray[0][i].seller_name,
                'shopName':formattedData[i].shopName,
                'companyName':formattedData[i].companyName,
                'country':formattedData[i].country,
                'count30':formattedData[i].reviewCount,
                'count90':formattedData[i].salesCount,
                'count12m':formattedData[i].totalRatings,
                'countsort':sellersArray[0][i].countall,
                'lastUpdated':formattedData[i].lastUpdated
              };
              combinedArray.push(combineitem);
        }


        //将 combinedArray 提交到go.lazyor.com
        console.log(combinedArray);

        try {        
            const domain = window.location.href;
            fetch("https://spy.lazyor.com/index/taskamz/updateamzlist", {
                    headers: {
                    "Accept": "application/json",
                    },
                    referrer: "https://spy.lazyor.com/",
                    body: JSON.stringify({
                    domain:domain,
                    contentStr:combinedArray
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

           
          //foreach 去获取到amzon的id,再提交          

        for (let i = 0; i < sellersArray[0].length; i++) {
            amzId(sellersArray[0][i].seller_id);
        }
        
        // 调用函数
        goToNextPage();

        //最后做跳转页面


        // 处理格式化后的数据，例如发送到后台或显示在控制台
        // console.log(formattedData);
        // 例如发送到后台
        // chrome.runtime.sendMessage({ data: formattedData });
    }
});
