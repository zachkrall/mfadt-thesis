<template>
  <div class="scroller">
    <div class="scroll">
      <div class="inner" v-html="dtext"></div>
      <div class="inner" v-html="dtext"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroller',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dtext: ''
    }
  },
  mounted() {
    this.dtext = this.duplicateText(this.$props.text)
  },
  watch: {
    text: (a, b) => {
      this.dtext = duplicateText(a)
    }
  },
  methods: {
    duplicateText(str) {
      return str
        .replace(/ • /g, '&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;')
        .repeat(10)
    }
  }
}
</script>

<style scoped>
div.scroller {
  font-size: 0.6em;
  position: fixed;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  color: var(--black);
  background: var(--white);
  overflow-x: hidden;
  white-space: nowrap;

  mix-blend-mode: difference;
}
div.scroller div.inner {
  padding: 0.5em;
  display: inline-block;
}
div.scroll {
  position: relative;
  top: 0;
  left: 0;
  animation: scroller linear 120s infinite;
}
@keyframes scroller {
  from {
    left: 0;
  }
  to {
    left: -50%;
  }
}
</style>
