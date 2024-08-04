<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="flex flex-col md:flex-row items-center justify-between">


        <div class="flex flex-row items-center justify-between">

          <form action="#" method="GET" class="flex items-center me-4 max-w-[24rem]">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                     viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"/>
                </svg>
              </div>
              <input @input="debounceSearch" v-model="user_email" type="text" id="simple-search"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Search" required="">
            </div>

          </form>

          <form class="me-4">
            <select @change="getBids(1, per_page)" v-model="coin_id" id="coins"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option :value=null :selected="coin_id === null">All coins</option>
              <option v-for="coin in coins" :value="coin.id">{{ coin.symbol }}</option>
            </select>
          </form>

          <form class="">
            <select @change="getBids(1, per_page)" v-model="currency_id" id="currencies"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option :value=null :selected="currency_id === null">All currencies</option>
              <option v-for="currency in currencies" :value="currency.id">{{ currency.symbol }}</option>
            </select>
          </form>

          <form class="ms-4">
            <select @change="getBids(1, per_page)" v-model="per_page" id="per_page"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled>Receive by</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </form>

        </div>


        <div class="text-end">
          <RouterLink to="/bids/create">
            <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Create bid
            </button>
          </RouterLink>
        </div>

      </div>


      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">User email</th>
              <th scope="col" class="px-4 py-3 text-center">Coin</th>
              <th scope="col" class="px-4 py-3 text-center">Amount</th>
              <th scope="col" class="px-4 py-3 text-center">Currency</th>
              <th scope="col" class="px-4 py-3 text-center">Price</th>
              <th scope="col" class="px-4 py-3 text-center">Status</th>
              <th scope="col" class="px-4 py-3 text-center">Number</th>
              <th scope="col" class="px-4 py-3 text-center">Payment method</th>
              <th scope="col" class="px-4 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody v-for="bid in bids">
            <tr class="border-b dark:border-gray-700" :class="bid.type === 'sell' ? 'bg-red-100' : 'bg-green-100' ">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-center">{{bid.user.email}}</th>
              <td class="px-4 py-3 text-center">{{ bid.coin.symbol }}</td>
              <td class="px-4 py-3 text-center">{{ bid.amount }}</td>
              <td class="px-4 py-3 text-center">{{ bid.currency.symbol }}</td>
              <td class="px-4 py-3 text-center">{{ bid.price }}</td>
              <td class="px-4 py-3 text-center">{{ bid.status }}</td>
              <td class="px-4 py-3 text-center">{{ bid.number }}</td>
              <td class="px-4 py-3 text-center">{{ bid.payment_method }}</td>
              <td class=" py-3 text-center flex justify-between items-center">

                <div class="col"></div>

                <RouterLink :to="{ path: '/bids/update/' + bid.id }" href="#" class="ms-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                  </svg>
                </RouterLink>


                <a @click.prevent="deleteBid(bid.id)" href="#" class="me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                  </svg>
                </a>


                <div class="col"></div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="pagination" class="flex flex-col justify-center items-center mt-10">
        <pagination :pagination="pagination" :get-data="getBids" :per_page="per_page"></pagination>

      </div>

    </div>
  </section>
</template>

<script>
import { initFlowbite } from 'flowbite'
import Pagination from "@/Shared/Pagination/Pagination.vue";
import api from "@/Assets/api.js";
export default {
  name: "Bids",
  mounted() {
    initFlowbite()
    this.getBids()
    this.getCoins()
    this.getCurrencies()
  },

  components: {
    Pagination
  },
  data() {
    return {
      bids: [],
      coins: [],
      coin_id: null,
      currencies: [],
      currency_id: null,
      user_email: null,
      per_page: 10,
      pagination: null,
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  methods: {
    async getBids(page = 1) {
      try {
        const res = await api.post(this.url_backend + 'api/client/bids/index', {
          'page': page,
          'per_page': this.per_page,
          'coin_id': this.coin_id,
          'currency_id': this.currency_id,
          'user_email': this.user_email
        })

        this.bids = res.data.data;
        this.pagination = res.data.meta;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBid(id) {
      try {
        const res = await api.delete(this.url_backend + 'api/client/bids/delete/' + id)
        await this.getBids(1, this.per_page);
      } catch (error) {
        console.log(error);
      }
    },

    debounceSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.getBids(1, this.per_page);
      }, 500);
    },

    async getCoins() {
      const res = await api.get(this.url_backend + 'api/client/coins/all');
      this.coins = res.data.data;
    },

    async getCurrencies() {
      const res = await api.get(this.url_backend + 'api/client/currencies/all');
      this.currencies = res.data.data;
    },
  }
}
</script>

<style scoped>

</style>