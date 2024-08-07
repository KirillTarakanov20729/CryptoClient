<template>

  <form @submit.prevent="onSubmit">
    <slot/>
  </form>

</template>

<script>
export default {
  name: "FormComponent",
  props: {
    onSubmit: {
      type: Function,
      required: true
    }
  }
}
</script>


<style scoped>

</style>