<template>

  <Container>

    <Card>
      <CardBody>

        <FormLabel :label="'Create currency'" />

        <FormComponent :on-submit="createCurrency">

          <FormBody>

            <div class="w-full">
              <FormInputLabel :label="'Name'" :input-name="'name'"/>
              <FormInput v-model="name" :type="'text'" :name="'name'" :placeholder="'Russian ruble'"/>
              <FormError v-if="errors.name" :text=errors.name[0] />
            </div>

            <div class="w-full">
              <FormInputLabel :label="'Symbol'" :input-name="'symbol'"/>
              <FormInput v-model="symbol" :type="'text'" :name="'symbol'" :placeholder="'RUB'"/>
              <FormError v-if="errors.symbol" :text=errors.symbol[0] />
            </div>

          </FormBody>

          <FormButton :type="'submit'" :label="'Create'"/>

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
    FormLabel,
    FormInputLabel,
    FormInput,
    FormButton,
    FormError,
    Card,
    CardBody,
    FormComponent,
    FormBody,
    Container,
    FormSuccess
  },
  data() {
    return {
      name: null,
      symbol: null,
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
    async createCurrency() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.post(this.url_backend + 'api/client/currencies/store', {
          'name': this.name,
          'symbol': this.symbol,
        })

        this.success = res.data.message
        this.name = null
        this.symbol = null
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