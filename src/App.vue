<template>
  <div id="app">
    <FormMain />
  </div>
</template>

<script>
import FormMain from './components/FormMain.vue'

export default {
  name: 'App',
  components: {
    FormMain
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,200&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f7fb;
}

#app {
  font-family: 'Poppins', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
