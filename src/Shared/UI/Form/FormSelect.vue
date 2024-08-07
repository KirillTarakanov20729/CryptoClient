<template>
  <select @change="$emit('update:modelValue', $event.target.value)" :value="modelValue" :id="modelValue" class="block w-full rounded-lg border-0 shadow-xl py-1.5 ring-1 hover:ring-2 ring-gray-300 mt-2 ">
    <option v-for="option in options" :selected="option.id === modelValue" :value="option.id">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>

</style>