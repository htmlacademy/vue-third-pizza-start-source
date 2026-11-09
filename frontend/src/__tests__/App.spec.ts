import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import App from "@/App.vue";

describe("App", () => {
  it("рендерит приветствие", () => {
    const wrapper = mount(App);

    expect(wrapper.find("h1").text()).toBe("Добро пожаловать!");
  });
});
