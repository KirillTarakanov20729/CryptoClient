<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="text-end">
        <RouterLink to="/bids/create">
          <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Create bid
          </button>
        </RouterLink>
      </div>

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">User id</th>
              <th scope="col" class="px-4 py-3 text-center">Coin</th>
              <th scope="col" class="px-4 py-3 text-center">Amount</th>
              <th scope="col" class="px-4 py-3 text-center">Currency</th>
              <th scope="col" class="px-4 py-3 text-center">Price</th>
              <th scope="col" class="px-4 py-3 text-center">Status</th>
              <th scope="col" class="px-4 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody v-for="bid in bids">
            <tr class="border-b dark:border-gray-700">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-center">{{bid.user.email}}</th>
              <td class="px-4 py-3 text-center">{{ bid.coin.symbol }}</td>
              <td class="px-4 py-3 text-center">{{ bid.amount }}</td>
              <td class="px-4 py-3 text-center">{{ bid.currency.symbol }}</td>
              <td class="px-4 py-3 text-center">{{ bid.price }}</td>
              <td class="px-4 py-3 text-center">{{ bid.status }}</td>
              <td class=" py-3 text-center flex justify-between items-center">

                <div class="col"></div>

                <RouterLink :to="{ path: '/bids/update/' + bid.id }" href="#" class="ms-2">
                  Edit
                </RouterLink>

                <a href="#" class="me-2">
                  Delete
                </a>

                <div class="col"></div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="pagination" class="flex justify-center items-center mt-10">
        <pagination :pagination="pagination" :get-data="getBids"></pagination>
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
    initFlowbite();
    this.getBids();
  },

  components: {
    Pagination
  },
  data() {
    return {
      bids: [],
      pagination: null,
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  methods: {
    async getBids(page = 1) {
      try {
        const res = await api.post(this.url_backend + 'api/client/bids/index', {
          'page': page
        })

        console.log(res);
        this.bids = res.data.data;
        this.pagination = res.data.meta;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>