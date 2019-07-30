<style lang="less" scoped>
@import './expert.less';
</style>

<template>
<div>
  <Row>
    <Col span="24">
    <Card>
      <div class="header">
        <span class="message">
          <Icon type="ios-list"></Icon>
          专家
        </span>
        <span class="title">赛道:</span>
        <Select v-model="trackId" placeholder="请选择赛道" style="width:200px" @on-change="getProfessorFieldInfo">
          <Option v-for="(item, index) in trackList" :value="item.id" :key="index">{{ item.trackName }}</Option>
        </Select>
      </div>
      <div class="segmentingLine"></div>
      <div>
        <span>基本信息</span>
        <span class="text-info">请在这里选择/新增本赛事需要评审专家提交的基本信息</span>
      </div>
      <div class="segmentingLine"></div>
      <div class="clear checkbox-list">
        <Checkbox v-model="item.showFlag" :true-value="1" :false-value="0" v-for="(item, index) in professorFieldInfoList" :key="index">{{item.fieldLabel}}</Checkbox>
        <div class="add">
          <Button type="primary" @click="moduleEnum = 'PROFESSOR_INFO', isShowAddField = true">+新增字段</Button>
          <Button type="error" @click="isCutField = true">-删除字段</Button>
        </div>
      </div>
      <div class="segmentingLine"></div>
      <span class="first">附件要求</span>
      <div style="margin-bottom: 15px;">
        <Button type="primary" @click="moduleEnum = 'PROFESSOR_FILE', isShowAddField = true">新增</Button>
      </div>
      <Row justify="center">
        <Table border :loading="loading" :data="tableData" :columns="columns">
          <template slot-scope="{ row, index }" slot="action">
            <span class="text" @click="del(row.id)">删除</span>
          </template>
        </Table>
      </Row>
      <div class="btn-view">
        <Button type="primary" @click="submit">保存</Button>
      </div>
    </Card>
    </Col>
  </Row>
  <!-- 删除字段 -->
  <cut-field :value.sync="isCutField" :data="noProfessorFieldInfoList"></cut-field>

  <!-- 新增字段 -->
  <Modal v-model="isShowAddField" :title="`新增${moduleEnumTitle}`" @on-visible-change="_ =>{ formValidate.name = ''; }" width="400" class="field-modal">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem :label="`${moduleEnumTitle}名称`" prop="name">
          <Input v-model="formValidate.name" :placeholder="`请输入${moduleEnumTitle}名称`"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="addField('formValidate')">确定</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import api from '@/api/fetch-api';
import cutField from './components/cutField';
export default {
  data() {
    return {
      //赛道列表
      trackList: [],
      //赛道id
      trackId: '',

      //自定义数据
      professorFieldInfoList: [],

      //附件数据

      loading: false,
      //新增字段弹窗
      isShowAddField: false,
      //删除字段弹窗
      isCutField: false,
      //新增类型
      moduleEnum: '',
      formValidate: {
        name: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ],
      },

      //附件表格
      tableData: [],
      columns: [
        { type: 'index', title: '序号', width: 80 },
        { key: 'fieldLabel', title: '附件名称', align: 'center', },
        { slot: 'action', width: 120, title: '操作', align: 'center', },
      ],
    };
  },
  components: {
    cutField
  },
  computed: {
    //自定义不固定数据
    noProfessorFieldInfoList(){
      return this.professorFieldInfoList.filter(v => !v.fixationFlag)
    },
    moduleEnumTitle(){
      return this.moduleEnum == 'PROFESSOR_INFO' ? '字段' : '附件'
    }
  },
  methods: {
    //删除附件
    del(id){
      this.$Modal.warning({
        title: '警告',
        content: '确定删除此附件吗？',
        onOk: _ =>{
          api(this, '/matchManage/delField', {
            id
          }, res => {
            if (res.code == 0) {
              this.$Message.success('删除成功');
              this.getProfessorFieldInfo();
            } else {
              this.$Message.error(res.message);
            }
          }, res => {
            this.$Message.error(res.message);
          });
        }
      });
    },
    //获取已经创建的赛事的届别
    getListTrack() {
      api(this, '/matchManage/listTrack', {}, res => {
        this.loading = false;
        if (res.code == 0) {
          this.trackList = res.data
          this.trackId = res.data[0].id;
          this.getProfessorFieldInfo();
        } else {
          this.$Message.error(res.message);
        }
      }, res => {
        this.$Message.error(res.message);
      });
    },
    //切换赛道获取相应的字段信息
    getProfessorFieldInfo(){
      api(this, '/matchManage/professorFieldInfo', {
        trackId: this.trackId
      }, res => {
        this.loading = false;
        if (res.code == 0) {
          this.professorFieldInfoList = res.data.professorInfoJa
          this.tableData = res.data.professorFileJa
          res.data.professorInfoJa.map(v =>{
            if(v.showFlag){
              this.professor.push(v.id)
            }
          })
        } else {
          this.$Message.error(res.message);
        }
      }, res => {
        this.$Message.error(res.message);
      });
    },
    //新增字段
    addField(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          api(this, '/matchManage/addField', {
            trackId: this.trackId,
            moduleEnum: this.moduleEnum,
            fieldLabel: this.formValidate.name,
            fieldType: 1,
            fieldFormat: '',
            optionArray: ''
          }, res => {
            this.loading = false;
            if (res.code == 0) {
              this.$Message.success('新增成功');
              this.isShowAddField = false;
              this.getProfessorFieldInfo();
            } else {
              this.$Message.error(res.message);
            }
          }, res => {
            this.$Message.error(res.message);
          });
        }
      })
    },
    //保存
    submit(){
      api(this, '/matchManage/saveTemplateExtendField', {
        extendfieldJson: {
          trackId: this.trackId,
          PROFESSOR_INFO: this.professorFieldInfoList,
          PROFESSOR_FILE: this.tableData
        }
      }, res => {
        this.loading = false;
        if (res.code == 0) {
          this.$Message.success('保存成功');
        } else {
          this.$Message.error(res.message);
        }
      }, res => {
        this.$Message.error(res.message);
      });
    }
  },
  created() {
    this.$root.app.$on('updateFieldInfo', this.getProfessorFieldInfo)
    this.getListTrack();
  }
};
</script>
