<template>
  <button
    :type="type"
    :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      {
        'app-button--disabled': disabled,
        'app-button--loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="app-button__spinner"></span>
    <slot v-else />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    
    type: {
      type: String,
      default: "button",
      validator: (value) => ["button", "submit", "reset"].includes(value),
    },
    
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "danger"].includes(value),
    },
    
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    
    disabled: {
      type: Boolean,
      default: false,
    },
    
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit("click", event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #ffffff;
$black: #000000;

$green-300: #8cb97c;
$green-400: #48d618;
$green-500: #41b619;
$green-600: #38a413;

$red-800: #e20338;
$red-900: #c20532;

$silver-200: #eaeaea;
$silver-300: #d7d7d7;

$shadow-medium:
  0 16px 24px rgba($black, 0.06),
  0 2px 6px rgba($black, 0.04),
  0 0 1px rgba($black, 0.04);

@mixin typography_template($font-size, $line-height, $font-weight: 400) {
  font-size: $font-size;
  font-weight: $font-weight;
  font-style: normal;
  line-height: $line-height;
}

@mixin b-s14-h16 {
  @include typography_template(14px, 16px, 700);
}

@mixin b-s16-h19 {
  @include typography_template(16px, 19px, 700);
}

@mixin b-s18-h21 {
  @include typography_template(18px, 21px, 700);
}

.app-button {
  @include b-s16-h19;
  font-family: inherit;
  display: inline-block;

  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 12px 24px;

  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  &--primary {
    color: $white;
    background-color: $green-500;

    &:hover:not(:active):not(.app-button--disabled):not(.app-button--loading) {
      background-color: $green-400;
    }

    &:active:not(.app-button--disabled):not(.app-button--loading) {
      background-color: $green-600;
    }
  }

  &--secondary {
    color: $black;
    background-color: $silver-200;

    &:hover:not(:active):not(.app-button--disabled):not(.app-button--loading) {
      background-color: $silver-300;
    }

    &:active:not(.app-button--disabled):not(.app-button--loading) {
      background-color: $silver-300;
      transform: scale(0.98);
    }
  }

  &--danger {
    color: $white;
    background-color: $red-800;

    &:hover:not(:active):not(.app-button--disabled):not(.app-button--loading) {
      background-color: $red-900;
    }

    &:active:not(.app-button--disabled):not(.app-button--loading) {
      background-color: $red-900;
      transform: scale(0.98);
    }
  }

  &--small {
    @include b-s14-h16;
    padding: 8px 16px;
  }

  &--medium {
    @include b-s16-h19;
    padding: 12px 24px;
  }

  &--large {
    @include b-s18-h21;
    padding: 16px 32px;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &.app-button--primary {
      background-color: $green-300;
      color: rgba($white, 0.5);
    }
  }

  &--loading {
    cursor: wait;
    pointer-events: none;
  }

  &:focus:not(.app-button--disabled):not(.app-button--loading) {
    opacity: 0.8;
  }
}

.app-button__spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
