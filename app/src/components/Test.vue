<template>
  <div>
    <b-button id="show-btn" variant="outline-primary" v-b-modal.bv-modal-test>Participate on Test</b-button>

    <b-modal ref="modalTest" id="bv-modal-test" hide-footer title="Answer to the questions">
      <b-form @submit="submitTest" @reset="resetTest" class="w-100">
        <div v-for="(question, index) in this.test" :key="index">
          <h5>Question {{ index + 1 }}</h5>
          <p>{{ question.question }}</p>

          <b-form-group id="multiple-choice" label="Select one">
            <select v-model="answers[index]">
              <option disabled default value="">Please select one answer</option>
              <option>{{ question.answer_1 }}</option>
              <option>{{ question.answer_2 }}</option>
              <option>{{ question.answer_3 }}</option>
              <option>{{ question.answer_4 }}</option>
            </select>
          </b-form-group>
        </div>

        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['test', 'course', 'chapter'],
  data() {
    return {
      answers: []
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
          grade += 1
        }
      }

      console.log(grade);
      this.addGrade( { grade: grade, test_id: this.chapter, course: this.course })
    },
    resetTest() {
      this.answers = []
    }
  }
}
</script>
