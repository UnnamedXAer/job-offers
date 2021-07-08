<template>
  <div class="mb-5">
    <div class="row">
      <h1>Create a job offer</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-12" style="max-width: 960px">
        <!-- <form @submit.prevent="submitHandler" autocomplete="off"> -->
        <div class="mb-3">
          <label class="form-label fw-bold" for="offer-company"
            >Select Company</label
          >
          <select
            class="form-select"
            id="offer-company"
            required
            aria-placeholder="select company"
            v-model="form.company"
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
            {{ errors.title }}
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
            id="offer-title"
            placeholder="Job Title"
            required
            autocomplete="off"
            v-model="form.title"
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
            id="offer-description"
            rows="3"
            v-model="form.description"
          ></textarea>
          <div id="offer-description-help-block" class="form-text text-danger">
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
          ></app-new-offer-input-list>

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
          ></app-new-offer-input-list>

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
          ></app-new-offer-input-list>

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
          <div class="input-group" style="flex-wrap: unset">
            <input
              id="offer-location"
              type="text"
              class="form-control"
              placeholder="London, Warsaw, remote"
              v-model="form.location"
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
              type="button"
              aria-label="add element to locations list"
              @click="addListElement('locationsList')"
            >
              <i class="bi bi-plus"></i>
            </button>
          </div>

          <div
            class="mt-2 d-flex border border-info rounded p-2"
            v-if="form.locationsList.length"
          >
            <span
              class="badge bg-success m-1"
              :class="{ 'bg-warning': typeof loc === 'string' }"
              v-for="(loc, idx) in form.locationsList"
              :key="idx"
            >
              {{ typeof loc === 'string' ? loc : loc.name }}
              <i class="bi bi-geo-alt" v-if="typeof loc === 'object'"></i>
            </span>
          </div>
          <hr />
        </div>

        <button class="btn btn-primary" type="button" @click="submitHandler">
          Create
        </button>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
import OfferPropListVue from '../ui/offer-prop-list/OfferPropList.vue';
import NewOfferInputListVue from './NewOfferInputList.vue';
export default {
  components: {
    appOfferPropList: OfferPropListVue,
    appNewOfferInputList: NewOfferInputListVue
  },
  data() {
    return {
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
        stackList: [{ name: 'node.js', lv: 'junior' }],
        requirement: '',
        requirementsList: [
          '5 years of exp in node.js',
          'good knowledge of React.js'
        ],
        task: '',
        tasksList: ['fixing bugs', 'updating docs', 'making me coffe'],
        benefit: '',
        benefitsList: ['multisport', 'multi steps', 'private helth insurance'],
        salary: '',
        location: '',
        locationsList: ['remote', { name: 'Warsaw' }]
      },
      errors: {
        company: '',
        title: '',
        description: '',
        stack: '',
        requirements: '',
        tasks: '',
        benefits: '',
        salary: '',
        location: ''
      }
    };
  },
  methods: {
    submitHandler() {
      this.timeouts.forEach((t) => {
        clearTimeout(t.id);
        t.cb();
      });
      this.timeouts = [];
      this.$router.replace('user/offers/')
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
    }
  },
  created() {
    this.timeouts = [];
  },
  destroyed() {
    this.timeouts.forEach((t) => clearTimeout(t.id));
  },
  beforeRouteLeave(to, from, next) {
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

    if (
      !modified ||
      window.confirm(
        'You have unsaved changes!\n\nDo you really want to leave?'
      )
    ) {
      return next();
    }
    next(false);
  }
};
</script>

<style scoped>
.__list {
  padding-left: 0.5rem;
}
.__list li {
  list-style-type: none;
  position: relative;
}

.__list li:hover {
  cursor: pointer;
  background: var(--bs-light);
}

.__remove_icon {
  display: none;
}

.__list li:hover .__remove_icon {
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1rem;
}

.__list li i {
  margin-right: 1rem;
}
</style>
