<template>
  <div class="login">
    <b-card>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="ID:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.id"
            type="text"
            placeholder="Enter your ID"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Log In</b-button>
        <b-button type="reset" variant="danger">Reset Form</b-button>
      </b-form>
    </div>
  </b-card>
  </div>
</template>

<script>
import { ref, computed, reactive, nextTick } from 'vue'
import { mapState, mapActions } from 'vuex'

export default {
  setup() {
    return {
      show: ref(true),
      form: reactive({
        id: '',
        password: ''
      })
    }
  },
  computed: {
    ...mapState('account', ['status'])
  },
  created() {
    this.logout()
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    onSubmit(event) {
      event.preventDefault()
      const { id, password } = this.form

      if (id && password) {
        this.login({ id, password })
      }
    },
    onReset(event) {
      event.preventDefault()
      this.form.id = ''
      this.form.password = ''
      this.show= false
      nextTick(() => {
        this.show = true
      })
    }
  },
}
</script>