<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <section class="bg-gray-200 rounded-3xl dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Update bid</h2>
          <form @submit.prevent="storeBid" action="#" method="POST">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="w-full">
                <label for="coin_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coin</label>
                <select v-model="bid.coin.id" id="coin_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="coin in coins" :value="coin.id" :selected="bid.coin.id === coin.id">{{ coin.name }}</option>
                </select>
                <p v-if="errors.coin_id" class="text-red-500">{{ errors.coin_id[0] }}</p>
              </div>

              <div class="w-full">
                <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input v-model="bid.amount"  type="number" name="amount" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1000">
                <p v-if="errors.amount" class="text-red-500">{{ errors.amount[0] }}</p>
              </div>

              <div class="w-full">
                <label for="currency_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                <select v-model="bid.currency.id" id="currency_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option v-for="currency in currencies" :value="currency.id" :selected="bid.currency_id === currency.id">{{ currency.name }}</option>
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
                <input v-model="bid.user.telegram_id" type="text" name="user_telegram_id" id="user_telegram_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="542342342">
                <p v-if="errors.user_telegram_id" class="text-red-500">{{ errors.user_telegram_id[0] }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <select v-model="bid.status" id="is_logged_in" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Choose a status</option>
                  <option :selected="bid.status === 'created'" value="created">created</option>
                  <option :selected="bid.status === 'pending'" value="pending">pending</option>
                  <option :selected="bid.status === 'closed'" value="closed">closed</option>
                </select>
                <p v-if="errors.status" class="text-red-500">{{ errors.status[0] }}</p>
              </div>


            </div>

            <div class="text-center mt-8">
              <button type="submit" class="py-3 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Update
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
        coin: {
          id: null,
          name: null,
          symbol: null,
          price: null
        },
        currency: {
          id: null,
          name: null,
          symbol: null
        },
        user: {
          id: null,
          name: null,
          email: null,
          telegram_id: null
        },
        amount: null,
        price: null,
        status: null
      },
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite()
    this.getBid()
    this.getCoins()
    this.getCurrencies()
    this.getUsers()
  },

  methods: {
    async storeBid() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.put(this.url_backend + 'api/client/bids/update', {
          'id': this.bid.id,
          'coin_id': this.bid.coin.id,
          'currency_id': this.bid.currency.id,
          'user_telegram_id': this.bid.user.telegram_id,
          'amount': this.bid.amount,
          'price': this.bid.price,
          'status': this.bid.status
        })
        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getBid() {
      try {
        const res = await api.get(this.url_backend + 'api/client/bids/show/' + this.$route.params.id)

        this.bid = res.data.data
        console.log(this.bid)
      } catch (error) {
        if (error.response.status === 404) {
          this.error = error.response.data.error
        }
      }
    },

    async getCoins() {
      const res = await api.post(this.url_backend + 'api/client/coins/index', {
        'page': 1
      });

      console.log(res)
      this.coins = res.data.data
    },

    async getCurrencies() {
      const res = await api.post(this.url_backend + 'api/client/currencies/index', {
        'page': 1
      });

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