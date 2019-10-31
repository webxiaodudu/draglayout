<template>
  <div>
    <template v-if="item.type == 'Layout'">
      <el-row :class="{dashed:item.isDashed,borderBlue:item.active}"
              :style="`padding:${item.options.padding}px 5px;box-sizing:border-box;`"
              type="flex"
              data-type="Layout-grid"
              :gutter="item.options.gutter ? item.options.gutter : 0"
              :justify="item.options.justify"
              :align="item.options.align"
              @click.native="selectCom(item)">
        <el-col style="box-sizing:border-box;"
                v-for="(col, colIndex) in item.columns"
                :key="colIndex"
                :span="col.span ? col.span : 0">
          <draggable v-model="col.list"
                     :no-transition-on-drag="true"
                     tag="div"
                     class="col-box"
                     :class="{dashed:item.isDashed}"
                     style="min-height:50px;"
                     :group="{ name: 'col', pull: true, put: colPutFn }">
            <component v-for="item2 in col.list"
                       :key="item2.id" 
                       :is="item2.type">
            </component>
          </draggable>
        </el-col>
        <div class="drag"
             v-if="item.active">
          <i class="el-icon-rank"></i>
        </div>
      </el-row>
    </template>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'Layout',
  props: ['item', 'isDashed', 'isLayout'],
  data () {
    return {

    }
  },
  components: {
    draggable
  },
  methods: {

    colPutFn (to, from) {
      //在drop时候检测来自那个容器，如果是pannal容器在检测是不是grid组件如果是不能嵌套
      //console.log(from.options.group.name)
      // console.log(arguments)
      //console.log(this.isLayout,'isLayout')
      let groupName = from.options.group.name
      if (groupName === 'layout') {
        return false
      }
      if (groupName === 'pannal') {
        //如果是pannal容器里往grid里拖拽，当前如果是grid组件就不让拖进去，如果不是就可以拖入
        return !this.isLayout
      }

      return true
    },
    selectCom (item) {
      this.$emit('active', item)
    }


  },
  created () {

  }
}
</script>
<style scoped>
.dashed {
  border: 1px dashed #ccc;

  position: relative;
}
.borderBlue {
  border: 2px solid #409eff;
}
.drag {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 20px;
}
</style>