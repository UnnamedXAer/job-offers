<template>
  <div class="col __user_details__card">
    <div class="card card-body">
      <h5 class="card-title">{{ cardTitle }}</h5>
      <ul>
        <li class="card-text __record" v-for="(item, idx) in list" :key="idx">
          <app-record-actions
            @remove="remove(idx)"
            @edit="edit(idx)"
          ></app-record-actions>
          <slot v-bind:info="{ item, idx }"></slot>
        </li>
      </ul>
      <button class="__add" @click="add">
        <i class="bi bi-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import RecordActionsVue from './RecordActions.vue';

export default {
  components: {
    appRecordActions: RecordActionsVue
  },
  props: {
    cardTitle: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    isSimpleValue: Boolean
  },
  methods: {
    add() {
      this.edit(-1);
    },
    edit(idx) {
      this.$store.dispatch('setUserDetailEditedField', {
        fieldName: this.name,
        idx,
        isSimpleValue: this.isSimpleValue
      });
    },
    remove(idx) {
      console.log({
        fieldName: this.name,
        idx
      });
    }
  }
};
</script>

<style scoped>
.__add {
  color: black;
  opacity: 0.1;
  font-size: 1.4em;
}

.card:hover > .__add {
  opacity: 0.3;
}

.card:hover > .__add:hover {
  color: unset;
  opacity: 1;
}

.__record {
  position: relative;
  min-height: 32px;
  margin-bottom: 0.5rem;
}

.__record_text {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-bottom: 0;
}

.__record::marker {
  display: block;
  height: 100%;
  background-color: aquamarine;
  color: violet;
}

.__record:hover {
  background-color: rgb(248, 248, 248);
}
</style>
