export default {
  data () {
    return {
      //表头数据
      columns:[        
        { title: '单位名称', key: 'belong', width: 130, align:'center' },
        { title: '联系人', key: 'contacts', width: 120, align:'center' },
        { title: '联系电话', key: 'phone', width: 160, align:'center' },
        { title: '赛道名称', key: 'trackName', width: 120, align:'center'},      
        { title: '赛事名称', key: 'matchName', width: 160, align:'center' },
        { title: '项目数量', key: 'amount', width: 120, align:'center' },
        { title: '项目领域', key: 'realmsNameArray', width: 200, align:'center',},
        { title: '专家类型', key: 'tutorsTypeNameArray', width: 140, align:'center' },
        { title: '专家级别', key: 'levelNameArray', width: 120, align:'center'},
        { title: '专家用途', key: 'purposeNameArray', width: 120, align:'center' },
        { title: '经费预算', key: 'expenditure', width: 120, align:'center' },
        { title: '网络评审时间', key: 'onlineReviewTime', width: 150, align:'center' },
        { title: '现场评审时间', key: 'localeReviewTime', width: 150, align:'center' },
        { title: '申请时间', key: 'applyTime', width: 150, align:'center' },
        { title: '处理状态', key: 'statusName', width: 110, align:'center' },
        { title: '处理时间', key: 'dealTime', width: 150, align:'center' },
        { title: '操作', slot: 'action',width: 100, align:'center',fixed: 'right', 
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  display:params.row.applyStatus == 2 ? 'none': 'inline-block',
                  padding: '0 5px',
                  lineHeight: '12px',
                  color: '#3497F2'                  
                },
                on: {
                  click: () => {
                    this.dealDemand(params.row.id);
                  }
                }
              }, '处理'),
            ]);
          }
        }
      ]
    }
  }
}