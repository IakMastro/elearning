<template>
  <div>
    <b-button id="show-btn" variant="primary" @click="showTest">Participate on Test</b-button>

    <div v-if="show" style="margin-top: 1rem;">
      <div v-for="(question, index) in this.test" :key="index">
        <h5>Question {{ index + 1 }}</h5>
        <p>{{ question.question }}</p>

        <div id="multiple-choice" label="Select one">
          <select v-model="answers[index]">
            <option disabled default value="">Please select one answer</option>
            <option>{{ question.answer_1 }}</option>
            <option>{{ question.answer_2 }}</option>
            <option>{{ question.answer_3 }}</option>
            <option>{{ question.answer_4 }}</option>
          </select>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <b-button variant="primary" @click="submitTest">Submit</b-button>
        <b-button variant="danger" @click="resetTest">Reset</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['test', 'course', 'chapter'],
  data() {
    return {
      answers: [],
      show: false
    }
  },
  methods: {
    ...mapActions('account', ['addGrade']),
    submitTest() {
      let grade = 0
      for (let i = 0; i < this.test.length; i++) {
        if (this.answers[i] === undefined) {
          alert('Please answer all questions')
          return
        }

        if (this.answers[i] === this.test[i].correct) {
          grade += this.test[i].grade_weight
        }
      }

      this.addGrade( { grade: grade, test_id: this.chapter, course: this.course })
    },
    resetTest() {
      this.answers = []
    },
    showTest() {
      this.show = !this.show
    }
  }
}
</script>