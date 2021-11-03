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
          v-if="verificaSePermiteCriarCliente()"
          class="ma-2"
          color="green"
          v-bind="attrs"
          v-on="on"
          @click="dialog = false"
        >
          Cadastrar cliente
        </v-btn>
        <v-btn
          v-else
          class="ma-2"
          color="green"
          @click="retornarErro('Você nao possui permissao para criar um cliente')"
        >
          Cadastrar cliente
        </v-btn>
      </template>


      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar fixed>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title>Cadastrar um novo cliente</v-toolbar-title>
            </v-col>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-form
            id="formCustomer"
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
                  v-model="customer.name"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="Sobrenome:"
                  prepend-icon="fas fa-user"
                  :rules="[rules.required, rules.name]"
                  v-model="customer.lastName"
                />
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="CPF:"
                  v-mask="'###.###.###-##'"
                  prepend-icon="far fa-address-card"
                  :rules="[rules.required, rules.cpf]"
                  v-model="customer.cpf"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="RG:"
                  v-mask="'##.###.###-#'"
                  prepend-icon="far fa-address-card"
                  :rules="[rules.required, rules.name]"
                  v-model="customer.rg"
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
                  v-model="customer.cep"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="Endereco:"
                  prepend-icon="fas fa-map-pin"
                  :rules="[rules.required, rules.name]"
                  v-model="customer.street"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Cidade:"
                  prepend-icon="fas fa-city"
                  :rules="[rules.required, rules.name]"
                  v-model="customer.city"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="UF:"
                  prepend-icon="fas fa-flag-usa"
                  :rules="[rules.required, rules.uf]"
                  v-model="customer.state"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="E-mail:"
                  prepend-icon="far fa-envelope"
                  :rules="[rules.required, rules.email]"
                  v-model="customer.email"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Phone:"
                  v-mask="'(##) #####-####'"
                  prepend-icon="fas fa-phone"
                  :rules="[rules.required, rules.phone]"
                  v-model="customer.cellphone"
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
  name: "DialogCustomer",
  props: {
    dialogProp: false,
    customerProp: '',
  },
  data() {
    return {
      dialog: false,
      att: '',
      valid: true,
      modal: false,
      items: [],
      customer: {
        name: '',
        lastName: '',
        email: '',
        cep: '',
        state: '',
        city: '',
        street: '',
        cpf: '',
        rg: '',
        cellphone: '',
        customerActive: true,
        createdAt: Date.now(),
        updatedAT: Date.now(),
      },

      rules: {
        required: value => !!value || 'Nao pode ser vazio.',
        min: v => v.length >= 8 || 'Min 8 caracteres',
        name: v => (v && v.length < 25) || 'Tamanho maior que 25 caracteres!',
        email: v => /.+@.+\..+/.test(v) || 'Insiria um email válido!',
        uf: v => (v && v.length < 3) || 'Tamanho maior que 2 caracteres!',
        cpf:  v => /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(v) || 'Insiria um cpf válido!',
        phone: v => /^\s*(\(\d{2}\)|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(v) || 'Insiria um telefone válido!',
      },
    }

  },
  watch: {
    dialogProp() {
      if (this.dialogProp === true) {
        this.dialog = true;
        this.customer.id = this.customerProp.id;
        this.customer.name = this.customerProp.name;
        this.customer.lastName = this.customerProp.lastName;
        this.customer.email = this.customerProp.email;
        this.customer.aboutMe = this.customerProp.aboutMe;
        this.customer.cep = this.customerProp.cep;
        this.customer.state = this.customerProp.state;
        this.customer.city = this.customerProp.city;
        this.customer.street = this.customerProp.street;
        this.customer.cpf = this.customerProp.cpf;
        this.customer.rg = this.customerProp.rg;
        this.customer.cellphone = this.customerProp.cellphone;
        this.att = true;
      }
    }
  },

  methods: {
    retornarErro(msg) {
      this.msgErro = msg;
      this.$emit('generateAlert', 3, msg);
    },
    verificaSePermiteCriarCliente(){
      const tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'CREATE_CUSTOMER');
      if(permissao) {
        return true
      }else{
        return false
      }
    },
    async salvar() {
      if (this.att == true) {
        await api.put(`customers/${this.customer.id}`, this.customer)
          .then((resposta) => {
              this.dialog = false;
              this.$emit('atualizarLista2');
              this.$refs.form.reset();
            }, (error) => {
              console.log(error);
            }
          );

      } else if (this.$refs.form.validate()) {
        await api.post('/customers', this.customer)
          .then((resposta) => {
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
