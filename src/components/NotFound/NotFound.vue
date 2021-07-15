<template>
  <div>
    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">
        {{ $route.query.reason || '404 Not found' }}
      </h4>
      <p>
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
