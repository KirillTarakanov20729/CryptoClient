<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <section class="bg-gray-200 rounded-3xl dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Create bid</h2>
          <form @submit.prevent="storeBid" action="#" method="POST">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="w-full">
                <label for="coin_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coin</label>
                <select v-model="bid.coin_id" id="coin_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="0" :selected="bid.coin_id === 0">Choose coin</option>
                  <option v-for="coin in coins" :value="coin.id">{{ coin.name }}</option>
                </select>
                <p v-if="errors.coin_id" class="text-red-500">{{ errors.coin_id[0] }}</p>
              </div>

              <div class="w-full">
                <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input v-model="bid.amount" type="number" name="amount" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000">
                <p v-if="errors.amount" class="text-red-500">{{ errors.amount[0] }}</p>
              </div>

              <div class="w-full">
                <label for="currency_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                <select v-model="bid.currency_id" id="currency_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="0" :selected="bid.currency_id === 0">Choose a currency</option>
                  <option v-for="currency in currencies" :value="currency.id">{{ currency.name }}</option>
                </select>
                <p v-if="errors.currency_id" class="text-red-500">{{ errors.currency_id[0] }}</p>
              </div>

              <div class="w-full">
                <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input v-model="bid.price" type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1500">
                <p v-if="errors.price" class="text-red-500">{{ errors.price[0] }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="user_telegram_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User telegram id</label>
                <input v-model="bid.user_telegram_id" type="text" name="user_telegram_id" id="user_telegram_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="542342342">
                <p v-if="errors.user_telegram_id" class="text-red-500">{{ errors.user_telegram_id[0] }}</p>
              </div>


            </div>

            <div class="text-center mt-8">
              <button type="submit" class="py-3 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Create
              </button>
            </div>

            <div v-if="success" class="text-center">
              <p class="text-green-500">{{ success }}</p>
            </div>

            <div v-if="error" class="text-center">
              <p class="text-red-500">{{ error }}</p>
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
  name: "UpdateCoin",
  data() {
    return {
      errors: {},
      success: null,
      error: null,
      coins: [],
      currencies: [],
      users: [],
      bid: {
        coin_id: 0,
        currency_id: 0,
        user_telegram_id: null,
        amount: null,
        price: null
      },
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite()
    this.getCoins()
    this.getCurrencies()
    this.getUsers()
  },

  methods: {
    async storeBid() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.post(this.url_backend + 'api/client/bids/store', {
          'coin_id': this.bid.coin_id,
          'currency_id': this.bid.currency_id,
          'user_telegram_id': this.bid.user_telegram_id,
          'amount': this.bid.amount,
          'price': this.bid.price
        })
        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getCoins() {
      const res = await api.get(this.url_backend + 'api/client/coins/all');

      console.log(res)
      this.coins = res.data.data
    },

    async getCurrencies() {
      const res = await api.get(this.url_backend + 'api/client/currencies/all');

      console.log(res)
      this.currencies = res.data.data
    },

    async getUsers() {
      const res = await api.post(this.url_backend + 'api/client/users/index', {
        'page': 1
      });

      console.log(res)
      this.users = res.data.data
    }
  }
}
</script>

<style scoped>

</style>