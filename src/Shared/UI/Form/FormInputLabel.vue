<template>
  <label class="class=block text-sm font-medium leading-6 text-gray-900" :for="inputName">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "LabelInput",

  props: {
    label: String,
    inputName: String
  }
}
</script>

<style scoped>

</style>

