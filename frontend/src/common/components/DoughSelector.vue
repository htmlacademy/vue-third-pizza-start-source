<template>
  <label
    :class="`dough-selector dough-selector--${doughType.id === 1 ? 'light' : 'large'}`"
  >
    <input
      type="radio"
      name="dough"
      :value="doughType.id"
      :checked="isSelected"
      class="visually-hidden"
      @change="handleChange"
    />
    <b>{{ doughType.name }}</b>
    <span>{{ doughType.description }}</span>
  </label>
</template>

<script>
export default {
  name: "DoughSelector",
  props: {
    
    doughType: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          value &&
          typeof value.id !== "undefined" &&
          value.name &&
          value.description
        );
      },
    },
    
    selectedId: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ["update:selectedId", "change"],
  computed: {
    isSelected() {
      return this.selectedId === this.doughType.id;
    },
  },
  methods: {
    handleChange() {
      this.$emit("update:selectedId", this.doughType.id);
      this.$emit("change", this.doughType);
    },
  },
};
</script>

<style lang="scss" scoped>
$green-500: #41b619;

$shadow-regular: 0 0 0 2px rgba($green-500, 0.6);
$shadow-large: 0 0 0 2px $green-500;

@mixin r-s16-h19 {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
}

@mixin l-s11-h13 {
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  line-height: 13px;
}

@mixin p_center-v {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

.dough-selector {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}

.visually-hidden {
  position: absolute;

  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;

  clip-path: inset(100%);
}
</style>
