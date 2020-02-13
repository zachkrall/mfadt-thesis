<template>
  <div class="content__container" :id="'content__' + $props.id">
    <slot />
    <div style="height:200px">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {
    id: String
  }
};
</script>

<style scoped>
/* CSS for all sections */
div.content__container {
  display: inline-block;
  height: 100vh;
  padding-bottom: 10vh;
  overflow: auto;

  border-right: 1px solid white;
  width: 80vw;

  padding: 2rem 3rem;
  white-space: normal;
}
@media screen and (max-width: 700px) {
  div.content__container {
    width: 100vw;
  }
}
div.content__container h1 {
  font-size: 1.2rem;
  font-weight: normal;
  padding-bottom: 2rem;
}
</style>
