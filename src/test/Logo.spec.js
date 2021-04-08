import { mount, shallowMount } from '@vue/test-utils'
import PageTitle from '@/components/PageTitle.vue'

const factory = () => {
  return shallowMount(PageTitle, {})
}

describe('PageTitle', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(PageTitle)
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
