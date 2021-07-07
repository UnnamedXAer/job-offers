<template>
  <div class="mb-5">
    <div class="row">
      <h1>Create a job offer</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-12" style="max-width: 960px">
        <form @submit.prevent="submitHandler">
          <div class="mb-3">
            <label for="offer-company">Select Company</label>
            <select class="form-select" id="offer-company">
              <option selected disabled>Pick company for the offer</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div id="offer-company-help-block" class="form-text text-danger">
              {{ errors.title }}
            </div>
          </div>

          <div class="mb-3">
            <label for="offer-title">Position title</label>
            <input
              type="text"
              class="form-control"
              id="offer-title"
              placeholder="Job Title"
            />
            <div id="offer-title-help-block" class="form-text text-danger">
              {{ errors.title }}
            </div>
          </div>

          <div class="mb-3">
            <label for="offer-description" class="form-label"
              >General Description</label
            >
            <textarea
              class="form-control"
              id="offer-description"
              rows="3"
            ></textarea>
            <div
              id="offer-description-help-block"
              class="form-text text-danger"
            >
              {{ errors.description }}
            </div>
          </div>

          <div class="mb-2">
            <label for="offer-stack" class="form-label">Tech Stack</label>
            <input
              type="text"
              class="form-control"
              id="offer-stack"
              placeholder="Node.js, Oracle, ect."
            />

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
          </div>

          <div class="mb-3">
            <label for="offer-requirements" class="form-label"
              >RequirementsList</label
            >
            <input
              type="text"
              class="form-control"
              id="offer-requirements"
              minlength="5"
              placeholder="expirience, known technologies, ect."
            />

            <app-offer-prop-list
              icon="bookmark-check"
              iconColor="#0c5301"
              dataFieldName="requirementsList"
              :items="form.requirementsList"
              :onClick="removeElement"
            ></app-offer-prop-list>
          </div>

          <div class="mb-3">
            <label for="offer-tasks" class="form-label">Tech Stack</label>
            <input
              type="text"
              class="form-control"
              id="offer-tasks"
              minlength="5"
              placeholder="adding new features, code review, ect."
            />
            <app-offer-prop-list
              icon="screwdriver"
              iconColor="#411801"
              dataFieldName="tasksList"
              :items="form.tasksList"
              :onClick="removeElement"
            ></app-offer-prop-list>
          </div>

          <div class="mb-3">
            <label for="offerbenefits" class="form-label">Benefits</label>
            <input
              type="text"
              class="form-control"
              id="offer-benefits"
              minlength="5"
              placeholder="expirience, known technologies, ect."
            />
            <hr />
            <app-offer-prop-list
              icon="gift"
              iconColor="#57038f"
              dataFieldName="benefitsList"
              :items="form.benefitsList"
              :onClick="removeElement"
            ></app-offer-prop-list>
          </div>

          <div class="mb-3">
            <div class="input-group" style="flex-wrap: unset">
              <input
                id="offer-location"
                type="text"
                class="form-control"
                placeholder="London, Warsaw, remote"
              />
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-geo-alt"></i>
              </button>
            </div>

            <div
              class="mt-2 d-flex border border-info rounded p-2"
              :class="{ 'border-warning': form.stackList.length > 10 }"
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
          </div>

          <button class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import OfferPropListVue from '../ui/offer-prop-list/OfferPropList.vue';
export default {
  components: {
    appOfferPropList: OfferPropListVue
  },
  data() {
    return {
      form: {
        company: '',
        title: '',
        description: '',
        stack: '',
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
    submitHandler() {},
    removeElement(formFieldName, idx) {
      this.form[formFieldName].splice(idx, 1);
    }
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
