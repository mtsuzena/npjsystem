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
        scrollable
      >
        <v-card>
          <v-toolbar>
            <v-icon large color="green darken-2">event</v-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title>Agendar para o dia {{ dateCalender | dateFormat }}</v-toolbar-title>
            <v-spacer />
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
                    :rules="nameRules"
                    label="Nome do Cliente*"
                    required
                    type="text"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.trim="customer.lastName"
                    :rules="lastNameRules"
                    label="Sobrenome do Cliente*"
                    required
                    type="text"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model.trim="customer.cpf"
                    v-mask="'###.###.###-##'"
                    :rules="cpfRules"
                    label="CPF*"
                    required
                    type="text"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.trim="customer.email"
                    label="Email*"
                    type="email"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.trim="customer.cellphone"
                    v-mask="'(##) #####-####'"
                    :rules="phoneRules"
                    label="Telefone*"
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
                    offset-y
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="time"
                        v-bind="attrs"
                        :rules="timeRules"
                        label="Selecionar horário"
                        readonly
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="menu"
                      v-model="time"
                      format="24hr"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    />
                  </v-menu>
                </v-col>
                <v-spacer />

                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="select"
                    :items="items"
                    label="Responsável pelo atendimento"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="consultations.motivo"
                    label="Motivo"
                    type="text"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="blue darken-1"
              form="dialogForm"
              text
              type="submit"
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
  import configs from '../../../config/configs'

  const jwt = require('jsonwebtoken')
  const api = axios.create({
    baseURL: configs.API_URL,
    headers: {
      'auth-token': window.localStorage.token,
    },
  })

  export default {
    name: 'DialogCalender',
    filters: {
      dateFormat (value) {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }
        return value.toLocaleDateString('pt-br', options)
      },
    },
    props: {
      dateCalender: Date,
      open: Boolean,
      consultationId: null,
    },
    data () {
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
          motivo: null,
        },
      }
    },
    watch:{
      time(){
        this.getUsers()
      }
    },
    methods: {
      attUsers () {
        this.getUsers()
      },
      async getUsers () {
        this.items = []
        this.dateCalender.setHours(parseInt(this.time.substring(0, 2)),
                                   parseInt(this.time.substring(7, this.time.length - 2)))

        await api.get(`users/freeOnDate/${this.dateCalender}`).then((responseGetUserById) => {
          responseGetUserById.data.forEach((value) => {
            this.items.push({
              text: value.name,
              value: value.id,
            })
          })
        })
      },
      async getConsultationById (consultationId) {
        await api.get(`/consultations/${consultationId}`).then((responseGetConsultationById) => {
          let value = responseGetConsultationById.data;
          this.customer.name = value.customer.name;
          this.customer.lastName = value.customer.lastName;
          this.customer.cpf = value.customer.cpf;
          this.customer.email = value.customer.email;
          this.customer.cellphone = value.customer.cellphone;
          this.consultations.motivo = value.motivo;
          let x = new Date(value.consultationDate);
          this.time = x.toLocaleTimeString();
        })
      },
      close () {
        this.dialog = false;
        setTimeout(()=>{
          this.clear();
          this.$emit('closeDialog')
        },1000);
      },
      clear(){
     //   this.customerId = '';
        this.customer.name = '';
        this.customer.lastName = '';
        this.customer.cpf = '';
        this.customer.email = '';
        this.customer.cellphone = '';
        this.time = null;
      },
      async save () {
        if (this.$refs.form.validate()) {

          if (this.customerId !== ' '){ //caso seja vazio ir para o else e atualizar a consulta
            this.consultations.consultationDate.setHours(
              parseInt(this.time.substring(0, 2)),
              parseInt(this.time.substring(7, this.time.length - 2))
            );
            this.consultations.consultationDate = this.dateCalender
            this.consultations.userId = this.select

            await api.post('/customers', this.customer)
              .then((response) => {

                this.consultations.customerId = response.data.id
                api.post('/consultations', this.consultations)
                  .then((response) => {
                    this.close()
                    this.$emit('saveDialog')
                  }, (error) => {
                    console.log(error)
                  })
              }, (error) => {
                console.log(error)
              })
          }
          this.clear();
        }
      },
    },
    created() {
      if (this.consultationId !== ''){
          this.getConsultationById(this.consultationId);
      }
    }
  }
</script>
<style scoped>

</style>
