<template>
    <div class="box" :class="css" v-if="msg">
        <span>{{ msg }}</span>
        <span class="clickable close" @click="msg = ''">X</span>
    </div>
</template>
<script>
export default {
    props: ['msg', 'css']
}
</script>
<style lang="scss" scoped>
.box {
  align-items: center;
  border: 1.5px solid;
  border-radius: .4rem;
  display:flex;
  justify-content: center;
  max-width: 100%;
  min-height: 30px;
  min-width: 220px;
  padding: 2px 10px;
  position: relative;
  text-align: center;
  margin: 10px 0
}
.close {
  cursor: pointer;
  font-size: 13px;
  position: absolute;
  top: 1px;
  right: 2px;
}
</style>
