<template>
  <div class="layout-box">
    <el-row class="content" >
      <el-col :span="4">
        <div class="control-box">
          <h6 class="tit">基本组件</h6>
          <draggable tag="div"
                     class="draglabel-box"
                     :list="basicComponents"
                     :move="onMoveCallback"
                     :group="{ name: 'base', pull: 'clone', put: false }">
            <el-button class="com-btn"
                       style="margin:0;margin-top:10px;"
                       v-for="(item,i) in basicComponents"
                       :key="i"> {{item.name}}</el-button>
          </draggable>
          <h6 class="tit">布局组件</h6>
          <draggable tag="div"
                     :list="layoutComponents"
                     :move="onMoveCallback"
                     :group="{ name: 'layout', pull: 'clone', put: false }">
            <el-button class="com-btn"
                       :class="item.type==='Layout'?'data-grid':''"
                       v-for="(item,i) in layoutComponents"
                       :key="i"> {{item.name}}</el-button>
          </draggable>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="control-pannal">
          <draggable :list="list"
                     @add="addCallBack"
                     @change="changeCallBack"
                     @end="endCallBack"
                     :move="pannalMove"
                     :sort="true"
                     style="height:100%"
                     :group="{ name: 'pannal', pull: true, put: ['base','layout','col'], scroll:true }">
            <component 
                       v-for="element in list" :key="element.id"
                       :is="element.type"
                       @active="getCurrent"
                       :item="element"
                       :isLayout="isLayout"></component>
          </draggable>
        </div>
      </el-col>
      <el-col :span="4"
              v-show="isGrid">
        <div class="setRowCol">
          <el-form ref="form"
                   :inline="false">
            <el-form-item label="栅格间隔"
                          size="mini">
              <el-input-number v-model.number="num"
                               @change="changeGutter"></el-input-number>
            </el-form-item>
            <el-form-item label="上下间距"
                          size="mini">
              <el-input-number v-model.number="padding"
                               @change="changePadding"></el-input-number>
            </el-form-item>
            <hr />
            <el-form-item v-for="(col,index) in columns"
                          :key="index"
                          label="栅格值"
                          size="mini">
              <el-input-number v-model="col.span"></el-input-number>
              <el-button @click="removeCol(index)"
                         circle
                         plain
                         type="danger"
                         size="mini"
                         icon="el-icon-minus"
                         style="padding: 4px;margin-left: 5px;"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="text"
                         @click="addCol">添加列</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <draggable :list="garbageList"
               :group="{ name: 'garbage', pull: true, put: ['pannal','col'] }"
               tag="div"
               class="garbage-box">
      <div class="dustbin">
        <i class="el-icon-delete"></i>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { basicComponents, layoutComponents } from './componentsConfig.js'

