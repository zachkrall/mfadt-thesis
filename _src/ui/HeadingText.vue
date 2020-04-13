<template>
  <div class="container">
    <div class="flex" :style="{ fontSize: this.$props.scale + 'rem' }">
      <span class="logo"></span>
      <h1>{{ this.$props.text }}</h1>
    </div>
  </div>
</template>

<script>
import Graphic from '~/assets/logo.svg'
export default {
  name: 'Logo',
  props: {
    scale: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  components: {
    Graphic
  },
  methods: {
    setColor() {
      let logo = this.$refs.logo.querySelector('path')
      let color = `${Math.random() * 255}, ${Math.random() *
        255}, ${Math.random() * 255} `
      logo.style.fill = `rgba(${color}, 1.0)`
    }
  },
  mounted() {
    this.setColor()
    setInterval(() => {
      this.setColor()
    }, 2000)
  }
}
</script>

<style scoped>
div.container {
  display: inline-block;
}
div.flex {
  display: flex;
  align-items: center;
}
.logo {
  height: 1.5em;
  margin-right: 0.4em;
}
.logo path {
  fill: var(--blue);
}
h1 {
  font-weight: inherit;
  font-size: inherit;
}
</style>
