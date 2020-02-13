<template>
  <nav>
    <ul>
      <li v-for="(item, index) in $props.sections" :key="index">
        <button v-on:click="scrollTo(item)">{{ item }}</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    sections: Array
  },
  data() {
    return {
      currentDiv: "about"
    };
  },
  methods: {
    // getTime() {
    //   let now = new Date();
    //   let format = i => i.toString().padStart(2, "0");
    //   return `${format(now.getHours())}:${format(now.getMinutes())}:${format(
    //     now.getSeconds()
    //   )}`;
    // }
    scrollTo(matchID) {
      this.currentDiv = matchID.toLowerCase();
      this.scrollToCurrent();
    },
    scrollToCurrent() {
      // window.console.log(matchID);
      let scroll = this.$parent.$refs.scroll;
      let elm = Array.from(this.$parent.$refs.scroll.children).filter(
        i => i.id === "content__" + this.currentDiv
      );
      let offset = elm[0].offsetLeft;

      scroll.scrollTo({
        top: 0,
        left: offset,
        behavior: "smooth"
      });

      // window.console.log(elm);
    }
  },
  mounted() {
    // this.scrollTo("experiments");
    window.addEventListener("resize", this.scrollToCurrent);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;

  background-color: #161616;
  color: #fff;
  padding: 0.9em 0.5em;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid white;
}
ul {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline-block;
  list-style: none;
  margin: 0 1rem 0 0;
  padding: 0;
}
button {
  font-size: inherit;
  color: inherit;

  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  appearance: none;
}
button:hover {
  color: #00f;
  cursor: pointer;
}
</style>
