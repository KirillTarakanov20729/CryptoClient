<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <section class="bg-gray-200 rounded-3xl dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Add new currency</h2>
          <form @submit.prevent="createCurrency" action="#" method="POST">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="w-full">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coin name</label>
                <input v-model="name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Russian ruble">
                <p v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</p>
              </div>

              <div class="w-full">
                <label for="symbol" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Symbol</label>
                <input v-model="symbol" type="text" name="symbol" id="symbol" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="RUB">
                <p v-if="errors.symbol" class="text-red-500">{{ errors.symbol[0] }}</p>
              </div>

            </div>

            <div class="text-center mt-8">
              <button type="submit" class="py-3 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Create currency
              </button>
            </div>

            <div v-if="success" class="text-center">
              <p class="text-green-500">{{ success }}</p>
            </div>

          </form>
        </div>
      </section>
    </div>
  </section>

</template>

<script>
import api from "@/Assets/api.js";
import {initFlowbite} from "flowbite";
export default {
  name: "CreateCoin",
  data() {
    return {
      name: null,
      symbol: null,
      errors: {},
      success: null,
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite();
  },

  methods: {
    async createCurrency() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.post(this.url_backend + 'api/client/currencies/store', {
          'name': this.name,
          'symbol': this.symbol,
        })

        this.success = res.data.message
        this.name = null
        this.symbol = null
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    }
  }
}
</script>

<style scoped>

</style>