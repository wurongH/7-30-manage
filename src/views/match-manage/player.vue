<style lang="less" scoped>
@import "./player.less";
</style>

<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <div class="header">
            <span class="message">
              <Icon type="ios-list"></Icon>选手
            </span>
            <span>赛道</span>
            <Select
              v-model="trackId"
              placeholder="请选择赛道"
              style="width:200px"
              @on-change="changeSessionIndex"
            >
              <Option
                v-for="(item, index) in trackList"
                :value="`${item.id}`"
                :key="index"
              >{{ item.trackName }}</Option>
            </Select>
          </div>
          <div class="segmentingLine"></div>
          <Row class="center">
            <Form
              ref="playerForm"
              class="playerForm"
              :model="playerForm"
              :rules="playerRules"
              :label-width="120"
            >
              <FormItem :label="fieldLabel.graduateFlag" prop="graduateFlag">
                <div class="checkBox">
                  <CheckboxGroup v-model="playerForm.graduateFlag">
                    <Checkbox
                      class="ios-alarm"
                      v-for="(item, index) in graduateArr"
                      :label="item.name"
                      :key="index"
                    >
                      <span>{{item.name}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </FormItem>
              <FormItem :label="fieldLabel.graduationData" prop="graduationData">
                <div class="checkBox">
                <DatePicker
                  type="date"
                  placeholder="请输入毕业时间"
                  :value="playerForm.graduationData"
                  format="yyyy-MM-dd HH:mm"
                  @on-change="changeDate1"
                ></DatePicker>
                </div>
              </FormItem>
              <FormItem :label="fieldLabel.birthData" prop="birthData">
                <div class="checkBox">
                <DatePicker
                  type="date"
                  placeholder="请输入出生年月"
                  :value="playerForm.birthData"
                  format="yyyy-MM-dd HH:mm"
                  @on-change="changeDate"
                ></DatePicker>
                </div>
              </FormItem>
              <FormItem :label="fieldLabel.national" prop="national">
                <div class="checkBox">
                  <CheckboxGroup v-model="playerForm.national">
                    <Checkbox
                      class="ios-alarm"
                      v-for="(item, index) in nationality"
                      :label="item.name"
                      :key="index"
                    >
                      <span>{{item.name}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </FormItem>
              <FormItem :label="fieldLabel.card" prop="card">
                <div class="checkBox">
                  <CheckboxGroup v-model="playerForm.card">
                    <Checkbox
                      class="ios-alarm"
                      v-for="(item, index) in documentType"
                      :label="item.name"
                      :key="index"
                    >
                      <span>{{item.name}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </FormItem>
              <FormItem :label="fieldLabel.education" prop="education">
                 <div class="checkBox">
                <CheckboxGroup v-model="playerForm.education">
                  <Checkbox
                    class="ios-alarm"
                    v-for="(item, index) in educationType"
                    :label="item.name"
                    :key="index"
                  >
                    <span>{{item.name}}</span>
                  </Checkbox>
                </CheckboxGroup>
                 </div>
              </FormItem>
              <FormItem :label="fieldLabel.sex" prop="sex">
                <div class="checkBox">
                  <CheckboxGroup v-model="playerForm.sex">
                    <Checkbox
                      class="ios-alarm"
                      v-for="(item, index) in sexArr"
                      :label="item.name"
                      :key="index"
                    >
                      <span>{{item.name}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </FormItem>
              <FormItem :label="fieldLabel.educational"  prop="educational">
                <div class="checkBox">
                  <CheckboxGroup v-model="playerForm.educational">
                    <Checkbox
                      class="ios-alarm"
                      v-for="(item, index) in schoolSystem"
                      :label="item.name"
                      :key="index"
                    >
                      <span>{{item.name}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </FormItem>
            </Form>
          </Row>
          <Row class="footer">
            <Button
              type="primary"
              :loading="buttonLoading"
              class="button"
              @click="saveForm('playerForm')"
            >保存</Button>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import api from "@/api/fetch-api";
export default {
  data() {
    return {
      playerRules: {
        // graduateFlag: [
        //   { required: true, message: "身份不能为空", trigger: "change" }
        // ],
        // education: [
        //   { required: true, message: "学历类型不能为空", trigger: "change" }
        // ],
        // education: [
        //   { required: true, message: "学历类型不能为空", trigger: "change" }
        // ],
        // sex: [{ required: true, message: "性别不能为空", trigger: "change" }],
        // educational: [
        //   { required: true, message: "学制不能为空", trigger: "change" }
        // ],
        // national: [
        //   { required: true, message: "国籍不能为空", trigger: "change" }
        // ],
        // card: [
        //   { required: true, message: "证件类型不能为空", trigger: "change" }
        // ],
        // graduationData: [
        //   { required: true, message: "毕业时间不能为空", trigger: "change" }
        // ],
        // birthData: [
        //   { required: true, message: "出生年月不能为空", trigger: "change" }
        // ]
      },
      trackList: [],
      graduateArr: [
        {
          name: "在校生",
          id: "warranty"
        },
        {
          name: "毕业生",
          id: "aftersalewarranty"
        }
      ],
      nationality: [
        {
          name: "仅限中国",
          id: "warranty"
        },
        {
          name: "仅限国外",
          id: "aftersalewarranty"
        }
      ],
      documentType: [
        {
          name: "身份证",
          id: "iCard"
        },
        {
          name: "护照",
          id: "passport"
        },
        {
          name: "台胞证",
          id: "taiwanCard"
        },
        {
          name: "港澳通行证",
          id: "hongKongCard"
        }
      ],
      educationType: [
        {
          name: "中学",
          id: "zhongxue"
        },
        {
          name: "初中",
          id: "chuzhong"
        },
        {
          name: "高中",
          id: "gaozhong"
        },
        {
          name: "中职中专",
          id: "zhongzhi"
        },
        {
          name: "高职高专",
          id: "gaozhi"
        },
        {
          name: "本科",
          id: "benke"
        },
        {
          name: "硕士",
          id: "suoshi"
        },
        {
          name: "博士",
          id: "boshi"
        }
      ],
      sexArr: [],
      schoolSystem: [
        {
          name: "两年制",
          id: "0"
        },
        {
          name: "三年制",
          id: "1"
        },
        {
          name: "四年制",
          id: "2"
        }
      ],
      trackId: "",
      buttonLoading: false,
      result: "",
      playerForm: {
        graduateFlag: [],
        graduationData: "",
        birthData: "",
        national: [],
        card: [],
        education: [],
        sex: [],
        educational: []
      },
      fieldLabel: {
        graduateFlag: '',
        graduationData: "",
        birthData: "",
        national: '',
        card: '',
        education: '',
        sex: '',
        educational: ''
      }
    };
  },
  mounted() {
    this.getListTrack();
  },
  methods: {
    getListTrack() {
      api(
        this,
        "/matchManage/listTrack",
        {},
        res => {
          this.loading = false;
          if (res.code == 0) {
            this.trackList = res.data;
            this.trackId = `${res.data[0].id}`;
            this.teamMemberFields(this.trackId);
          } else {
            this.$Message.error(res.message);
          }
        },
        res => {
          this.$Message.error(res.message);
        }
      );
    },
    changeSessionIndex(trackId) {
      this.$refs.playerForm.resetFields();
      this.teamMemberFields(trackId);
    },
    changeDate(val) {
      this.playerForm.birthData = val;
    },
    changeDate1(val) {
      this.playerForm.graduationData = val;
    },
    teamMemberFields(trackId) {
      api(
        this,
        "/matchManage/teamMemberFields",
        {
          trackId: trackId
        },
        res => {
          if (res.code == 0) {
            this.result = res.data;
            this.playerForm.birthData = "";
            this.playerForm.graduateFlag = [];
            this.playerForm.graduationData = "";
            this.playerForm.national = [];
            this.playerForm.card = [];
            this.playerForm.education = [];
            this.playerForm.sex = [];
            this.playerForm.educational = [];
            this.result.forEach(item => {
              if (item.fieldName === "memberSex") {
                this.sexArr = item.optionJa; //性别
                this.fieldLabel.sex = item.fieldLabel
                if (item.optionJa) {
                  this.$nextTick(()=>{
                  item.optionJa.forEach(item => {
                    if (item.selectFlag === "1") {
                      this.playerForm.sex.push(item.name);
                    }
                  });
                   })
                }
              }
              if (item.fieldName === "memberCertificateType") {
                this.documentType = item.optionJa; //证件
                this.fieldLabel.card = item.fieldLabel
                if (item.optionJa) {
                  this.$nextTick(()=>{
                  this.documentType.forEach(item => {
                    if (item.selectFlag === "1") {
                      this.playerForm.card.push(item.name);
                    }
                  });
                  });
                }
              }
              if (item.fieldName === "graduateTime") {
                this.playerForm.graduationData = item.optionJa; //毕业
                this.fieldLabel.graduationData = item.fieldLabel
              }
              if (item.fieldName === "birthday") {
                this.playerForm.birthData = item.optionJa; //出生
                this.fieldLabel.birthData = item.fieldLabel
              }
              if (item.fieldName === "memberEducationLength") {
                this.schoolSystem = item.optionJa; //学制
                this.fieldLabel.educational = item.fieldLabel
                if (item.optionJa) {
                  this.$nextTick(()=>{
                  this.schoolSystem.forEach(item => {
                    if (item.selectFlag === "1") {
                      this.playerForm.educational.push(item.name);
                    }
                  });
                  });
                }
              }
              if (item.fieldName === "memberEducation") {
                this.educationType = item.optionJa; //学历
                this.fieldLabel.education = item.fieldLabel
                if (item.optionJa) {
                  this.$nextTick(()=>{
                  this.educationType.forEach(item => {
                    if (item.selectFlag === "1") {
                      this.playerForm.education.push(item.name);
                    }
                  });
                  });
                }
              }

              if (item.fieldName === "graduateFlag") {
                this.graduateArr = item.optionJa; //身份
                 this.fieldLabel.graduateFlag = item.fieldLabel
                if (item.optionJa) {
                  this.$nextTick(()=>{
                      this.graduateArr.forEach(item => {
                    if (item.selectFlag === "1") {
                      this.playerForm.graduateFlag.push(item.name);
                    }
                  })
                  })
                }
              }
              if (item.fieldName === "nationality") {
                this.nationality = item.optionJa; //国籍
                 this.fieldLabel.national = item.fieldLabel
                if (item.optionJa) {
                  this.$nextTick(()=>{
                  this.nationality.forEach(item => {
                    if (item.selectFlag === "1") {
                      this.playerForm.national.push(item.name);
                    }
                  })
                  })
                }
              }
            });
          } else {
            this.$Message.error(res.message);
          }
        }
      );
    },
    saveTeamMemberFields() {
      api(
        this,
        "/matchManage/saveTeamMemberFields",
        {
          trackId: this.trackId,
          fieldJa: this.result
        },
        res => {
          this.buttonLoading = false;
          if (res.code == 0) {
            this.$Message.info("保存成功");
          } else {
            this.$Message.error(res.message);
          }
        }
      );
    },
    saveForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.sexArr) {
            for (let i = 0; i < this.sexArr.length; i++) {
              //性别
              this.sexArr[i].selectFlag = "0";
              let arr = this.playerForm.sex.some(item => {
                return item === this.sexArr[i].name;
              });
              if (arr) {
                this.sexArr[i].selectFlag = "1";
              }
            }
          }

          if (this.documentType) {
            for (let i = 0; i < this.documentType.length; i++) {
              //证件类型
              this.documentType[i].selectFlag = "0";
              let arr = this.playerForm.card.some(item => {
                return item === this.documentType[i].name;
              });
              if (arr) {
                this.documentType[i].selectFlag = "1";
              }
            }
          }
          if (this.nationality) {
            for (let i = 0; i < this.nationality.length; i++) {
              //国籍
              this.nationality[i].selectFlag = "0";
              let arr = this.playerForm.national.some(item => {
                return item === this.nationality[i].name;
              });
              if (arr) {
                this.nationality[i].selectFlag = "1";
              }
            }
          }
          if (this.educationType) {
            for (let i = 0; i < this.educationType.length; i++) {
              //学历
              this.educationType[i].selectFlag = "0";
              let arr = this.playerForm.education.some(item => {
                return item === this.educationType[i].name;
              });
              if (arr) {
                this.educationType[i].selectFlag = "1";
              }
            }
          }
          if (this.schoolSystem) {
            for (let i = 0; i < this.schoolSystem.length; i++) {
              // 学制
              this.schoolSystem[i].selectFlag = "0";
              let arr = this.playerForm.educational.some(item => {
                return item === this.schoolSystem[i].name;
              });
              if (arr) {
                this.schoolSystem[i].selectFlag = "1";
              }
            }
          }
          if (this.graduateArr) {
            for (let i = 0; i < this.graduateArr.length; i++) {
              // 身份
              this.graduateArr[i].selectFlag = "0";
              let arr = this.playerForm.graduateFlag.some(item => {
                return item === this.graduateArr[i].name;
              });
              if (arr) {
                this.graduateArr[i].selectFlag = "1";
              }
            }
          }
          this.result.forEach(item => {
            if (item.fieldName === "graduateFlag") {
              item.optionArray = this.graduateArr;
            } else if (item.fieldName === "graduateTime") {
              item.optionArray = this.playerForm.graduationData;
              item.optionJa = this.playerForm.graduationData;
            } else if (item.fieldName === "birthday") {
              item.optionArray = this.playerForm.birthData;
              item.optionJa = this.playerForm.birthData;
            } else if (item.fieldName === "nationality") {
              item.optionArray = this.nationality;
            } else if (item.fieldName === "memberCertificateType") {
              item.optionArray = this.documentType;
            } else if (item.fieldName === "memberEducation") {
              item.optionArray = this.educationType;
              item.optionJa = this.educationType;
            } else if (item.fieldName === "memberSex") {
              item.optionArray = this.sexArr;
            } else if (item.fieldName === "memberEducationLength") {
              item.optionArray = this.schoolSystem;
            }
          });
          this.saveTeamMemberFields();
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  },
  created() {}
};
</script>
