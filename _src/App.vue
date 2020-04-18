<template>
  <div id="app" ref="app">
    <div
      style="position:absolute;display:inline-block;
      top:1rem;left:50%;transform:rotate(5deg) translate(-25%,100px); transform-origin: 50% 50%;text-stroke:thin red;color:transparent;font-size: 3rem;font-weight:bold;font-family:'Arial'"
    >
      WORK IN PROGRESS
    </div>
    <div class="grid">
      <TopBar />

      <Header />

      <div class="pa g-full">
        <ol class="list-inline">
          <li>About</li>
          <li>Process</li>
          <li>Connections</li>
        </ol>
      </div>

      <a
        href="https://github.com/zachkrall/phase-mask/"
        class="near-white g-half g-full-mobile h50vw h100vw-mobile"
        style="max-height:500px!important;position:relative;background-color:#1d1d1d;color:#f5f5f5;"
      >
        <div style="position:absolute;bottom:2rem;left:2rem;">
          GitHub &rarr;
        </div>
      </a>
      <a
        href="javascript:alert('coming soon')"
        class="near-white g-half g-full-mobile h50vw h100vw-mobile"
        style="max-height:500px!important;position:relative;background-color:#929292;color:#f5f5f5;"
      >
        <div style="position:absolute;bottom:2rem;left:2rem;">
          View Performance &rarr;
        </div>
      </a>

      <Header3D />

      <div class="pa g-full">
        <h2>About</h2>
        <About />
      </div>

      <div class="pa g-full">
        <h2>Process</h2>
      </div>

      <div class="pa g-full" style="padding-bottom:0;">
        <h2>Connections</h2>
      </div>

      <a
        class="card db pa g-quarter g-half-mobile"
        v-for="({ link, image, caption }, index) in connections"
        :key="index"
        :href="link"
      >
        <div class="image sq">
          <img :src="image" />
        </div>
        {{ caption }}
      </a>

      <!-- END OF GRID -->
    </div>

    <footer class="pa" style="background:white;font-size:0.8em">
      <div class="grid">
        <div class="pb g-full">
          <MFADTLogo width="20rem" style="margin-bottom:1em;" />
          <p class="measure">
            Submitted in partial fulfillment of the requirements for the degree
            of Master of Fine Arts in Design and Technology from Parsons School
            of Design at The New School
          </p>
          <p class="measure">Thesis Advisors: John Roach, Barbara Morris</p>
          <p class="measure">
            Thank you to: Maxwell Neely-Cohen, Sarah Groff Hennigh-Palermo, Kate
            Sicchio, Ramsey Nasser, Jessica Garson, Todd Anderson, Char Stiles
          </p>
          <p class="measure">
            This page uses:
            <a
              class="link"
              href="https://pangrampangram.com/products/neue-montreal?variant=8853413593130"
              >Neue Montreal</a
            >
            and <a class="link" href="https://www.ibm.com/plex/">IBM Plex</a>
          </p>
        </div>
        <div class="g-full">
          &copy; {{ new Date().getFullYear() }} Zachary Krall. All Rights
          Reserved.
        </div>
      </div>
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
import Data from '~/assets/data.json'

import Header from '~/sections/Header.vue'
import Header3D from '~/sections/Header3D.vue'

import About from '~/sections/About.vue'
import Connections from '~/sections/Connections.vue'

import TopBar from '~/ui/TopBar.vue'
import SmallLogo from '~/ui/SmallLogo.vue'

import MFADTLogo from '~/assets/mfadt.svg'

export default {
  name: 'app',
  components: {
    About,
    Header,
    MFADTLogo,
    TopBar,
    Header3D,
    Connections,
    SmallLogo
  },
  data() {
    return {
      connections: Data['Connections'],
      scrollY: 0
    }
  },
  mounted() {
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
  line-height: 1;
  padding-bottom: 0.7em;
}

a.link {
  color: #666666;
  text-decoration: none;
  border-bottom: 1px solid #cccccc;
}
a.link:hover {
  color: #1d1d1d;
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

a.card {
  text-align: center;
  font-size: 0.8em;
  color: inherit;
  text-decoration: none;
  font-family: 'Neue Montreal Medium', sans-serif;
  color: #929292;
}
.image.sq {
  position: relative;
  height: 0;
  padding-bottom: 100%;
  /* border: 1px solid black; */
}
.image.sq img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
