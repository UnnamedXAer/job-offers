<template>
  <nav class="navbar navbar-expand-md navbar-light shadow-sm p-3 mb-5 __navbar rounded-bottom">
    <div class="container-fluid">
      <router-link class="navbar-brand fs-2" to="/">💸</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <div class="navbar-nav">
          <router-link to="/" active-class="active" class="nav-link fs-3 fw-bold" exact>
            Home
          </router-link>
          <router-link to="/lookup" active-class="active" class="nav-link fs-3 fw-bold">
            Lookup
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.__navbar {
  background-color: #c0e2fa;
}
</style>
