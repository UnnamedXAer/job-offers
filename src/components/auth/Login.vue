<template>
  <div
    id="auth-login"
    style="max-width: 576px; margin-left: auto; margin-right: auto"
  >
    <h1>login me</h1>

    <app-alert v-if="user !== null">
      The user is alerady logged in. You are not
      <strong>{{ user.fname + ' ' + user.lname }}</strong
      >?
      <a href="#">Logout</a>
    </app-alert>

    <form novalidate @submit.prevent="login">
      <div class="mb-4 mt-3 position-relative">
        <label for="login-emailAddress" class="form-label">Email Address</label>
        <input
          id="login-emailAddress"
          class="form-control"
          :class="[
            errors.emailAddress
              ? 'is-invalid'
              : touched.emailAddress
              ? 'is-valid'
              : ''
          ]"
          name="emailAddress"
          type="email"
          ref="emailAddress"
          required
          :value="form.emailAddress"
          @change="changeHandler('emailAddress', $event.target.value)"
        />
        <app-field-error>
          {{ errors.emailAddress }}
        </app-field-error>
      </div>
      <div class="mb-3 position-relative">
        <label for="login-password" class="form-label">Password</label>
        <input
          id="login-password"
          class="form-control"
          :class="[
            errors.password ? 'is-invalid' : touched.password ? 'is-valid' : ''
          ]"
          name="password"
          type="password"
          required
          :value="form.password"
          @change="changeHandler('password', $event.target.value)"
        />
        <app-field-error>
          {{ errors.password }}
        </app-field-error>
      </div>

      <app-alert level="danger" class="mt-4" v-if="error !== null">{{
        error
      }}</app-alert>

      <div class="mb-3 px-sm-5" :class="{ 'mt-5': error === null }">
        <button
          class="btn btn-primary btn-lg w-100"
          :class="{ disabled: loading }"
          :disabled="loading"
          type="submit"
          @click="login"
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            v-if="loading"
          ></span>
          Login
          <span class="visually-hidden" v-if="loading">Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { login } from '../../validation/authValidation';
import AlertVue from '../ui/alerts/Alert.vue';
import ErrorVue from '../ui/alerts/Error.vue';
import FieldErrorVue from '../user/editing/FieldError.vue';

export default {
  components: {
    appFieldError: FieldErrorVue,
    appError: ErrorVue,
    appAlert: AlertVue
  },
  data() {
    return {
      form: {
        emailAddress: '',
        password: ''
      },
      errors: {
        emailAddress: null,
        password: null
      },
      touched: {
        emailAddress: false,
        password: false
      }
    };
  },

  computed: mapState({
    user: (state) => state.auth.user,
    loading: (state) => state.auth.loading,
    error: (state) => state.auth.error
  }),

  methods: {
    changeHandler(fieldName, value) {
      this.form[fieldName] = value;
      this.touched[fieldName] = true;
      this.errors[fieldName] = login(fieldName, value);
    },
    login() {
      this.validateAll();

      for (const fieldName in this.errors) {
        if (this.errors[fieldName] !== null) {
          //   this.error = 'Form has errors.';
          this.$store.commit('loginFail', 'Form has errors.');
          return;
        }
      }

      this.$store.dispatch('login', { ...this.form });
    },
    validateAll() {
      for (const fieldName in this.form) {
        this.errors[fieldName] = login(fieldName, this.form[fieldName]);
        this.touched[fieldName] = true;
      }
    }
  },

  mounted() {
    this.$refs.emailAddress.focus();
  }
};
</script>

<style scoped>
</style>
