<template>


  <Container>

    <Card>
      <CardBody>

        <FormLabel :label="'Update user'"/>
        <FormComponent :on-submit="updateUser">

          <FormBody>
            <div class="w-full">
              <FormInputLabel :label="'Name'" :input-name="'name'" />
              <FormInput v-model="user.name" :type="'text'" :name="'name'" :placeholder="'Joshua'" />
              <FormError v-if="errors.name" :text="errors.name[0]" />
            </div>

            <div class="w-full">
              <FormInputLabel :label="'Email'" :input-name="'email'" />
              <FormInput v-model="user.email" :type="'email'" :name="'email'" :placeholder="'joshua@me.com'" />
              <FormError v-if="errors.email" :text="errors.email[0]" />
            </div>

            <div class="w-full">
              <FormInputLabel :label="'Telegram ID'" :input-name="'telegram_id'" />
              <FormInput v-model="user.telegram_id" :type="'text'" :name="'telegram_id'" :placeholder="'123456789'" />
              <FormError v-if="errors.telegram_id" :text="errors.telegram_id[0]" />
            </div>

            <div class="w-full">
              <FormInputLabel :label="'Status'" :input-name="'is_logged_in'" />
              <FormSelect v-model="user.is_logged_in" :options="options" />
              <FormError v-if="errors.is_logged_in" :text="errors.is_logged_in[0]" />
            </div>

          </FormBody>

          <FormButton :type="'submit'" :label="'Update user'" />

          <FormSuccess v-if="success" :text="success" />

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
import Container from "@/Shared/UI/Container /Container.vue";
import FormSuccess from "@/Shared/UI/Form/FormSuccess.vue";
import FormSelect from "@/Shared/UI/Form/FormSelect.vue";
export default {
  name: "UpdateCoin",
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
    FormInputLabel,
    FormSelect
  },
  data() {
    return {
      errors: {},
      success: null,
      error: null,
      user: {
        name: null,
        email: null,
        telegram_id: null,
        is_logged_in: null
      },
      options: [
        {id: 0, name: 'not logged'},
        {id: 1, name: 'logged'}
      ],
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite();
    this.getUser()
  },

  methods: {
    async updateUser() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.put(this.url_backend + 'api/client/users/update', {
          'id': this.user.id,
          'name': this.user.name,
          'email': this.user.email,
          'telegram_id': this.user.telegram_id,
          'is_logged_in': this.user.is_logged_in
        })
        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getUser() {
      try {
        const res = await api.get(this.url_backend + 'api/client/users/show/' + this.$route.params.id)
        this.user = res.data.data
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