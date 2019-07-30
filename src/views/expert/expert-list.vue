<style lang="less">
    @import 'expert-list.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card v-if="baseMessage">
                    <Form  label-position="top" inline :model="search">
                        <FormItem label="届别" prop="sessionIndex" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.sessionIndex" placeholder="状态"  style="width:200px" >
                                <Option v-for="item in statusList" :value="item.matchId" :key="item.id">{{ item.sessionName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="专家姓名" prop="title" style="width: 212px;margin-bottom:10px" >
                            <Input v-model="search.title" :clearable="true" placeholder="请输入专家姓名"/>
                        </FormItem>
                        <FormItem label="联系方式" prop="telephone" style="width: 212px;margin-bottom:10px" >
                            <Input v-model="search.telephone" :clearable="true" placeholder="请输入联系方式"/>
                        </FormItem>
                        <FormItem label="状态" prop="status" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.status" placeholder="状态"  style="width:200px">
                                <Option v-for="item in statusAuditList" :value="item.value" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="学位" prop="degree" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.degree"   style="width:200px">
                                <Option v-for="item in educationList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="单位性质" prop="companyType "style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.companyType"   style="width:200px">
                                <Option v-for="item in companyTypeList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="擅长领域" prop="serviceArea" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.serviceArea"   style="width:200px">
                                <Option v-for="item in serviceAreaList" :value="item.id" :key="item.id" >{{ item.typeName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="研究方向" prop="researchDirection" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.researchDirection"   style="width:200px">
                                <Option v-for="item in researchDirectionList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="专家类型" prop="mentorType" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.mentorType"   style="width:200px">
                                <Option v-for="item in mentorTypeList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="持有证书" prop="certFlag" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.certFlag" style="width:200px">
                                <Option v-for="item in certFlagList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="是否担任评审" prop="reviewFlag" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.reviewFlag" style="width:200px">
                                <Option v-for="item in reviewFlagList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="曾任评委" prop="reviewLevelArray" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.reviewLevelArray" style="width:200px">
                                <Option v-for="item in reviewLevelArrayList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="是否获奖" prop="matchPrizeFlag" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.matchPrizeFlag" style="width:200px">
                                <Option v-for="item in matchPrizeFlagList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="指导大赛" prop="matchPrizeType" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.matchPrizeType" style="width:200px">
                                <Option v-for="item in matchPrizeTypeList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="投资人" prop="investFlag" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.investFlag" style="width:200px">
                                <Option v-for="item in investFlagList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="创业者" prop="cyFlag" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.cyFlag" style="width:200px">
                                <Option v-for="item in cyFlagList" :value="item.code" :key="item.code" >{{ item.value }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="专家类别" prop="tutorsType" style="width: 212px;margin-bottom:10px">
                            <Select v-model="search.tutorsType" style="width:200px">
                                <Option v-for="item in tutorsTypeList" :value="item.id" :key="item.id" >{{ item.typeName }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button @click="submitSearch" type="primary" icon="ios-search" style="margin:20px 0 0 10px">搜索</Button>
                            <Button @click="searchCancel" type="default" style="margin:20px 10px 0 10px">取消</Button>
                        </FormItem>
                    </Form>
                    <div class="segmentingLine"></div>
                    <!-- <Row justify="start" style="margin-bottom:10px;">
                        <Col>
                            <Button  type="primary">+新增</Button>
                            <Button  type="primary">导出项目信息为Excel</Button>
                            <Button  type="primary">导出项目附件为rar</Button>
                        </Col>
                    </Row> -->
                    <Row justify="center">
                        <Table border :loading="loading" :data="listData" :columns="columns"></Table>
                    </Row>
                    <Row>
                        <Page class="page" :total=total @on-change="changePage" show-elevator></Page>
                        <Button type="primary" @click="applyPlatformTutors">向平台申请评审专家</Button>
                    </Row>

    <Modal v-model="applyShow" width="1200" title="评审专家需求申请单">
        <Form ref="applyForm" :model="applyForm" :label-width="110" :rules="ruleValidate">
          <div class="weight">项目</div>
            <FormItem  label="数量" prop="amount" style="width: 312px;margin-bottom:10px">
                <Input  v-model="applyForm.amount" type="tel" :maxlength="3" placeholder="请输入数量" ></Input>
            </Formitem>
            <FormItem label="领域" prop="relasNameArray">
                    <CheckboxGroup v-model="relasNameArray">
                        <Checkbox :label="`${item.id}.${item.typeName}`" :key="item.id" v-for="item in serviceAreaList">
                            <span>{{item.typeName}}</span>
                        </Checkbox>
                    </CheckboxGroup>
            </FormItem>
            <div class="weight">专家</div>
             <FormItem label="类型" prop="tutorsType">
                    <CheckboxGroup v-model="tutorsType">
                        <Checkbox :label="`${item.id}.${item.typeName}`"  :key="item.id" v-for="item in tutorsTypeList">
                            <span>{{item.typeName}}</span>
                        </Checkbox>
                    </CheckboxGroup>
            </FormItem>
            <FormItem label="级别" prop="expertLevel">
                    <CheckboxGroup v-model="expertLevel">
                        <Checkbox :label="item.levelName1" :key="item.id" v-for="(item, index) in expertLevelList1" >
                            <span>{{item.levelName1}}</span>
                        </Checkbox>
                    </CheckboxGroup>
            </FormItem>
            <FormItem label="用途" prop="contacexpertPurposets">
                    <CheckboxGroup v-model="contacexpertPurposets">
                        <Checkbox v-model="onlineReviewTime" label="网络评审"></Checkbox>
                        <Checkbox v-model="localeReviewTime" label="现场评审"></Checkbox>
                    </CheckboxGroup>
            </FormItem >
            <FormItem  label="网络评审时间" v-if="onlineReviewTime" prop="onlineTime">
                <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期"   v-model="applyForm.onlineTime" format="yyyy-MM-dd"></DatePicker>
                  </Col>
                </Row>
            </FormItem >
            <FormItem  label="本地评审时间" v-if="localeReviewTime" prop="localeTime">
                <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期"   v-model="applyForm.localeTime" format="yyyy-MM-dd"></DatePicker>
                  </Col>
                </Row>
            </FormItem >
            <FormItem  label="联系人" prop="contacts" style="width: 312px;margin-bottom:20px">
                <Input v-model="applyForm.contacts" type="text" :clearable="true" placeholder="请输入联系人"></Input>
            </FormItem>
            <FormItem  label="联系电话" prop="phone" style="width: 312px;margin-bottom:20px">
                <Input v-model="applyForm.phone" type="tel" :maxlength="11" placeholder="请输入联系电话"></Input>
            </FormItem >
            <div class="weight">经费</div>
            <FormItem label="经费" prop="expenditure" style="width: 312px;margin-bottom:20px">
                <Input v-model="applyForm.expenditure" type="tel" :maxlength="7" placeholder="请输入经费"></Input>
            </FormItem>


        </Form>
        <div slot="footer">
            <Button  style="margin-left: 8px" :loading="buttonLoading" @click="cancelApply('applyForm')">取消</Button>
            <Button type="primary" :loading="buttonLoading" @click="submitApply('applyForm')">提交</Button>
        </div>
    </Modal>
                    <Modal v-model="auditShow" width="400" title="审核">
                        <p>
                            您对{{audit.name}}审核结果为：
                        </p>
                        <div slot="footer">
                            <Button type="primary" @click="auditAction('1')">通过</Button>
                            <Button type="primary" @click="auditAction('2')">未通过</Button>
                        </div>
                    </Modal>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import utils from'@/libs/util'
    import api from '@/api/fetch-api';
    export default {
        data () {
            return {
                expertLevelList1: [
                    {levelName1: '国赛评委',id: 1},
                    {levelName1: '省赛评委', id: 2},
                    {levelName1: '不限', id: 3}
                ],
                buttonLoading: false,
                total:0,
                loading:false,
                baseMessage:true,
                search:{
                    status: '*',
                    sessionIndex:1,
                    title:'',
                    userName:'',
                    telephone:'',
                    degree:'*',
                    companyType:'*',
                    researchDirection:'*',
                    mentorType:'*',
                    certFlag:'*',
                    reviewFlag:'*',
                    matchPrizeFlag:'*',
                    matchPrizeType:'*',
                    investFlag:'*',
                    cyFlag:'*',
                    tutorsType:'*',
                    serviceArea:'*',
                    reviewLevelArray:'*',
                },
                levelName1:[],
                audit:{
                    userId:'',
                    name:'',
                },
                auditShow: false,
                applyShow: false,
                expertLevelList: [],
                statusProjectList:[
                    {
                        value: '1',
                        label: '中职组'
                    },
                    {
                        value: '2',
                        label: '高职组'
                    },
                    {
                        value: '3',
                        label: '本科组'
                    }
                ],
                statusList:[],
                listData:[],
                statusAuditList:[
                    {code:'*',value:'全部'},
                    {code:'0',value:'待审核'},
                    {code:'1',value:'已审核'},
                    {code:'2',value:'审核未通过'},
                ],
                educationList:[
                    {code:'*',value:'全部'},
                    {code:'学士',value:'学士'},
                    {code:'硕士',value:'硕士'},
                    {code:'博士',value:'博士'},
                ],
                companyTypeList:[
                    {code:'*',value:'全部'},
                    {code:'科研院所/教育机构',value:'科研院所/教育机构'},
                    {code:'企业',value:'企业'},
                    {code:'政府机构',value:'政府机构'},
                    {code:'行业协会/社团组织',value:'行业协会/社团组织'},
                ],
                serviceAreaList:[],
                researchDirectionList:[
                    {code:'*',value:'全部'},
                    {code:'项目评估',value:'项目评估'},
                    {code:'结对帮扶',value:'结对帮扶'},
                    {code:'培训授课',value:'培训授课'},
                    {code:'咨询指导',value:'咨询指导'},
                    {code:'实践指导',value:'实践指导'},
                    {code:'其他方式',value:'其他方式'},
                ],
                mentorTypeList:[
                    {code:'*',value:'全部'},
                    {code:'实战型',value:'实战型'},
                    {code:'评审型',value:'评审型'},
                    {code:'培训型',value:'培训型'},
                ],
                certFlagList:[
                    {code:'*',value:'全部'},
                    {code:'0',value:'否'},
                    {code:'1',value:'是'},
                    ],
                reviewFlagList:[
                    {code:'*',value:'全部'},
                    {code:'0',value:'否'},
                    {code:'1',value:'是'},
                ],
                reviewLevelArrayList:[
                    {code:'*',value:'全部'},
                    {code:'国赛',value:'国赛'},
                    {code:'省赛',value:'省赛'},
                ],
                matchPrizeFlagList:[
                    {code:'*',value:'全部'},
                    {code:'0',value:'否'},
                    {code:'1',value:'是'},
                ],
                matchPrizeTypeList:[
                    {code:'*',value:'全部'},
                    {code:'国赛金牌',value:'国赛金牌'},
                    {code:'国赛银牌',value:'国赛银牌'},
                    {code:'国赛铜牌',value:'国赛铜牌'},
                    {code:'省赛金牌',value:'省赛金牌'},
                    {code:'省赛银牌',value:'省赛银牌'},
                    {code:'省赛铜牌',value:'省赛铜牌'},
                ],
                investFlagList:[
                    {code:'*',value:'全部'},
                       {code:'0',value:'否'},
                    {code:'1',value:'是'},
                ],
                cyFlagList:[
                    {code:'*',value:'全部'},
                      {code:'0',value:'否'},
                    {code:'1',value:'是'},
                ],
                tutorsTypeList:[],
                //申请表单
                localeReviewTime: false,
                onlineReviewTime: false,
                relasNameArray: [],
                tutorsType: [],
                expertLevel: [],
                contacexpertPurposets: [],
                applyForm: {
                    expertLevel: '',
                    amount: '',
                    expenditure: '',
                    contacts: '',
                    phone: '',
                    onlineTime: '',
                    localeTime:''
                },
                ruleValidate: {
                    contacts: [
                        { required: true, message: '联系人不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '联系电话不能为空', trigger: 'blur' }
                    ],
                    amount: [
                        {required: true, message: '项目数量不能为空', trigger: 'blur'}
                    ],
                    expenditure: [
                        {required: true, message: '经费不能为空', trigger: 'blur'}
                    ]
                },
                /****************/
                 columns:[
                    {
                        type: 'index',
                        title: '序号',
                        width: 80,
                        align:'center'
                    },
                    {
                        title: '专家姓名',
                        key: 'userName',
                        align:'center',
                        width: 140,
                    },
                    {
                        title: '联系方式',
                        key: 'telephone',
                        width: 140,
                        align:'center',
                    },
                    {
                        title: '专家类别',
                        key: 'tutorsTypeName',
                        width: 120,
                        align:'center',
                    },
                    {
                        title: '审核状态',
                        key: 'statusName',
                        width: 100,
                        align:'center',
                    },
                    {
                        title: '工作单位',
                        key: 'belong',
                        width: 200,
                        align:'center',
                    },
                    {
                        title: '单位性质',
                        key: 'companyType',
                        width: 160,
                        align:'center',
                    },
                    {
                        title: '学历',
                        key: 'degree',
                        width: 120,
                        align:'center',
                    },
                    {
                        title: '擅长领域',
                        key: 'serviceAreaString',
                        width: 180,
                        align:'center',
                    },
                    {
                        title: '投资人',
                        key: 'investFlagString',
                        width: 160,
                        align:'center',
                    },
                    {
                        title: '创业者',
                        key: 'cyFlagString',
                        width: 100,
                        align:'center',
                    },
                    {
                        title: '持有证书',
                        key: 'certFlagString',
                        width: 100,
                        align:'center',
                    },
                    {
                        title: '曾任评委',
                        key: 'reviewFlagString',
                        width: 100,
                        align:'center',
                    },
                    {
                        title: '组别',
                        key: 'groupName',
                        width: 100,
                        align:'center',
                    },
                    {
                        title: '子组别',
                        key: 'subGroupName',
                        width: 100,
                        align:'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed:'right',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        display:params.row.status == 0 ?'inline-block':'none',
                                        padding: '0 5px',
                                        lineHeight: '12px',
                                        color: '#3497F2'
                                    },
                                    on: {
                                        click: (el) => {
                                            this.audit.name = params.row.userName;
                                            this.audit.userId =params.row.id;
                                            this.auditShow =true;
                                        }
                                    }
                                }, "审核"),
                            ]);
                        }
                    }
                ],
            };
        },
        mounted () {
            this.listSessionIndex();
        },
        methods: {
            changeSessionIndex(value){
                for(let item in this.statusList){
                    if(value ==item.matchId){
                        this.userInfo = item;
                    }
                }
            },
            //007015 获取大赛通用类型字典   专家类型  邻域接口
            getMatchComType(dictType){
                api(this,'/expert/getMatchComType',{
                    trackId:this.userInfo.trackId,
                    levelId:this.userInfo.levelId,
                    matchId:this.userInfo.matchId,
                    dictType:dictType,
                },res => {
                    if(res.code == 0) {
                        if(dictType==4){
                            //console.log(res.data);
                            this.tutorsTypeList =res.data;
                        }else{
                            this.serviceAreaList = res.data;
                        }
                    }else{
                        this.$Message.error(res.message);
                    }
                },res => {
                    this.$Message.error(res.message);
                });
            },
            //007015 获取比赛等级列表
            listMatchLevel() {
                api(this, '/authorize/listMatchLevel', {
                    trackId: this.userInfo.trackId
                }, res => {
                    if (res.code == 0) {
                        this.expertLevelList = res.data
                    } else {
                        this.$Message.error(res.message)
                    }
                }, res => {
                    this.$Message.error(res.message)
                })
            },
            listSessionIndex(){
                api(this,'/project/listSessionIndex',{
                    trackId:this.$store.state.userInfo.trackId,
                    levelId:this.$store.state.userInfo.levelId,
                    manageId:this.$store.state.userInfo.manageId,
                },res => {
                    if(res.code == 0) {
                        this.statusList = res.data;
                        if(res.data.length !== 0) {
                            this.search.sessionIndex = res.data[0].matchId;
                        }
                        this.userInfo = res.data[0];
                        this.loading =true;
                        this.list();
                        this.getMatchComType(3);
                        this.getMatchComType(4);
                        this.listMatchLevel()
                    }else{
                        this.$Message.error(res.message);
                    }
                },res => {
                    this.$Message.error(res.message);
                });
            },
            list(){
                let oldItem = this.search.status
                let status = "*"
                this.statusAuditList.some((item)=>{
                    if (item.value == oldItem) {
                        status = item.code
                    }
                })
                api(this,'/expert/pageTutorList',{
                    trackId:this.userInfo.trackId,
                    levelId:this.userInfo.levelId,
                    manageId:this.userInfo.manageId,
                    matchId:this.search.sessionIndex,
                    pageNum:this.pageNum,
                    pageSize:10,
                    status:status,
                    userName:this.search.title,
                    telephone:this.search.telephone,
                    degree:this.search.degree,
                    companyType:this.search.companyType,
                    researchDirection:this.search.researchDirection,
                    mentorType:this.search.mentorType,
                    certFlag:this.search.certFlag,
                    reviewFlag:this.search.reviewFlag,
                    matchPrizeFlag:this.search.matchPrizeFlag,
                    matchPrizeType:this.search.matchPrizeType,
                    investFlag:this.search.investFlag,
                    cyFlag:this.search.cyFlag,
                    tutorsType:this.search.tutorsType,
                    serviceArea:this.search.serviceArea,
                    reviewLevelArray:this.search.reviewLevelArray,
                },res => {
                    this.loading = false;
                    if(res.code == 0) {
                        this.listData = res.data.data;
                        this.total = res.data.total;
                    }else{
                        this.$Message.error(res.message);
                    }
                },res => {
                    this.$Message.error(res.message);
                });
            },
            handleCancel(){
                this.baseMessage =false;
            },
            submitSearch() {
                this.listData=[];
                this.list();
            },
            searchCancel() {
                let matchId = '*'
                if(this.statusList.length !== 0){
                    matchId = this.statusList[this.statusList.length-1].matchId
                }
                this.search={
                    status:10,
                    sessionIndex: matchId,
                    title:'',
                    userName:'',
                    telephone:'',
                    degree:'*',
                    companyType:'*',
                    researchDirection:'*',
                    mentorType:'*',
                    certFlag:'*',
                    reviewFlag:'*',
                    matchPrizeFlag:'*',
                    matchPrizeType:'*',
                    investFlag:'*',
                    cyFlag:'*',
                    tutorsType:'*',
                    serviceArea:'*',
                    reviewLevelArray:'*',
                }
                this.list();
            },
            changePage (page) {
                this.pageNum = page;
                this.list();
            },
            //向平台申请评审专家
            applyPlatformTutors(dictType) {
                this.applyShow = true
                this.listMatchLevel()
                this.getMatchComType(dictType)
                this.listSessionIndex()
            },
            //007301 提交评审专家申请单
            submitApply(applyForm) {
                var relasNameArrayStr = '',
                    relasNameArrayIds = '';
                this.relasNameArray.map(v =>{
                    var arr = v.split('.');
                    relasNameArrayStr += `${arr[1]},`
                    relasNameArrayIds += `${arr[0]},`
                })
                relasNameArrayStr = relasNameArrayStr.substring(0, relasNameArrayStr.length - 1);
                relasNameArrayIds = relasNameArrayIds.substring(0, relasNameArrayIds.length - 1);
                var tutorsTypeStr = '', tutorsTypeIds = '';
                this.tutorsType.map(v =>{
                    var arr = v.split('.');
                    tutorsTypeStr += `${arr[1]},`
                    tutorsTypeIds += `${arr[0]},`
                })
                tutorsTypeStr = tutorsTypeStr.substring(0, tutorsTypeStr.length - 1);
                tutorsTypeIds = tutorsTypeIds.substring(0, tutorsTypeIds.length - 1);
                var expertLevelStr = '';
                this.expertLevel.map(v =>{
                    expertLevelStr += `${v},`
                })
                expertLevelStr = expertLevelStr.substring(0, expertLevelStr.length - 1);
                var contacexpertPurposetsStr = '';
                this.contacexpertPurposets.map(v =>{
                    contacexpertPurposetsStr += `${v},`
                })
                contacexpertPurposetsStr = contacexpertPurposetsStr.substring(0, contacexpertPurposetsStr.length - 1);
                api(this,'/expert/applyPlatformTutors', {
                    contacts: this.applyForm.contacts,
                    phone: this.applyForm.phone,
                    matchId: this.search.sessionIndex,
                    realmsNameArray: relasNameArrayStr,
                    realmsArray: relasNameArrayIds,

                    tutorsTypeNameArray: tutorsTypeStr,
                    tutorsTypeArray: tutorsTypeIds,

                    purposeNameArray: contacexpertPurposetsStr,
                    expenditure: this.applyForm.expenditure,
                    localeReviewTime: this.applyForm.localeTime != '' ? utils.Format(this.applyForm.localeTime,'yyyy-MM-dd') : '',
                    onlineReviewTime: this.applyForm.onlineTime != '' ? utils.Format(this.applyForm.onlineTime,'yyyy-MM-dd') : '',
                    amount: this.applyForm.amount,
                    levelNameArray: expertLevelStr 
                }, res => {                   
                    if(res.code == 0) {
                    this.buttonLoading =false;
                    var temp = /^\d+(\.\d+)?$/;
                    if(!temp.test(this.applyForm.amount)){
                        this.$Message.error('请输入正确项目数量')
                        return false;
                    }                    
                    var partten = /^1[3,5,8]\d{9}$/;
                    if(!partten.test(this.applyForm.phone)){
                        this.$Message.error('请输入正确手机号码')
                        return false;
                    } 
                    var temp =/^\d+(\.\d+)?$/;
                    if(!temp.test(this.applyForm.expenditure)){
                        this.$Message.error('请输入正确经费')
                        return false;
                    }
                        this.applyShow = false;
                        this.$Message.info('申请提交成功');
                         this.localeReviewTime = false,
                         this.onlineReviewTime = false
                         this.relasNameArray = [],
                         this.tutorsType = [],
                         this.expertLevel = [],
                         this.contacexpertPurposets = [],
                         this.localetime = ''
                         this.onlinetime = ''
                        this.$refs[applyForm].resetFields();
                    }else{
                        this.$Message.error(res.message);
                    }
                },res => {
                    this.$Message.error(res.message);
                })
            },
        // keyup(){
        //   if (!this.applyForm.amount.match(/^[\+\-]?\d*?\d*?$/))
        //     this.applyForm.amount = this.t_value;
        //   else
        //     this.t_value = this.applyForm.amount;
        //   if (this.applyForm.amount.match(/^(?:[\+\-]?\d+?)?$/))
        //     this.o_value = this.applyForm.amount;
        // },
          //取消申请
          cancelApply(applyForm) {
                this.applyShow = false;
                this.localeReviewTime = false,
                this.onlineReviewTime = false
                this.relasNameArray = [],
                this.tutorsType = [],
                this.expertLevel = [],
                this.contacexpertPurposets = [],
                this.localetime = ''
                this.onlinetime = ''
                this.$refs[applyForm].resetFields();
          },

            auditAction(status){
                api(this,'/expert/modifyTutorStatus',{
                    status:status,
                    applyId:this.audit.userId
                },res => {
                    // this.domNode.innerText = "已审核"
                    this.loading = false;
                    if(res.code == 0) {
                        this.$Message.info('审核完成!');
                        this.auditShow =false;
                        this.list();
                    }else{
                        this.$Message.error(res.message);
                    }
                },res => {
                    this.$Message.error(res.message);
                });
            },
        }
    };
</script>
