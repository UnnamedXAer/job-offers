<template >
  <app-details-card
    :card-title="cardTitle"
    :name="name"
    :list="list"
    isSimpleValue
  >
    <template v-slot="{ info: { item: value } }">
      {{ value }}
    </template>
  </app-details-card>
</template>

<script>
import { format } from '../../../helpers/dateFormat';
import DetailsCardVue from './components/DetailsCard.vue';

export default {
  name: 'SimpleValueCard',
  components: {
    appDetailsCard: DetailsCardVue
  },
  props: {
    name: String,
    cardTitle: String
  },
  computed: {
    list() {
      return this.$store.state.auth.userDetails
        ? this.$store.state.auth.userDetails[this.name]
        : null;
    }
  },
  filters: {
    format
  }
};
</script>
