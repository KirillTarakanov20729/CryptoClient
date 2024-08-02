<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="text-end">
        <RouterLink to="/admins/create">
          <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Create admin
          </button>
        </RouterLink>
      </div>

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-center">Admin id</th>
              <th scope="col" class="px-4 py-3 text-center">Email</th>
              <th scope="col" class="px-4 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody v-for="admin in admins">
            <tr class="border-b dark:border-gray-700">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-center">{{admin.id}}</th>
              <td class="px-4 py-3 text-center">{{ admin.email }}</td>
              <td class=" py-3 text-center flex justify-between items-center">

                <div class="col"></div>

                <RouterLink :to="{ path: '/admins/update/' + admin.id }" href="#" class="ms-2">
                  Edit
                </RouterLink>

                <a @click="deleteAdmin(admin.id)" href="#" class="me-2">
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
        <pagination :pagination="pagination" :get-data="getAdmins"></pagination>
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
    this.getAdmins();
  },

  components: {
    Pagination
  },
  data() {
    return {
      admins: [],
      pagination: null,
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  methods: {
    async getAdmins(page = 1) {
      try {
        const res = await api.post(this.url_backend + 'api/client/admins/index', {
          'page': page
        })

        console.log(res);
        this.admins = res.data.data;
        this.pagination = res.data.meta;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAdmin(id) {
      try {
        const res = await api.delete(this.url_backend + 'api/client/admins/delete/' + id)
        console.log(res)
        await this.getAdmins()
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>