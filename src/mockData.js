var Mock = require('mockjs')

var Random = Mock.Random

const tableData = Mock.mock({
    'code': 0,
    'data|10-20':[
        {
             // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'available': '@boolean',
            'username': "@cname",//名字为随机中文名字
            'money':'12.5',
            'payType|1':[ "微信", "支付宝", "银行卡", "其它"],//工作是数组中的一个
            'status|1': ['待支付', '待发货', '待收货', '已完成'],
            'city|1': ['北京', '上海', '深圳', '重庆', '成都', '杭州', '南京', '西安', '长沙', '珠海'],
            'date': Random.date('yyyy-MM-dd'), //日期
            'time': Random.time('HH:mm:ss'), //时间
            'phone': 15773281566,
            // 'image':'@image'//图片
            'image': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=265869069,1865360288&fm=26&gp=0.jpg'
        },
    ],
    'message': '操作成功',
    'systemDate': new Date().getTime()
});

console.log(tableData)
module.exports = { tableData }