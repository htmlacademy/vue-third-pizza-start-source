import { mount } from '@vue/test-utils';
import AppCounter from '@/common/components/AppCounter.vue';

describe('AppCounter.vue', () => {
  it('renders initial value', () => {
    const wrapper = mount(AppCounter, {
      props: { value: 5 }
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('5');
  });

    it('minus button emits correct value', async () => {
    const wrapper = mount(AppCounter, { props: { value: 5 } });
    const minusButton = wrapper.find('.counter__button--minus'); 
    await minusButton.trigger('click');
    expect(wrapper.emitted('input')[0]).toEqual([4]);
    });

  it('input emits correct value on manual change', async () => {
    const wrapper = mount(AppCounter, { props: { value: 5 } });
    const input = wrapper.find('input');
    await input.setValue('7');
    expect(wrapper.emitted('input')[0]).toEqual([7]);
  });
});