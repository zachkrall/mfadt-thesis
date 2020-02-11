<template>
  <Container id="experiments">
    <h1>Experiments</h1>
    <ul>
      <li v-for="(item, index) in links" :key="index">
        <div class="number">{{ item.position }}</div>
        {{ item.text }}
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from "../components/Container.vue";

export default {
  name: "Experiments",
  data() {
    return {
      links: [
        { text: "p5 drawing tool", path: "01_p5-drawing-tool" },
        { text: "drone choreography", path: "02_drone-choreo" },
        { text: "iclc 2020", path: "03_iclc" }
      ]
        .map((e, i) => {
          return { ...e, position: i + 1 };
        })
        .reverse()
    };
  },
  components: {
    Container
  }
};
</script>

<style scoped>
li {
  list-style: none;
  position: relative;
  padding: 2rem 2rem 2rem 4rem;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #333;
  text-align: center;
}
li:last-child {
  border-bottom: 1px solid #333;
}
li div.number {
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: #333;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.3rem 0.6rem;
}
</style>
