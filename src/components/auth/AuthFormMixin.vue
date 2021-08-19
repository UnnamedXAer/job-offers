<script>
import { mapState } from 'vuex';
import {
  validateLoginFormProp,
  validateRegistrationFormProp
} from '../../validation/authValidation';
import AlertVue from '../ui/alerts/Alert.vue';
import FieldErrorVue from '../user/editing/FieldError.vue';
import UserLoggedInfoVue from './UserLoggedInfo.vue';

export default {
  components: {
    appFieldError: FieldErrorVue,
    appAlert: AlertVue,
    appUserLoggedInfo: UserLoggedInfoVue
  },

  data() {
    return {
      loggedUserName: null,
      form: {
        emailAddress: '',
        password: ''
      },
      errors: {
        emailAddress: null,
        password: null
      },
      touched: {
        emailAddress: false,
        password: false
      }
    };
  },
  computed: mapState({
    loading: (state) => state.auth.loading,
    error: (state) => state.auth.error
  }),
  methods: {
    changeHandler(fieldName, value) {
      this.form[fieldName] = value;
      this.touched[fieldName] = true;
      this.errors[fieldName] = this.validateFormProp(fieldName, value);
    },
    async authenticate() {
      this.validateAll();

      for (const fieldName in this.errors) {
        if (this.errors[fieldName] !== null) {
          this.$store.commit('authFail', 'Form has errors.');
          return;
        }
      }

      const success = await this.$store.dispatch('authenticate', {
        form: {
          ...this.form
        },
        isRegistration: !!this.isRegistration
      });
      if (success) {
        this.$router.push('/');
      }
    },
    validateAll() {
      for (const fieldName in this.form) {
        this.errors[fieldName] = this.validateFormProp(
          fieldName,
          this.form[fieldName]
        );
        this.touched[fieldName] = true;
      }
    },
    validateFormProp: validateLoginFormProp
  },
  created() {
    const loggerUser = this.$store.state.auth.user;
    this.loggedUserName = loggerUser
      ? loggerUser.fname + ' ' + loggerUser.lname
      : null;
    if (this.isRegistration) {
      this.validateFormProp = validateRegistrationFormProp;
      this.form = Object.assign({}, this.form, {
        lname: '',
        fname: '',
        dob: ''
      });
      this.errors = Object.assign({}, this.errors, {
        lname: null,
        fname: null,
        dob: null
      });
      this.touched = Object.assign({}, this.touched, {
        lname: false,
        fname: false,
        dob: false
      });
    }
  },
  mounted() {
    this.$refs.firstElement.focus();
  }
};
</script>
