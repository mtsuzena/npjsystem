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
                    append-icon="fas fa-id-card-alt"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.trim="customer.lastName"
                    :rules="lastNameRules"
                    label="Sobrenome do Cliente*"
                    required
                    type="text"
                    append-icon="fas fa-id-card-alt"
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
                    append-icon="fas fa-id-card"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model.trim="customer.email"
                    label="Email*"
                    type="email"
                    :rules="emailRules"
                    append-icon="fas fa-envelope"
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
                    append-icon="fas fa-phone"
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
                        append-icon="fas fa-hourglass-half"
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
                  <v-autocomplete
                    v-model="select"
                    :items="items"
                    :filter="customFilter"
                    item-text="text"
                    item-value="value"
                    :label="selectName"
                    required
                    persistent-hint
                    append-icon="fas fa-chalkboard-teacher"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Motivo do Atendimento"
                    v-model="consultations.motivo"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="#034405"
              text
              @click="close"
            >
              CANCELAR

            </v-btn>
            <v-btn
              :disabled="!valid"
              color="#034405"
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
        selectName: 'Responsável pelo atendimento: ',
        menu: false,
        name: '',
        valid: true,
        nameRules: [
          v => !!v || 'Preencha o Nome!',
          v => (v && v.length <= 40) || 'Tamanho máximo de 40 caracteres!',
          v => /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || 'Não inserir numeros ou caractéres especiais!',
        ],
        lastNameRules: [
          v => !!v || 'Preencha o o Sobrenome!',
          v => (v && v.length <= 40) || 'Tamanho máximo de 40 caracteres!',
          v => /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || 'Não inserir numeros ou caractéres especiais!',
        ],
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
          motivo: null,
        },
      }
    },
    watch:{
      time(){
        this.getUsers()
      },
    },
    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase();
        const searchText = queryText.toLowerCase();
        return textOne.indexOf(searchText) > -1;
      },
      async getUsers () {
        this.items = []
        this.dateCalender.setHours(parseInt(this.time.substring(0, 2)),
                                   parseInt(this.time.substring(7, this.time.length - 2)))

        await api.get(`users/freeOnDate/${this.dateCalender}`).then((responseGetUserById) => {
          responseGetUserById.data.forEach((value) => {

            this.items.push({
              text: value.name + ' ' + value.lastName,
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
          this.consultations.customerId = value.customer.id;

          //Consultation de bozo, refazer dps essse macacao sem fim
          this.selectName = value.user.name + ' ' + value.user.lastName;
          let x = new Date(value.consultationDate);
          this.time = x.toLocaleTimeString();
        })
      },
      close () {
        this.dialog = false;
        setTimeout(()=>{
          this.$emit('closeDialog')
        },1000);
      },
      async save () {
        if (this.$refs.form.validate()) {

          if (this.customerId !== '' && this.consultationId === ''){
            this.consultations.consultationDate.setHours(
              parseInt(this.time.substring(0, 2)),
              parseInt(this.time.substring(7, this.time.length - 2))
            );
            this.consultations.consultationDate = this.dateCalender
            this.consultations.userId = this.select;

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
          }else if (this.consultationId !== ''){

                this.consultations.userId = this.select;
                await api.put(`/customers/${this.consultations.customerId}`, this.customer);
                await api.put(`/consultations/${this.consultationId}`, this.consultations).then((response) => {
                  this.close();
                  this.$emit('saveDialog');
                }, (error) => {
                  this.close()
                });
          }
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
