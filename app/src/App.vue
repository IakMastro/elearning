<template>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <div v-if="alert.message" :class="`alert ${alert.type}`">{{ alert.message }}</div>
  <router-view/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'app',
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
