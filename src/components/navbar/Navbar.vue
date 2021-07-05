<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #e3f2fd"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">💸</router-link>
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
        <ul class="navbar-nav">
          <router-link to="/" active-class="active" class="nav-item" custom >
            <a class="nav-link">Home</a>
          </router-link>
          <router-link to="/lookup" active-class="active" class="nav-item">
            <a class="nav-link">Lookup</a>
          </router-link>

          <!-- <li class="nav-item">
            <a class="nav-link"  href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/lookup">Lookup</a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
