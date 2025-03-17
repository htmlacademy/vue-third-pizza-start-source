<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <label
            v-for="sizeType in sizeItems"
            class="diameter__input diameter__input--small"
            :class="`diameter__input--${sizeType.value}`"
            :key="sizeType.id"
        >
          <input
              type="radio"
              name="diameter"
              :value="sizeType.value"
              class="visually-hidden"
              v-model="selectedSize"
          />
          <span>{{ sizeType.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  sizeItems: {
    type: Array,
    required: true,
  },
});

const selectedSize = ref(props.sizeItems[0].value);
</script>

<style scoped>
.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sheet__title {
  padding: 0 18px;
  font-size: 18px;
  font-weight: bold;
}

.sheet__content {
  display: flex;
  flex-wrap: wrap;
  padding: 18px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;
}

.diameter__input span {
  position: relative;
  padding-left: 46px;
  font-size: 16px;
  font-weight: bold;
}

.diameter__input span::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: #e5f5e0;
  background-image: url("@/assets/img/diameter.svg");
  background-repeat: no-repeat;
  background-position: center;
  transition: box-shadow 0.3s;
}

.diameter__input:hover span::before {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.diameter__input input:checked + span::before {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>
