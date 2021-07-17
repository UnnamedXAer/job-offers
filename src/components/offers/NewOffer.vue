<template>
  <keep-alive>
    <div class="mb-5 position-relative">
      <div
        class="alert alert-danger alert-dismissible position-sticky"
        style="top: 1rem; z-index: 1"
        v-if="error"
      >
        {{ error }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="error = null"
        ></button>
      </div>
      <div class="row gx-0" v-if="recoveredForm">
        <div class="card text-dark border-warning mb-3">
          <div class="card-header bg-warning">
            <h5 class="card-title">Recovered form</h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              We have recovered previous unsaved form from:
              <time>{{ new Date(recoveredForm.date).toLocaleString() }}.</time>
            </p>
            <p>Whould you like to restre it?</p>
            <div
              class="
                card-footer
                bg-transparent
                border-success
                d-flex
                align-items-center
                justify-content-around justify-content-sm-end
              "
            >
              <a
                href="#"
                @click="deleteUnsavedForm"
                class="alert-link text-secondary"
                >Dismiss</a
              >
              <button
                class="btn btn-outline-success mx-sm-5"
                @click="recoverUnsavedForm"
              >
                Recover
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <h1>Create a job offer</h1>
      </div>
      <div class="row justify-content-center">
        <div class="col-12" style="max-width: 960px">
          <div class="mb-3">
            <label class="form-label fw-bold" for="offer-company"
              >Select Company</label
            >
            <select
              class="form-select"
              :class="[
                errors.company
                  ? 'is-invalid'
                  : touched.company
                  ? 'is-valid'
                  : ''
              ]"
              id="offer-company"
              required
              aria-placeholder="select company"
              v-model="form.company"
              aria-describedby="offer-title-help-block"
              @blur="checkCompany($event.target.value)"
            >
              <option selected disabled value="">
                Pick company for the offer
              </option>
              <option
                v-for="company in userCompanies"
                :key="company.id"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
            <div id="offer-company-help-block" class="form-text text-danger">
              {{ errors.company }}
            </div>
            <hr />
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold" for="offer-title"
              >Position title</label
            >
            <input
              type="text"
              class="form-control"
              :class="[
                errors.title ? 'is-invalid' : touched.title ? 'is-valid' : ''
              ]"
              id="offer-title"
              placeholder="Job Title"
              required
              autocomplete="off"
              v-model.lazy="form.title"
              aria-describedby="offer-title-help-block"
              @blur="checkTitle($event.target.value)"
            />
            <div id="offer-title-help-block" class="form-text text-danger">
              {{ errors.title }}
            </div>
            <hr />
          </div>

          <div class="mb-3">
            <label for="offer-description" class="form-label fw-bold"
              >General Description</label
            >
            <textarea
              class="form-control"
              :class="[
                errors.description
                  ? 'is-invalid'
                  : touched.description
                  ? 'is-valid'
                  : ''
              ]"
              id="offer-description"
              rows="3"
              v-model="form.description"
              aria-describedby="offer-description-help-block"
              @blur="checkDescription($event.target.value)"
            ></textarea>
            <div
              id="offer-description-help-block"
              class="form-text text-danger"
            >
              {{ errors.description }}
            </div>
            <hr />
          </div>

          <div class="mb-2">
            <label for="offer-stack-name" class="form-label fw-bold"
              >Technologies used in this position</label
            >
            <form @submit.prevent="addListElement('stack')">
              <div class="input-group" style="flex-wrap: unset">
                <input
                  type="text"
                  class="form-control"
                  id="offer-stack-name"
                  list="offer-stack-name-datalist"
                  placeholder="Node.js, Oracle, ect."
                  required
                  v-model="form.stack.name"
                  aria-describedby="offer-stack-help-block"
                />
                <input
                  type="text"
                  class="form-control"
                  id="offer-stack-lv"
                  list="offer-stack-lv-datalist"
                  placeholder="default: regular"
                  v-model="form.stack.lv"
                />

                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  aria-label="add element to stack list"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </form>
            <div id="offer-stack-help-block" class="form-text text-danger">
              {{ errors.stack }}
            </div>
            <datalist id="offer-stack-name-datalist">
              <option
                v-for="opt in datalists.offerStackName"
                :value="opt"
                :key="opt"
              ></option>
            </datalist>
            <datalist id="offer-stack-lv-datalist">
              <option
                v-for="opt in datalists.offerStackLv"
                :value="opt"
                :key="opt"
              ></option>
            </datalist>

            <div
              class="mt-2 d-flex border border-info rounded p-2"
              :class="{ 'border-warning': form.stackList.length > 10 }"
              v-if="form.stackList.length"
            >
              <span
                class="badge bg-primary"
                v-for="tech in form.stackList"
                :key="tech.name"
                >{{ tech.name }} <small v-if="tech.lv">{{ tech.lv }}</small>
              </span>
            </div>
            <hr />
          </div>

          <div class="mb-3">
            <app-new-offer-input-list
              v-model="form.requirement"
              label="Requirements for the candidate"
              placeholder="required expirience, knowledge of technologies, ect."
              dataName="requirement"
              :datalists="datalists.offerRequirements"
              @add-to-list="addListElement"
              required
              autocomplete="off"
              aria-describedby="offer-requirements-help-block"
            ></app-new-offer-input-list>
            <div
              id="offer-requirements-help-block"
              class="form-text text-danger"
            >
              {{ errors.requirements }}
            </div>

            <app-offer-prop-list
              icon="bookmark-check"
              iconColor="#0c5301"
              dataFieldName="requirementsList"
              :items="form.requirementsList"
              :onClick="removeElement"
            ></app-offer-prop-list>
            <hr />
          </div>

          <div class="mb-3">
            <app-new-offer-input-list
              v-model="form.task"
              label="Candidate daily responsibilities / tasks"
              placeholder="adding new features, code review, ect."
              dataName="task"
              :datalists="datalists.offerTasks"
              @add-to-list="addListElement"
              required
              autocomplete="off"
              aria-describedby="offer-tasks-help-block"
            ></app-new-offer-input-list>
            <div id="offer-tasks-help-block" class="form-text text-danger">
              {{ errors.tasks }}
            </div>

            <app-offer-prop-list
              icon="screwdriver"
              iconColor="#411801"
              dataFieldName="tasksList"
              :items="form.tasksList"
              :onClick="removeElement"
            ></app-offer-prop-list>
            <hr />
          </div>

          <div class="mb-3">
            <app-new-offer-input-list
              v-model="form.benefit"
              label="Additional benefits"
              placeholder="multisport, private health care, fruits, ect."
              dataName="benefit"
              :datalists="datalists.offerBenefit"
              @add-to-list="addListElement"
              required
              autocomplete="off"
              aria-describedby="offer-benefits-help-block"
            ></app-new-offer-input-list>
            <div id="offer-benefits-help-block" class="form-text text-danger">
              {{ errors.benefits }}
            </div>

            <app-offer-prop-list
              icon="gift"
              iconColor="#57038f"
              dataFieldName="benefitsList"
              :items="form.benefitsList"
              :onClick="removeElement"
            ></app-offer-prop-list>
            <hr />
          </div>

          <div class="mb-3">
            <label for="offer-location" class="form-label fw-bold"
              >Available locations to work from</label
            >
            <form @submit.prevent="addListElement('location')">
              <div class="input-group" style="flex-wrap: unset">
                <input
                  id="offer-location"
                  type="text"
                  class="form-control"
                  placeholder="London, Warsaw, remote"
                  required
                  v-model="form.location"
                  aria-describedby="offer-locations-help-block"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  aria-label="add current location"
                >
                  <i class="bi bi-geo-alt"></i>
                </button>
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  aria-label="add element to locations list"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </form>
            <div id="offer-locations-help-block" class="form-text text-danger">
              {{ errors.locations }}
            </div>
            <div
              class="mt-2 d-flex border border-info rounded p-2"
              v-if="form.locationsList.length"
            >
              <span
                class="badge bg-success m-1"
                :class="{ 'bg-warning': loc.name === 'remote' }"
                v-for="(loc, idx) in form.locationsList"
                :key="idx"
              >
                {{ loc.name }}
                <i class="bi bi-geo-alt" v-if="loc.name !== 'remote'"></i>
              </span>
            </div>
            <hr />
          </div>

          <div class="mb-2">
            <label for="offer-slalary-start" class="form-label fw-bold"
              >Salary range</label
            >
            <form>
              <div class="input-group" style="flex-wrap: unset">
                <span class="input-group-text">$ [k]</span>
                <span class="input-group-text">from</span>
                <input
                  class="form-control"
                  :class="[
                    errors.salary.start
                      ? 'is-invalid'
                      : touched.salary.start
                      ? 'is-valid'
                      : ''
                  ]"
                  type="number"
                  id="offer-slalary-start"
                  placeholder="min salary: 5, 8.5, 12.8 - number in thousands"
                  required
                  min="1"
                  step="0.1"
                  v-model.number.lazy="form.salary.start"
                  aria-labelledby="offer-slalary-start"
                  aria-describedby="offer-salary-help-block"
                  @blur="salaryStartBlurHandler"
                />
                <span class="input-group-text">to</span>
                <input
                  class="form-control"
                  :class="[
                    errors.salary.end
                      ? 'is-invalid'
                      : touched.salary.end
                      ? 'is-valid'
                      : ''
                  ]"
                  type="number"
                  id="offer-slalary-end"
                  required
                  min="1"
                  step="0.1"
                  placeholder="max salary: 8, 12.8, 25 - number in thousands"
                  v-model.number.lazy="form.salary.end"
                  aria-labelledby="offer-slalary-name"
                  aria-describedby="offer-salary-help-block"
                  @blur="salaryEndBlurHandler"
                />
              </div>
            </form>
            <div id="offer-salary-help-block" class="form-text text-danger">
              {{
                errors.salary.start ? errors.salary.start : errors.salary.end
              }}
            </div>
          </div>

          <div class="d-flex justify-content-evenly mt-5">
            <button
              class="btn btn-outline-info btn-lg"
              :class="{ disabled: loading }"
              :disabled="loading"
              type="button"
              @click="showOfferPreview"
            >
              Show Preview
            </button>
            <button
              class="btn btn-primary btn-lg"
              :class="{ disabled: loading }"
              :disabled="loading"
              type="button"
              @click="submitHandler"
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                v-if="loading"
              ></span>
              Post Offer
              <span class="visually-hidden" v-if="loading">Loading...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import OfferPropListVue from '../ui/offer-prop-list/OfferPropList.vue';
