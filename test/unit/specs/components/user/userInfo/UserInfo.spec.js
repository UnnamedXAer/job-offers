import Vuex from 'vuex';
import { createLocalVue, shallow } from 'vue-test-utils';
import UserInfo from '@/components/user/userInfo/UserInfo.vue';
import { getDefaultState as authGetDefaultState } from '@/store/auth/auth.js';
import { getDefaultState as userDetailsGetDefaultState } from '@/store/auth/editUserDetails.js';

const localVue = createLocalVue();
localVue.use(Vuex);

const mockedUser = {
  id: '-zxf34gbb356-35f3',
  fname: 'Dean',
  lname: 'Winchester',
  location: 'Rzeszów',
  avatarUrl: 'http://localhost:3998/home/avatar-placeholder'
};

describe('-> user / UserInfo.vue', () => {
  it('should render user base info and avatar', () => {
    const wrapper = shallow(UserInfo, {
      mocks: {
        $store: {
          modules: { editUserDetails: userDetailsGetDefaultState() },
          state: {
            auth: {
              ...authGetDefaultState(),
              user: { ...mockedUser }
            }
          }
        }
      }
    });

    const src = wrapper.find('.__avatar').attributes().src;
    expect(src).to.be.eq(mockedUser.avatarUrl);
    expect(wrapper.text()).to.include(
      mockedUser.fname + ' ' + mockedUser.lname
    );
  });
});
