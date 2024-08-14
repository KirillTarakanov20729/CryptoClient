<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Request User</th>
              <th scope="col" class="px-4 py-3 text-center">Response User</th>
              <th scope="col" class="px-4 py-3 text-center">Bid</th>
            </tr>
            </thead>
            <tbody v-for="payment in payments">
            <tr class="border-b dark:border-gray-700">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-center">{{payment.request_user.telegram_id}}</th>
              <td class="px-4 py-3 text-center">{{ payment.response_user.telegram_id }}</td>

              <td v-if= "payment.bid" class="px-4 py-3 text-center">{{ payment.bid.uuid }}</td>
              <td v-else class="px-4 py-3 text-center">-</td>

              <td class=" py-3 text-center flex justify-center items-center">

                <div class="col"></div>

                <a @click="deletePayment(payment.id)" href="#" class="">
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

      <div v-if="pagination" class="flex justify-center items-center mt-10">
        <pagination :pagination="pagination" :get-data="getPayments" :per_page="10"></pagination>
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
    this.getPayments();
  },

  components: {
    Pagination
  },
  data() {
    return {
      payments: [],
      pagination: null,
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  methods: {
    async getPayments(page = 1) {
      try {
        const res = await api.post(this.url_backend + 'api/client/payments/index', {
          'page': page,
        })
        this.payments = res.data.data;
        console.log(this.payments)
        this.pagination = res.data.meta;
      } catch (error) {
        console.log(error);
      }
    },

    async deletePayment(id) {
      try {
        const res = await api.delete(this.url_backend + 'api/client/payments/delete/' + id)
        await this.getPayments();
      } catch (error) {
        console.log(error);
      }
    },

  }
}
</script>

<style scoped>

</style>