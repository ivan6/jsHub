
//1、判断当前地址带分页，判断是否有加载的内容，没有，就等时间，有了提交，并点击下一页；判断地址是否有分页，页面是否有内容。循环。


console.log(' start offering ');



offering();

function uploadofferlist(str)
{
    try {
        
      console.log('提交数据：', str);

      fetch("https://spy.lazyor.com/index/task/updateOfferlist", {
          headers: {
            "Accept": "application/json",
            // Firefox 中不需要单独设置 Access-Control-Allow-Origin
          },
          referrer: "https://spy.lazyor.com/",
          body: JSON.stringify({
            listdata:str
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
    let originalUrl =  window.location.href;
    //找到下一页，跳转
    // 解析原始URL
    var url = new URL(originalUrl);
    // 获取查询参数对象
    var searchParams = new URLSearchParams(url.search);
    // 获取当前的beginPage值，并将其增加1
    var currentBeginPage = parseInt(searchParams.get('beginPage'), 10);
    var newBeginPage = currentBeginPage + 1;

    // 设置新的beginPage值
    searchParams.set('beginPage', newBeginPage);

    // 更新URL的查询参数部分
    url.search = searchParams.toString();

    // 输出新的URL
    console.log(url.toString());
    if(newBeginPage<51)   window.location.href = url.toString();

}

function offering()
{

    var html = document.documentElement.outerHTML;
    var regex = /window.data.offerresultData = successDataCheck\(([\s\S]*?)}\);/;
    var match = html.match(regex);
    if (match) {
        var specificDivContent = match[1];
        // console.log(specificDivContent);
    }

    if(match)
    {
        let offerresultData = match[1]+'}';        
        // let htmlstr = document.
        if(offerresultData)
        {
            //页面上有的内容，看哪些需要提交到后台的
        
            
            //规整数据，提交数据
            if(offerresultData)
            {
                var offerdata = JSON.parse(offerresultData);
                var offerList = offerdata.data.offerList;
                if(offerList)
                {
                    let Str = '';
                    offerList.forEach(function(offer, index) {
                        // console.log("Offer at index " +index+"/"+ offer.company.name + ": ", offer.company.url);
                        Str = Str+ index+'|'+offer.company.name+'|'+offer.company.memberId+'|'+offer.company.url+'|'+offer.company.isFactory+'|'+offer.company.isSuperFactory+'|'+offer.company.memberCreditUrl+';';
                    });
                    console.log(' update Str:', Str);
                    uploadofferlist(Str);
                }
                nextpage();
                //下一页
            }
            else
            {
                console.log(' uploaddata-err no pageData ');
            }
        }
        else
        {
            
            window.setTimeout(offering,2000);
        }
    }
    else
    {
        window.setTimeout(offering,2000);
    }
    
}