<template>
  <div class="components-task">
    <!-- 指派 -->
    <Modal v-model="showValue" title="指派" class="task-modal" :width="900">
      <Row style="margin-bottom: 10px;">
        <Col span="3">
          <span style="color: #2d8cf0; font-size: 14px;">专家组成</span>
        </Col>
        <Col span="5" v-for="(item, index) in tutorTypeCount" :key="index">
          <span>{{item.typeName}}：</span>
          <span>{{item.maxCount}}人</span>
        </Col>
      </Row>
      <!-- <Table border :loading="loading" :data="tableData" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <Checkbox v-model="row.checkFlag" :disabled="row.auditStatus" title="已评审导师不允许取消选择">{{row.checkFlag}}</Checkbox>
        </template>
      </Table> -->
      <div class="v-table mh400">
        <div class="table-head">
          <div class="tr">
            <div class="td" style="width: 10%"><span>操作</span></div>
            <div class="td" style="width: 15%"><span>专家姓名</span></div>
            <div class="td" style="width: 15%"><span>工作单位</span></div>
            <div class="td" style="width: 15%"><span>曾担任评委</span></div>
            <div class="td" style="width: 15%"><span>持有证书</span></div>
            <div class="td" style="width: 15%"><span>组别</span></div>
            <div class="td" style="width: 15%"><span>专家类型</span></div>
          </div>
        </div>
        <div class="table-body">
          <div class="tr" v-for="(item, index) in tableData" :key="index">
            <div class="td" style="width: 10%">
              <Checkbox v-model="item.checkFlag" :true-value="1" :false-value="0" :disabled="item.auditStatus" title="已评审导师不允许取消选择"></Checkbox>
            </div>
            <div class="td" style="width: 15%">{{item.userName}}</div>
            <div class="td" style="width: 15%">{{item.belong}}</div>
            <div class="td" style="width: 15%">{{item.reviewFlagString}}</div>
            <div class="td" style="width: 15%">{{item.certFlagString}}</div>
            <div class="td" style="width: 15%">{{item.groupName}}</div>
            <div class="td" style="width: 15%">{{item.tutorsTypeName}}</div>
          </div>
          <p class="no-data" v-if="isTableData">暂无数据</p>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="submit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import api from '@/api/fetch-api';
  export default {
  	name: "components-task",
    props: {
      value: Boolean,
      selectTbaleData: {
        type: Array,
        default () {
          return []
        }
      },
      matchId: String,
      assignFirstFlag: String
    },
    watch: {
      value (val) {
        this.showValue = val
        if(val){
          this.getListAssignTutor()
          !this.tutorTypeCount.length && this.getReviewSetting();
        }else{
          this.selectApplyIdArray = '';
          this.tableData = []
        }
      },
      showValue (val) {
        this.$emit('update:value', val);
      }
    },
  	data(){
  		return {
  			showValue: false,
        // loading: false,
        // columns: [
        //   { slot: 'action', width: 120, title: '操作', align: 'center', },
        //   { key: 'userName', title: '专家姓名', },
        //   { key: 'belong', title: '工作单位', },
        //   { key: 'reviewFlagString', title: '曾担任评委', },
        //   { key: 'certFlagString', title: '持有证书', },
        //   { key: 'groupName', title: '组别', },
        //   { key: 'tutorsTypeName', title: '专家类型', },
        // ],
        tableData: [],
        isTableData: true,
        selectApplyIdArray: '',
        //专家人数
        tutorTypeCount: [],
  		}
  	},

  	created(){

  	},
    computed: {
      entryIdArray(){
        var entryIdArray = '';
        this.selectTbaleData.map(v =>{
          entryIdArray += `${v.entryId},`
        })
        return entryIdArray.substring(0, entryIdArray.length - 1)
      }
    },
  	methods: {
      //获取专家人数
      getReviewSetting(){
        api(this,'/review/getReviewSetting',{
          matchId: this.matchId,
        },
        res => {
          this.loading = false;
          if(res.code == 0) {
            this.tutorTypeCount = res.data.tutorTypeCountJa;
          }else{
            this.$Message.error(res.message);
          }
        },res => {
          this.$Message.error(res.message);
        });
      },
      //获取待指派的专家列表
      getListAssignTutor(){
        api(this,'/review/listAssignTutor', {
          entryIdArray: this.entryIdArray,
          matchId: this.matchId,
        }, res => {
            this.loading = false;
            if(res.code == 0) {
              var selectApplyIdArray = '';
              res.data.map(v =>{
                v.auditStatus = !!~~v.auditStatus
                v.checkFlag && (selectApplyIdArray += `${v.id},`)
              })
              this.selectApplyIdArray = selectApplyIdArray.substring(0, selectApplyIdArray.length - 1)
              this.tableData = res.data;
              this.isTableData = !res.data.length
            }else{
              this.$Message.error(res.message);
            }
        },res => {
          this.$Message.error(res.message);
        });
      },
      submit(){
        var selectApplyIdArray = '';
        this.tableData.map(v =>{
          v.checkFlag && (selectApplyIdArray += `${v.id},`)
        })
        this.selectApplyIdArray = selectApplyIdArray.substring(0, selectApplyIdArray.length - 1)
        if(this.selectApplyIdArray == ''){
          this.$Message.error('请选择数据');
          return;
        }
        api(this,'/review/batchAssign', {
          entryIdArray: this.entryIdArray,
          selectApplyIdArray: this.selectApplyIdArray,
          matchId: this.matchId,
          assignFirstFlag: this.assignFirstFlag
        }, res => {
            this.loading = false;
            if(res.code == 0) {
              this.$Message.success('提交成功');
              this.$emit('update:value', false);
              this.$emit('updata-data')
            }else{
              this.$Message.error(res.message);
            }
        },res => {
          this.$Message.error(res.message);
        });
      }
  	}
  }
</script>
<style lang="less" scoped>
  @import './task.less';
</style>
