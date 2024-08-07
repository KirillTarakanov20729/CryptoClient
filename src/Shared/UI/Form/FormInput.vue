<template>
  <input @input="$emit('update:modelValue', $event.target.value)"  :name="name" :type="type" :placeholder="placeholder" class="block w-full rounded-lg border-0 shadow-xl py-1.5 ring-1 hover:ring-2 ring-gray-300 mt-2"/>
</template>


<script>
export default {
  name: "FormInput",
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>