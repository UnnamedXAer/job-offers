<template>
  <div class="d-flex justify-content-evenly mt-5">
    <button
      class="btn btn-outline-info btn-lg"
      :class="{ disabled: loading }"
      :disabled="loading"
      type="button"
      @click="showOfferPreview"
    >
      Show Preview
    </button>
    <button
      class="btn btn-primary btn-lg"
      :class="{ disabled: loading }"
      :disabled="loading"
      type="button"
      @click="submitHandler"
    >
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        v-if="loading"
      ></span>
      {{ mode === 'update' ? 'Update Offer' : 'Post Offer' }}
      <span class="visually-hidden" v-if="loading">Loading...</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    submitHandler: { type: Function, required: true },
    showOfferPreview: { type: Function, required: true },
    mode: { type: String, required: true }
  }
};
</script>
