// 因为inject js和页面共享js作用域，为防止污染全局变量，故插件中变量名都以_开头
class _Crawler {
    constructor() {
        this.downloadPageNum = 10  // 允许下载多少页
        this.filename = ''  // 从popup传进来的输入的文件名
        this.allowDownload = false // popup给出指令允许下载
        this.collectionList = [] // 收集每页请求得到的数据
    }

    /**
     * 获取当前年-月-日 时:分:秒
     * @returns string
     */
    getTime() {
        const time = new Date();
        const timeInfo =
            (time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds())
        return timeInfo
    }

    // 生成随机延迟秒数, 默认3-4秒
    getRandomTimeOut(x = 3000, y = 4000) {
        return Math.round(Math.random() * (y - x) + x)
    }

    collectData(result) {
        // 首次进来或搜索条件变化，清空收集结果
        const currentPage = result.params.page * 1;
        if (currentPage * 1 === 1) this.collectionList = []
        if (!this.collectionList.find(el => result.request.responseURL.includes(el.responseURL))) {
            const item = {
                responseURL: result.request.responseURL,
                responseData: result.responseData
            }
            this.collectionList.push(item)
        }

        // 如果没有点击导出按钮，则阻止后续操作
        if (!this.allowDownload) return

        // 结束收集行为的条件，然后进行数据清洗和导出excel
        if (currentPage >= this.downloadPageNum) {
            const sheet = this.clearData()
            this.download(sheet)
        } else {
            // 随机3-4秒后进行点击下一页
            // 这是写爬虫最基本的道德了，尽量在学习技术的同时，不要对目标服务器产生压力和影响其正常运行
            const randomTimeout = this.getRandomTimeOut()
            setTimeout(() => {
                this.handleClickNext()
            }, randomTimeout);
        }
    }

    clearData() {
        const headerAndKeyList = [
            {
                header: '岗位名称',
                key: 'jobName'
            },
            {
                header: '地址',
                key: 'jobAddress'
            },
            {
                header: '薪资',
                key: 'salaryDesc'
            },
            {
                header: '经验',
                key: 'jobExperience'
            },
            {
                header: '学历',
                key: 'jobDegree'
            },
            {
                header: '技术栈',
                key: 'skills'
            },
            {
                header: '公司名称',
                key: 'brandName'
            },
            {
                header: '公司行业',
                key: 'brandIndustry'
            },
            {
                header: '公司融资阶段',
                key: 'brandStageName'
            },
            {
                header: '公司规模',
                key: 'brandScaleName'
            },
            {
                header: '福利待遇',
                key: 'welfareList'
            },
        ]
        const itemTableConfig = {
            tHeader: headerAndKeyList.map(el => el.header),
            keys: headerAndKeyList.map(el => el.key),
            table: []
        }
        this.collectionList.forEach(el1 => {
            el1.responseData.zpData.jobList.forEach(el2 => {
                const { jobName, cityName, areaDistrict, businessDistrict, salaryDesc, jobExperience, jobDegree, skills, brandName, brandIndustry, brandStageName, brandScaleName, welfareList } = el2
                const item = {
                    jobName,
                    jobAddress: `${cityName}·${areaDistrict}·${businessDistrict}`,
                    salaryDesc, jobExperience, jobDegree, skills, brandName, brandIndustry, brandStageName, brandScaleName, welfareList
                }
                itemTableConfig.table.push(item)
            })
        })
        return [itemTableConfig]
    }

    download(sheet) {
        const filename = this.filename || this.getTime()
        window.pikazExcelJs.default.excelExport({
            sheet,
            filename,
            beforeStart: (bookType, filename, sheet) => {
                console.log("开始导出", bookType, sheet, filename);
            },
        }).then(() => {
            this.filename = ''
            this.allowDownload = false
            this.collectionList = []
        });
    }

    handleClickNext() {
        const nextSelector = '.pagination-area .options-pages a:last-child'
        const nextDom = document.querySelector(nextSelector)
        console.log('1')
        nextDom.click()
        // 如果目标网站有收集用户行为的接口，此处可添加模拟用户操作，如滚动页面、点击某些元素
    }
}
const _crawler = new _Crawler();

// 监听从popup发送的指令 popup => content script => inject script
window.addEventListener("message", function (e) {
    if (e.data.action === 'CHANGE_POPUP_ALLOW_DOWNLOAD') {
        _crawler.filename = e.data.filename
        _crawler.allowDownload = true
        _crawler.handleClickNext()
    }
}, false);