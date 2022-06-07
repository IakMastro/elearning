<template>
  <div>
    <b-card>
      <h5>Description</h5>
      <p>{{ chapter.description }}</p>
      <h5>Files</h5>
      <ul>
        <li v-for="(file, index) in this.chapter.files" :key="index" style="margin-top: 1rem;">
          <b-button variant="outline-dark" v-on:click="downloadFile(file)"><b>{{ file }}</b></b-button>
        </li>
      </ul>
      <h5>Test</h5>
      <test :test="chapter.test" :course="course" :chapter="chapter.id"/>
    </b-card>
  </div>
</template>

<script>
import Test from '@/components/Test.vue'
import { saveAs } from 'file-saver'

export default {
  props: ['chapter', 'course'],
  components: {
    Test
  },
  methods: {
    downloadFile(file) {
      saveAs(`http://localhost:5000/courses/${this.$route.params.id}/${this.chapter.id}/files/${file}`, file)
    }
  }
}
</script>