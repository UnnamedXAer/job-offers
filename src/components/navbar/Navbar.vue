<template>
  <header>
    <nav
      class="navbar navbar-expand-md navbar-light shadow-sm p-3 mb-5 __navbar"
    >
      <div class="container-lg">
        <router-link class="navbar-brand fs-2" to="/">💸</router-link>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-label="Toggle navigation"
          :aria-expanded="expanded"
          @click.stop="toggleMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <transition name="__fade-scale">
          <div class="navbar-collapse" id="navbarNavDropdown" v-show="expanded">
            <div class="navbar-nav">
              <router-link
                to="/"
                active-class="active"
                class="nav-link fs-3 fw-bold"
                exact
                @click.native.stop="toggleMenu"
              >
                Home
              </router-link>
              <router-link
                to="/lookup"
                active-class="active"
                class="nav-link fs-3 fw-bold"
                @click.native.stop="toggleMenu"
              >
                Lookup
              </router-link>
              <app-nav-user-dropdown></app-nav-user-dropdown>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script>
import NavUserDropdownVue from './NavUserDropdown.vue';
export default {
  components: {
    appNavUserDropdown: NavUserDropdownVue
  },
  data() {
    return {
      expanded: false,
      canToggleExpand: false
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
    toggleMenu() {
      if (this.canToggleExpand) {
        this.expanded = !this.expanded;
      }
    },
    closeMenu(ev) {
      if (!this.$el.contains(ev.target)) {
        this.expanded = false;
      }
    }
  },
  created() {
    this.mqList = window.matchMedia('(min-width: 768px)');
    this.expanded = this.mqList.matches;
    this.canToggleExpand = !this.mqList.matches;
    this.mqEvHandler = (ev) => {
      console.log(ev);
      console.log(this);
      this.expanded = ev.matches;
      this.canToggleExpand = !ev.matches;
    };
    this.mqList.addEventListener('change', this.mqEvHandler);
  },
  destroyed() {
    this.mqList.removeEventListener('change', this.mqEvHandler);
  }
};
</script>

<style scoped>
.__navbar {
  background-color: #c0e2fa;
}

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
