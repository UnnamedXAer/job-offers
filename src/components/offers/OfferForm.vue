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

      <app-offer-form-recovered
        :deleteUnsavedForm="deleteUnsavedForm"
        :recoverUnsavedForm="recoverUnsavedForm"
        :recoveredForm="recoveredForm"
      ></app-offer-form-recovered>

      <div class="row">
        <h1>
          {{ $route.params.id ? 'Modify the offer' : 'Create a job offer' }}
        </h1>
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
              class="mt-2 d-flex border border-info rounded py-2 px-1 flex-wrap"
              :class="{ 'border-warning': form.stackList.length > 10 }"
              v-if="form.stackList.length"
            >
              <span
                class="badge bg-primary m-1"
                style="cursor: pointer"
                v-for="(tech, idx) in form.stackList"
                :key="tech.name"
                @click="removeElement('stackList', idx)"
                >{{ tech.name }}
                <small class="__badge_small" v-if="tech.lv">{{
                  tech.lv
                }}</small>
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
                  v-model.lazy.trim="form.location"
                  aria-describedby="offer-locations-help-block"
                  ref="location"
                />
                <button
                  class="btn btn-outline-secondary position-relative"
                  type="button"
                  aria-label="add current location"
                  @click="addCurrentLocation"
                >
                  <span
                    v-if="geolocationError"
                    class="
                      position-absolute
                      top-0
                      start-0
                      translate-middle
                      p-2
                      bg-danger
                      border border-light
                      rounded-circle
                    "
                    :title="geolocationError"
                    @click.stop="geolocationError = null"
                  >
                    <span class="visually-hidden">New alerts</span>
                  </span>
                  <div
                    class="spinner-border text-primary spinner-border-sm"
                    style="font-size: 0.7em"
                    role="status"
                    v-if="geolocationLoading"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <i class="bi bi-geo-alt" v-else></i>
                </button>
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  aria-label="add element to locations list"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <div
                class="input-group"
                style="flex-wrap: unset"
                v-if="form.locationLat"
              >
                <span class="input-group-text">Lat</span>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="form.locationLat"
                  readonly
                />
                <span class="input-group-text">Lng</span>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="form.locationLng"
                  readonly
                />
              </div>
            </form>
            <div id="offer-locations-help-block" class="form-text text-danger">
              {{ geolocationError }}
              <br v-if="errors.locations || geolocationError" />
              {{ errors.locations }}
            </div>
            <div
              class="mt-2 d-flex border border-info rounded p-2 flex-wrap"
              v-if="form.locationsList.length"
            >
              <span
                class="badge bg-success m-1"
                style="cursor: pointer"
                :class="{ 'bg-warning': !!customLocation(loc.name) }"
                v-for="(loc, idx) in form.locationsList"
                :key="idx"
                @click="removeElement('locationsList', idx)"
              >
                {{ loc.name }}
                <i class="bi bi-geo-alt" v-if="!customLocation(loc.name)"></i>
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

          <div class="mb-2">
            <label for="offer-expirationdate" class="form-label fw-bold"
              >Expiration Date</label
            >
            <input
              class="form-control"
              :class="[
                errors.expirationDate
                  ? 'is-invalid'
                  : touched.expirationDate
                  ? 'is-valid'
                  : ''
              ]"
              type="date"
              id="offer-expirationdate"
              required
              :min="expirationMinDate"
              :placeholder="expirationDatePlaceholder"
              v-model.lazy="form.expirationDate"
              aria-labelledby="offer-expirationdate"
              aria-describedby="offer-expirationdate-help-block"
            />
            <div id="offer-salary-help-block" class="form-text text-danger">
              {{ errors.expirationDate }}
            </div>
          </div>

          <app-offer-form-actions
            :mode="$route.params.id ? 'update' : 'create'"
            :loading="loading"
            :showOfferPreview="showOfferPreview"
            :submitHandler="submitForm"
          ></app-offer-form-actions>
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
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import CreateOfferFormRecoveredVue from './CreateOfferFormRecovered.vue';
import { fetchOffer } from './fetchOffer';
import { updateOffer } from './updateOffer';
import OfferFormActionsVue from './OfferFormActions.vue';
import { mockedCompanies } from '../../data_dev/mocked';
import { getCurrentLocation, getCustomLocation } from '../../helpers/location';

