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
              class="py-3"
            >
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

            </v-data-table>
          </v-card-text>
          
          <dialog-new-process></dialog-new-process>

        </base-material-card>
      </v-col>
    </v-row>
    <base-material-snackbar
      v-model="snackbar"
      :type="color"
      v-bind="{
        [parsedDirection[0]]: true,
        [parsedDirection[1]]: true
      }"
    >
      {{alertMsg}}
    </base-material-snackbar>
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
  name: 'Users',
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
      alertMsg: '',
      color: 'info',
      colors: [
        'info',
        'success',
        'warning',
        'error',
      ],
      direction: 'top center',
      snackbar: false,
    }
  },
  methods: {
    generateAlert(color, msg){
      this.alertMsg = msg;
      this.color = this.colors[color];
      this.direction = 'top right';
      this.snackbar = true;
    },
    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
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
      console.log("aushdas")

      let userId = this.users[this.editedIndex].id;
      await api.delete(`users/${userId}`).then((responseDeleteUser) => {

        if(responseDeleteUser.status === 204){
          console.log("deletado com sucesso")
          this.generateAlert(1, 'Usuário excluído');
        }else{
          this.generateAlert(3, 'Erro ao excluír o usuário');
        }
      });

      this.users.forEach((user, i) => {
        if(user.id === userId){
          this.users.splice(i, 1)
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
  computed: {
    parsedDirection () {
      return this.direction.split(' ')
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
