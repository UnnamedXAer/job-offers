<template >
  <app-details-card card-title="Education" name="education" :list="education">
    <template v-slot="{ info }">
      <div>
        <h6>
          {{ info.item.school }}
        </h6>
        <p style="margin-block-end: 0">
          {{ info.item.field }}
        </p>
        <small class="text-secondary">
          {{ info.item.start | format }} - {{ info.item.end | format }}
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
      return this.$store.state.auth.userDetails
        ? this.$store.state.auth.userDetails.education
        : null;
    }
  },
  filters: {
    format
  }
};
</script>
