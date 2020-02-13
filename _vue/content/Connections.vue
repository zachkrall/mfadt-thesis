<template>
  <Container id="connections">
    <h1>Connections</h1>
    <div class="grid">
      <a
        class="card"
        v-for="(item, index) in items"
        :key="index"
        :href="item.link"
      >
        <div class="image">
          <img :src="item.image" />
        </div>
        {{ item.caption }}
      </a>
    </div>
  </Container>
</template>

<script>
import Container from "../components/Container.vue";

export default {
  name: "Connections",
  data() {
    return {
      items: [
        {
          image: "/media/joan-jonas.jpg",
          caption: "Joan Jonas, Reanimation",
          link: ""
        },
        {
          image: "media/Krzysztof-Wodiczko-Polacy-we-Wloszech.png",
          caption: "Krzysztof Wodiczko, Polacy we Wloszech",
          link: ""
        },
        {
          image: "media/Parke-Face-Paint.png",
          caption: "Fred Parke, Computer Generated Animation of Faces (1972)",
          link:
            "https://rhizome.org/editorial/2014/jan/20/fred-parke-and-miley-cyrus/"
        },
        {
          image: "media/haar-features.png",
          caption: "Haar-like Features",
          link:
            "https://medium.com/@datitran/face-detection-on-cloud-foundry-37887631096a"
        }
      ]
    };
  },
  components: {
    Container
  }
};
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
