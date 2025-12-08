<template>
  <label :class="`size-selector size-selector--${getSizeClass(index)}`">
    <input
      type="radio"
      name="size"
      :value="size.id"
      :checked="isSelected"
      class="visually-hidden"
      @change="handleChange"
    />
    <span>{{ size.name }}</span>
  </label>
</template>

<script>
export default {
  name: "SizeSelector",
  props: {
    
    size: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && typeof value.id !== "undefined" && value.name;
      },
    },
    
    index: {
      type: Number,
      required: true,
    },
    
    selectedId: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ["update:selectedId", "change"],
  computed: {
    isSelected() {
      return this.selectedId === this.size.id;
    },
  },
  methods: {
    getSizeClass(index) {
      const sizeClasses = ["small", "normal", "big"];
      return sizeClasses[index] || "normal";
    },

    handleChange() {
      this.$emit("update:selectedId", this.size.id);
      this.$emit("change", this.size);
    },
  },
};
</script>

<style lang="scss" scoped>
$green-100: #e1ffd7;
$green-500: #41b619;

$shadow-regular: 0 0 0 2px rgba($green-500, 0.6);
$shadow-large: 0 0 0 2px $green-500;

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

.size-selector {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;
    padding-left: 46px;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
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
