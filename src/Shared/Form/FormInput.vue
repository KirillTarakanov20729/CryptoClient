<template>
  <input @input="setAttribute($event.target.value)" :name="name" :type="type" class="block w-full rounded-lg border-0 shadow-xl py-1.5 ring-1 hover:ring-2 ring-gray-300 mt-2"/>
</template>


<script>
export default {
  name: "FormInput",
  props: {
    setAttribute: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>