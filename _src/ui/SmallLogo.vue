<template>
  <div class="container" :style="{ opacity: this.$props.visible ? 1.0 : 0.0 }">
    <div class="flex">
      <Graphic class="logo" ref="logo" />
      <h1>Phase Mask</h1>
    </div>
  </div>
</template>

<script>
import Graphic from '~/assets/logo.svg'
export default {
  name: 'SmallLogo',
  props: {
    visible: {
      type: Boolean,
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
  position: fixed;
  top: 2rem;
  left: 2rem;
  mix-blend-mode: difference;
  color: var(--white);

  transition: all ease 0.3s;
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
