<style lang="less" scoped>
@import './review.less';
</style>

<template>
<div>
  <Row>
    <Col span="24">
    <Card>
      <div class="header">
        <span class="message">
          <Icon type="ios-list"></Icon>
          评审标准
        </span>
        <span class="title">赛道:</span>
        <Select v-model="trackId" placeholder="请选择赛道" style="width:200px" @on-change="getProfessorTypeAndTypeName">
          <Option v-for="(item, index) in trackList" :value="item.id" :key="index">{{ item.trackName }}</Option>
        </Select>
      </div>
      <div class="segmentingLine"></div>
      <span class="first">评审专家类型</span>
      <div class="clear checkbox-list">
        <span v-for="(item, index) in tutoTypeData" :key="index">{{item.typeName}}</span>
        <div class="add">
          <Button type="primary" @click="isShowAddField = true">+新增字段</Button>
          <Button type="error" @click="isCutField = true">-删除字段</Button>
        </div>
      </div>
      <div class="segmentingLine"></div>
      <span class="first">评审维度</span>
      <div class="clear">
        <RadioGroup v-model="groupId" @on-change="getGroupExistSetting">
          <Radio :label="item.id" v-for="(item, index) in groupList" :key="index">{{item.typeName}}</Radio>
        </RadioGroup>
      </div>
      <div class="segmentingLine"></div>
      <p class="dimension dimension-info">
        <span>请在这里设置本届的项目评审维度，各维度相加总分为100分。</span>
        <Button type="primary" icon="md-add">添加</Button>
      </p>
      <!-- <div class="dimension setting">
        <Button>使用已有设置</Button>
        <span>点击这里，弹出用户已设置好的规则，应用到本组的评审规则中</span>
      </div>
      <div class="segmentingLine"></div>-->
      <ul class="fraction-rule">
        <li v-for="(item, index) in groupRule" :key="index">
          <p class="total-score">{{item.ruleName}}({{item.score}}分)</p>
          <div class="rule-lis">
            <div class="item" v-for="(d, i) in item.subList">
              <p class="info">评分说明：{{d.content}}</p>
              <div class="from-item">
                <span>项目评分({{d.score}})</span>
              </div>
            </div>
            <div class="item">
              <p class="info">评分说明：离开的环境爱神的箭拉三等奖</p>
              <div class="from-item">
                <span>项目评分(23)</span>
              </div>
            </div>
          </div>
          <div class="btn-list">
            <Button type="primary">编辑</Button>
            <Button type="error">删除</Button>
          </div>
        </li>
      </ul>
      <Button type="primary">保存</Button>
    </Card>
    </Col>
  </Row>

  <!-- 删除字段 -->
  <cut-review-field :value.sync="isCutField" :data="tutoTypeData"></cut-review-field>

  <!-- 新增字段 -->
  <Modal v-model="isShowAddField" title="新增字段" @on-visible-change="_ =>{ formValidate.name = ''; }" width="400" class="field-modal">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="字段名称" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入字段名称"></Input>
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
import tableMixin from '@/mixins/table'
import cutReviewField from './components/cutReviewField';
export default {
  data() {
    return {
      //赛道列表
      trackList: [],
      //赛道id
      trackId: '',

      //新增字段弹窗
      isShowAddField: false,
      //删除字段弹窗
      isCutField: false,
      formValidate: {
        name: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ],
      },

      //专家类型
      tutoTypeData: [],
      //组别数据
      groupList: [],
      //组别id
      groupId: '',

      //规则列表
      groupRule: []
    };
  },
  mixins: [tableMixin],
  components: {
    cutReviewField
  },
  methods: {
    //获取已经创建的赛事的届别
    getListTrack() {
      api(this, '/matchManage/listTrack', {}, res => {
        this.loading = false;
        if (res.code == 0) {
          this.trackList = res.data
          this.trackId = res.data[0].id;
          this.getProfessorTypeAndTypeName()
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
          api(this, '/matchManage/addComTypeField', {
            trackId: this.trackId,
            dicType: 4,
            typeName: this.formValidate.name,
          }, res => {
            this.loading = false;
            if (res.code == 0) {
              this.$Message.success('新增成功');
              this.isShowAddField = false;
              this.getProfessorTypeAndTypeName();
            } else {
              this.$Message.error(res.message);
            }
          }, res => {
            this.$Message.error(res.message);
          });
        }
      })
    },
    //根据赛道id获取专家类型和组别
    getProfessorTypeAndTypeName(){
      api(this, '/matchManage/professorTypeAndTypeName', {
        trackId: this.trackId
      }, res => {
        if (res.code == 0) {
          this.tutoTypeData = res.data.professor;
          this.groupList = res.data.group;
        } else {
          this.$Message.error(res.message);
        }
      }, res => {
        this.$Message.error(res.message);
      });
    },
    //根据塞到id和小组id查找对应的规则
    getGroupExistSetting() {
      api(this, '/matchManage/groupExistSetting', {
        trackId: this.trackId,
        groupId: ~~this.groupId
      }, res => {
        if (res.code == 0) {
          this.groupRule = res.data
        } else {
          this.$Message.error(res.message);
        }
      }, res => {
        this.$Message.error(res.message);
      });
    },
  },
  created() {
    this.$root.app.$on('updateProfessor', this.getProfessorTypeAndTypeName)
    this.getListTrack();
  }
};
</script>
