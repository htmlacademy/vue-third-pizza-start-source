<template>
  <label :class="['app-radio', { 'app-radio--disabled': disabled }]">
    <input
      :type="type"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      class="app-radio__input"
      @change="handleChange"
    />
    <span class="app-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "AppRadio",
  props: {
    
    type: {
      type: String,
      default: "radio",
      validator: (value) => ["radio", "checkbox"].includes(value),
    },
    
    name: {
      type: String,
      required: true,
    },
    
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: null,
    },
    
    label: {
      type: String,
      default: "",
    },
    
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "change"],
  computed: {
    isChecked() {
      if (this.type === "checkbox") {
        return (
          Array.isArray(this.modelValue) && this.modelValue.includes(this.value)
        );
      }
      return this.modelValue === this.value;
    },
  },
  methods: {
    handleChange(event) {
      if (this.type === "checkbox") {
        const currentValues = Array.isArray(this.modelValue)
          ? [...this.modelValue]
          : [];

        if (event.target.checked) {
          if (!currentValues.includes(this.value)) {
            currentValues.push(this.value);
          }
        } else {
          const index = currentValues.indexOf(this.value);
          if (index > -1) {
            currentValues.splice(index, 1);
          }
        }

        this.$emit("update:modelValue", currentValues);
        this.$emit("change", currentValues);
      } else {
        if (event.target.checked) {
          this.$emit("update:modelValue", this.value);
          this.$emit("change", this.value);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;

$green-500: #41b619;

$purple-400: #b3abbc;
$purple-800: #685879;

$silver-200: #eaeaea;

@mixin r-s16-h19 {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
}

@mixin p_center-v {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

.app-radio {
  cursor: pointer;
  display: flex;
  align-items: center;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.app-radio__input {
  display: none;
}

.app-radio__label {
  @include r-s16-h19;

  position: relative;
  padding-left: 28px;

  &::before {
    @include p_center-v;

    display: block;
    box-sizing: border-box;
    width: 20px;
    height: 20px;

    content: "";
    transition: 0.3s;

    border: 1px solid $purple-400;
    border-radius: 50%;
    background-color: $white;
  }
}

.app-radio:hover:not(.app-radio--disabled) {
  .app-radio__input:not(:checked) + .app-radio__label::before {
    border-color: $purple-800;
  }
}

.app-radio__input:checked + .app-radio__label::before {
  border: 6px solid $green-500;
}

.app-radio__input:disabled + .app-radio__label::before {
  border-color: $purple-400;
  background-color: $silver-200;
}

.app-radio__input:disabled:checked + .app-radio__label::before {
  border: 6px solid $purple-400;
}
</style>
