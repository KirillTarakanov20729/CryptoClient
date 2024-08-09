<template>

  <Container>

    <Card>
      <CardBody>

          <FormLabel :label="`Create User`" />
          <FormComponent :on-submit="createUser">

            <FormBody>

              <div class="w-full">
                <FormInputLabel :label="'Name'" :input-name="'name'" />
                <FormInput v-model="name" :type="'text'" :name="'name'" :placeholder="'Joshua'" />
                <p v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</p>
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Email'" :input-name="'email'" />
                <FormInput v-model="email" :type="'email'" :name="'email'" :placeholder="'joshua@me.com'" />
                <FormError v-if="errors.email" :text="errors.email[0]" />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Password'" :input-name="'password'" />
                <FormInput v-model="password" :type="'password'" :name="'password'" :placeholder="'********'" />
                <FormError v-if="errors.password" :text="errors.password[0]" />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Telegram ID'" :input-name="'telegram_id'" />
                <FormInput v-model="telegram_id" :type="'text'" :name="'telegram_id'" :placeholder="'345345232'" />
                <FormError v-if="errors.telegram_id" :text="errors.telegram_id[0]" />
              </div>

            </FormBody>

            <FormButton :type="'submit'" :label="'Create User'" />

            <FormSuccess v-if="success" :text="success" />

          </FormComponent>

      </CardBody>
    </Card>

  </Container>

</template>

<script>
import api from "@/Assets/api.js";
import {initFlowbite} from "flowbite";
import FormInputLabel from "@/Shared/UI/Form/FormInputLabel.vue";
import FormInput from "@/Shared/UI/Form/FormInput.vue";
import FormButton from "@/Shared/UI/Form/FormButton.vue";
import FormError from "@/Shared/UI/Form/FormError.vue";
import Card from "@/Shared/UI/Card/Card.vue";
import CardBody from "@/Shared/UI/Card/CardBody.vue";
import FormLabel from "@/Shared/UI/Form/FormLabel.vue";
import FormComponent from "@/Shared/UI/Form/FormComponent.vue";
import FormBody from "@/Shared/UI/Form/FormBody.vue";
import Container from "@/Shared/UI/Container/Container.vue";
import FormSuccess from "@/Shared/UI/Form/FormSuccess.vue";
export default {
  name: "CreateCoin",
  components: {
    FormSuccess,
    Container,
    FormBody,
    FormComponent,
    FormLabel,
    CardBody,
    Card,
    FormError,
    FormButton,
    FormInput,
    FormInputLabel
  },
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