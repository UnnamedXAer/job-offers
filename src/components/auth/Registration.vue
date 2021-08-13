<template>
  <div
    id="auth-registration"
    style="max-width: 576px; margin-left: auto; margin-right: auto"
  >
    <h1>register me</h1>

    <app-alert v-if="user !== null">
      The user is alerady logged in. You are not
      <strong>{{ user.fname + ' ' + user.lname }}</strong
      >?
      <a href="#">Logout</a>
    </app-alert>

    <form novalidate @submit.prevent="register">
      <div class="mb-4 mt-3 position-relative">
        <label for="registration-fname" class="form-label">First Name</label>
        <input
          id="registration-fname"
          class="form-control form-control-lg"
          :class="[
            errors.fname ? 'is-invalid' : touched.fname ? 'is-valid' : ''
          ]"
          name="fname"
          type="text"
          ref="firstElement"
          required
          :value="form.fname"
          @change="changeHandler('fname', $event.target.value)"
        />
        <app-field-error>
          {{ errors.fname }}
        </app-field-error>
      </div>
      <div class="mb-4 mt-3 position-relative">
        <label for="registration-lname" class="form-label">Last Name</label>
        <input
          id="registration-lname"
          class="form-control form-control-lg"
          :class="[
            errors.lname ? 'is-invalid' : touched.lname ? 'is-valid' : ''
          ]"
          name="lname"
          type="text"
          required
          :value="form.lname"
          @change="changeHandler('lname', $event.target.value)"
        />
        <app-field-error>
          {{ errors.lname }}
        </app-field-error>
      </div>
      <div class="mb-4 mt-3 position-relative">
        <label for="registration-dob" class="form-label">DOB</label>
        <input
          id="registration-dob"
          class="form-control form-control-lg"
          :class="[errors.dob ? 'is-invalid' : touched.dob ? 'is-valid' : '']"
          name="dob"
          type="date"
          required
          :value="form.dob"
          @change="changeHandler('dob', $event.target.value)"
        />
        <app-field-error>
          {{ errors.dob }}
        </app-field-error>
      </div>

      <div class="mb-4 mt-3 position-relative">
        <label for="registration-emailAddress" class="form-label"
          >Email Address</label
        >
        <input
          id="registration-emailAddress"
          class="form-control form-control-lg"
          :class="[
            errors.emailAddress
              ? 'is-invalid'
              : touched.emailAddress
              ? 'is-valid'
              : ''
          ]"
          name="emailAddress"
          type="email"
          required
          :value="form.emailAddress"
          @change="changeHandler('emailAddress', $event.target.value)"
        />
        <app-field-error>
          {{ errors.emailAddress }}
        </app-field-error>
      </div>
      <div class="mb-3 position-relative">
        <label for="registration-password" class="form-label">Password</label>
        <input
          id="registration-password"
          class="form-control form-control-lg"
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
          @click="register"
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            v-if="loading"
          ></span>
          Register
          <span class="visually-hidden" v-if="loading">Loading...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { validateRegistrationFormProp } from '../../validation/authValidation';
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
        password: '',
        lname: '',
        fname: '',
        dob: ''
      },
      errors: {
        emailAddress: null,
        password: null,
        lname: null,
        fname: null,
        dob: null
      },
      touched: {
        emailAddress: false,
        password: false,
        lname: false,
        fname: false,
        dob: false
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
      this.errors[fieldName] = validateRegistrationFormProp(fieldName, value);
    },
    async register() {
      this.validateAll();

      for (const fieldName in this.errors) {
        if (this.errors[fieldName] !== null) {
          this.$store.commit('authFail', 'Form has errors.');
          return;
        }
      }

      const success = await this.$store.dispatch('authenticate', {
        form: { ...this.form },
        isRegistration: true
      });
      if (success) {
        this.$router.push('/');
      }
    },
    validateAll() {
      for (const fieldName in this.form) {
        this.errors[fieldName] = validateRegistrationFormProp(
          fieldName,
          this.form[fieldName]
        );
        this.touched[fieldName] = true;
      }
    }
  },

  mounted() {
    this.$refs.firstElement.focus();
  }
};
</script>
