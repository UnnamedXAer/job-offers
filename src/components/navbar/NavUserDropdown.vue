<template>
  <div class="nav-item dropdown" v-if="loggedUser">
    <a
      class="nav-link fs-3 fw-bold dropdown-toggle"
      href="#"
      id="navbarUserDropdownMenuLink"
      role="button"
      data-bs-toggle="dropdown"
      :aria-expanded="expanded"
      @click.stop="toggleUserMenu"
    >
      More
    </a>
    <transition name="__fade-scale">
      <div
        class="dropdown-menu show"
        v-if="expanded"
        aria-labelledby="navbarUserDropdownMenuLink"
      >
        <router-link
          class="dropdown-item"
          to="/me/account"
          @click.native.stop="toggleUserMenu"
          ><i class="bi bi-person fs-5 pe-3"></i>
          <span class="nav-text">{{
            loggedUser.fname + ' ' + loggedUser.lname
          }}</span>
        </router-link>
        <hr class="dropdown-divider" />
        <router-link
          class="dropdown-item"
          :to="{ name: 'CreateOffer' }"
          @click.native.stop="toggleUserMenu"
          >Create New Offer</router-link
        >
        <router-link
          class="dropdown-item"
          :to="{ name: 'UserOffers' }"
          @click.native.stop="toggleUserMenu"
          >My Offers</router-link
        >
        <hr class="dropdown-divider" />
        <router-link
          class="dropdown-item"
          @click.native.stop="toggleUserMenu"
          :to="{ name: 'Logout' }"
        >
          Logout
        </router-link>
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
  computed: {
    loggedUser() {
      return this.$store.state.auth.user;
    }
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
