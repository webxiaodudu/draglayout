<template>
    <div>
      <DiyLayout @getList="getList"/>
      <component v-for="(item,index) in list" :key="index" :is="item.type" :item="item" ></component>
    </div>
</template>
<script>
import DiyLayout from "@/components/diyLayout"
export default {
  data(){
    return {
      list:[]
    }
  },
  methods:{
    getList(res){
      this.list=res;
    }
  },
  components:{
    DiyLayout
  }
}
</script>

