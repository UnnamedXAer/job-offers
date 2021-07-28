<template>
  <div
    id="current-offer-actions"
    class="position-fixed bottom-0 start-0 end-0 __current_offer_actions"
  >
    <div class="__current_offer_action__alert_wrapper">
      <app-alert
        :level="actionResult.level"
        :dismiss="dismissActionResultAlert"
        v-if="actionResult"
      >
        {{ actionResult.msg }}
      </app-alert>
    </div>

    <app-rule class="mb-2"></app-rule>

    <div class="d-flex flex-row justify-content-center align-items-center pb-2">
      <button
        class="btn btn-danger mx-1"
        style="min-width: 90px"
        :disabled="
          disabled ||
          appliedAt ||
          rejectedAt ||
          applying ||
          rejecting ||
          applied ||
          rejected
        "
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
        :disabled="disabled || rejecting || applying || disabledNext"
        @click="nextOffer"
      >
        Later
      </button>
      <button
        class="btn btn-primary btn-lg mx-1"
        style="min-width: 110px"
        :disabled="
          disabled ||
          appliedAt ||
          rejectedAt ||
          applying ||
          rejecting ||
          applied ||
          rejected
        "
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
import AlertVue from '../../ui/alerts/Alert.vue';
import FadeRuleVue from '../../ui/FadeRule.vue';

export default {
  components: {
    appRule: FadeRuleVue,
    appAlert: AlertVue
  },
  props: {
    disabled: Boolean,
    applying: Boolean,
    rejecting: Boolean,
    applied: Boolean,
    rejected: Boolean,
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
    rejectedAt: Date,
    disabledNext: Boolean,
    actionResult: Object,
    dismissActionResultAlert: Function
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

.__current_offer_action__alert_wrapper {
  margin: auto;
  max-width: 960px;
  position: relative;
}

.__current_offer_action__alert_wrapper > * {
  margin-bottom: 0.3rem;
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
