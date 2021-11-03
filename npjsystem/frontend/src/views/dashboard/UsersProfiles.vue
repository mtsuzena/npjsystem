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
          title="Perfis de Usuários"
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
              :headers="profileHeaders"
              :items="profiles"
              :search="search"
              :footer-props="{
                'items-per-page-text':'Perfis por página'
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
                    <v-card-title class="text-h5">Tem certeza de que deseja excluir esse perfil?</v-card-title>
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
            <dialog-profiles
              @atualizarLista2="atualizarLista2"
              :dialog-prop="dialogProp"
              :profile-prop="profileProp"
              @attDialog="attDialog"
            ></dialog-profiles>

          </v-card-text>
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
  name: 'UsersProfiles',
  components: {
    DialogProfiles: () => import('./components/DialogProfiles'),
  },
  data() {
    return {
      userProp: {},
      dialogProp: false,
      profiles: [],
      profileProp: {},
      search: '',
      profileHeaders: [
        {
          sortable: false,
          text: 'Nome',
          value: 'name',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Descrição',
          value: 'description',
          align: 'left',
        },
        {
          text: 'Ações',
          value: 'actions',
          sortable: false,
          align: 'left'
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
    // async atualizarLista(profile, v ){
    //   this.dialogProp = false;
    //   let api = axios.create({
    //     baseURL: configs.API_URL,
    //     headers: {
    //       'auth-token': window.localStorage.token
    //     }
    //   });
    //   // profile.roles = v;
    //   console.log(profile,'sss');
    //   this.profiles.push(profile);
    //
    // },
    async atualizarLista2(profile){
      this.dialogProp = false;
      let api = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token
        }
      });
      this.profileProp = {};
      this.profiles =[];
      api.get('/profiles').then((response) => {
        this.profiles = response.data;
      });
    },
    attDialog(){
      this.dialogProp = false;
    },
    editItem(item){
      let tokenDecoded = jwt.decode(window.localStorage.token);
      let permite = tokenDecoded.roles.find(role => role.name === 'UPDATE_PROFILE');
      if(permite){
        // console.log(item);
         this.profileProp = item;
         this.dialogProp = true;
      }else{
        this.generateAlert(3, 'Você não possui permisão para editar um perfil');
      }

    },
    generateAlert(color, msg){
      this.alertMsg = msg;
      this.color = this.colors[color];
      this.direction = 'top right';
      this.snackbar = true;
    },
    deleteItem (item) {
      let tokenDecoded = jwt.decode(window.localStorage.token);
      let permissaoParaDeletar = tokenDecoded.roles.find(role => role.name === 'DELETE_PROFILE');
      if(permissaoParaDeletar){
        this.editedIndex = this.profiles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      }else{
        this.generateAlert(3, 'Você não possui permisão para deletar um perfil');
      }
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

      let profileId = this.profiles[this.editedIndex].id;
      await api.delete(`profiles/${profileId}`).then((response) => {
        if(response.status === 204){
          this.generateAlert(1, 'Perfil excluído');
        }else{
          this.generateAlert(3, 'Erro ao excluír o perfil');
        }
      });

      this.profiles.forEach((profile, i) => {
        if(profile.id === profileId){
          this.profiles.splice(i, 1)
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
    let tokenDecoded = jwt.decode(window.localStorage.token);
    if(!tokenDecoded){
      this.$router.push({ name: 'Login' })
    }
    console.log("token")
    console.log(this.tokenDecoded)

    api.get('profiles').then((response) => {
      this.profiles = response.data;
    });
  }
}
</script>
