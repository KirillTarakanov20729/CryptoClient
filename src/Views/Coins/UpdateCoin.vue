<template>

  <Container>
    <Card>
      <CardBody>

        <FormLabel :label="'Update coin'" />
          <FormComponent :on-submit="updateCoin">
            <FormBody>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Name'" :input-name="'name'" />
                <FormInput v-model="coin.name" :name="'name'" :type="'text'" :placeholder="'Bitcoin'" />
                <FormError v-if="errors.name" :text=errors.name[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Symbol'" :input-name="'symbol'" />
                <FormInput v-model="coin.symbol" :name="'symbol'" :type="'text'" :placeholder="'BTC'" />
                <FormError v-if="errors.symbol" :text=errors.symbol[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Price'" :input-name="'price'" />
                <FormInput v-model="coin.price" :name="'price'" :type="'text'" :placeholder="'10000'" />
                <FormError v-if="errors.price" :text=errors.price[0]  />
              </div>

            </FormBody>

            <FormButton :type="'submit'" :label="'Update coin'"/>

            <FormSuccess v-if="success" />

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
    FormLabel,
    FormInput,
    FormButton,
    FormError,
    Card,
    CardBody,
    FormComponent,
    FormBody,
    Container,
    FormSuccess,
    FormInputLabel
  },
  data() {
    return {
      errors: {},
      success: null,
      error: null,
      coin: {
        name: null,
        symbol: null,
        price: null
      },
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite();
    this.getCoin()
  },

  methods: {
    async updateCoin() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.put(this.url_backend + 'api/client/coins/update', {
          'id': this.coin.id,
          'name': this.coin.name,
          'symbol': this.coin.symbol,
          'price': this.coin.price
        })

        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getCoin() {
      try {
        const res = await api.get(this.url_backend + 'api/client/coins/show/' + this.$route.params.id)
        this.coin = res.data.data
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