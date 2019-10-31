<template>
    <div>
        <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </div>
</template>
<script>
export default {
    name:'DataPicker',
    data(){
        return {
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        }
    }
}
</script>