<script setup>
import { RouterLink, RouterView } from 'vue-router'

function verifygithub() {
  const url = 'https://cors-anywhere.herokuapp.com/corsdemo'
  window.open(url, '_blank')
}
</script>

<template>
  <header>
    <nav class="navbar navbar-dark bg-dark ml-auto">
      <div class="container-fluid">
        <a class="navbar-brand">
          <RouterLink to="/">OSINT</RouterLink>　
          <RouterLink to="/Blockchain">Blockchain</RouterLink>
        </a>
        <button type="button" @click="verifygithub()" class="btn btn-light">verify</button>
      </div>
    </nav>
  </header>
  <!-- <div class="container"> -->
  <RouterView />
  <!-- </div> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  padding-bottom: 20px;
  /* max-height: 100vh; */
}
a {
  color: #ffffff;
}
.container-fluid {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  } */

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */

  /* nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
}
</style>
