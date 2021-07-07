<template>
  <section v-if="items.length">
    <ul class="__list">
      <li
        v-for="(item, idx) in items"
        :key="item"
        @click="onClick && onClick(dataFieldName, idx)"
      >
        <i
          class="bi bi-asterisk"
          style="font-size: 0.8em"
          :style="{ color: iconColor }"
          :class="['bi-' + icon]"
        ></i>
        {{ item }}
        <span class="__remove_icon">
          <i class="bi bi-x" style="font-size: 0.9em"></i
        ></span>
      </li>
    </ul>
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

.__list li i {
  margin-right: 1rem;
}
</style>
