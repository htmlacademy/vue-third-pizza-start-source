<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const emit = defineEmits(["drop"]);

const onDrop = ({ dataTransfer }) => {
  if (!dataTransfer) {
    return;
  }

  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);

  if (payload) {
    const transferData = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
    const data = JSON.parse(transferData);
    emit("drop", data);
  }
};
</script>
