<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <section class="bg-gray-200 rounded-3xl dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Update admin</h2>
          <form @submit.prevent="updateAdmin" action="#" method="POST">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="sm:col-span-2">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="admin.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="admin@mail.ru">
                <p v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="admin.password" type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="********">
                <p v-if="errors.password" class="text-red-500">{{ errors.email[0] }}</p>
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
  name: "CreateCoin",
  data() {
    return {
      errors: {},
      success: null,
      error: null,
      admin: {
        id: null,
        email: null,
        password: null
      },
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite();
    this.getAdmin()
  },

  methods: {
    async updateAdmin() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.put(this.url_backend + 'api/client/admins/update', {
          'id': this.admin.id,
          'email': this.admin.email,
          'password': this.admin.password
        })

        this.success = res.data.message
        console.log(res)
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getAdmin() {
      try {
        const res = await api.get(this.url_backend + 'api/client/admins/show/' + this.$route.params.id)
        this.admin = res.data.data
      } catch (error) {
        if (error.response.status === 404) {
          this.error = error.response.data.error
        }
      }
    }
  }
}
</script>

<style scoped>

</style>