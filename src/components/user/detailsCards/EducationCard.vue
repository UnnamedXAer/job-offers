<template >
  <app-details-card card-title="Education" name="education" :list="education">
    <template v-slot="{ info: { item: edu } }">
      <div>
        <h6>
          {{ edu.school }}
        </h6>
        <p style="margin-block-end: 0">
          {{ edu.field }}
        </p>
        <small class="text-secondary">
          {{ edu.start | format }} - {{ edu.end | format }}
        </small>
      </div>
    </template>
  </app-details-card>
</template>

<script>
import { format } from '../../../helpers/dateFormat';
import DetailsCardVue from './components/DetailsCard.vue';

export default {
  name: 'EducationCard',
  components: {
    appDetailsCard: DetailsCardVue
  },
  computed: {
    education() {
      return this.$store.state.user.userDetails
        ? this.$store.state.user.userDetails.education
        : null;
    }
  },
  filters: {
    format
  }
};
</script>
