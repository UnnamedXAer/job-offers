<template>
  <section class="p-lg-5 p-sm-3 p-1">
    <h4 class="px-lg-4" role="h1" style="padding-top: 0 !important">
      {{ offer.title }}
    </h4>
    <div class="__offer-details">
      <div>
        <small>{{ offer.company.name }}</small>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <div
            class="badge bg-success m-1"
            :class="{ 'bg-warning': typeof loc === 'string' }"
            v-for="(loc, idx) in offer.locations"
            :key="idx"
          >
            {{ typeof loc === 'string' ? loc : loc.name }}
            <i class="bi bi-geo-alt" v-if="typeof loc === 'object'"></i>
          </div>
        </div>
        <code v-if="offer.salary"
          >$ {{ offer.salary.start * 1000 }} -
          {{ offer.salary.end * 1000 }}</code
        >
      </div>
    </div>
    <hr />
    <article class="mb-3">
      <p>{{ offer.description }}</p>
    </article>
    <article class="__stack mb-3" v-if="offer.stack">
      <h5 role="h2">Tech Stack</h5>
      <div class="d-flex flex-row justify-content-center flex-wrap">
        <div
          class="badge bg-primary m-1"
          v-for="tech in offer.stack"
          :key="tech.name"
        >
          {{ tech.name }}
          <small style="color: #ccc; font-size: 0.8em">{{ tech.lv }}</small>
        </div>
      </div>
    </article>
    <article class="__requirements" v-if="offer.requirements">
      <h5 role="h2">Requirements</h5>
      <ul class="__reqs_list __list">
        <li v-for="req in offer.requirements" :key="req">
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
</template>

<script>
export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.__offer-details {
  min-height: 4rem;
}

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
.__tasks .__list li i {
  color: #411801;
}
</style>
