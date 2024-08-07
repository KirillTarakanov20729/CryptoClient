<template>

  <Container>

    <Card>
      <CardBody>

          <FormLabel :label="'Update currency'" />
          <FormComponent :on-submit="updateCurrency">
            <FormBody>

              <div class="w-full">
                <FormInputLabel :label="'Name'" :input-name="'name'" />
                <FormInput v-model="currency.name" :type="'text'" :name="'name'" :placeholder="'Russian ruble'" />
                <FormError v-if="errors.name" :text=errors.name[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Symbol'" :input-name="'symbol'" />
                <FormInput v-model="currency.symbol" :type="'text'" :name="'symbol'" :placeholder="'RUB'" />
                <FormError v-if="errors.symbol" :text=errors.symbol[0]  />
              </div>
            </FormBody>

            <FormButton :type="'submit'" :label="'Update currency'"/>

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
export default {
  name: "UpdateCoin",
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
      errors: {},
      success: null,
      error: null,
      currency: {
        name: null,
        symbol: null
      },
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite();
    this.getCurrency()
  },

  methods: {
    async updateCurrency() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.put(this.url_backend + 'api/client/currencies/update', {
          'id': this.currency.id,
          'name': this.currency.name,
          'symbol': this.currency.symbol,
        })
        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getCurrency() {
      try {
        const res = await api.get(this.url_backend + 'api/client/currencies/show/' + this.$route.params.id)
        this.currency = res.data.data
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