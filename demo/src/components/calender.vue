<template>
    <div>
        <el-calendar v-model="value"></el-calendar>
    </div>
</template>
<script>
  export default {
      name:'Calender',
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>