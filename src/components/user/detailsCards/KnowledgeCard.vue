<template >
  <app-details-card card-title="Knowledge" name="knowledge" :list="knowledge">
    <template v-slot="{ info: { item: know } }">
      {{ know.name }} <small v-if="know.lv">{{ know.lv }}</small>
    </template>
  </app-details-card>
</template>

<script>
import { format } from '../../../helpers/dateFormat';
import DetailsCardVue from './components/DetailsCard.vue';

export default {
  name: 'KnowledgeCard',
  components: {
    appDetailsCard: DetailsCardVue
  },
  computed: {
    knowledge() {
      return this.$store.state.auth.userDetails
        ? this.$store.state.auth.userDetails.knowledge
        : null;
    }
  },
  filters: {
    format
  }
};
</script>
