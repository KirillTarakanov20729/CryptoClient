<template>

  <Container>

    <Card>
      <CardBody>

        <FormLabel :label="'Create Bid'" />
        <FormComponent :on-submit="storeBid">

          <FormBody>

              <div class="w-full">
                <FormInputLabel :label="'Coin'" :input-name="'coin_id'" />
                <FormSelect v-model="coin_id" :options="coins" />
                <FormError v-if="errors.coin_id" :text="errors.coin_id[0]" />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Amount'" :input-name="'amount'" />
                <FormInput v-model="amount" :type="'number'" :name="'amount'" :placeholder="'10000'" />
                <FormError v-if="errors.amount" :text="errors.amount[0]" />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Currency'" :input-name="'currency_id'" />
                <FormSelect v-model="currency_id" :options="currencies" />
                <FormError v-if="errors.currency_id" :text="errors.currency_id[0]" />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Price'" :input-name="'price'" />
                <FormInput v-model="price" :type="'number'" :name="'price'" :placeholder="'10000'" />
                <FormError v-if="errors.price" :text="errors.price[0]" />
              </div>

              <div class="w-full">
                <FormInputLabel :input-name="'type'" :label="'Type'" />
                <FormSelect v-model="type" :options="types" />
                <FormError v-if="errors.type" :text="errors.type[0]" />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Payment method'" :input-name="'payment_method'" />
                <FormSelect v-model="payment_method" :options="payment_methods" />
                <FormError v-if="errors.payment_method" :text="errors.payment_method[0]" />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Number'" :input-name="'number'" />
                <FormInput v-model="number" :type="'number'" :name="'number'" :placeholder="'10000'" />
                <FormError v-if="errors.number" :text="errors.number[0]" />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'User telegram id'" :input-name="'user_telegram_id'" />
                <FormInput v-model="user_telegram_id" :type="'text'" :name="'user_telegram_id'" :placeholder="'234234234'" />
                <FormError v-if="errors.user_telegram_id" :text="errors.user_telegram_id[0]" />
              </div>


          </FormBody>

          <FormButton :type="'submit'" :label="'Create'"/>

          <FormSuccess v-if="success" :text="success"/>

          <FormError v-if="error" :text="error"/>

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
import FormSelect from "@/Shared/UI/Form/FormSelect.vue";
export default {
  name: "UpdateCoin",
  components: {
    FormSelect,
    FormSuccess,
    Container,
    FormBody,
    FormComponent,
    FormLabel,
    CardBody,
    Card,
    FormButton,
    FormInput,
    FormInputLabel,
    FormError
  },
  data() {
    return {
      errors: {},
      success: null,
      error: null,
      coins: [],
      currencies: [],
      users: [],
      payment_method: 'Default',
      coin_id: 'Default',
      currency_id: 'Default',
      user_telegram_id: null,
      amount: null,
      price: null,
      number: null,
      type: 'Default',
      payment_methods: [
        {
          id: "Default",
          name: "Choose a payment method"
        },
        {
          id: "Alfa-bank",
          name: "Alfa-bank"
        },
        {
          id: "Sber",
          name: "Sber"
        },
        {
          id: "Tincoff",
          name: "Tincoff"
        }
      ],
      types: [
        {
          id: "Default",
          name: "Choose a type"
        },
        {
          id: "sell",
          name: "Sell"
        },
        {
          id: "buy",
          name: "Buy"
        }
      ],
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite()
    this.getCoins()
    this.getCurrencies()
  },

  methods: {
    async storeBid() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.post(this.url_backend + 'api/client/bids/store', {
          'coin_id': this.coin_id,
          'currency_id': this.currency_id,
          'user_telegram_id': this.user_telegram_id,
          'amount': this.amount,
          'price': this.price,
          'number': this.number,
          'payment_method': this.payment_method,
          'type' : this.type
        })
        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getCoins() {
      const res = await api.get(this.url_backend + 'api/client/coins/all');
      this.coins = res.data.data
      this.coins.unshift({
        id: 'Default',
        name: 'Choose a coin'
      })
    },

    async getCurrencies() {
      const res = await api.get(this.url_backend + 'api/client/currencies/all');
      this.currencies = res.data.data
      this.currencies.unshift({
        id: 'Default',
        name: 'Choose a currency'
      })
    }
  }
}
</script>

<style scoped>

</style>