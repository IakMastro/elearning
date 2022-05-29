<template>
  <div>
    <b-card style="padding: 5rem;">
      <div class="row mb-5">
        <b-card class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
          <h1 class="font-weight-bold text-uppercase pt-3">{{ this.course.name }}</h1>
          <p>{{ this.course.description }}</p>
        </b-card>

        <b-card class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <h5>Tutor: {{ this.course.tutor }}</h5>
          <h5>Category: {{ this.course.category }} - {{ this.course.subcategory }}</h5>
          <span class="float-left pr-3">Rating: {{ this.course.rating }}</span>
        </b-card>
      </div>

      <b-card>
        <h3>Chapters</h3>
        <div class="col4 flex-fill" v-for="(chapter, index) in this.course.chapters" :key="index">
          <h6>Chapter {{ chapter.id }}</h6>
          <chapter :chapter="chapter" :course="this.course.id"/>
        </div>

        <div class="col4 flex-fill">
          <h6>Final Test</h6>
          <b-card>
            <h5>Take the revision test to see your progress!</h5>
            <Test :test="this.course.test" :course="this.course.id" :chapter="0" />
          </b-card>
        </div>
      </b-card>

      <b-card>
        <h3> DEBUG: {{ this.course }}</h3>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Chapter from '@/components/Chapter.vue'
import Test from '@/components/Test.vue'

export default {
  setup() {
    return {
      active: 1
    }
  },
  components: {
    Chapter,
    Test
  },
  created() {
    this.getById(this.$route.params.id)
  },
  computed: {
    ...mapState('course', ['course'])
  },
  methods: {
    ...mapActions('course', ['getById']),
    selectChapter(index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
.col4 {
  margin-bottom: 2rem;

  h6 {
    height: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid lightgrey;
    color: grey;
  }
}
</style>