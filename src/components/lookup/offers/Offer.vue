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
            <div
              class="badge bg-primary m-1"
              v-for="(loc, idx) in offer.locations"
              :key="idx"
            >
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

    <div class="position-sticky bottom-0 pb-2 __offer_actions">
      <app-rule class="mb-2"></app-rule>
      <div
        class="alert alert-danger alert-dismissible"
        role="alert"
        v-if="error"
      >
        {{ error }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="error = null"
        ></button>
      </div>
      <div class="d-flex flex-row justify-content-center align-items-center">
        <button
          class="btn btn-danger mx-1"
          style="min-width: 90px"
          :disabled="
            offer.appliedAt || offer.rejectedAt || applying || rejecting
          "
          @click="rejectOffer"
        >
          <span
            v-show="rejecting"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ offer.rejectedAt ? 'Rejected' : 'Reject' }}
        </button>
        <button
          class="btn btn-warning mx-1"
          style="min-width: 90px"
          :disabled="disabledNext || rejecting || applying"
          @click="nextOffer"
        >
          Next
        </button>
        <button
          class="btn btn-primary btn-lg mx-3"
          style="min-width: 110px"
          :disabled="
            offer.appliedAt || offer.rejectedAt || applying || rejecting
          "
          @click="applyToOffer"
        >
          <span
            v-show="applying"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ offer.appliedAt ? 'Applied' : 'Apply' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FadeRuleVue from '../../ui/FadeRule.vue';
import firebaseAxios from '../../../axios/firebase';

export default {
  components: {
    appRule: FadeRuleVue
  },
  props: {
    offer: {
      type: Object,
      required: true
    },
    disabledNext: Boolean
  },
  data() {
    return {
      applying: false,
      rejecting: false,
      error: 'Cound not reject, plase try again later'
    };
  },
  watch: {
    offer() {
      this.markOfferAsSeen();
    }
  },
  methods: {
    nextOffer() {
      this.$emit('next-offer');
    },
    markOfferAsSeen() {
      clearTimeout(this.markSeenTimeout);
      if (this.offer.seenAt) {
        return;
      }
      const id = this.offer.id;
      this.markSeenTimeout = setTimeout(() => {
        if (!this.offer || this.offer.id !== id) {
          console.warn(
            'maker offer as seen: difference in ids',
            id,
            this.offer.id
          );
        }

        firebaseAxios
          .put('/users-data/my-user-id/offers-seen/' + id + '.json', new Date())
          .then(() => {
            this.$emit('offer-seen', id);
          })
          .catch((err) => {
            // nothing to do here for now.
            console.log('mark offer as seen: error:', err);
          });
      }, 1000);
    },
    rejectOffer() {
      this.rejecting = true;

      firebaseAxios
        .put(
          '/users-data/my-user-id/offers-rejected/' + this.offer.id + '.json',
          new Date()
        )
        .then(() => {
          this.$emit('remove-offer', this.offer.id);
        })
        .catch((err) => {
          // this.error = 'Could not reject the offer, please refresh page and try again.';
          this.error = err.message || err.toString();
        })
        .finally(() => {
          this.rejecting = false;
        });
    },
    applyToOffer() {
      this.applying = true;

      firebaseAxios
        .put(
          '/users-data/my-user-id/offers-applied/' + this.offer.id + '.json',
          new Date()
        )
        .then(() => {
          this.$emit('remove-offer', this.offer.id);
        })
        .catch((err) => {
          // this.error = 'Could not accept the offer, please refresh page and try again.';
          this.error = err.message || err.toString();
        })
        .finally(() => {
          this.applying = false;
        });
    }
  },
  mounted() {
    this.markOfferAsSeen();
  },
  destroyed() {
    clearTimeout(this.markSeenTimeout);
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
.__tasks .__list li i {
  color: #411801;
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
