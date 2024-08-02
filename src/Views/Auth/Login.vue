<template>
  <div class="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 select-none">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

      <form @submit.prevent="login" class="space-y-6" action="#" method="POST">

        <div>
          <FormLabel :label="'Email'" :input-name="'email'" />
          <FormInput :set-attribute="setEmail" :name="'email'" :type="'email'" />
          <FormError v-if="errors.email" :text=errors.email[0]  />
        </div>

        <div>
          <FormLabel :label="'Password'" :input-name="'password'" />
          <FormInput :set-attribute="setPassword" :name="'password'" :type="'password'" />
          <FormError v-if="errors.password" :text=errors.password[0]  />
        </div>

        <div>
          <FormButton :type="'submit'" :label="'Sign in'" />
        </div>

        <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>

      </form>


    </div>
  </div>
</template>

<script>
import FormLabel from "@/Shared/Form/FormLabel.vue";
import FormInput from "@/Shared/Form/FormInput.vue";
import FormButton from "@/Shared/Form/FormButton.vue";
import FormError from "@/Shared/Form/FormError.vue";

export default {
  name: "Register",
  components: {FormButton, FormInput, FormLabel, FormError},

  data() {
    return {
      email: '',
      password: '',
      errors: {},
      error: '',
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  methods: {

    async login() {
      try {
        this.error = ''
        this.errors = {}
        const res = await this.axios.post(this.url_backend + 'api/client/auth/login', {
          'email': this.email,
          'password': this.password,
        })
        localStorage.setItem('token', res.data.access_token)
        this.$router.push({name: 'Users'})
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors
        } else if (error.response.status === 401) {
          this.error = error.response.data.error
        }
      }
    },

    setEmail(val) {
      this.email = val
    },

    setPassword(val) {
      this.password = val
    },

  }
}


</script>

<style scoped>

</style>