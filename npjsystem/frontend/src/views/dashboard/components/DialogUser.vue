<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
      persistent
      scrollable
    >
      <template v-slot:activator="{on,attrs}">
        <v-btn
          v-if="verificaSePermiteCriarUsuario()"
          class="ma-2"
          color="green"
          v-bind="attrs"
          v-on="on"
          @click="dialog = false"
        >
          Cadastrar Usuario
        </v-btn>
        <v-btn
          v-else
          class="ma-2"
          color="green"
          @click="retornarErro('Você nao possui permissao para criar um usuário')"
        >
          Cadastrar Usuario
        </v-btn>
      </template>


      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar fixed>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title>Cadastrar um novo usuario</v-toolbar-title>
            </v-col>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-form
            id="formUser"
            ref="form"
            lazy-validation
            v-model="valid"
          >
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Nome:"
                  prepend-icon="fas fa-user"
                  :rules="[rules.required, rules.name]"
                  v-model="user.name"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="Sobrenome:"
                  prepend-icon="fas fa-user"
                  :rules="[rules.required, rules.name]"
                  v-model="user.lastName"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="CEP:"
                  prepend-icon="fas far fa-map"
                  v-mask="'##.###-###'"
                  :rules="[rules.required, rules.name]"
                  v-model="user.cep"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="Endereco:"
                  prepend-icon="fas fa-map-pin"
                  :rules="[rules.required, rules.name]"
                  v-model="user.addres"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Cidade:"
                  prepend-icon="fas fa-city"
                  :rules="[rules.required, rules.name]"
                  v-model="user.city"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="UF:"
                  prepend-icon="fas fa-flag-usa"

                  :rules="[rules.required, rules.uf]"
                  v-model="user.state"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="E-mail:"
                  prepend-icon="far fa-envelope"
                  :rules="[rules.required, rules.email]"
                  v-model="user.email"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Senha:"
                  prepend-icon="fas fa-key"
                  :type="`password`"
                  :rules="[rules.required, rules.min]"
                  v-model="user.password"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Confirme sua senha:"
                  :type="`password`"
                  :rules="[rules.required, rules.min]"
                  prepend-icon="fas fa-key"
                  v-model="passConfirmar"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  label="Perfil:"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  v-model="user.profileId"
                  prepend-icon="fas fa-id-card-alt"
                  :rules="[rules.required]"
                  @click.once.prevent="perfil"
                >
                </v-autocomplete>
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Sobre mim:"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-signature"
                  v-model="user.aboutMe"
                />
              </v-col>
            </v-row>
          </v-form>


        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="cancelar"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="salvar"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>


  </div>

</template>

<script>
import axios from 'axios'
import configs from '../../../config/configs'

const jwt = require('jsonwebtoken')
const api = axios.create({
  baseURL: configs.API_URL,
  headers: {
    'auth-token': window.localStorage.token,
  },
})


export default {
  name: "DialogUser",
  props: {
    dialogProp: false,
    userProp: '',
  },
  data() {
    return {
      dialog: false,
      att: '',
      valid: true,
      modal: false,
      passConfirmar: '',
      items: [],
      user: {
        name: '',
        lastName: '',
        email: '',
        aboutMe: '',
        cep: '',
        state: '',
        city: '',
        addres: '',
        password: '',
        userActive: true,
        createdAt: Date.now(),
        updatedAT: Date.now(),
        profileId: ''
      },

      rules: {
        required: value => !!value || 'Nao pode ser vazio.',
        min: v => (v && v.length >= 8) || 'Tamanho minimo de 8 caracteres!',
        name: v => (v && v.length < 25) || 'Tamanho maior que 25 caracteres!',
        email: v => /.+@.+\..+/.test(v) || 'Insiria um email válido!',
        uf: v => (v && v.length < 3) || 'Tamanho maior que 2 caracteres!',
      },
    }

  },
  watch: {
    dialogProp() {
      if (this.dialogProp === true) {
        this.dialog = true;
        this.user.id = this.userProp.id;
        this.user.name = this.userProp.name;
        this.user.lastName = this.userProp.lastName;
        this.user.email = this.userProp.email;
        this.user.aboutMe = this.userProp.aboutMe;
        this.user.cep = this.userProp.cep;
        this.user.state = this.userProp.state;
        this.user.city = this.userProp.city;
        this.user.addres = this.userProp.addres
        this.user.password = this.userProp.password;
        this.passConfirmar = this.userProp.password;
        this.user.profileId = this.userProp.profileId;
        this.att = true;
      }
    }
  },

  methods: {
    retornarErro(msg) {
      this.msgErro = msg;
      this.$emit('generateAlert', 3, msg);
    },
    verificaSePermiteCriarUsuario(){
      const tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'CREATE_USER');
      if(permissao) {
        return true
      }else{
        return false
      }
    },

    async perfil() {
      await api.get('profiles/').then((resposta) => {

        resposta.data.forEach((value) => {
          if (value.name != 'ADMIN') {
            this.items.push({
              text: value.name,
              value: value.id
            });
          }
        });

      });

    },
    async salvar() {
      if (this.att == true) {
        await api.put(`users/${this.user.id}`, this.user)
          .then((resposta) => {
              this.dialog = false;
              this.$emit('atualizarLista2');
              this.$refs.form.reset();
            }, (error) => {
              console.log(error);
            }
          )
        ;

      } else if (this.$refs.form.validate()) {
        await api.post('users/', this.user).then((resposta) => {
          this.dialog = false;
          this.$emit('atualizarLista', resposta.data);
          this.$refs.form.reset();
        }, (e) => {
          console.log(e);
        });
      }

    },

    cancelar() {
      this.dialog = false;
      this.$emit('attDialog');
      this.$refs.form.reset();
    }
  }

}
</script>

<style scoped>

</style>
