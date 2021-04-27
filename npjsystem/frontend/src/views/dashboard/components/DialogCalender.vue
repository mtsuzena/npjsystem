<template>

    <v-form
      id="dialogForm"
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="save"
    >

      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          max-width="40%"
          persistent
        >
          <v-card
          >
            <v-toolbar>
              <v-icon large color="green darken-2">event</v-icon>
              <v-spacer></v-spacer>
              <v-toolbar-title>Agendar para o dia {{ dateCalender | dateFormat }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                icon
                text
                @click="close"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-container>
                <v-row>

                  <v-col cols="6">
                      <v-text-field
                        v-model.trim="customer.name"
                        label="Nome do Cliente*"
                        :rules="nameRules"
                        required
                        type="text"
                      />
                  </v-col>

                  <v-col cols="6">
                      <v-text-field
                        v-model.trim="customer.lastName"
                        label="Sobrenome do Cliente*"
                        :rules="lastNameRules"
                        required
                        type="text"
                      />
                  </v-col>

                  <v-col cols="12">
                      <v-text-field
                        v-model.trim="customer.cpf"
                        v-mask="'###.###.###-##'"
                        label="CPF*"
                        required
                        :rules="cpfRules"
                        type="text"
                      />
                  </v-col>

                  <v-col cols="6">
                      <v-text-field
                        v-model.trim="customer.email"
                        label="Email*"
                        :rules="emailRules"
                        required
                        type="email"
                      />
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      v-model.trim="customer.cellphone"
                      v-mask="'(##) #####-####'"
                      label="Telefone*"
                      :rules="phoneRules"
                      required
                      type="phone"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="100"
                      :return-value.sync="time"
                      max-height="100%"
                      max-width="20%"
                      min-width="20%"
                      offset-x
                      transition="scale-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          v-bind="attrs"
                          v-on="on"
                          label="Selecionar horário"
                          :rules="timeRules"
                          readonly
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu"
                        v-model="time"
                        format="24hr"
                        full-width

                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-spacer></v-spacer>

                  <v-col
                    cols="12"
                  >
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="selectRules"
                      label="Responsável pelo atendimento*"
                      required
                    />
                  </v-col>
                </v-row>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="blue darken-1"
                form="dialogForm"
                text
                type="submit"
                :disabled="!valid"
              >
                Salvar
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

    </v-form>

</template>

<script>
import axios from 'axios'
import configs from "../../../config/configs";

const jwt = require('jsonwebtoken');
let api = axios.create({
  baseURL: configs.API_URL,
  headers: {
    'auth-token': window.localStorage.token
  }
});

export default {
  name: 'DialogCalender',
  props: {
    dateCalender: Date,
    open: Boolean,
  },
  filters: {
    dateFormat(value) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }
      return value.toLocaleDateString('pt-br', options)
    }
  },
  data() {
    return {
      dialog: this.open,
      items: [],
      time: null,
      select: null,
      menu: false,
      name: '',
      valid: true,
      nameRules: [
        v => !!v || 'Preencha o Nome!',
        v => (v && v.length <= 10) || 'Tamanho máximo de 10 caracteres!',
        v => /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || 'Não inserir numeros ou caractéres especiais!',
      ],
      lastNameRules: [
        v => !!v || 'Preencha o o Sobrenome!',
        v => (v && v.length <= 20) || 'Tamanho máximo de 20 caracteres!',
        v => /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || 'Não inserir numeros ou caractéres especiais!',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Preencha o email',
        v => /.+@.+\..+/.test(v) || 'Insiria um email válido!',
      ],
      cpfRules: [
        v => !!v || 'Preencha o cpf',
        v => /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(v) || 'Insiria um cpf válido!',
      ],
      phoneRules: [
        v => !!v || 'Preencha o telefone',
        v => /^\s*(\(\d{2}\)|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(v) || 'Insiria um telefone válido!',
      ],
      selectRules: [
        v => !!v || 'Selecione um responsável',
      ],
      timeRules: [
        v => !!v || 'Selecione um horário',
      ],
      customer: {
        name: '',
        lastName: '',
        cpf: '',
        email: '',
        cellphone: '',
        responsible: '',
      },
      consultations: {
        userId: Number,
        customerId: null,
        consultationDate: this.dateCalender,
      },
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      await api.get(`users/freeOnDate/${this.dateCalender}`).then((responseGetUserById) => {
        responseGetUserById.data.forEach((value) => {
          this.items.push({
            text: value.name,
            value: value.id
          });
        });
      });
    },
    close() {
      this.$emit("closeDialog")
    },
    // validate(obj){
    //     for(var prop in obj) {
    //       if(obj.hasOwnProperty(prop))
    //         return false;
    //     }
    //     return true;
    // },
    async save() {
      if (this.$refs.form.validate()){

        this.consultations.consultationDate.setHours(
          parseInt(this.time.substring(0, 2)),
          parseInt(this.time.substring(7, this.time.length - 2))
        );
        this.consultations.userId = this.select;

        await api.post('/customers', this.customer)
          .then((response) => {
            console.log(response)
            this.consultations.customerId = response.data.id;
              api.post('/consultations', this.consultations)
              .then((response) => {
                console.log(response);
                this.close()
                this.$emit("saveDialog")
              }, (error) => {
                console.log(error);
              });

          }, (error) => {
            console.log(error);
          });

        // axios.all([
        //   axios.post(`/my-url`, {
        //     myVar: 'myValue'
        //   }),
        //   axios.post(`/my-url2`, {
        //     myVar: 'myValue'
        //   })
        // ])
        //   .then(axios.spread((data1, data2) => {
        //     // output of req.
        //     console.log('data1', data1, 'data2', data2)
        //   }));
      }
    }
  },
}
</script>
<style scoped>


</style>
