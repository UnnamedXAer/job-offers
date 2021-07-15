<template>
  <router-link
    class="list-group-item"
    role="listitem, link"
    :to="{ name: 'NewOfferPreview', params: { offer: offer } }"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 style="flex: 1">{{ offer.title }}</h5>
      <p class="ms-2">$[k] {{ offer.salary.start }} - {{ offer.salary.end }}</p>
    </div>
    <div class="d-flex w-100 justify-content-between __item_dates">
      <p>
        Created: <time>{{ createdAt }}</time>
        <span v-if="offer.modifiedAt">
          Modified: <time>{{ offer.modifiedAt.toLocaleString() }}</time>
        </span>
      </p>
      <p v-if="offer.expiresAt.getTime() > Date.now()">
        Expires: <time>{{ expiresAt }}</time>
      </p>
      <p v-else class="text-danger">
        Expired: <time>{{ expiresAt }}</time>
      </p>
    </div>
    <div class="d-flex w-100 justify-content-between __item_footer">
      <p class="border-end">Seen: <br />{{ offer.seen }} times</p>
      <p class="border-end">Applied: <br />{{ offer.applied }} times</p>
      <p>Rejected: <br />{{ offer.rejected }} times</p>
    </div>
  </router-link>
</template>
<script>
import { formatDistanceToNow } from 'date-fns';
export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  computed: {
    createdAt() {
      return formatDistanceToNow(this.offer.createdAt, { addSuffix: true });
    },
    expiresAt() {
      console.log(this.offer.expiresAt);
      return this.offer.expiresAt
        ? formatDistanceToNow(this.offer.expiresAt, { addSuffix: true })
        : 'never';
    }
  }
};
</script>
<style scoped>
.__item_footer {
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
}
.__item_footer p {
  text-align: center;
  flex: 1;
  font-size: 0.8em;
}

.__item_dates {
  font-size: 0.8em;
}

@media screen and (min-width: 768px) {
  .__item_footer p,
  .__item_dates {
    font-size: 0.95em;
  }
}

.list-group-item:nth-child(odd) {
  background-color: var(--bs-light);
}
</style>
