<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="p-t">
      <ComputedMsg></ComputedMsg>
    </div>
  </div>
</template>

<script>
import ComputedMsg from './ComputedMsg.vue'

export default {
  name: 'HelloWorld',
  components: {
    ComputedMsg
  },
  data () {
    return {
      msg: 'Welcome to my Vue Demo'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.p-t {
  padding-top: 3em;
}
</style>
