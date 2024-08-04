<template>
  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="flex flex-col md:flex-row items-center justify-between">


        <div class="w-full md:w-1/2">

          <form action="#" method="GET" class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                </svg>
              </div>
              <input @input="debounceSearch" v-model="search" type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="">
            </div>

          </form>
        </div>

      <div class="text-end">
        <RouterLink to="/users/create">
          <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Create user
          </button>
        </RouterLink>
      </div>
        </div>

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Name</th>
              <th scope="col" class="px-4 py-3 text-center">Email</th>
              <th scope="col" class="px-4 py-3 text-center">Telegram ID</th>
              <th scope="col" class="px-4 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody v-for="user in users">
            <tr class="border-b dark:border-gray-700">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-center">{{ user.name }}</th>
              <td class="px-4 py-3 text-center">{{ user.email }}</td>
              <td class="px-4 py-3 text-center">{{ user.telegram_id }}</td>
              <td class=" py-3 text-center flex justify-between items-center">

                <div class="col"></div>

                <RouterLink :to="{ path: '/users/update/' + user.id }" href="#" class="ms-2">
                  Edit
                </RouterLink>

                <a @click.prevent="deleteUser(user.id)" href="#" class="me-2">
                  Delete
                </a>

                <div class="col"></div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="pagination" class="flex flex-col justify-center items-center mt-10">
        <pagination :pagination="pagination" :get-data="getUsers" :per_page="per_page"></pagination>

        <form class="mt-5">
          <label for="per_page" class="block text-center mb-2 text-2xl text-gray-900 dark:text-white">receive by</label>
          <select @change="getUsers(1, per_page)" v-model="per_page" id="per_page" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </form>
      </div>

    </div>
  </section>
</template>

<script>
import Table from "@/Views/Coins/Coins.vue";
import Pagination from "@/Shared/Pagination/Pagination.vue";
import api from "@/Assets/api.js";
import { initFlowbite } from 'flowbite'

export default {
  name: "Users",
  components: {Pagination, Table},

  data() {
    return {
      users: {},
      pagination: {},
      per_page: 10,
      search: "",
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite();
    this.getUsers();
  },

  methods: {
    async getUsers(page = 1) {
      try {
        const res = await api.post(this.url_backend + 'api/client/users/index', {
          'page': page,
          'per_page': this.per_page,
          'search': this.search
        })
        this.users = res.data.data;
        this.pagination = res.data.meta;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser(id) {
      try {
        const res = await api.delete(this.url_backend + 'api/client/users/delete/' + id)
        await this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },

    debounceSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.getUsers(1);
      }, 500);
    },
  }
}
</script>

<style scoped>

</style>