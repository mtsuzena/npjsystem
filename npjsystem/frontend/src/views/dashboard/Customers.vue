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

              <template v-slot:top>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Tem certeza de que deseja excluir essa atividade?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="darken-1" text @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="darken-1" text @click="deleteItemConfirm">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
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

const api = axios.create({
  baseURL: configs.API_URL,
  headers: {
    'auth-token': window.localStorage.token
  }
});

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
        },
        {
          text: 'Ações',
          value: 'actions',
          sortable: false
        },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        deadline: '',
        responsavel: '',
      },
      dialogDelete: false,
    }
  },
  methods: {
    deleteItem (item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async deleteItemConfirm () {
      this.closeDelete();

      let customerId = this.customers[this.editedIndex].id;
      await api.delete(`customers/${customerId}`).then((responseDeleteCustomer) => {

        if(responseDeleteCustomer.status === 204){
          console.log("deletado com sucesso")
          // gerar alerta aqui
        }else{
          console.log("Nao foi possivel deletar o checklist")
          console.log(responseDeleteCustomer.data)
          //gerar alerta
        }
      });

      this.customers.forEach((customer, i) => {
        if(customer.id === customerId){
          this.customers.splice(i, 1)
        }
      })
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
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
    });
  }
}
</script>
