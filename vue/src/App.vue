<template>
  <div id="app">
    <!-- https://win98icons.alexmeub.com/ -->
    <NavBar />
    <div
      style="margin-top:2rem;position:absolute;right:0;text-align:center;padding:1rem;"
    >
      <img src="./assets/computer.png" />
      <br />MY COMPUTER <br /><br /><img src="./assets/note.png" />
      <br />COMPUTATIONAL<br />
      ART TIMELINE <br /><br /><img src="./assets/note.png" /> <br />ARPANET
      SITES <BR /><BR /><img src="./assets/note.png" /> <br />OPAQUE TOOLS<BR /><BR /><img
        src="./assets/note.png"
      />
      <br />ELEMENTS OF <br />GENERATIVE<br />ART MAKING
    </div>

    <div
      style="position:absolute;top:4rem;left:4rem;height:200px;overflow:auto;width:400px;background-color:#fff;
      border-top:10px solid #222;padding:1rem;box-sizing:border-box;"
    >
      Random question:
      <br />__What would the internet look like today if everyone maintained
      their own personal websites? <br /><br />__passive browsing vs. active
      participation in the internet<br /><br />__would people invent their own
      solutions to sharing information<br /><br /><br /><br />
    </div>

    <div
      style="position:absolute;top:400px;left:250px;height:200px;overflow:auto;width:400px;background-color:#fff;
      border-top:10px solid #222;padding:1rem;box-sizing:border-box;"
    >
      OPAQUE TOOLS:
      <ul>
        Hardware:
        <li>M5 Anti-aircraft gun director</li>
        <li>DRONES</li>
        <li>STINGRAYS</li>
        <br />Software:
        <li>NEURAL NETWORKS (FACIAL RECOGNITION, PREDICTIVE POLICING)</li>
        <LI>ADVERTISING</LI>
      </ul>
    </div>

    <iframe
      style="position:absolute;bottom:10px;left:5px;"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/s1i-dnAH9Y4"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap");
body {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 100;
  background: #999;
}
</style>
