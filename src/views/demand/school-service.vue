<style lang="less" scoped>
    @import './school-service.less';
</style>

<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <div class="header">
            <span class="title">
              <Icon type="ios-list"></Icon>
              校赛服务
            </span>
            <span class="pd_to">状态：</span>
            <Select v-model="applyStatus" placeholder="请选择" @on-change="pageApplyPlatformTutors" clearable style="width:112px">
              <Option v-for="item in typelist" :value="item.code" :key="item.code">{{item.value}}</Option>
            </Select>
          </div>
          <Row justify="center">
            <Table border :loading="loading" :data="tableData"  :columns="columns" ellipsis="true">
            </Table>
          </Row>
          <Row>
              <Page class="page" :total=total @on-change="changePage" show-elevator></Page>
          </Row>
        </Card>        
      </Col>
    </Row>
  </div>
</template>
<script>
import api from '@/api/fetch-api';
import schoolServiceMixins from './school-service-mixins.js';
import tableMixin from '@/mixins/table'
import baseMessage from '@/components/base-message'
export default {
  data () {
    return {
      tableData: [],
      applyStatus: '*',
      typelist:[
        {code: '*', value: '全部'},
        {code: 1, value: '未处理'},
        {code: 2, value: '已处理'}
      ]
    }
  },
  components: {
    baseMessage
  },
  mixins: [ schoolServiceMixins, tableMixin ],
  methods: {
    changePage(page) {
      this.pageNum = page;
      this.pageApplyPlatformTutors();
    },
    //007209 分页获取申请专家记录
    pageApplyPlatformTutors() {
      api(this, '/expert/pageApplyPlatformTutors', {
        applyStatus: this.applyStatus,
        pageNum: this.pageNum,
        pageSize: 10
      }, res => {
        if(res.code ==0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })  
    },
    //处理需求
    dealDemand(demandId) {
      api(this, '/expert/dealDemand', {
        demandId,
      }, res => {
        //console.log(demandId);
        if (res.code == 0) {
          this.$Message.info('处理完成');
          this.pageApplyPlatformTutors();
        } else {
          this.$Message.error(res.messsage);
        }
      }, res => {
        this.$Message.error(res.messsage)
      })
    }
  },
  created () {
    this.pageApplyPlatformTutors();
  }
}
</script>