<template>
  <button :type=type class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-indigo-700 text-center mt-8" >{{ label }}</button>
</template>

<script>
export default {
  name: "FormButton",
  props: {
    label: {
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