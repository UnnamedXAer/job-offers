<template>
  <section class="mt-2">
    <transition-group name="__fade-slide" mode="out-in" tag="ul" class="__list">
      <li
        class="my-1 py-1 rounded"
        v-for="(item, idx) in items"
        :key="item"
        :data-custom-key="item"
        @click="onClick && onClick(dataFieldName, idx)"
      >
        <i
          class="bi bi-asterisk ms-2 me-3"
          style="font-size: 0.8em"
          :style="{ color: iconColor }"
          :class="['bi-' + icon]"
        ></i>
        {{ item }}
        <span class="__remove_icon">
          <i class="bi bi-x" style="font-size: 0.9em"></i
        ></span>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  props: {
    icon: String,
    iconColor: String,
    items: {
      type: Array,
      required: true
    },
    onClick: Function,
    dataFieldName: String
  }
};
</script>

<style scoped>
.__list {
  padding-left: 0.5rem;
}
.__list li {
  list-style-type: none;
  position: relative;
}

.__list li:hover {
  cursor: pointer;
  background: var(--bs-light);
}

.__remove_icon {
  display: none;
}

.__list li:hover .__remove_icon {
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1rem;
}

/* * transition-group * */

.__fade-slide-enter {
  opacity: 0;
  transform: translateX(-40px);
}

.__fade-slide-enter-active,
.__fade-slide-leave-active {
  transition: opacity 300ms, transform 300ms, background-color 300ms;
}

.__fade-slide-leave-to {
  opacity: 0;
  transform: translateX(40px);
  background-color: var(--bs-danger) !important;
}
</style>
