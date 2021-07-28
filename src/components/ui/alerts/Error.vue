<template>
  <div
    class="alert alert-danger"
    :class="{ 'alert-dismissible': dismiss }"
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
    dismiss: Function
  }
};
</script>
