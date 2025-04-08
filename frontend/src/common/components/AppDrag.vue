<template>
  <div
      :draggable="draggable"
      @dragstart.self="onDrag"
      @dragover.prevent
      @dragend.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from '../constants'

const props = defineProps({
  draggable: {
    type: Boolean,
    default: false,
  },
  transferData: {
    type: Object,
    required: true
  }
})

const onDrag = ({ dataTransfer }) => {
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
      DATA_TRANSFER_PAYLOAD,
      JSON.stringify(props.transferData)
  )
}
</script>
