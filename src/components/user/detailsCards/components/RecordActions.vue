<template>
  <div class="__record_actions">
    <button class="__trash" @click="$emit('remove')">
      <i class="bi bi-trash"></i>
    </button>
    <button class="__pen" @click="$emit('edit')">
      <i class="bi bi-pen"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    idx: Number,
    isSimpleValue: Boolean
  }
};
</script>

<style scoped>
.__record_actions {
  display: none;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.__record_actions button {
  opacity: 0.6;
}

.__record_actions button:hover {
  opacity: 1;
}

.__pen {
  cursor: pointer;
}

.__record_text .__record_actions {
  top: 0;
}

.__record:hover .__record_actions {
  display: block;
}
</style>
