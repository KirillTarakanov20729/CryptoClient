<template>

  <Container>

    <Card>
      <CardBody>

          <FormLabel :label="'Create Admin'"/>

          <FormComponent :on-submit="createAdmin">

            <FormBody>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Email'" :input-name="'email'" />
                <FormInput v-model="email" :type="'email'" :name="'email'" :placeholder="'qJbY4@example.com'" />
                <FormError v-if="errors.email" :text="errors.email" />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Password'" :input-name="'password'" />
                <FormInput v-model="password" :type="'password'" :name="'password'" :placeholder="'**********'" />
                <FormError v-if="errors.password" :text="errors.password" />
              </div>

            </FormBody>

            <FormButton :type="'submit'" :label="'Create'" />

            <FormSuccess v-if="success" :text="success"/>

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
import Container from "@/Shared/UI/Container /Container.vue";
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
      email: null,
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
    async createAdmin() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.post(this.url_backend + 'api/client/admins/store', {
          'email': this.email,
          'password': this.password
        })

        this.success = res.data.message
        this.email = null
        this.password = null
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