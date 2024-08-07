<template>

  <Container>

    <Card>
      <CardBody>

        <FormLabel :label="'Update Bid'"/>
          <FormComponent :on-submit="updateBid">

            <FormBody>

              <div class="w-full">
                <FormInputLabel :label="'Coin'" :input-name="'coin_id'" />
                <FormSelect v-model="bid.coin.id" :options="coins" />
                <FormError v-if="errors.coin_id" :text=errors.coin_id[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Amount'" :input-name="'amount'" />
                <FormInput v-model="bid.amount" :name="'amount'" :type="'number'" :placeholder="'10000'" />
                <FormError v-if="errors.amount" :text=errors.amount[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Currency'" :input-name="'currency_id'" />
                <FormSelect v-model="bid.currency.id" :options="currencies" />
                <FormError v-if="errors.currency_id" :text=errors.currency_id[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Price'" :input-name="'price'" />
                <FormInput v-model="bid.price" :name="'price'" :type="'number'" :placeholder="'10000'" />
                <FormError v-if="errors.price" :text=errors.price[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Type'" :input-name="'type'" />
                <FormSelect v-model="bid.type" :options="types" />
                <FormError v-if="errors.type" :text=errors.type[0]  />
              </div>

              <div class="w-full">
                <FormInputLabel :label="'Payment method'" :input-name="'payment_method'" />
                <FormSelect v-model="bid.payment_method" :options="payment_methods" />
                <FormError v-if="errors.payment_method" :text=errors.payment_method[0]  />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Telegram ID'" :input-name="'user_telegram_id'" />
                <FormInput v-model="bid.user.telegram_id" :name="'user_telegram_id'" :type="'text'" :placeholder="'123456789'" />
                <FormError v-if="errors.user_telegram_id" :text=errors.user_telegram_id[0]  />
              </div>

              <div class="sm:col-span-2">
                <FormInputLabel :label="'Number'" :input-name="'number'" />
                <FormInput v-model="bid.number" :name="'number'" :type="'text'" :placeholder="'123456789'" />
                <FormError v-if="errors.number" :text=errors.number[0]  />
              </div>


              <div class="sm:col-span-2">
                <FormInputLabel :label="'Status'" :input-name="'status'" />
                <FormSelect v-model="bid.status" :options="statuses" />
                <FormError v-if="errors.status" :text=errors.status[0]  />
              </div>

            </FormBody>

            <FormButton :type="'submit'" :label="'Update'"/>

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
import Container from "@/Shared/UI/Container /Container.vue";
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
    FormError,
    FormInputLabel
  },
  data() {
    return {
      errors: {},
      success: null,
      error: null,
      coins: [],
      currencies: [],
      users: [],
      types: [
        {
          id: 'Default',
          name: 'Choose a type'
        },
        {
          id: 'buy',
          name: 'buy'
        },
        {
          id: 'sell',
          name: 'sell'
        }
      ],
      statuses: [
        {
          id: 'Default',
          name: 'Choose a status'
        },
        {
          id: 'created',
          name: 'created'
        },
        {
          id: 'pending',
          name: 'pending'
        },
        {
          id: 'closed',
          name: 'closed'
        }
      ],
      payment_methods: [
        {
          id: 'Default',
          name: 'Choose a payment method'
        },
        {
          id: 'Sber',
          name: 'Sber'
        },
        {
          id: 'Tincoff',
          name: 'Tincoff'
        },
        {
          id: 'Alfa-bank',
          name: 'Alfa-bank'
        }
      ],
      bid: {
        coin: {
          id: null,
          name: null,
          symbol: null,
          price: null
        },
        currency: {
          id: null,
          name: null,
          symbol: null
        },
        user: {
          id: null,
          name: null,
          email: null,
          telegram_id: null
        },
        amount: null,
        price: null,
        status: null,
        type: null,
        number: null,
        payment_method: null
      },
      url_backend: import.meta.env.VITE_URL_BACKEND,
      test_backend: import.meta.env.VITE_TEST_BACKEND
    }
  },

  mounted() {
    initFlowbite()
    this.getBid()
    this.getCoins()
    this.getCurrencies()
  },

  methods: {
    async updateBid() {

      this.errors = {}
      this.success = null

      try {
        const res = await api.put(this.url_backend + 'api/client/bids/update', {
          'id': this.bid.id,
          'coin_id': this.bid.coin.id,
          'currency_id': this.bid.currency.id,
          'user_telegram_id': this.bid.user.telegram_id,
          'amount': this.bid.amount,
          'price': this.bid.price,
          'status': this.bid.status,
          'type' : this.bid.type,
          'number': this.bid.number,
          'payment_method': this.bid.payment_method
        })
        this.success = res.data.message
      } catch (errors) {
        if (errors.response.status === 422) {
          this.errors = errors.response.data.errors
        }
      }
    },

    async getBid() {
      try {
        const res = await api.get(this.url_backend + 'api/client/bids/show/' + this.$route.params.id)

        this.bid = res.data.data
        console.log(this.bid)
      } catch (error) {
        if (error.response.status === 404) {
          this.error = error.response.data.error
        }
      }
    },

    async getCoins() {
      const res = await api.get(this.url_backend + 'api/client/coins/all')

      this.coins = res.data.data
      console.log(this.coins)
    },

    async getCurrencies() {
      const res = await api.get(this.url_backend + 'api/client/currencies/all')

      this.currencies = res.data.data
    }
  }
}
</script>

<style scoped>

</style>