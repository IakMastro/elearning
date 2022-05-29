<template>
  <Header />
  <div v-if="alert.message" :class="`alert ${alert.type}`">{{ alert.message }}</div>
  <router-view/>
  <footer>
    <p>Coded with &#10084;&#65039; by IakMastro &copy; 2022</p>
  </footer>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Header from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  modules: {
    ...mapActions('alert', ['clear']),
  },
  watch: {
    $route(to, from) {
      this.clear
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Exo+2');
#app {
  background-color: #F8F8F8 !important;
  font-family: 'Exo 2', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

footer {
  position: relative;
  z-index: 1;
  color: #2c3539;
  background-color: #F8F8F8;
  margin-bottom: 0;

  p {
    text-align: center;
  }
}
</style>
