<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height">
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <v-card class="elevation-12">
              <v-window>
                <v-row 
                  align="center"
                  justify="center">
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-card-text>
                      <div align="center">
                        <v-img
                          max-height="160"
                          max-width="160"
                          src="./npjsy-logo.png"
                        ></v-img>
                      </div>
                      <!--<h1
                        class="text-center text-h3"
                        style="color: #034405"
                        
                      >
                        Entrar em NPJ System
                      </h1>-->
                      <v-form>
                        <v-text-field
                          v-model="email"
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="#034405"
                        />
                        <v-text-field
                          id="password"
                          v-model="password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          type="password"
                          color="#034405"
                        />
                      </v-form>
                      <h4 class="text-center mt-4" style="color: #034405">
                        Esqueceu sua senha?
                      </h4>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn
                        rounded
                        color="#034405"
                        dark
                        @click="login"
                      >
                        Entrar
                      </v-btn>
                    </div>
                    <br>
                    <br>
                  </v-col>
                </v-row>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from 'axios'
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
          const response = await axios.post(configs.API_URL+"login", user);
          const token = response.data.token;
          window.localStorage.token = token;

          this.$router.push({ name: 'Painel' })
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
