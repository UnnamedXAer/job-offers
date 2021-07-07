<template>
  <div class="nav-item dropdown">
    <a
      class="nav-link fs-3 fw-bold dropdown-toggle"
      href="#"
      id="navbarUserDropdownMenuLink"
      role="button"
      data-bs-toggle="dropdown"
      :aria-expanded="expanded"
      @click.stop="toggleUserMenu"
    >
      User
    </a>
    <transition name="__fade-scale">
      <div
        class="dropdown-menu show"
        v-if="expanded"
        aria-labelledby="navbarUserDropdownMenuLink"
      >
        <div class="d-flex">
          <router-link
            class="dropdown-item"
            to="/user/account"
            @click.native.stop="toggleUserMenu"
            ><i class="bi bi-person fs-5 pe-3"></i>
            <span class="nav-text">Dean Winchester</span></router-link
          >
        </div>
        <hr class="dropdown-divider" />
        <router-link
          class="dropdown-item"
          to="/offers/new"
          @click.native.stop="toggleUserMenu"
          >Create New Offer</router-link
        >
        <hr class="dropdown-divider" />
        <button class="dropdown-item" @click.stop="toggleUserMenu">
          Logout
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false
    };
  },
  watch: {
    expanded(val) {
      if (val) {
        return document.addEventListener('click', this.closeMenu);
      }
      return document.removeEventListener('click', this.closeMenu);
    }
  },
  methods: {
    toggleUserMenu() {
      this.expanded = !this.expanded;
    },
    closeMenu(ev) {
      if (!this.$el.contains(ev.target)) {
        this.expanded = false;
      }
    }
  }
};
</script>

<style scoped>
.__fade-scale-enter,
.__fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.__fade-scale-enter-active,
.__fade-scale-leave {
  transition: opacity 300ms, transform 300ms;
}

.__fade-scale-leave-active {
  transition: opacity 300ms, transform 300ms;
  transform: scale(0.8);
  opacity: 0;
}
</style>
