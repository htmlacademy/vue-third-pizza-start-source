import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '../AppButton.vue'

describe('AppButton', () => {
  it('должен рендериться с текстом из слота', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Нажми меня'
      }
    })

    expect(wrapper.text()).toBe('Нажми меня')
  })

  it('должен иметь тип button по умолчанию', () => {
    const wrapper = mount(AppButton)
    
    expect(wrapper.find('button').attributes('type')).toBe('button')
  })

  it('должен применять переданный тип', () => {
    const wrapper = mount(AppButton, {
      props: {
        type: 'submit'
      }
    })
    
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('должен применять CSS класс для размера', () => {
    const wrapper = mount(AppButton, {
      props: {
        size: 'large'
      }
    })
    
    expect(wrapper.find('.app-button--large').exists()).toBe(true)
  })

  it('должен применять CSS класс для варианта', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'secondary'
      }
    })
    
    expect(wrapper.find('.app-button--secondary').exists()).toBe(true)
  })

  it('должен быть отключен когда disabled=true', () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true
      }
    })
    
    expect(wrapper.find('button').element.disabled).toBe(true)
    expect(wrapper.find('.app-button--disabled').exists()).toBe(true)
  })

  it('должен эмитить событие click при клике', async () => {
    const wrapper = mount(AppButton)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  it('не должен эмитить событие click когда disabled', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted().click).toBeUndefined()
  })

  it('должен показывать спиннер в состоянии загрузки', () => {
    const wrapper = mount(AppButton, {
      props: {
        loading: true
      },
      slots: {
        default: 'Загрузка'
      }
    })
    
    expect(wrapper.find('.app-button__spinner').exists()).toBe(true)
    expect(wrapper.text()).not.toBe('Загрузка')
  })

  it('должен быть отключен в состоянии загрузки', () => {
    const wrapper = mount(AppButton, {
      props: {
        loading: true
      }
    })
    
    expect(wrapper.find('button').element.disabled).toBe(true)
  })

  it('не должен эмитить событие click в состоянии загрузки', async () => {
    const wrapper = mount(AppButton, {
      props: {
        loading: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted().click).toBeUndefined()
  })
})



