<template>
  <div id="app" ref="app">
    <div class="grid">
      <div
        class="g-full tc"
        style="font-size:0.8em; letter-spacing:1.5pt;background:var(--near-black);color:var(--white)"
      >
        UNDER CONSTRUCTION
      </div>

      <div class="pa mb g-full flex v-center h-space">
        <Logo :scale="1.8" />
        <h2>Zach Krall</h2>
      </div>

      <div class="g-half mb">
        <Header3D />
      </div>

      <div class="mb pa g-half flex v-center h-center">
        <div>
          <h2 style="padding-bottom:0.3em;">
            A Live-Coding Environment for Creating Visual Art from Facial
            Meshes.
          </h2>
          <a href="javascript:alert('coming soon')" class="pill"
            >Download PDF</a
          >
        </div>
      </div>

      <div class="pa g-full tc">
        <ol class="list-inline">
          <li>About</li>
          <li>Process</li>
          <li>Connections</li>
        </ol>
      </div>

      <div class="pa g-full">
        <h3>About</h3>
      </div>

      <div class="pa g-full">
        <h3>Process</h3>
      </div>

      <div class="pa g-full">
        <h3>Conections</h3>
        <Connections :connections="connections" />
      </div>
    </div>
    <!-- END OF GRID -->

    <footer class="pa pb2">
      &copy; {{ new Date().getFullYear() }} Zachary Krall. All Rights Reserved.
    </footer>

    <SmallLogo :visible="scrollY > 100" />

    <!-- <Scroller
      :text="
        'MFA Design + Technology • Parsons School of Design • 2020 • Thesis • '
      "
    /> -->
  </div>
</template>

<script>
import Logo from '~/ui/Logo.vue'
import SmallLogo from '~/ui/SmallLogo.vue'
import HeadingText from '~/ui/HeadingText.vue'
import Scroller from '~/ui/Scroller.vue'

import Header3D from '~/components/Header3D.vue'

import Connections from '~/content/Connections.vue'

export default {
  name: 'app',
  components: { SmallLogo, HeadingText, Logo, Connections, Scroller, Header3D },
  data() {
    return {
      connections: [],
      scrollY: 0
    }
  },
  mounted() {
    fetch('./_static/data.json')
      .then(res => res.json())
      .then(json => {
        this.connections = json['Connections']
      })

    let app = this.$refs.app

    app.addEventListener('scroll', () => {
      this.scrollY = app.scrollTop
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Neue Montreal', sans-serif;
  /* background: #161616; */
  color: var(--near-black);

  font-size: 120%;
  line-height: 1.2;
  letter-spacing: 0.5pt;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Neue Montreal Medium', sans-serif;
  font-weight: normal;
}

p {
  padding-bottom: 2rem;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background: var(--near-white);
}

a.pill {
  font-family: 'Neue Montreal Medium', sans-serif;
  color: var(--near-black);
  text-decoration: none;
  font-size: 0.9rem;
  background: var(--near-white);
  border: 1px solid var(--near-black);
  border-radius: 1em;
  padding: 0 0.4em;

  transition: all ease 0.3s;
}
a.pill:hover {
  background: var(--near-black);
  color: var(--near-white);
  cursor: pointer;
}
</style>
