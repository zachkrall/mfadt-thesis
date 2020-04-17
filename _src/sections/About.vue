<template>
  <div>
    <article>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel
        imperdiet lorem. Nam tempus erat urna. Maecenas nec elementum nulla.
        Nulla in massa sodales, laoreet metus interdum, volutpat neque.
        Vestibulum sem augue, dictum pharetra arcu ut, convallis ullamcorper
        erat. Nunc vehicula orci eget metus auctor, id maximus justo
        pellentesque. Nulla nulla mauris, euismod nec euismod pulvinar,
        dignissim et quam. Proin hendrerit tortor ante, vel sodales libero
        blandit sollicitudin. Proin rhoncus vestibulum fermentum. Integer
        consectetur aliquam imperdiet. Vivamus vel mollis lorem, a aliquam
        lacus. Aliquam scelerisque ligula a justo accumsan sodales.<sup>1</sup
        ><span class="citation"><sup>1</sup> Hi, I am a citation</span> Nullam
        non nisl malesuada, molestie nisl quis, posuere felis. Nam enim eros,
        rutrum eleifend nunc et, volutpat porta purus. Nulla magna risus,
        ultricies quis ipsum varius, hendrerit vehicula lectus. Nunc sagittis
        non lorem nec tristique.
      </p>

      <p>
        Praesent faucibus mi ut turpis posuere tincidunt. Etiam a consectetur
        ligula. Etiam at lacus at risus fermentum interdum a eu turpis.
        Pellentesque pellentesque ullamcorper odio vel fermentum.<sup>2</sup
        ><span class="citation"
          ><sup>2</sup> I am always next to where the citation originates</span
        >
        Nulla facilisi. Suspendisse lacus eros, luctus ut ultrices a, commodo
        nec neque. Sed ut tincidunt diam. Nunc semper lacus consectetur purus
        efficitur vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nulla augue ex, venenatis eget massa vel, dictum sodales dolor.
        Vestibulum ullamcorper facilisis mollis. Duis cursus, tellus non auctor
        aliquet, odio enim pulvinar enim, eu iaculis erat tellus vel lectus.
        Suspendisse venenatis, justo sed vulputate semper, felis eros efficitur
        velit, id convallis libero mi sit amet dui. Nulla ut accumsan est, et
        porttitor augue. Pellentesque habitant morbi tristique senectus et netus
        et malesuada fames ac turpis egestas. In elit ipsum, tincidunt id mattis
        ac, dapibus ut nulla.
      </p>

      <p>
        Ut sit amet nulla nec quam fringilla mattis. Praesent posuere magna et
        condimentum blandit. Vivamus congue, diam sit amet tempus congue, velit
        arcu sollicitudin sapien, ac mattis elit lectus ut enim. Etiam ut metus
        sem. Nam consequat sapien bibendum lorem mattis, ac convallis mauris
        dictum. In nec sem felis. Etiam in ligula tortor. Morbi sagittis finibus
        elit, quis aliquet augue laoreet sit amet. Mauris varius accumsan elit
        vel accumsan. Proin commodo fermentum tincidunt. Nam tristique arcu sed
        turpis rutrum, sit amet finibus orci ullamcorper. Fusce placerat sem
        pellentesque, vestibulum justo nec, eleifend felis.
      </p>

      <p>
        Curabitur sit amet felis convallis, laoreet augue ut, aliquet arcu. Ut
        at sem quis nisi finibus laoreet sed id mauris. Sed eu purus id odio
        tristique finibus. Integer nisl purus, cursus quis augue euismod,
        imperdiet dignissim nisi. Maecenas eget congue tortor. Sed in fringilla
        ante. Pellentesque vehicula felis congue, facilisis massa a, porta
        lectus. Ut egestas diam id urna tempus, quis porttitor magna vehicula.
        Nam congue gravida nulla et cursus.<sup>3</sup
        ><span class="citation"
          ><sup>3</sup> This may be a nice solution for academic posts</span
        >
        Nunc vitae sollicitudin enim. Curabitur id enim quis nibh dapibus
        hendrerit eget suscipit orci. Curabitur ut finibus mi, non vehicula
        neque. Praesent sed odio quis dolor convallis finibus. Aenean in libero
        quam. Phasellus iaculis lectus eget est maximus, eu porttitor quam
        tempor. Ut sagittis, ligula eu sollicitudin vehicula, elit justo dapibus
        leo, nec fringilla lacus neque ac turpis.
      </p>

      <p>
        Nullam scelerisque ante sem, id aliquet tellus sollicitudin quis.
        Phasellus aliquam vehicula nibh eu vestibulum. Morbi dapibus rutrum ex
        ac volutpat. Vivamus sodales erat sed maximus consequat. Pellentesque
        sed rhoncus eros, ac scelerisque diam. Vivamus vehicula mollis metus
        tincidunt blandit. Integer congue sapien nec vestibulum efficitur. Nulla
        semper lorem in mi elementum ornare eget sed massa. Nunc iaculis, massa
        vitae tempor interdum, enim nulla sodales est, non posuere nibh dui nec
        nunc. Praesent sit amet lacinia justo.
      </p>
    </article>

    <!-- <ul>
        <li>Maxwell Neely-Cohen</li>
        <li>Sarah Groff Hennigh-Palermo</li>
        <li>Ramsey Nasser</li>
        <li>Kate Sicchio</li>
        <li>Jessica Garson</li>
        <li>Todd Anderson</li>
        <li>Char Stiles</li>
        <li>The Recurse Center</li>
      </ul> -->
  </div>
</template>

<script>
import Container from '../components/Container.vue'

export default {
  name: 'About',
  components: {
    Container
  }
}
</script>

<style scoped>
div {
  padding: 0 150px 0 0;
}

article {
  margin: 0;
  max-width: 50em;
  position: relative;
  font-family: 'IBM Plex Serif', serif;
  line-height: 1.5;
}
article span {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

sup {
  font-family: 'IBM Plex Mono', sans-serif;
  color: red;
  width: 1.2em;
  height: 1.2em;
  line-height: 1em;
  text-align: center;
  padding-top: 0.1em;
  display: inline-block;
  font-size: 0.7em !important;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

span.citation {
  position: absolute;
  left: calc(100% + 25px);
  width: 150px;
  font-size: 0.7em;
}
</style>
