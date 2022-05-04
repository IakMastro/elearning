<template>
  <h5>logged in</h5>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('account', ['user'])
  },
  methods: {
    ...mapActions('account', ['getData'])
  },
  created() {
    this.getData(localStorage.getItem('user'))
  }
}
</script>