<template>
  <div
   @drop.stop="onDrop"
   @dragover.prevent
   @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from '../constants'

const emit = defineEmits(['drop'])

const onDrop = ({ dataTransfer }) => {
  if (!dataTransfer) return;
  
  try {
    const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
    if (payload) {
      const transferData = JSON.parse(payload);
      emit('drop', transferData);
    }
  } catch (e) {
    console.error('Error parsing drop data:', e);
  }
}
</script>
