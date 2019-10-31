<template>
  <div>
    <el-button circle
               class="settingLayout"
               icon="el-icon-setting"
               @click="open"></el-button>
<!-- <div class="box">
  <component v-for="(item,index) in componentsData"
              :key="index"
              :is="item.type"
              :item="item"></component>  （:item="item"所有出口必须把当前的组件对象传入，在栅格组件渲染时候回判断item.type）
</div> -->
    <el-dialog title="设置布局"
              :append-to-body="true"
                fullscreen
               :visible.sync="dialogVisible"
               width="100%"
               :before-close="cancel">
      <div class="wrap">
        <DiyLayout ref="diyLayout" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import DiyLayout from './components/diyLayout'//布局设置组件

export default {
  data () {
    return {
      dialogVisible: false,
    }
  },

  methods: {
    cancel () {
      //点击弹层取消按钮关闭弹层清空布局设置
      this.dialogVisible = false
      this.$refs.diyLayout.clearData()
    },
    confirm () {
      //点击确定关闭弹层渲染对应组件
      let list = this.$refs.diyLayout.getData();
     // this.componentsData = list;
      this.$emit('getList',list)
      this.dialogVisible = false
    },
    open () {
      
      this.dialogVisible = true
    }
  },
  components: {
    DiyLayout,
  }
}
</script>
<style scoped>
.settingLayout {
  color: #ccc;
  cursor: pointer;
}
</style>
