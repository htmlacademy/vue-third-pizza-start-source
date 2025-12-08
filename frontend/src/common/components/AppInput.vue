<template>
  <label class="app-input">
    <span v-if="label" class="app-input__label">{{ label }}</span>
    <span v-if="!label && hasSlot" class="app-input__label">
      <slot name="label" />
    </span>

    <input
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      :autocomplete="autocomplete"
      :class="[
        'app-input__field',
        {
          'app-input__field--error': hasError,
          'app-input__field--success': hasSuccess,
        },
      ]"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <span v-if="errorMessage" class="app-input__error">{{ errorMessage }}</span>
    <span v-if="helpText && !errorMessage" class="app-input__help">{{
      helpText
    }}</span>
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    
    type: {
      type: String,
      default: "text",
    },
    
    name: {
      type: String,
      default: "",
    },
    
    modelValue: {
      type: [String, Number],
      default: "",
    },
    
    label: {
      type: String,
      default: "",
    },
    
    placeholder: {
      type: String,
      default: "",
    },
    
    disabled: {
      type: Boolean,
      default: false,
    },
    
    readonly: {
      type: Boolean,
      default: false,
    },
    
    required: {
      type: Boolean,
      default: false,
    },
    
    min: {
      type: [String, Number],
      default: null,
    },
    
    max: {
      type: [String, Number],
      default: null,
    },
    
    step: {
      type: [String, Number],
      default: null,
    },
    
    autocomplete: {
      type: String,
      default: "off",
    },
    
    errorMessage: {
      type: String,
      default: "",
    },
    
    helpText: {
      type: String,
      default: "",
    },
    
    success: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "input", "change", "blur", "focus"],
  computed: {
    hasError() {
      return Boolean(this.errorMessage);
    },

    hasSuccess() {
      return this.success && !this.hasError;
    },

    hasSlot() {
      return this.$slots.label;
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$emit("input", event);
    },

    handleChange(event) {
      this.$emit("change", event);
    },

    handleBlur(event) {
      this.$emit("blur", event);
    },

    handleFocus(event) {
      this.$emit("focus", event);
    },

    focus() {
      this.$refs.input?.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;

$green-500: #41b619;
$red-800: #e20338;

$purple-400: #b3abbc;

@mixin r-s14-h16 {
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
}

@mixin r-s16-h19 {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
}

@mixin l-s12-h14 {
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  line-height: 14px;
}

.app-input {
  display: block;
  width: 100%;
}

.app-input__label {
  @include r-s14-h16;

  display: block;
  margin-bottom: 4px;
  color: $black;
}

.app-input__field {
  @include r-s16-h19;

  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 8px 16px;

  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $white;
  font-family: inherit;

  &::placeholder {
    color: $purple-400;
  }

  &:focus {
    border-color: $green-500;
  }

  &--error {
    border-color: $red-800;

    &:focus {
      border-color: $red-800;
      box-shadow: 0 0 0 2px rgba($red-800, 0.2);
    }
  }

  &--success {
    border-color: $green-500;

    &:focus {
      border-color: $green-500;
      box-shadow: 0 0 0 2px rgba($green-500, 0.2);
    }
  }

  &:disabled {
    background-color: #f5f5f5;
    color: $purple-400;
    cursor: not-allowed;
  }

  &:readonly {
    background-color: #fafafa;
  }
}

.app-input:hover:not(:focus-within) {
  .app-input__field:not(:disabled):not(:readonly) {
    border-color: $black;
  }
}

.app-input__error {
  @include l-s12-h14;

  display: block;
  margin-top: 4px;
  color: $red-800;
}

.app-input__help {
  @include l-s12-h14;

  display: block;
  margin-top: 4px;
  color: $purple-400;
}
</style>
