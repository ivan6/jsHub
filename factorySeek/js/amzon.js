
console.log('amzon s-');


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

//更新分类
function updateInfo(seller,contentstrarr)
{
    try {        
        const domain = window.location.href;
        fetch("https://spy.lazyor.com/index/taskamz/updateinfo", {
                headers: {
                "Accept": "application/json",
                },
                referrer: "https://spy.lazyor.com/",
                body: JSON.stringify({
                seller:seller,
                contentStr:contentstrarr
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
function updateTags(amzonid,tags,products,productnum)
{
    try {        
        const domain = window.location.href;
        fetch("https://spy.lazyor.com/index/taskamz/updatetags", {
                headers: {
                "Accept": "application/json",
                },
                referrer: "https://spy.lazyor.com/",
                body: JSON.stringify({
                    amzonid:amzonid,
                    contentStr:tags,
                    products:products,
                    productnum:productnum
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


function extractKeyValuePairs(element) {
        // 获取包含详细卖家信息的div元素
        var boxInnerElement = element.querySelector('.a-box-inner');
      
        // 创建一个数组来存储键值对
        var keyValuePairs = [];
      
        // 创建一个变量来存储当前的键值对
        var currentPair = null;
      
        // 获取所有a-row元素并遍历它们
        var rows = boxInnerElement.querySelectorAll('.a-row');
        rows.forEach(function(row, index) {
          // 检查是否是第一个元素且不是键值对
          if (index === 0 && !row.querySelector('.a-text-bold')) {
            // 忽略第一个不是键值对的元素
            return;
          }
      
          // 获取当前行中的所有span元素
          var spans = row.querySelectorAll('span');
          if (spans.length === 0) {
            // 如果没有span元素，跳过当前行
            return;
          }
      
          var keySpan = spans[0];
          var valueSpan = spans[1];
      
          // 检查是否存在键和值
          if (keySpan.classList.contains('a-text-bold') && valueSpan) {
            // 创建键值对
            currentPair = {
              key: keySpan.textContent.trim(),
              value: valueSpan.textContent.trim()
            };
      
            // 检查是否是缩进行，如果是，则将值添加到上一个键值对
            if (row.classList.contains('indent-left')) {
              if (keyValuePairs.length > 0) {
                keyValuePairs[keyValuePairs.length - 1].value += ' ' + currentPair.value;
              }
            } else {
              // 如果不是缩进行，将当前键值对添加到数组
              keyValuePairs.push(currentPair);
            }
          }
        });
  
  // 调用函数
  
}

// 内容脚本，注入到页面中
document.addEventListener('DOMContentLoaded', function() {

     // 获取当前URL的查询字符串部分
    const queryString = window.location.href;
    // 判断查询字符串中是否包含"/sp?"

    // console.log(queryString);

    const containsSp = queryString.includes("/sp?");
    const containsme = queryString.includes("/s?me=");

    const currentUrl = new URL(window.location);
        // 创建一个URLSearchParams对象
    const params = new URLSearchParams(currentUrl.search);
        // 使用get方法获取'seller'参数的值

//page 1
    if (containsSp) {
        //店铺信息页

        //介绍、客服电话、评分、基本信息
        const sellername = document.querySelector('#seller-name');
        const aboutseller = document.querySelector('#spp-expander-about-seller');    
        const sellerinfo = document.querySelector('#page-section-detail-seller-info');
        const rating = document.querySelector('#page-section-feedback').innerHTML;
        // const storefront = document.querySelector('#seller-info-storefront-link');

        const sellerNameReal = sellername.textContent.trim();
        let logo = '';
        let about = '';
        let phone = '';
        const logoElement = document.querySelector('#seller-logo-column .seller-logo-img');
        if(logoElement)
        {
            logo = logoElement.getAttribute('src');
        }

        console.log('sellername',sellerNameReal);
        console.log('logo',logo);
        if(aboutseller)
        {
            const aboutsellerTmp = aboutseller.querySelector('.spp-expander-more-content');
            about = aboutsellerTmp.innerHTML;
        }
        console.log('about',about);

        const sellerphone = document.querySelector('#seller-phone-number #seller-contact-phone');
        if(sellerphone)
        {
            phone = sellerphone.textContent.trim();
        }

        var boxInnerElement = sellerinfo.querySelector('.a-box-inner');

        let sellerdetail = boxInnerElement.innerHTML;
        
        console.log('sellerdetail',sellerdetail);
        console.log('rating',rating);               
        console.log('servicephone',phone);               

        const sellerValue = params.get('seller');

        const data = {
            'sellerName':sellerNameReal,
            'logo':logo,
            'about':about,
            'servicephone':phone,
            'sellerdetail':sellerdetail,
            'rating':rating
        };

        console.log('sellerValue',sellerValue);
        // updateInfo(sellerValue,data);



    } 
//page 2    
    if(containsme)
    {
        //
        const departments = document.querySelector('#departments');
        const elements = departments.querySelectorAll('.a-size-base.a-color-base');
        // 存储所有找到的文本内容
        const contents = [];
        // 遍历元素并添加它们的文本内容到数组
        elements.forEach(element => {
            if(element.textContent.trim()!='Department')     contents.push(element.textContent.trim());
        });


        const productsElement = document.querySelectorAll('div[data-component-type="s-search-result"]');

        //products

        //herf:'href="/Carhartt-Durable-Water-Resistant-Classic-Backpack/dp/B0CJYNCNX6/ref='
        //title h2
        //<span class="a-offscreen">$49.99</span><span aria-hidden="true"><span class="a-price-symbol">$</span>
        //<span class="a-icon-alt">4.6 out of 5 stars</span>
        //<span class="a-size-base s-underline-text">3,030</span>
        //<div class="a-row a-size-base"><span class="a-size-base a-color-secondary">1K+ bought in past month</span></div>
        // console.log(productsElement);
        const products = [];

        const currentHost = window.location.hostname;
        const secureUrl = 'https://'+currentHost+window.location.pathname+'/';
        let totalnum = '';
        const totalnumH1 = document.querySelector('h1');
        if(totalnumH1)
        {
            totalnumSpan = totalnumH1.querySelector('span');
            if(totalnumSpan) totalnum = totalnumSpan.textContent.trim();
        }

        productsElement.forEach(element => {
            const titleSpan = element.querySelector('h2 .a-size-medium.a-color-base.a-text-normal');
            const productTitle = titleSpan.textContent.trim();

            const linkElement = element.querySelector('h2 a.s-underline-text');
            const href = linkElement.getAttribute('href');
            let productLink = href.replace(/&?ref=.*?(?=&|$)/, '');
            

            productLink = secureUrl + href;
            // productLink = productLink.replace(/[?&](.|\n)*/, '?');

            const imgElement = element.querySelector('img.s-image');
            // 获取src属性的图片地址
            const src = imgElement.getAttribute('src');
            // console.log('图片地址（src）:', src);
            // 获取srcset属性的图片地址集合，并将其转换为数组
            const srcset = imgElement.getAttribute('srcset');
            const srcsetUrls = srcset.split(',').map(part => part.trim().split(' ')[0]);
            
            const moneyCodeSpan = element.querySelector('span .a-price-symbol');
            if(moneyCodeSpan)
            {
                moneyCode = moneyCodeSpan.textContent.trim();
            }
            else
            {
                moneyCode = '';
            }
            
            // console.log(moneyCodeSpan);
            const moneySpan = element.querySelector('span .a-offscreen');
            if(moneySpan)
            {
                money = moneySpan.textContent.trim();
            }
            else
            {
                money = '';
            }
            // const totalSalesSpan = element.querySelector('span .a-size-base s-underline-text');
            // const descriptionSpan = element.querySelector('div .a-row a-size-base .a-size-base a-color-secondary');

            totalSales = extractContentAfterStartBeforeEnd(element.innerHTML,'<span class="a-size-base s-underline-text">','</span>');
            description = extractContentAfterStartBeforeEnd(element.innerHTML,'<span class="a-size-base a-color-secondary">','</span>');
            const productId = element.getAttribute('data-asin');
           
            const data = {
                'productId':productId,
                'productTitle':productTitle,
                'productLink':productLink,
                'src':src,
                'srcsetUrls':srcsetUrls,
                'moneyCode':moneyCode,
                'money':money,                
                'totalSales':totalSales,
                'description':description
            };

            products.push(data);

            //


        });

        console.log(products);


        const sellerValue = params.get('me');

        // 加上totalnum 和 products
        // updateTags(sellerValue,contents,products,totalnum);

        // 打印结果数组
        console.log(sellerValue,contents);
        console.log('totalnum',totalnum);

    }

    
     
  
});
