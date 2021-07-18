<template>
  <div class="row gx-0" v-if="recoveredForm">
    <div class="card text-dark border-warning mb-3">
      <div class="card-header bg-warning">
        <h5 class="card-title">Recovered form</h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          We have recovered previous unsaved form from:
          <time>{{ new Date(recoveredForm.date).toLocaleString() }}.</time>
        </p>
        <p>Whould you like to restre it?</p>
        <div
          class="
            card-footer
            bg-transparent
            border-success
            d-flex
            align-items-center
            justify-content-around justify-content-sm-end
          "
        >
          <a
            href="#"
            @click="deleteUnsavedForm"
            class="alert-link text-secondary"
            >Dismiss</a
          >
          <button
            class="btn btn-outline-success mx-sm-5"
            @click="recoverUnsavedForm"
          >
            Recover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recoverUnsavedForm: { type: Function, required: true },
    deleteUnsavedForm: { type: Function, required: true },
    recoveredForm: { type: Object }
  }
};
</script>
