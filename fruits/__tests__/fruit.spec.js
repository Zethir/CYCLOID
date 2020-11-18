import { shallowMount, createLocalVue, RouterLink } from '@vue/test-utils'
import Fruit from '@/views/Fruit.vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import flushPromises from 'flush-promises'
import VueRouter from 'vue-router'
import mockRouter from '@/router/mockRouter'
import VueTypedJs from 'vue-typed-js'
import capitalize from '@/filters/capitalize';

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(ElementUI)
localVue.use(VueRouter)
localVue.use(VueTypedJs)
localVue.filter('capitalize', capitalize)


describe('Fruit', () => {
  let router
  let store
  let actions
  let state
  let wrapper

  beforeEach(async () => {
    actions = {
      fetchFruit: jest.fn(),
    }
    state = {
      fruit: {}
    }
    store = new Vuex.Store({
      actions,
      state
    })
    router = mockRouter.mock()
    router.push('/')
    await flushPromises()
    wrapper = shallowMount(Fruit, {
      localVue,
      router,
      store
    })
  })
  
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('has the proper description', () => {
    const desc = wrapper.find('.fruit-desc')
    expect(desc.text()).toContain('Price')
    expect(desc.text()).toContain('Taste')
    expect(desc.text()).toContain('Description')
    expect(desc.text()).toContain('Color')
    expect(desc.text()).toContain('Expires')
  })

  it('should redirect to / when clicking on back button', async () => {
    wrapper.find('.go-back-button').trigger('click')
    await flushPromises()
    expect(wrapper.vm.$route.name).toBe('Fruits');
  })
})
