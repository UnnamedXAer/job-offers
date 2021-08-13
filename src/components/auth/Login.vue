<template>
  <div
    id="auth-login"
    style="max-width: 576px; margin-left: auto; margin-right: auto"
  >
    <h1>login me</h1>

    <app-user-logged-info :username="loggedUserName"></app-user-logged-info>

    <form novalidate @submit.prevent="authenticate">
      <div class="mb-4 mt-3 position-relative">
        <label for="login-emailAddress" class="form-label">Email Address</label>
        <input
          id="login-emailAddress"
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
          ref="firstElement"
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

      <app-alert level="danger" class="mt-4" v-if="error !== null">
        {{ error }}
      </app-alert>

      <div class="mb-3 px-sm-5" :class="{ 'mt-5': error === null }">
        <button
          class="btn btn-primary btn-lg w-100"
          :class="{ disabled: loading }"
          :disabled="loading"
          type="submit"
          @click="authenticate"
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
import AuthFormMixinVue from './AuthFormMixin.vue';

export default {
  mixins: [AuthFormMixinVue],
  data() {
    return {
      isRegistration: false
    };
  }
};
</script>
