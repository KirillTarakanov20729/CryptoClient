<template>

  <section class=" dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <section class="bg-gray-200 rounded-3xl dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Add new user</h2>
          <form @submit.prevent="createUser" action="#" method="POST">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div class="w-full">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                <input v-model="name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Josh">
                <p v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</p>
              </div>

              <div class="w-full">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="josh@mail.ru">
                <p v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="password" type="password" name="password" id="telegram_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="45645453">
                <p v-if="errors.password" class="text-red-500">{{ errors.password[0] }}</p>
              </div>

              <div class="sm:col-span-2">
                <label for="telegram_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram id</label>
                <input v-model="telegram_id" type="text" name="telegram_id" id="telegram_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="45645453">
                <p v-if="errors.symbol" class="text-red-500">{{ errors.symbol[0] }}</p>
              </div>

            </div>

            <div class="text-center mt-8">
              <button type="submit" class="py-3 px-4 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Create user
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
      email: null,
      telegram_id: null,
      password: null,
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
    async createUser() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.post(this.url_backend + 'api/client/users/store', {
          'name': this.name,
          'email': this.email,
          'telegram_id': this.telegram_id,
          'password': this.password
        })

        this.success = res.data.message
        this.name = null
        this.email = null
        this.telegram_id = null
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