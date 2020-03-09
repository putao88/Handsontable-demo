import React, { Component } from 'react'
import './App.css';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css'
import { tableData, columns } from  './mockData'

export default class Htable extends Component {
    constructor(props) {
        super(props);
    }

    hotSettings = () => {
        const tableHeight = document.body.offsetHeight
        const settings = {
            data: tableData.data, // 表格数据
            rowHeaders: true, // 是否渲染行头
            autoWrapRow: true, // 自动换行
            manualColumnResize: true, // 开启手工更改列距
            className: "htCenter htMiddle", //居中 垂直
            height: '1000', //表格高度
            width: '1400', // 表格宽度
            // rowHeights: 35, // 每行的高度
            colWidths: 120, // 每列的宽度
            fixedRowsTop: 1,     // 固定一行excel的冻结
            fixedColumnsLeft: 1, // 左侧冻结一列
            autoColumnSize: true, // 当值为true且列宽未设置时，自适应列大小
            copyable: true, // 开启复制
            comments: true, // 开启备注
            manualColumnFreeze: true, //手动固定列 
            language: 'zh-CN', // 声明用中文的语言包
            licenseKey: 'non-commercial-and-evaluation', // 非商用的licenseKey
            colHeaders:['是否可用', '用户姓名', '金额', '支付方式', '状态', '省份', '日期', '时间', '手机号'], //表格列头
            columns: [ // 定义每一个单元格渲以及单元格类型
                { // 是否可用
                    data: 'available',
                    type: 'checkbox', // 1. checkbox
                },
                { // 用户姓名
                  data: "username",
                  type: 'text',  // 2. text
                  readOnly: true, //单元格可读，不能编辑
                },
                { // 金额
                  data: "money",
                  type: 'numeric', // 3. numeric
                  numericFormat: {
                    pattern: '0.00',
                  },
                },
                { // 支付方式
                  data: "payType",
                  type: 'dropdown', // 4. dropdown
                  source: [ "微信", "支付宝", "银行卡", "其它"],
                },
                { // 状态
                    data: "status",
                    editor: 'select', // 5. select
                    selectOptions: ['待支付', '待发货', '待收货', '已完成']
                },
                { // 省份
                    data: "city",
                    type: 'autocomplete', // 6. autocomplete
                    source: ['北京', '上海', '深圳', '重庆', '成都', '杭州', '南京', '西安', '长沙', '珠海'],
                    strict: false,
                    trimDropdown: false
                },
                { // 日期
                  data: "date",
                  type: 'date', // 7. date
                  width: 130,
                  dateFormat: 'YYYY-MM-DD',
                  correctFormat: true
                },
                { // 时间
                  data: "time",
                  type: 'time', // 8. time
                  timeFormat: 'HH:mm:ss',
                  correctFormat: true
                },
                { // 手机号
                    data: "phone",
                    type: 'text',
                    validator : (val, callback) => { // 单元格格式校验
                      if(this.util.isEmpty(val)) return callback(true)
                      let pattern = /^([0-9]{0}|1[0-9]{10})$/
                      if(pattern.test(val)) return callback(true)
                      return callback(false)
                    },
                },
                { // 图片
                    data: "image",
                    renderer: (instance, td, row, col, prop, value, cellProperties) => { // 自定义渲染单元格
                        Handsontable.dom.empty(td); // 渲染前先清空元素
                        let escaped = Handsontable.helper.stringify(value)
                        let img
                    
                        if (escaped.indexOf('http') === 0) {
                            img = document.createElement('IMG');
                            img.src = value;
                            img.classList.add('hImg')
                        
                            Handsontable.dom.addEvent(img, 'mousedown', function (e){
                            e.preventDefault(); // prevent selection quirk
                            });
                        
                            Handsontable.dom.empty(td);
                            td.appendChild(img);
                      }
                      return td;
                    }
                },
            ],
           contextMenu: { // 自定义右键菜单
                items: {
                    "row_above": {
                        name:'向上插一行'
                    },
                    "row_below": {
                        name:'向下插一行'
                    },
                    "col_left": {
                        name:'向左插一列'
                    },
                    "col_right": {
                        name:'向右插一列'
                    },
                    "hsep1": "---------", // 分隔线
                    "remove_row": {
                        name: '删除当前行',
                    },
                    "remove_col": {
                        name: '删除当前列',
                    },
                    "clear_column": {
                        name: '清空当前列',
                    },
                    "hsep2": "---------", // 必须和上次的变量名不一样
                    "undo": {
                        name: '撤销',
                    },
                    "cut": {
                        name: '剪切',
                    },
                    "copy": {
                        name: '复制',
                    },
                    "alignment": {
                        name: '对齐',
                    },
                    "hsep3": "---------",
                    "commentsAddEdit": { // 必须开启 comments: true
                        name: '添加备注',
                    },
                    "commentsRemove": { // 必须开启 comments: true
                        name: '删除备注',
                    },
                    "freeze_column": { // 必须开启 manualColumnFreeze: true
                        name: '固定列',
                    },
                    "unfreeze_column": { // 必须开启 manualColumnFreeze: true
                        name: '取消固定列',
                    }
                }
          },
          afterChange (changes, source) { // 单元格数据改变调用
            // function
          }

        }
        return settings
    }

    render () {
      const settings = this.hotSettings()
      return (
          <div className="App">
            <HotTable className="handsontable" root={'hot'} ref={'hot'} settings={settings} />
          </div>
        );
    }
}
