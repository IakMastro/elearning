<template>
  <div>
    <h3>Welcome {{ user.name }} {{ user.surname }}!</h3>
    <b-card style="padding: 5rem;">
      <div class="row">
        <div class="col-sm-4">
          <h5>Your Details</h5>
          <p>
            <b>Name:</b> {{ user.name }}<br>
            <b>Surname:</b> {{ user.surname }}<br>
            <b>Id:</b> {{ user.id }}<br>
            <b>University:</b> {{ user.university }}<br>
            <b>Active:</b> {{ user.is_active ? "Yes" : "No" }}<br>
          </p>
        </div>
        <div class="col-sm-8">
          <h5 v-if="user.is_tutor">Your Enrolled Courses</h5>
          <h5 v-else>Your Courses</h5>
          <courses-list/>
        </div>
      </div>
    </b-card>
    <b-card style="padding: 5rem;" v-if="!user.is_tutor">
      <div class="row">
        <div class="col-sm-4">
          <h5>Statistics</h5>
          <p>
            <b>Passed tests:</b> {{ statistics.total }}<br>
            <b>Average score:</b> {{ statistics.average }}<br>
            <b>Best score:</b> {{ statistics.max }}<br>
            <b>Worst score:</b> {{ statistics.min }}<br>
          </p>
        </div>
        <div class="col-sm-8">
          <h5>Your Grades</h5>
          <grades-list/>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CoursesList from '@/components/CoursesList.vue'
import GradesList from '@/components/GradesList.vue'

export default {
  components: {
    CoursesList,
    GradesList
  },
  computed: {
    ...mapState('account', ['user', 'statistics'])
  },
  methods: {
    ...mapActions('account', ['getData', 'getStatistics', 'getGrades'])
  },
  created() {
    if (this.statistics === null || this.grades === null || this.user.name === null) {
      this.getData(localStorage.getItem('user'))
      this.getGrades()
      this.getStatistics()
    }
  }
}
</script>