export default {
  data () {
    return {
      basicComponents,
      layoutComponents,
      list: [],
      num: 0,
      padding: 0,
      index: 0,
      isGrid: false,//是否显示布局组件的属性控制面板
      isLayout: false,//记录拖拽的组件是不是布局组件如果是为true
      garbageList: []
    }
  },
  computed: {
    columns () {

      if (this.list.length && this.list[this.index].columns) {
        return this.list[this.index].columns
      }
      else {
        return []
      }

    }
  },
  watch: {
    list () {
      this.listChange();
    }
  },
  components: {
    draggable
  },
  methods: {
    pannalMove (evt) {
      const draggedContext = evt.draggedContext
      if (draggedContext.element.type === 'Layout') {
        this.isLayout = true
      }
    },
    listChange () {
      //列表被改变时候触发

      let isLayout = this.list.some(item => {
        return item.type === 'Layout'
      })
      if (isLayout) {
        let firstLayoutItem = this.list.find(item => item.type === 'Layout')
        this.getCurrent(firstLayoutItem);

      }
      else {
        this.isGrid = false
      }

    },
    endCallBack (evt) {
      //console.log(evt,this.garbageList)
    },

    removeCol (index) {
      //删除列
      this.list[this.index].columns.splice(index, 1);
      if (!this.list[this.index].columns.length) {
        this.list.splice(this.index, 1)
      }
    },
    addCol () {
      //添加列
      this.list[this.index].columns.push({
        span: 0,
        list: []
      })
    },
    changeCallBack (evt) {
      //在布局设置工作台里进行位置交换时候如果是布局组件，让当前的组件变为选中状态
      if (evt.moved) {
        this.getCurrent(evt.moved.element)
      }

    },
    changeGutter (value) {
      //改变布局组件间隙gutter时候
      this.list[this.index].options.gutter = value

    },
    changePadding (value) {
      this.list[this.index].options.padding = value
    },
    getCurrent (item) {
      //记录当前布局组件在list中对应的索引,显示对应的属性设置面板
      if (item.type !== 'Layout') return//不是布局组件就不执行
      //如果选择了布局组件记录在list中的索引
      this.index = this.list.findIndex(component => component.id === item.id)
      this.isGrid = true;
      //  /** */
      let index = this.index;
      (this.list[index].type === 'Layout') && this.initSetGridOption(index);
      this.list.forEach(item => item.active = false);
      this.list[index].active = true

    },
    initSetGridOption (index) {//初始化布局设置面板
      this.num = this.list[index].options.gutter
      this.padding = this.list[index].options.padding
    },
    addCallBack (evt) {//list列表增加时候触发的回调
      this.list.forEach(item => item.active = false)//先清除所有组件的active状态
      if (this.isLayout) {
        //如果是布局组件获取布局组件在list中的索引，进行深拷贝，添加id,重新构建list
        this.index = evt.newIndex//代表在list中的索引
        let obj = JSON.parse(JSON.stringify(this.list[evt.newIndex]));
        obj.id = +new Date();//添加id
        obj.active = true
        this.$set(this.list, evt.newIndex, obj);
        this.isGrid = true;
        /** */
        this.initSetGridOption(evt.newIndex)
      }
      else {
        this.isGrid = false;
        this.$set(this.list, evt.newIndex, {
          ...this.list[evt.newIndex],
          id: +new Date()
        })
      }


    },
    clearAcive () {
      this.list.forEach(item => item.active = false);
    },
    clearDashed () {
      this.list.forEach(item => {
        if (item.type === 'Layout') {
          item.isDashed = false
        }
      });
    },
    getData () {
      this.clearAcive();
      this.clearDashed();
      let resList = this.list.slice();
      this.clearData();
      return resList
    },
    clearData () {
      this.list = []

    },
    onMoveCallback (evt) {
      //拖拽Move时候的回调函数，获取到被拖拽对象的上下文和目标区域的上下文
      //具体参看vuedraggable组件使用说明https://github.com/SortableJS/Vue.Draggable
      const draggedContext = evt.draggedContext;
      //const relatedContext = evt.relatedContext;

      this.isLayout = draggedContext.element.type === 'Layout' ? true : false//记录当前拖拽的是否是布局组件

    }
  },
  created () {

  }
}
</script>
<style scoped>
.tit{
  margin:10px;
}
.layout-box {
  position: relative;
}
.garbage-box {
  position: relative;
}
.dustbin {
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  left: 0;
  top: 0px;
  font-size: 50px;
  color: #409eff;
  line-height: 100px;
  text-align: center;
  z-index: 10;
}
.content {
  height: 300px;
}
/* .control-box {
} */
.control-pannal {
  height: 400px;
  border: 1px dashed #333;
  overflow-y: scroll;
  
}
.comp {
  text-align: center;
  background: gray;
}
.draglabel-box {
  margin: 0;
  padding: 0;
  width: 200px;
  height: 150px;
  overflow-y: scroll;
  overflow-x:hidden;
  
}
.draglabel-box li {
  height: 30px;
  list-style: none;
}
</style>