<template>
  <div 
  @drop.stop="onDrop"
  @dragover.prevent
  @dragenter.prevent>
    <slot/>
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD} from '@/common/constants';

const emit = defineEmits(['drop']);

const onDrop = (evt) => {
  evt.preventDefault();
  if (!evt.dataTransfer) {
    return;
  }
  const payload = evt.dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    const transferData = JSON.parse(payload);
    emit('drop', transferData);
  }
}
</script>