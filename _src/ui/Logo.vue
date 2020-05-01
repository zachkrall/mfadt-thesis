<template>
  <div class="container">
    <div class="flex" :style="{ fontSize: this.$props.scale + 'rem' }">
      <Graphic class="logo" ref="logo" />
      <h1>Phase Mask</h1>
    </div>
  </div>
</template>

<script>
import Graphic from '~/assets/logo.svg'
import { colors } from '~/design.system'

export default {
  name: 'Logo',
  props: {
    scale: {
      type: Number,
      required: true
    }
  },
  components: {
    Graphic
  },
  methods: {
    setColor() {
      let logo = this.$refs.logo.querySelector('path')
      let color = colors[parseInt(Math.random() * colors.length)]
      logo.style.fill = color
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
