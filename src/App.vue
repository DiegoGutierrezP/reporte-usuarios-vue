<template>
  <Reportes/>
</template>

<script>
import Reportes from './pages/Reportes.vue';

export default {
  name: 'App',
  components: {
    Reportes
  }
}
</script>

<style>
body{
  scroll-behavior: smooth;
  background: linear-gradient(186deg, rgba(2,0,36,1) 0%, rgba(7,165,255,1) 0%, rgba(0,98,153,1) 100%);
}
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  padding-top: 1.5rem;
  padding-bottom: 10rem;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


</style>