export default {
  name: 'NewOffer',
  components: {
    appOfferPropList: OfferPropListVue,
    appNewOfferInputList: NewOfferInputListVue,
    appOfferFormActions: OfferFormActionsVue,
    appOfferFormRecovered: CreateOfferFormRecoveredVue
  },
  props: {
    id: String
  },
  data() {
    return {
      expirationMinDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      expirationDatePlaceholder: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
      userId: 'my-user-id',
      recoveredForm: null,
      loading: false,
      error: null,
      geolocationLoading: false,
      geolocationError: null,
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
      userCompanies: mockedCompanies,
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
        locationLat: '',
        locationLng: '',
        locationsList: [],
        expirationDate: format(addMonths(new Date(), 1), 'yyyy-MM-dd')
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
        locations: null,
        expirationDate: null
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
        locations: false,
        expirationDate: false
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
    },
    'form.expirationDate'(val) {
      this.touched.expirationDate = true;
      this.errors.expirationDate = validator.expirationDate(val);
    }
  },
  methods: {
    async submitForm() {
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
        expiresAt: new Date(
          new Date(this.form.expirationDate).setHours(23, 59, 59, 999)
        ),
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

      let id = this.$route.params.id;

      if (id) {
        try {
          await updateOffer(id, payload);
          payload.id = id;
          payload.company = this.userCompanies.find(
            (company) => company.id === payload.company
          );
          this.$router.replace({
            name: 'OfferPreview',
            params: {
              offer: payload,
              id: id
            },
            query: {
              update: 'success'
            }
          });
          this.$destroy();
        } catch (err) {
          this.error =
            'Could not update offer due to following error: ' + err.message ||
            err.toString();
          this.loading = false;
        }
        return;
      }

      try {
        const id = await postOffer(payload);
        payload.id = id;
        payload.company = this.userCompanies.find(
          (company) => company.id === payload.company
        );
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
      let missingRequiredField = ['title', 'company', 'expirationDate'].some(
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
        salary: salary,
        expiresAt: new Date(this.form.expirationDate)
      };

      this.$router.push({ name: 'OfferPreview', params: { offer } });
    },
    addCurrentLocation() {
      if (this.geolocationLoading) {
        return;
      }

      this.geolocationLoading = true;
      this.geolocationError = null;

      getCurrentLocation()
        .then((loc) => {
          this.form.location = loc.name;
          this.form.locationLat = loc.coords.lat;
          this.form.locationLng = loc.coords.lng;
          this.$refs.location.focus();
        })
        .catch((err) => {
          this.geolocationError = err.message;
        })
        .finally(() => {
          this.geolocationLoading = false;
        });
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
            name: this.form.location,
            lat: this.form.locationLat,
            lng: this.form.locationLng
          };

          if (this.customLocation(value.name)) {
            value.name = value.name.toLowerCase();
          }

          this.form.location = '';
          this.form.locationLat = '';
          this.form.locationLng = '';
          this.geolocationError = null;

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
        const timeout = { id: setTimeout(cb, 300), cb };

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
    },
    customLocation: getCustomLocation
  },
  created() {
    this.timeouts = [];
    if (this.$route.params.id) {
      this.fetchingOffer = true;
      fetchOffer(this.$route.params.id)
        .then((offer) => {
          this.form.title = offer.title;
          this.form.description = offer.description;
          this.form.company = offer.company.id;
          this.form.salary.start = offer.salary.start;
          this.form.salary.end = offer.salary.end;
          this.form.benefitsList = offer.benefits;
          this.form.tasksList = offer.tasks;
          this.form.stackList = offer.stack;
          this.form.benefitsList = offer.benefits;
          this.form.requirementsList = offer.requirements;
          this.form.locationsList = offer.locations;
          this.form.expirationDate = format(offer.expiresAt, 'yyyy-MM-dd');
        })
        .catch((err) => {
          this.error =
            'Could not fetch the offer data due to: ' +
            (err.message || err.toString());
        })
        .finally(() => {
          this.fetchingOffer = true;
        });

      // do not store unsaved changes in edit mode
      return;
    }

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
    if (this.$route.params.id) {
      // for now do not check if form was modified i edit mode
      return;
    }

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

      modified = modified || this.touched.expirationDate;

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
    if (this.$route.params.id) {
      return;
    }
    window.removeEventListener('beforeunload', this.windowCloseHandler);
    this.timeouts.forEach((t) => clearTimeout(t.id));
    EventBus.$off('offer-created', this.offerCreatedHandler);
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.endsWith('offers/new/preview')) {
      return next();
    }

    if (this.$route.params.id) {
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

    modified = modified || this.touched.expirationDate;

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
      }, 20);
    })
      .then(next)
      .catch(() => next(false));
  }
};
</script>
<style scoped>
.__badge_small {
  font-size: 0.8em;
  color: #ccc;
}
</style>
