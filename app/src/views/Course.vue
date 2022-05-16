<template>
  <div>
    <b-card style="padding: 5rem;">
      <h3>{{ this.course.name }}</h3>
      <h5>Inducted by {{ this.course.tutor }}</h5>
      <h5>Category: {{ this.course.category }} - {{ this.course.subcategory }}</h5>
      <p>{{ this.course.description }}</p>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  created() {
    this.getById(this.$route.params.id)
  },
  computed: {
    ...mapState('course', ['course'])
  },
  methods: {
    ...mapActions('course', ['getById'])
  }
}
</script>