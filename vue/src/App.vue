<template>
  <div id="app">
    <div id="horizontal" ref="scroll">
      <About />
      <Experiments />
      <Research />
      <Writing />
    </div>
    <NavBar :sections="sections" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import About from "./content/About.vue";
import Research from "./content/Research.vue";
import Experiments from "./content/Experiments.vue";
import Writing from "./content/Writing.vue";

export default {
  name: "app",
  components: {
    NavBar,
    About,
    Research,
    Experiments,
    Writing
  },
  data() {
    return {
      sections: ["About", "Experiments", "Research", "Writing"]
    };
  }
};
</script>

<style>
@font-face {
  font-family: "IBM Plex Mono";
  src: url("./assets/IBMPlexMono-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "Neue Montreal";
  src: url("./assets/NeueMontreal-Regular.otf") format("opentype");
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Times New Roman", sans-serif;
  background: #000;
  color: #fff;

  font-size: 120%;
  line-height: 1.2;
  letter-spacing: 0.5pt;
}

::selection {
  background: #00f;
  color: #fff;
}

a,
button,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Neue Montreal";
}

#horizontal {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;

  white-space: nowrap;
}
</style>
