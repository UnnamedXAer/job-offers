<template>
  <div class="d-flex flex-column mb-5 __offer">
    <section class="p-lg-5 p-sm-3 p-1">
      <h4 class="p-lg-4" role="h1" style="padding-top: 0 !important">
        {{ offer.title }}
      </h4>
      <div class="d-flex">
        <div>
          <code v-if="offer.salary"
            >$ {{ offer.salary.start * 1000 }} -
            {{ offer.salary.end * 1000 }}</code
          >
          <div>
            <div class="badge bg-primary m-1" v-for="(loc, idx) in offer.locations" :key="idx">
              {{ typeof loc === 'string' ? loc : loc.name }}
            </div>
          </div>
        </div>
      </div>
      <article class="mb-3">
        <p>{{ offer.description }}</p>
      </article>
      <article class="__stack mb-3" v-if="offer.stack">
        <h5 role="h2">Tech Stack</h5>
        <div class="d-flex flex-row justify-content-center flex-wrap">
          <div
            class="badge bg-primary m-1"
            v-for="tech in offer.stack"
            :key="tech.tech"
          >
            {{ tech.tech }}
            <small style="color: #ccc; font-size: 0.8em">{{ tech.lv }}</small>
          </div>
        </div>
      </article>
      <article class="__requirments" v-if="offer.requirments">
        <h5 role="h2">Requirments</h5>
        <ul class="__reqs_list __list">
          <li v-for="req in offer.requirments" :key="req">
            <i class="bi bi-bookmark-check"></i> {{ req }}
          </li>
        </ul>
      </article>
      <article class="__tasks" v-if="offer.tasks">
        <h5 role="h2">Tasks</h5>
        <ul class="__list">
          <li v-for="task in offer.tasks" :key="task">
            <i class="bi bi-screwdriver"></i> {{ task }}
          </li>
        </ul>
      </article>
      <article class="__benefits" v-if="offer.benefits">
        <h5 role="h2">Benefits</h5>
        <ul class="__list">
          <li v-for="benefit in offer.benefits" :key="benefit">
            <i class="bi bi-gift" style="font-size: 0.8em"></i> {{ benefit }}
          </li>
        </ul>
      </article>
    </section>

    <div class="position-sticky bottom-0 pb-2 __offer_actions">
      <app-rule class="mb-2"></app-rule>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <button class="btn btn-danger mx-1" style="min-width: 90px">
          Reject
        </button>
        <button class="btn btn-warning mx-1" style="min-width: 90px">
          Next
        </button>
        <button class="btn btn-primary btn-lg mx-3" style="min-width: 110px">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FadeRuleVue from '../../ui/FadeRule.vue';
import Geo from '../../ui/icons/Geo.vue';

export default {
  components: {
    appRule: FadeRuleVue,
    Geo
  },
  props: {
    offer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.__list {
  padding-left: 0.5rem;
}
.__list li {
  list-style-type: none;
}

.__list li i {
  margin-right: 1rem;
}

.__benefits .__list li i {
  color: #57038f;
}

.__requirments .__list li i {
  color: #0c5301;
}

.__offer_actions {
  background-color: rgba(250, 250, 250, 0.7);
  background: rgb(207, 207, 207);
  background: radial-gradient(
    circle,
    rgb(238, 238, 238) 50%,
    rgba(207, 207, 207, 0.062) 100%
  );
}
</style>
