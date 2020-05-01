<template>
  <div class="container" :style="{ opacity: this.$props.visible ? 1.0 : 0.0 }">
    <Graphic class="logo" ref="logo" />
  </div>
</template>

<script>
import Graphic from '~/assets/logo.svg'
import { colors } from '~/design.system'

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
  position: fixed;
  top: 2rem;
  left: 2rem;
  mix-blend-mode: difference;
  color: var(--white);

  transition: all ease 0.3s;

  pointer-events: none;
}
div.flex {
  display: flex;
  align-items: center;
}
.logo {
  height: 6rem;
}
.logo path {
  fill: var(--blue);
}
h1 {
  font-weight: inherit;
  font-size: inherit;
}
</style>
