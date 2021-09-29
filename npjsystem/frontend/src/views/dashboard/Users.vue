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
          title="Usuarios"
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
              :headers="userHeaders"
              :items="users"
              :search="search"
              :footer-props="{
                'items-per-page-text':'Clientes por página'
              }"
              item-key="number"
              @click:row="redirectToDetailedCustomerScreen"
              class="py-3"
            >
              <template v-slot:item.userActive="{item}">
                <v-checkbox
                  v-model="item.userActive"
                  label="Usuario ativo"
                  v-if="item.userActive === true"
                ></v-checkbox>

                <v-checkbox
                  v-model="item.userActive"
                  label="Usuario desativado"
                  v-if="item.userActive === false"
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
      users: [],
      search: '',
      userHeaders: [
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
          text: 'Perfil do Usuário',
          value: 'profile.name',
          align: 'left',
        },
      ]
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

    api.get('users').then((responseGetUsers) => {
      this.users = responseGetUsers.data;
      this.users.forEach((user, i) => {
        this.users[i].fullName = user.name + ' ' + user.lastName;
      });
    });
  }
}
</script>
