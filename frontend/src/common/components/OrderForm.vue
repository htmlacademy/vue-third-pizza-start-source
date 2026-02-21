<template>
  <div class="cart-form">
    <!-- Селектор доставки -->
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <select
        class="select"
        :value="selectValue"
        @change="handleDeliveryChange"
      >
        <option value="pickup">Заберу сам</option>
        <option value="new">Новый адрес</option>
        <option
          v-for="addr in profileStore.addresses"
          :key="addr.id"
          :value="addr.id"
        >
          {{ addr.name }}
        </option>
      </select>
    </label>

    <!-- Телефон -->
    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
        type="tel"
        :value="phone"
        @input="phone = $event.target.value"
        placeholder="+7 999 999-99-99"
        required
      />
    </label>

    <!-- Блок адреса -->
    <div v-if="deliveryType !== 'pickup'" class="cart-form__address">
      <span class="cart-form__label">Адрес доставки:</span>

      <!-- Улица -->
      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            :value="address.street"
            @input="updateAddress('street', $event.target.value)"
            placeholder="Введите название улицы"
            :disabled="isExistingAddress"
            required
          />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            :value="address.building"
            @input="updateAddress('building', $event.target.value)"
            placeholder="Номер дома"
            :disabled="isExistingAddress"
            required
          />
        </label>
      </div>
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            :value="address.flat"
            @input="updateAddress('flat', $event.target.value)"
            placeholder="Номер квартиры"
            :disabled="isExistingAddress"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProfileStore } from "@/stores/profile";
import { toRaw } from "vue";

const profileStore = useProfileStore();

const props = defineProps({
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: Object,
    default: () => ({}),
  },
  deliveryType: {
    type: String,
    default: "pickup", // pickup | new | existing
  },
});

const emit = defineEmits([
  "update:phone",
  "update:address",
  "update:deliveryType",
]);

// двусторонние биндинги
const phone = computed({
  get: () => props.phone,
  set: (value) => emit("update:phone", value),
});

const deliveryType = computed({
  get: () => props.deliveryType,
  set: (value) => emit("update:deliveryType", value),
});

// текущий адрес
const address = computed(() => props.address || {});

// выбрано ли "существующий адрес"
const isExistingAddress = computed(
  () => deliveryType.value === "existing" && !!address.value.id,
);

// значение селекта
const selectValue = computed(() => {
  console.log("address", toRaw(address.value));
  console.log("deliveryType", toRaw(deliveryType.value));
  if (deliveryType.value === "existing" && address.value?.id) {
    return address.value.id; // id существующего адреса
  }
  return deliveryType.value; // 'pickup' или 'new'
});

// изменение значения селекта
const handleDeliveryChange = (event) => {
  const value = event.target.value;

  if (value === "pickup") {
    deliveryType.value = "pickup";
    emit("update:address", {
      street: "",
      building: "",
      flat: "",
      comment: "",
      name: "",
    });
  } else if (value === "new") {
    deliveryType.value = "new";
    emit("update:address", {
      street: "",
      building: "",
      flat: "",
      comment: "",
      name: "",
    });
  } else {
    const id = Number(value);
    const selectedAddress = profileStore.addresses.find(
      (addr) => addr.id === id,
    );

    if (selectedAddress) {
      deliveryType.value = "existing";
      emit("update:address", { ...selectedAddress });
    }
  }
};

// обновление отдельного поля адреса
const updateAddress = (field, value) => {
  emit("update:address", {
    ...address.value,
    [field]: value,
  });
};

const formatAddress = (addr) => {
  if (!addr) return "";
  let res = `${addr.street}, д. ${addr.building}`;
  if (addr.flat) {
    res += `, кв. ${addr.flat}`;
  }
  return res;
};
</script>
