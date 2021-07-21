<template>
  <!-- <div class="position-sticky bottom-0 pb-2  __curren_offer_actions"> -->
  <div
    id="current-offer-actions"
    class="position-fixed bottom-0 start-0 end-0 __current_offer_actions"
  >
    <app-rule class="mb-2"></app-rule>
    <div
      class="alert alert-danger alert-dismissible"
      role="alert"
      v-if="actionError"
    >
      {{ actionError }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="actionError = null"
      ></button>
    </div>
    <div class="d-flex flex-row justify-content-center align-items-center pb-2">
      <button
        class="btn btn-danger mx-1"
        style="min-width: 90px"
        :disabled="disabled || appliedAt || rejectedAt || applying || rejecting"
        @click="rejectOffer"
      >
        <span
          v-show="rejecting"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {{ rejectedAt ? 'Rejected' : 'Reject' }}
      </button>
      <button
        class="btn btn-warning mx-2"
        style="min-width: 90px"
        :disabled="disabled || rejecting || applying"
        @click="nextOffer"
      >
        Later
      </button>
      <button
        class="btn btn-primary btn-lg mx-1"
        style="min-width: 110px"
        :disabled="disabled || appliedAt || rejectedAt || applying || rejecting"
        @click="applyToOffer"
      >
        <span
          v-show="applying"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {{ appliedAt ? 'Applied' : 'Apply' }}
      </button>
    </div>
  </div>
</template>

<script>
import FadeRuleVue from '../../ui/FadeRule.vue';
export default {
  components: {
    appRule: FadeRuleVue
  },
  props: {
    disabled: Boolean,
    actionError: String,
    applying: Boolean,
    rejecting: Boolean,
    applyToOffer: {
      type: Function,
      required: true
    },
    rejectOffer: {
      type: Function,
      required: true
    },
    nextOffer: {
      type: Function,
      required: true
    },
    appliedAt: Date,
    rejectedAt: Date
  }
};
</script>

<style scoped>
.__current_offer_actions {
  background-color: rgb(250, 250, 250);
  background: radial-gradient(
    circle,
    rgb(238, 238, 238) 50%,
    rgba(207, 207, 207, 0.062) 100%
  );
}
</style>
