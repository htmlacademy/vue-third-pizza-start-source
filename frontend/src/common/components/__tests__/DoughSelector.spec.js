import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DoughSelector from '../DoughSelector.vue'

describe('DoughSelector', () => {
  const mockDoughType = {
    id: 1,
    name: 'Тонкое',
    description: 'Из твердых сортов пшеницы',
    price: 300
  }

  it('должен рендериться с корректными данными', () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: mockDoughType,
        selectedId: null
      }
    })

    expect(wrapper.find('b').text()).toBe('Тонкое')
    expect(wrapper.find('span').text()).toBe('Из твердых сортов пшеницы')
  })

  it('должен отображать выбранное состояние', () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: mockDoughType,
        selectedId: 1
      }
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.element.checked).toBe(true)
  })

  it('должен отображать невыбранное состояние', () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: mockDoughType,
        selectedId: 2
      }
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.element.checked).toBe(false)
  })

  it('должен эмитить событие change при клике', async () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: mockDoughType,
        selectedId: null
      }
    })

    const input = wrapper.find('input[type="radio"]')
    await input.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted().change[0]).toEqual([mockDoughType])
  })

  it('должен эмитить событие update:selectedId при клике', async () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: mockDoughType,
        selectedId: null
      }
    })

    const input = wrapper.find('input[type="radio"]')
    await input.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('update:selectedId')
    expect(wrapper.emitted()['update:selectedId'][0]).toEqual([1])
  })

  it('должен применять правильный CSS класс для тонкого теста', () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: { ...mockDoughType, id: 1 },
        selectedId: null
      }
    })

    expect(wrapper.find('.dough-selector--light').exists()).toBe(true)
  })

  it('должен применять правильный CSS класс для толстого теста', () => {
    const wrapper = mount(DoughSelector, {
      props: {
        doughType: { ...mockDoughType, id: 2, name: 'Толстое' },
        selectedId: null
      }
    })

    expect(wrapper.find('.dough-selector--large').exists()).toBe(true)
  })
})



