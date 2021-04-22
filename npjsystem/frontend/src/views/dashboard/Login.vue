<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height">
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="8"
          >
            <v-card class="elevation-12">
              <v-window>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-card-text class="mt-8">
                      <h1
                        class="text-center text-h3 teal--text text--accent-3"
                      >
                        Entrar em NPJ System
                      </h1>
                      <v-form>
                        <v-text-field
                          v-model="email"
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="teal accent-3"
                        />
                        <v-text-field
                          id="password"
                          v-model="password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          type="password"
                          color="teal accent-3"
                        />
                      </v-form>
                      <h3 class="text-center mt-4">
                        Esqueceu sua senha?
                      </h3>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn
                        rounded
                        color="teal accent-3"
                        dark
                        @click="login"
                      >
                        Entrar
                      </v-btn>
                    </div>
                    <br>
                  </v-col>
                </v-row>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'
  const jwt = require('jsonwebtoken')
  const configs = require('../../config/configs')
  export default {
    name: 'Login',
    props: {
      source: String,
    },
    data: () => ({
      email: '',
      password: '',
    }),
    methods: {
      getUser: async function () {
        return response.data
      },
      login: async function () {
        const user = {
          email: this.email,
          password: this.password,
        }
        try {
          const response = await axios.post(configs.API_LOGIN, user)
          const verified = jwt.decode(response.data.token)
          // const verified = jwt.verify(response.data, "NPJSYSTEM-98asdhj319fdwjnn-key");

          const get_user = await axios.get(configs.API_GET_USER + '/' + verified.id)

          this.$router.push({ name: 'Painel', params: { user: get_user.data, userJwt: response.data } })
        } catch (error) {
          if (error.response) {
            console.log('Error data : ', error.response.data)
            console.log('Error status : ', error.response.status)
            console.log('Error headers : ', error.response.headers)
          } else if (error.request) {
            console.log('Error request : ', error.request)
          } else {
            console.log('Error message : ', error.message)
          }
          console.log(error.config)

          this.email = ''
          this.password = ''
        }
      },
    },
  }
</script>
