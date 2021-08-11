import Vuex from 'vuex';
import MyAccount from '@/components/user/MyAccount.vue';
import { createLocalVue, mount, shallow } from 'vue-test-utils';
import { getState } from '../../../mocks/store';
import { spy } from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('-> user / MyAccount.vue', () => {
  it('should render', () => {
    const wrapper = mount(MyAccount, {
      mocks: {
        $store: {
          state: getState(),
          dispatch: () => {}
        }
      }
    });

    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.find('#my-profile')).to.be.not.undefined;
    const src = wrapper.find('.__avatar').attributes().src;
    expect(src.length).to.greaterThan(0);

    expect(wrapper.findAll('.__user_details__card').length).to.be.eq(4);
  });

  it('should dispatch "fetchLoggedUserDetails"', () => {
    const dispatch = spy();

    const state = getState();
    state.auth.userDetails = null;

    shallow(MyAccount, {
      mocks: {
        $store: {
          state,
          dispatch
        }
      }
    });

    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledOnceWith('fetchLoggedUserDetails')).to.be.true;
  });

  it('should dispatch "fetchLoggedUserDetails"', () => {
    const dispatch = spy();

    const state = getState();
    state.auth.userDetails = null;

    shallow(MyAccount, {
      mocks: {
        $store: {
          state,
          dispatch
        }
      }
    });

    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledOnceWith('fetchLoggedUserDetails')).to.be.true;
  });
});
