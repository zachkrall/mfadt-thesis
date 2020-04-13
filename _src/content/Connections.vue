<template>
  <div class="grid">
    <a
      class="card"
      v-for="({ link, image, caption }, index) in this.$props.connections"
      :key="index"
      :href="link"
    >
      <div class="image">
        <img :src="image" />
      </div>
      {{ caption }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Connections',
  props: {
    connections: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
div.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}
.card .image {
  /* border: 1px solid white; */
  margin-bottom: 1rem;
  height: 200px;
  position: relative;
}
.card .image img {
  position: absolute;
  top: 50%;
  left: 50%;
  max-height: 100%;
  max-width: 100%;
  transform: translate(-50%, -50%);
}
.card {
  color: #999;
}
.card:hover {
  color: #00f;
}
</style>
