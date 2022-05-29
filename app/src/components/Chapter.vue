<template>
  <div>
    <b-card>
      <h6>Description</h6>
      <p>{{ chapter.description }}</p>
      <h6>Files</h6>
      <ul>
        <li v-for="file in chapter.files">
          <b-button variant="outline-dark" v-on:click="downloadFile(file)">{{ file }}</b-button>
        </li>
      </ul>
      <h6>Test</h6>
      <Test :test="chapter.test" :course="course" :chapter="chapter.id"/>
    </b-card>
  </div>
</template>

<script>
import Test from '@/components/Test.vue'

export default {
  props: ['chapter', 'course'],
  components: {
    Test
  },
  methods: {
    downloadFile(file) {
      console.log(file)
    },
    giveTest(test) {
      console.log(test);
      this.$router.push({ name: 'tests', query: { course: this.$route.params.id, chapter: chapter.id } })
    }
  }
}
</script>