<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Editar Perfil
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Complete seu perfil
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Nome"
                    class="purple-input"
                    v-model="user.name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Sobrenome"
                    class="purple-input"
                    v-model="user.lastName"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    class="purple-input"
                    v-model="user.email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Cep"
                    class="purple-input"
                    v-model="user.cep"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Estado"
                    class="purple-input"
                    v-model="user.state"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Cidade"
                    v-model="user.city"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Endereço"
                    class="purple-input"
                    v-model="user.addres"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    v-model="user.aboutMe"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="updateUser"
                  >
                    Atualizar Perfil
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
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
  const configs = require('../../../config/configs');
  export default {
  name: 'UserProfile',
  components: {

  },
  computed: {
    parsedDirection () {
      return this.direction.split(' ')
    },
  },
  methods: {
    updateUser(){
      let api = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token
        }
      });

      const tokenDecoded = jwt.decode(window.localStorage.token);

      api.put(`users/${tokenDecoded.id}`, this.user).then((responseUpdateUser) => {
        console.log(responseUpdateUser);
      });

      this.generateAlert(1, 'Perfil editado com sucesso');
    },
    setAlertColor (color) {
      this.color = this.colors[color];
    },
    generateAlert(color, msg){
      this.alertMsg = msg;
      this.setAlertColor(color);
      this.direction = 'center';
      this.snackbar = true;
    }
  },
  data() {
    return {
      user: {},
      snackbar: false,
      color: 'info',
      colors: [
        'info',
        'success',
        'warning',
        'error',
      ],
      direction: 'top center',
      alertMsg: ''
    }
  },
  beforeMount(){
    let api = axios.create({
      baseURL: configs.API_URL,
      headers: {
        'auth-token': window.localStorage.token
      }
    });

    const tokenDecoded = jwt.decode(window.localStorage.token);
    api.get(`users/${tokenDecoded.id}`).then((responseGetUserById) => {
      this.user = responseGetUserById.data;
    });
  },
  }
</script>
