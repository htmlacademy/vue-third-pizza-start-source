<template>
    <div
      :draggable="draggable"
      @dragstart.self="onDragStart"
      @dragover.prevent
      @dragenter.prevent
    >
      <slot />
    </div>
  </template>
  
  <script setup>
  import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";
  
  const props = defineProps({
    draggable: {
      type: Boolean,
      default: false,
    },
    dataTransfer: {
      type: Object,
      required: true,
    },
  });
  
  const onDragStart = ({ dataTransfer }) => {
    const data = JSON.stringify(props.dataTransfer);
    dataTransfer.setData(DATA_TRANSFER_PAYLOAD, data);
  };
  </script>