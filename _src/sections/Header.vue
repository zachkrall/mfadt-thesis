<template>
  <div class="pa g-full measure">
    <Logo width="3em" />
    <h1>
      <span>Phase Mask</span> is a live-coding environment for making visual art
      with face tracking geometries
    </h1>
  </div>
</template>

<script>
import Logo from '~/assets/logo.svg'

export default {
  name: 'Header',
  components: {
    Logo
  }
}
</script>

<style scoped>
h1 {
  color: #929292;
  padding: 0;
  margin: 0;
}
h1 span {
  color: #1d1d1d;
}
</style>
