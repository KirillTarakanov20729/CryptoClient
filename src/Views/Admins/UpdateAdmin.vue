<template>

  <Container>

    <Card>
      <CardBody>

        <FormLabel :label="'Update Admin'"/>
        <FormComponent :on-submit="updateAdmin">
          <FormBody>

            <div class="sm:col-span-2">
              <FormInputLabel :label="'Email'" :input-name="'email'" />
              <FormInput v-model="admin.email" :type="'email'" :name="'email'" :placeholder="'qJbY4@example.com'" />
              <FormError v-if="errors.email" :text="errors.email" />
            </div>

            <div class="sm:col-span-2">
              <FormInputLabel :label="'Password'" :input-name="'password'" />
              <FormInput v-model="admin.password" :type="'password'" :name="'password'" :placeholder="'**********'" />
              <FormError v-if="errors.password" :text="errors.password" />
            </div>
          </FormBody>

          <FormButton :type="'submit'" :label="'Update'" />

          <FormSuccess v-if="success" :text="success"/>

          <FormError v-if="error" :text="error" />

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