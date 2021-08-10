<template >
  <app-details-card card-title="Education" name="education" :list="education">
    <template v-slot="{ info: exp }">
      <h6>{{ exp.item.company }}</h6>
      <p style="margin-block-end: 0">
        {{ exp.item.position }}
      </p>
      <small class="text-secondary">
        {{ exp.item.start | format }} -
        <span v-if="exp.item.end">{{ exp.item.end | format }}</span>
        <span v-else>currently</span>
      </small>
    </template>
  </app-details-card>
</template>

<script>
import format from 'date-fns/format';
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
    format: (val) => {
      if (val instanceof Date) {
        return format(val, 'yyyy-MM-dd');
      }

      return val;
    }
  }
};
</script>
