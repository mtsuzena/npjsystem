<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
      persistent
      scrollable
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-2"
          color="success"
          v-bind="attrs"
          v-on="on"
        >
          Cadastrar Processo
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar fixed>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title>Inserir os dados do processo</v-toolbar-title>
            </v-col>
          </v-toolbar>
        </v-card-title>
        <v-card-text>

          <v-form
            id="formProcess"
            ref="form"
            lazy-validation
            v-model="valid"
          >
            <v-col cols="12">
              <v-text-field
                v-model.trim="process.number"
                label="Processo:"
                prepend-icon="fas fa-folder-open"
                :rules="processRules"
                v-mask="'#######-##.####.#.##.####'"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-dialog
                ref="dialog"
                v-model="modalActing"
                :return-value.sync="dateActing"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateActing"
                    label="Data de atuação:"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="dateRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateActing"
                  scrollable
                  :min="disabledDates"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modalActing = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(dateActing)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
            >
              <v-autocomplete
                prepend-icon="fas fa-file"
                v-model="process.processTypeId"
                :items="items"
                :filter="customFilter"
                item-text="text"
                item-value="value"
                label="Assunto: "
                required
                :rules="selectRules"
                @click.once.prevent="getProcessTypes"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                :rules="customerRules"
                label="Requerente:"
                prepend-icon="fas fa-user-friends"
                :filter="customFilter"
                v-model="process.customerId"
                :items="customers"
                item-text="text"
                item-value="value"
                @click.once.prevent="getCustomer"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Requerido:"
                prepend-icon="fas fa-user-friends"
                :rules="reqRules"
                v-model="process.requerido"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Pasta física:"
                prepend-icon="fas fa-folder"
                :rules="pastFisic"
                v-model="process.pastaFisica"
              >
              </v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
            >
              <v-autocomplete
                prepend-icon="fas fa-chalkboard-teacher"
                label="Advogado(a) responsável:"
                :rules="teacherRules"
                :items="teachers"
                v-model="process.userId"
                item-text="text"
                item-value="value"
                :filter="customFilter"
                @click.once.prevent="getProfilesTeacher"
              ></v-autocomplete>
            </v-col>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="cancellProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="saveProcess"
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
  name: "DialogNewProcess",
  props: {},

  data() {
    return {
      disabledDates: this.formatDate(new Date(Date.now() - 8640000)),
      processRules: [
        v => !!v || 'Preencha o numero do processo!',
        v => (v && v.length == 25) || 'Tamanho menor que 25 caracteres!',
        // v => /^[0-9]+$/.test(v) || 'É permitido apenas numeros!',
      ],
      dateRules: [
        v => !!v || 'Selecione a data de atuação!',
      ],
      selectRules: [
        v => !!v || 'Selecione um Assunto!',
      ],
      customerRules: [
        v => !!v || 'Selecione  o requerente!',
      ],
      reqRules: [
        v => !!v || 'Preencha o requerido!',
        v => (v && v.length <= 60) || 'Tamanho máximo de 40 caracteres!',
        v => /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || 'Não inserir numeros ou caractéres especiais!',
      ],
      pastFisic: [
        v => !!v || 'Preencha a pasta física!',
        v => (v && v.length <= 60) || 'Tamanho máximo de 40 caracteres!',
        v => /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(v) || 'Não inserir numeros ou caractéres especiais!',
      ],
      teacherRules: [
        v => !!v || 'Selecione um professor!',
      ],
      dialog: false,
      valid: true,
      dateActing: '',
      menu: false,
      modalActing: false,
      items: [],
      teachers: [],
      customers: [],
      process: {
        number: '',
        requerido: '',
        pastaFisica: '',
        processTypeId: '',
        customerId: Number,
        userId: '',
        begins_date: '',
        isFiled: false
      }
    }
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.text.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    formatDate(v) {
      let data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();
      return ano + "-" + mes + "-" + dia;
    },
    async saveProcess() {
      if (this.$refs.form.validate()) {
        this.process.begins_date = new Date(this.dateActing);
        api.post('/processes', this.process)
          .then((response) => {
            this.$router.push(`processDetailed/${response.data.number}`);
          }, (error) => {
            console.log(error);
          });
      }
    },
    async getProcessTypes() {
      this.items = [];
      await api.get(`processTypes`).then((responseProcessTypes) => {
        responseProcessTypes.data.forEach((value) => {
          this.items.push({
            text: value.name,
            value: value.id,
          })
        })
      })
    },
    cancellProcess() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async getProfilesTeacher() {
      this.teachers = [];
      await api.get(`users`).then((responseUsersTeachers) => {
        responseUsersTeachers.data.forEach((value) => {
          if (value.profile.name === 'PROFESSOR' || value.profile.name === 'ADMIN') {
            this.teachers.push({
              text: value.name + ' ' + value.lastName,
              value: value.id
            });
          }
        })
      })
    },
    async getCustomer() {
      this.customers = [];
      await api.get(`customers`).then((responseCustomers) => {
        responseCustomers.data.forEach((value) => {
          this.customers.push({
            text: value.name + ' ' + value.lastName,
            value: value.id
          });
        })
      })
    }
  },
  watch: {},
  created() {
    console.log(this.items)
  }
}
</script>

<style scoped>
</style>
