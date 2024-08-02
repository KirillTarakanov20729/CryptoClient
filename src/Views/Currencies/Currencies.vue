<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="text-end">
        <RouterLink to="/currencies/create">
          <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Create currency
          </button>
        </RouterLink>
      </div>

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Currency</th>
              <th scope="col" class="px-4 py-3 text-center">Symbol</th>
              <th scope="col" class="px-4 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody v-for="currency in currencies">
            <tr class="border-b dark:border-gray-700">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-center">{{currency.name}}</th>
              <td class="px-4 py-3 text-center">{{ currency.symbol }}</td>

              <td class=" py-3 text-center flex justify-between items-center">

                <div class="col"></div>

                <RouterLink :to="{ path: '/currencies/update/' + currency.id }" href="#" class="ms-2">
                  Edit
                </RouterLink>

                <a @click="deleteCoin(currency.id)" href="#" class="me-2">
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
        <pagination :pagination="pagination" :get-data="getCurrencies"></pagination>
      </div>

    </div>
  </section>
</template>

<script>
import { initFlowbite } from 'flowbite'
import Pagination from "@/Shared/Pagination/Pagination.vue";
import api from "@/Assets/api.js";
export default {
  name: "Coins",
  mounted() {
    initFlowbite();
    this.getCurrencies();
  },

  components: {
    Pagination
  },
  data() {
    return {
      currencies: [],
      pagination: null,
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  methods: {
    async getCurrencies(page = 1) {
      try {
        const res = await api.post(this.url_backend + 'api/client/currencies/index', {
          'page': page
        })
        this.currencies = res.data.data;
        this.pagination = res.data.meta;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCoin(id) {
      try {
        const res = await api.delete(this.url_backend + 'api/client/currencies/delete/' + id)
        await this.getCurrencies();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>