import NewOfferInputListVue from './NewOfferInputList.vue';
import * as validator from '../../validation/newOfferValidator.js';
import {
  setTouchedAll,
  checkNullAll,
  setDataToVueDataProp
} from '../../helpers';
import { postOffer } from './postOffer';
import { EventBus } from '../../events-bus';
import addMonths from 'date-fns/addMonths';

export default {
  name: 'NewOffer',
  components: {
    appOfferPropList: OfferPropListVue,
    appNewOfferInputList: NewOfferInputListVue
  },
  data() {
    return {
      userId: 'my-user-id',
      recoveredForm: null,
      loading: false,
      error: null,
      datalists: {
        offerStackLv: [
          'junior',
          'regular',
          'senior',
          'nice to know',
          'medium',
          'advanced'
        ]
      },
      userCompanies: [
        {
          name: 'Go0gle',
          id: 'faaf234245gy2442g425'
        },
        {
          name: 'MasterBorn',
          id: 'xcvf234245gy2442g425'
        }
      ],
      form: {
        company: '',
        title: '',
        description: '',
        stack: { name: '', lv: '' },
        stackList: [],
        requirement: '',
        requirementsList: [],
        task: '',
        tasksList: [],
        benefit: '',
        benefitsList: [],
        salary: { start: '', end: '' },
        location: '',
        locationsList: []
      },
      errors: {
        company: null,
        title: null,
        description: null,
        stack: null,
        requirements: null,
        tasks: null,
        benefits: null,
        salary: { start: null, end: null },
        locations: null
      },
      touched: {
        company: false,
        title: false,
        description: false,
        salary: { start: false, end: false },
        requirements: false,
        tasks: false,
        stack: false,
        benefits: false,
        locations: false
      }
    };
  },
  watch: {
    'form.company'(val) {
      this.checkCompany(val);
    },
    'form.title'(val) {
      this.checkTitle(val);
    },
    'form.description'(val) {
      this.checkDescription(val);
    },
    'form.salary.start'(val) {
      this.touched.salary.start = true;
      this.checkSalary(val, this.form.salary.end);
    },
    'form.salary.end'(val) {
      this.touched.salary.start = true;
      this.touched.salary.end = true;
      this.checkSalary(this.form.salary.start, val);
    },
    'form.requirementsList'(val) {
      this.touched.requirements = true;
      this.errors.requirements = validator.list(val, 15);
    },
    'form.tasksList'(val) {
      this.touched.tasks = true;
      this.errors.tasks = validator.list(val, 15);
    },
    'form.stackList'(val) {
      this.touched.stack = true;
      this.errors.stack = validator.list(val, 15);
    },
    'form.benefitsList'(val) {
      this.touched.benefits = true;
      this.errors.benefits = validator.list(val, 20);
    },
    'form.locationsList'(val) {
      this.touched.locations = true;
      this.errors.locations = validator.list(val, 20);
    }
  },
  methods: {
    async submitHandler() {
      this.timeouts.forEach((t) => {
        clearTimeout(t.id);
        t.cb();
      });
      this.timeouts = [];

      this.validateForm();
      const anyError = checkNullAll(this.errors);
      if (!anyError) {
        alert('form errors, correct');
        return;
      }
      this.loading = true;
      this.error = null;
      const payload = {
        userId: this.userId,
        createdAt: new Date(),
        expiresAt: addMonths(new Date(), 1),
        company: this.form.company,
        title: this.form.title,
        description: this.form.description,
        requirements: this.form.requirementsList,
        tasks: this.form.tasksList,
        stack: this.form.stackList,
        benefits: this.form.benefitsList,
        salary: this.form.salary,
        locations: this.form.locationsList
      };
      try {
        const id = await postOffer(payload);
        payload.id = id;
        this.$router.push({
          name: 'OfferPreview',
          params: {
            offer: payload,
            id
          },
          query: {
            create: 'success'
          }
        });
        this.$destroy();
      } catch (err) {
        this.error =
          'Could not post offer due to following error: ' + err.message ||
          err.toString();
        this.loading = false;
      }
    },
    checkCompany(val) {
      this.touched.company = true;
      this.errors.company = validator.company(val);
    },
    checkTitle(val) {
      this.touched.title = true;
      this.errors.title = validator.title(val);
    },
    checkDescription(val) {
      this.touched.description = true;
      this.errors.description = validator.description(val, 5000);
    },
    checkSalary(start, end) {
      const errors = validator.salary(start, end, this.touched.salary);

      this.errors.salary.start = errors.start;
      this.errors.salary.end = errors.end;
    },
    salaryStartBlurHandler(ev) {
      this.touched.salary.start = true;
      if (
        ev.target.value !== '' &&
        !this.touched.salaryEnd &&
        this.form.salary.end === ''
      ) {
        const salaryStart = Number(ev.target.value);
        this.form.salary.end =
          salaryStart <= 5
            ? Math.ceil(salaryStart) + 2
            : Math.ceil(salaryStart + salaryStart * 0.3);
      }

      this.checkSalary(ev.target.value, this.form.salary.end);
    },
    salaryEndBlurHandler(ev) {
      this.touched.salary.start = true;
      this.touched.salary.end = true;
      this.checkSalary(this.form.salary.start, ev.target.value);
    },
    showOfferPreview() {
      let missingRequiredField = ['title', 'company'].some(
        (x) => this.form[x].length === 0
      );

      const salary = {
        start: parseFloat(this.form.salary.start),
        end: parseFloat(this.form.salary.end)
      };

      missingRequiredField =
        missingRequiredField || salary.start <= 0 || salary.end <= 0;

      if (missingRequiredField) {
        return alert(
          'Fill at least title, salary and compny fields to show preview'
        );
      }

      const offer = {
        company: this.userCompanies.find((x) => x.id === this.form.company),
        benefits: this.form.benefitsList,
        tasks: this.form.tasksList,
        locations: this.form.locationsList,
        requirements: this.form.requirementsList,
        stack: this.form.stackList,
        description: this.form.description,
        title: this.form.title,
        salary: salary
      };

      this.$router.push({ name: 'OfferPreview', params: { offer } });
    },
    removeElement(formFieldName, idx) {
      this.$delete(this.form[formFieldName], idx);
    },
    addListElement(propName) {
      switch (propName) {
        case 'stack': {
          const list = this.form.stackList;
          const value = {
            name: this.form.stack.name.trim(),
            lv: this.form.stack.lv.trim() || 'regular'
          };

          this.form.stack.name = '';
          this.form.stack.lv = '';

          this.additemToList(
            list,
            value,
            (x, item) => x.name.toLowerCase() === item.name.toLowerCase()
          );

          break;
        }
        case 'location': {
          const list = this.form.locationsList;
          const value = {
            name: this.form.location.trim()
          };

          if (value.name.toLowerCase() === 'remote') {
            value.name = value.name.toLowerCase();
          }

          this.form.location = '';

          this.additemToList(
            list,
            value,
            (x, item) => x.name.toLowerCase() === item.name.toLowerCase()
          );

          break;
        }
        default: {
          const value = this.form[propName].trim();

          if (value === '') {
            return;
          }

          this.form[propName] = '';

          const list = this.form[propName + 'sList'];
          this.additemToList(
            list,
            value,
            (x, item) => x.toLowerCase() === item.toLowerCase()
          );
          break;
        }
      }
    },
    additemToList(list, item, findIdx) {
      const idx = list.findIndex((x) => findIdx(x, item));

      if (idx !== -1) {
        this.$delete(list, idx);
        const cb = () => {
          this.timeouts.splice(this.timeouts.indexOf(timeout, 1));
          this.$delete(
            list,
            list.findIndex((x) => findIdx(x, item))
          );
          list.push(item);
        };
        const timeout = { id: setTimeout(cb, 2300), cb };

        this.timeouts.push(timeout);
        return;
      }
      list.push(item);
    },
    validateForm() {
      setTouchedAll(this.touched);
      this.checkCompany(this.form.company);
      this.checkTitle(this.form.title);
      this.checkDescription(this.form.description);
      this.errors.stack = validator.list(this.form.stackList, 15);
      this.errors.requirements = validator.list(this.form.requirementsList, 15);
      this.errors.tasks = validator.list(this.form.tasksList, 15);
      this.errors.benefits = validator.list(this.form.benefitsList, 20);
      this.errors.locations = validator.list(this.form.locationsList, 20);
      this.checkSalary(this.form.salary.start, this.form.salary.end);
    },
    deleteUnsavedForm() {
      localStorage.removeItem('unsaved-new-offer');
      this.recoveredForm = null;
    },
    recoverUnsavedForm() {
      setDataToVueDataProp(this.form, this.recoveredForm.form);
      // hadndle missing company?
      this.recoveredForm = null;
    }
  },
  created() {
    this.offerCreatedHandler = (err) => {
      if (err) {
        this.error =
          'Offer was not posted due to following error: ' + err.message ||
          err.toString();
        return;
      }
      this.$destroy();
    };

    EventBus.$on('offer-created', this.offerCreatedHandler);

    this.timeouts = [];
    const unsavedData = localStorage.getItem('unsaved-new-offer');
    if (unsavedData !== null) {
      try {
        const recoveredForm = JSON.parse(unsavedData);
        if (recoveredForm.userId !== this.userId) {
          throw new Error('different user');
        }
        this.recoveredForm = recoveredForm;
      } catch (err) {
        console.log("couldn't parse unseved form: ", err);
        localStorage.removeItem('unsaved-new-offer');
      }
    }
  },
  mounted() {
    const vm = this;
    this.windowCloseHandler = (ev) => {
      let modified = [
        'company',
        'title',
        'description',
        'stack',
        'stackList',
        'requirement',
        'requirementsList',
        'task',
        'tasksList',
        'benefit',
        'benefitsList',
        'salary',
        'location',
        'locationsList'
      ].some((prop) => {
        if (typeof vm.form[prop] === 'string' || Array.isArray(vm.form[prop])) {
          return vm.form[prop].length > 0;
        }
        for (const key in vm.form[prop]) {
          return vm.form[prop][key].length > 0;
        }
      });

      if (modified) {
        const data = JSON.stringify(
          {
            userId: this.userId,
            date: new Date(),
            form: vm.form
          },
          null,
          2
        );
        console.log('saving data');
        localStorage.setItem('unsaved-new-offer', data);
      }
    };

    window.addEventListener('beforeunload', this.windowCloseHandler);
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.windowCloseHandler);
    this.timeouts.forEach((t) => clearTimeout(t.id));
    EventBus.$off('offer-created', this.offerCreatedHandler);
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.endsWith('offers/new/preview')) {
      return next();
    }

    let modified = [
      'company',
      'title',
      'description',
      'stack',
      'stackList',
      'requirement',
      'requirementsList',
      'task',
      'tasksList',
      'benefit',
      'benefitsList',
      'salary',
      'location',
      'locationsList'
    ].some((prop) => this.form[prop].length > 0);

    if (!modified) {
      return next();
    }

    new Promise((resolve, reject) => {
      const confirmed = window.confirm(
        'You have unsaved changes!\n\nDo you really want to leave?'
      );
      setTimeout(() => {
        if (confirmed) {
          return resolve();
        }
        return reject(new Error('cancelled by user'));
        // will be replaced by custom dialog which will return promise
      }, 1120);
    })
      .then(next)
      .catch(() => next(false));
  }
};
</script>
