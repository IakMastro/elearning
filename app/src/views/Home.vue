<template>
  <courses />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Courses from "@/components/Courses.vue"

export default {
  components: {
    Courses
  },
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