<template>
  <Container id="experiments">
    <ul>
      <li v-for="(item, index) in links" :key="index">
        <div class="max-width">
          <div class="number">{{ item.position }}</div>
          <h2>{{ item.text }}</h2>
          <div v-if="item.html" v-html="item.html" />
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
import Container from '../components/Container.vue'

export default {
  name: 'Experiments',
  data() {
    return {
      links: [
        { text: 'p5 Drawing Tool', path: '01_p5-drawing-tool' },
        { text: 'Drone Choreography', path: '02_drone-choreo' },
        {
          text: 'ICLC 2020',
          path: '03_iclc',
          html: `<p>At the <u>International Conference for Live Coding</u>, I performed an audio-visual set with Maxwell Neely-Cohen using Hydra, a tool created by Olivia Jack.</p><div class="videoWrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/WGnSrWaBL4E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
        }
      ]
        .map((e, i) => {
          return { ...e, position: i + 1 }
        })
        .reverse()
    }
  },
  components: {
    Container
  }
}
</script>

<style scoped>
li {
  list-style: none;
  position: relative;
  padding: 0.5rem 3rem 3rem 3rem;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #333;
  text-align: left;
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
  padding: 0.5rem 0.6rem;
}

h2 {
  font-size: inherit;
  padding-bottom: 2rem;
}
</style>
