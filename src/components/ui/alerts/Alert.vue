<template>
  <div
    class="alert"
    :class="{ 'alert-dismissible': dismiss, ['alert-' + level]: true }"
    role="alert"
  >
    <slot></slot>
    <button
      v-if="dismiss"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="dismiss"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
    dismiss: Function,
    level: {
      type: String,
      default: 'info'
    }
  }
};
</script>
