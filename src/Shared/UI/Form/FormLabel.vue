<template>
  <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">
    {{ label }}
  </h2>
</template>

<script>
export default {
  name: "FormLabel",
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>