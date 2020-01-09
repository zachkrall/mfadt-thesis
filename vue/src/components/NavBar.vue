<template>
  <nav>
    <ul>
      <li></li>
      <li>File</li>
      <li>Edit</li>
      <li>View</li>
    </ul>
    <div>
      {{ time }}
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  },
  data () {
    return {
      time: this.getTime()
    }
  },
  methods: {
    getTime(){
      let now = (new Date);
      let format = (i) => i.toString().padStart(2,'0');
      return `${format(now.getHours())}:${format(now.getMinutes())}:${format(now.getSeconds())}`;
    }
  },
  created(){
    setInterval( ()=>this.time = this.getTime(), 100);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav{
  box-sizing:border-box;
  position:fixed;
  top:0;left:0;
  width:100vw;

  line-height:20px;
  background-color:#222;
  color:#fff;
  padding: 0.1em 0.5em;

  display:flex;
  align-items:center;
  justify-content: space-between;
}
ul{
  display:inline-block;
  list-style:none;
  margin:0;padding:0;
}
li{
  display:inline-block;
  list-style:none;
  margin:0 1rem 0 0 ;padding:0;
}
</style>
