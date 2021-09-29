<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    class="grey lighten-5 mb-6"
  >
    <v-row
      align="start"
      justify="space-around"
      class="grey lighten-5"
    >
      <v-col>
        <base-material-card
          icon="mdi-clipboard-text"
          color="success"
          title="Clientes"
          class="px-5 py-3"
        >
          <v-card-text>
            <v-card-title
            >
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="customerHeaders"
              :items="customers"
              :search="search"
              :footer-props="{
                'items-per-page-text':'Clientes por página'
              }"
              item-key="number"
              @click:row="redirectToDetailedCustomerScreen"
              class="py-3"
            >
              <template v-slot:item.customerActive="{item}">
                <v-checkbox
                  v-model="item.customerActive"
                  label="Cliente ativo"
                  v-if="item.customerActive === true"
                ></v-checkbox>

                <v-checkbox
                  v-model="item.customerActive"
                  label="Cliente desativado"
                  v-if="item.customerActive === false"
                ></v-checkbox>
              </template>
            </v-data-table>
          </v-card-text>
          
          <dialog-new-process></dialog-new-process>

        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
const jwt = require('jsonwebtoken');
const configs = require('../../config/configs');

export default {
  name: 'Customers',
  components: {
    DialogNewProcess: () => import('./components/DialogNewProcess'),
  },
  data() {
    return {
      customers: [],
      search: '',
      customerHeaders: [
        {
          sortable: false,
          text: 'Nome',
          value: 'fullName',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Celular',
          value: 'cellphone',
          align: 'left ',
        },
        {
          sortable: false,
          text: 'Cidade',
          value: 'city',
          align: 'left ',
        },
        {
          sortable: false,
          text: 'Cliente Ativo',
          value: 'customerActive',
          align: 'left ',
        }
      ],
    }
  },
  methods: {
    redirectToDetailedCustomerScreen(process) {
      this.$router.push(`processDetailed/${process.number}`);
    },
  },
  beforeCreate(){
    let api = axios.create({
      baseURL: configs.API_URL,
      headers: {
        'auth-token': window.localStorage.token
      }
    });
    const tokenDecoded = jwt.decode(window.localStorage.token);

    api.get('customers').then((responseGetCustomers) => {
      this.customers = responseGetCustomers.data;
      this.customers.forEach((customer, i) => {
        this.customers[i].fullName = customer.name + ' ' + customer.lastName;
      });
      console.log("customers");
      console.log(this.customers);
    });
  }
}
</script>
