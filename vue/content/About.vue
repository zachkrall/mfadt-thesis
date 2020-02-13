<template>
  <Container id="about">
    <div class="max-width">
      <h1>About</h1>
      <p>
        [ insert title here ] is a live-code performance that uses facial
        tracking software to create visuals.
      </p>

      <h1>Acknowledgements</h1>
      Thank you to:
      <ul>
        <li>Maxwell Neely-Cohen</li>
        <li>Sarah Groff Hennigh-Palermo</li>
        <li>Ramsey Nasser</li>
        <li>Kate Sicchio</li>
        <li>Jessica Garson</li>
        <li>Todd Anderson</li>
        <li>Char Stiles</li>
        <li>The Recurse Center</li>
      </ul>
    </div>
  </Container>
</template>

<script>
import Container from "../components/Container.vue";

export default {
  name: "About",
  components: {
    Container
  }
};
</script>

<style></style>
