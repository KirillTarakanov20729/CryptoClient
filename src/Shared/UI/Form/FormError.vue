<template>
  <p class="text-red-500 mt-2 text-center">{{ text }}</p>
</template>


<script>
export default {
  name: "FormError",
  props: {
    text: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>