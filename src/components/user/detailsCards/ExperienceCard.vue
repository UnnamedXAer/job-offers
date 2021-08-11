<template >
  <app-details-card
    card-title="Experience"
    name="experience"
    :list="experience"
  >
    <template v-slot="{ info: { item: exp } }">
      <h6>{{ exp.company }}</h6>
      <p style="margin-block-end: 0">
        {{ exp.position }}
      </p>
      <small class="text-secondary">
        {{ exp.start | format }} -
        <span v-if="exp.end">{{ exp.end | format }}</span>
        <span v-else>currently</span>
      </small>
    </template>
  </app-details-card>
</template>

<script>
import { format } from '../../../helpers/dateFormat';
import DetailsCardVue from './components/DetailsCard.vue';

export default {
  name: 'ExperienceCard',
  components: {
    appDetailsCard: DetailsCardVue
  },
  computed: {
    experience() {
      return this.$store.state.auth.userDetails
        ? this.$store.state.auth.userDetails.experience
        : null;
    }
  },
  filters: {
    format
  }
};
</script>
