<template>
  <div>
    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">
        {{ $route.query.reason || 'Not found' }}
      </h4>
      <p v-if="$route.query.reason">
        You can go to
        <router-link to="/account/my-offers" class="alert-link"
          >Your account</router-link
        >
        to see your offers,
        <router-link to="/offers/new" class="alert-link"
          >create new one</router-link
        >
        or <router-link to="/lookup" class="alert-link">browse</router-link> for
        a job in lookup.
      </p>
      <p v-else>
        We could not find the resources you requested, plase make sure the
        address is correct, and try again.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
