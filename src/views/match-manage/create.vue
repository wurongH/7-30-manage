<style lang="less" scoped>
    @import './create.less';
</style>

<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <div class="header">
              <span class="message">
                  <Icon type="ios-list"></Icon>
                  赛道列表
              </span>
          </div>
          <div class="segmentingLine"></div>
          <Row justify="center">
              <Table border :loading="loading" :data="tableData" :columns="columns" @on-selection-change="selectionChange">
                <template slot-scope="{ row, index }" slot="action">
                  <span class="text" @click="isShowSloseTrackModal = true, currentRow = row">{{row.status ? '禁用' : '启用'}}</span>
                  <span class="text" @click="edit(row)">编辑</span>
                </template>
              </Table>
          </Row>
          <Row>
              <Page class="page" :total="total"></Page>
          </Row>
          <Button type="primary" @click="isShowEditAddTrack = true, trackTitle = '新增'">新增</Button>
        </Card>
      </Col>
    </Row>

    <!-- 是否禁用赛道 -->
    <Modal
        v-model="isShowSloseTrackModal"
        title="友情提示"
        @on-ok="closeTrack">
        <p>是否禁用赛道?</p>
    </Modal>

    <!-- 新增与编辑 -->
    <Modal v-model="isShowEditAddTrack" :title="`${trackTitle}赛道`" @on-visible-change="trackVisibleChange" width="600" class="track-modal">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" :label-width="100">
        <FormItem prop="levelCode" label="等级" class="level" v-if="trackTitle != '编辑'">
          <RadioGroup v-model="formInline.levelCode" @on-change="levelRadioChange">
            <Radio :label="`${index}`" v-for="(item, index) in trackEnums" :key="index">{{item.trackLevelName}}</Radio>
          </RadioGroup>
        </FormItem>
        <template v-for="(item, index) in currentTrack" v-if="trackTitle != '编辑'">
          <FormItem prop="province" label="省份" required v-if="!index && item.levelType == '2'">
            <Select v-model="formInline.province" placeholder="请选择省份" style="width:200px">
                <Option :value="item.shortCode" v-for="(item, index) in province" :key="index">{{item.name}}</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <p v-else class="text">{{item.matchLevelName}}</p>
        </template>
        <div class="segmentingLine"></div>
        <FormItem label="冠名" prop="naming">
            <Input v-model="formInline.naming" placeholder="请输入冠名"></Input>
        </FormItem>
        <FormItem label="域名(使用,分割)" prop="domainArray">
            <Input v-model="formInline.domainArray" placeholder="请输入域名"></Input>
        </FormItem>
        <FormItem label="名称" prop="trackName">
            <Input v-model="formInline.trackName" placeholder="请输入赛道名称"></Input>
        </FormItem>
        <FormItem label="官网地址" prop="website">
            <Input v-model="formInline.website" placeholder="请输入官网地址"></Input>
        </FormItem>
        <FormItem label="主办单位" prop="hostUnit">
            <Input v-model="formInline.hostUnit" placeholder="请输入主办单位"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="formInline.status">
              <Radio label="1">启用</Radio>
              <Radio label="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>


      <div slot="footer">
        <Button @click="isShowEditAddTrack = false">取消</Button>
        <Button type="primary" @click="submit('formInline')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import api from '@/api/fetch-api';
  import tableMixin from '@/mixins/table'
  export default {
    data () {
        return {
          isShowSloseTrackModal: false,
          currentRow: '',

          //新增与编辑赛道
          isShowEditAddTrack: false,
          trackTitle: '',
          levelType: '',
          //赛道的相关字段
          trackEnums: [],
          //当前赛道
          currentTrack: [],
          //省数据
          province: [],

          formInline: {
            levelCode: '0',
            //选择省份
            province: '',
            //冠名
            naming: '',
            //域名
            domainArray: '',
            //赛道名称
            trackName: '',
            //官网地址
            website: '',
            //状态
            status: '1',
            //主办单位
            hostUnit: ''
          },
          ruleValidate: {
            levelCode: [
              { required: true, message: '请选择等级', trigger: 'change' }
            ],
            province: [
              { required: true, message: '请选择省份', trigger: 'change' }
            ],
            trackName: [
              { required: true, message: '请输入赛道名称', trigger: 'blur' }
            ],
            status: [
              { required: true, message: '请选择状态', trigger: 'change' }
            ],
          },

          //表头
          columns: [
            { type: 'index', title: '序号', width: 80 },
            { title: '赛事等级', key: 'matchLevelDescribe'},
            { title: '冠名', key: 'naming'},
            { title: '主办单位', key: 'hostUnit'},
            { title: '赛道名称', key: 'trackName'},
            { title: '创建时间', key: 'createTime'},
            { title: '状态', key: 'statusDescribe'},
            { title: '操作', slot: 'action', width: 150, fixed: 'right', align: 'center', }
          ]
        };
    },
    mixins: [ tableMixin ],
    methods:{
      //编辑赛道
      edit(row){
        this.isShowEditAddTrack = true;
        this.trackTitle = '编辑';
        this.currentRow = row;
        this.formInline.naming = row.naming;
        this.formInline.domainArray = row.domainArray;
        this.formInline.trackName = row.trackName;
        this.formInline.website = row.website;
        this.formInline.status = `${row.status}`;
        this.formInline.hostUnit = row.hostUnit;
      },
      trackVisibleChange(val){
        if(!val){
          setTimeout(_ =>{
            this.$refs['formInline'].resetFields();
            this.currentTrack = this.trackEnums[0].matchLevelJa.levelJa;
          }, 300)
        }
      },
      //选择等级
      levelRadioChange(index){
        var d = this.trackEnums[~~index];
        this.currentTrack = d.matchLevelJa.levelJa
        var isLevelType = false;
        d.matchLevelJa.levelJa.map(v =>{
          v.levelType == '2' && (isLevelType = true, this.levelType = v.levelType);
        })
        if(isLevelType && !this.province.length){
          this.getProvince();
        }
      },
      //获取省份数据
      getProvince(){
        api(this,'/matchManage/listSubNormArea', {
          parentShortCode: 0
        }, res => {
            this.loading = false;
            if(res.code == 0) {
              this.province = res.data
            }else{
              this.$Message.error(res.message);
            }
        },res => {
          this.$Message.error(res.message);
        });
      },
      //启用与禁用赛道
      closeTrack(){
        api(this,'/matchManage/closeTrack', {
          trackId: this.currentRow.id,
          status: this.currentRow.status == 1 ? 0 : 1,
        }, res => {
            this.loading = false;
            if(res.code == 0) {
              this.$Message.success((this.currentRow.status == 1 ? '关闭' : '启用') + `成功`);
              this.getList();
            }else{
              this.$Message.error(res.message);
            }
        },res => {
          this.$Message.error(res.message);
        });
      },
      //获取新建赛道的相关字段
      getTrackEnums(){
        api(this,'/matchManage/trackEnums', {
          type: 0
        }, res => {
            this.loading = false;
            if(res.code == 0) {
              this.trackEnums = res.data.levelJa;
              this.currentTrack = this.trackEnums[0].matchLevelJa.levelJa
            }else{
              this.$Message.error(res.message);
            }
        },res => {
          this.$Message.error(res.message);
        });
      },
      submit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            api(this,'/matchManage/addOrModifyTrack', {
              type: this.trackTitle == '编辑' ? 1 : 0,
              trackName: this.formInline.trackName,
              naming: this.formInline.naming,
              levelCode: this.trackEnums[~~this.formInline.levelCode].levelCode,
              status: this.formInline.status,
              trackId: this.currentRow.id,
              website: this.formInline.website,
              domainArray: this.formInline.domainArray,
              selectLevelArray: [{ levelType: this.levelType, shortCode: this.formInline.province }]
            }, res => {
                this.loading = false;
                if(res.code == 0) {
                  this.$Message.success(`${this.trackTitle}成功`);
                  this.isShowEditAddTrack = false;
                  this.getList();
                }else{
                  this.$Message.error(res.message);
                }
            },res => {
              this.$Message.error(res.message);
            });

          }
        })
      },
      //获取表格数据
      getList(){
        api(this,'/matchManage/pageTrackList', {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }, res => {
            this.loading = false;
            if(res.code == 0) {
              this.tableData = res.data.data;
              this.total = res.data.total;
            }else{
              this.$Message.error(res.message);
            }
        },res => {
          this.$Message.error(res.message);
        });
      },
    },
    created(){
      this.getList();
      this.getTrackEnums();
    }
  };
</script>
