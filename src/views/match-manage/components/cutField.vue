<template>
  <div class="cut-field">
    <!-- 删除字段 -->
    <Modal v-model="showValue" title="删除字段" class="cut-field" :width="600">
      <Table border :data="data" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <span class="text" @click="del(row.id)">删除</span>
        </template>
      </Table>
    </Modal>
  </div>
</template>

<script>
  import api from '@/api/fetch-api';
  export default {
  	name: "cut-field",
    props: {
      value: Boolean,
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    watch: {
      value (val) {
        this.showValue = val
      },
      showValue (val) {
        this.$emit('update:value', val);
      }
    },
  	data(){
  		return {
  			showValue: false,
        tableData: [],
        columns: [
          { type: 'index', title: '序号', width: 80 },
          { key: 'fieldLabel', title: '字段名', align: 'center', },
          { slot: 'action', width: 120, title: '操作', align: 'center', },
        ],
  		}
  	},

  	created(){
  	},
    computed: {
    },
  	methods: {
      del(id){
        this.$Modal.warning({
          title: '警告',
          content: '确定删除此字段吗？',
          onOk: _ =>{
            api(this, '/matchManage/delField', {
              id
            }, res => {
              if (res.code == 0) {
                this.$Message.success('删除成功');
                this.$root.app.$emit('updateFieldInfo')
              } else {
                this.$Message.error(res.message);
              }
            }, res => {
              this.$Message.error(res.message);
            });
          }
        });
      }
  	}
  }
</script>
<style lang="less" scoped>
  @import './cutField.less';
</style>
