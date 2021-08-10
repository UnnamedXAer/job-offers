<script>
import { mapState } from 'vuex';
import FieldErrorVue from './FieldError.vue';

export default {
  components: {
    appFieldError: FieldErrorVue
  },
  props: {
    editedField: null,
  },
  computed: {
    ...mapState({
      form: (state) => state.auth.editUserDetails.form,
      errors: (state) => state.auth.editUserDetails.errors,
      touched: (state) => state.auth.editUserDetails.touched
    })
  },

  methods: {
    onChange(key, value) {
      if (this.form === null) {
        return;
      }
      this.$store.commit('setUserDetailFormValue', {
        value,
        key
      });
      this.$store.dispatch('validateUserDetailForm', { key });
    },
    onBlur(key) {
      if (this.form === null) {
        return;
      }
      this.$store.dispatch('validateUserDetailForm', { key });
    }
  },
  mounted() {
    this.$refs.firstElement.focus();
  }
};
</script>
