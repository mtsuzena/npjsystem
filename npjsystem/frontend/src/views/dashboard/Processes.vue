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
          title="Processos"
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
              :headers="processHeaders"
              :items="processes"
              :search="search"
              :footer-props="{
                'items-per-page-text':'Processos por página'
              }"
              item-key="number"
              @click:row="redirectToDetailedProcessScreen"
              class="py-3"
            >
              <template v-slot:item.begins_date="{ item }">
                <span>{{ new Date(item.begins_date).toLocaleString() }}</span>
              </template>
              <template v-slot:item.court_hearing_date="{ item }">
                <span v-if="item.court_hearing_date !== null">{{ new Date(item.court_hearing_date).toLocaleString() }}</span>
                <span v-if="item.court_hearing_date === null">Nenhuma data marcada</span>
              </template>
            </v-data-table>
          </v-card-text>
          <dialog-new-process
            @generateAlert="generateAlert"
          ></dialog-new-process>
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

export default {
  name: 'Processes',
  components: {
    DialogNewProcess: () => import('./components/DialogNewProcess'),
  },
  data() {
    return {
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
      processes: [],
      search: '',
      processHeaders: [
        {
          sortable: false,
          text: 'Numero do Processo',
          value: 'number',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Data de Autuação',
          value: 'begins_date',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Assunto',
          value: 'processType.name',
          align: 'left ',
        },
        {
          sortable: false,
          text: 'Data de Audiência',
          value: 'court_hearing_date',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Requerente',
          value: 'customer.fullName',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Advogado(a) Responsável',
          value: 'user.fullName',
          align: 'left',
        },
      ],
    }
  },
  computed: {
    parsedDirection () {
      return this.direction.split(' ')
    },
  },
  methods: {
    redirectToDetailedProcessScreen(process) {
      this.$router.push(`processDetailed/${process.number}`);
    },
    generateAlert(color, msg){
      this.alertMsg = msg;
      this.color = this.colors[color];
      this.direction = 'top right';
      this.snackbar = true;
    },
  },
  beforeCreate(){
    let api = axios.create({
      baseURL: configs.API_URL,
      headers: {
        'auth-token': window.localStorage.token
      }
    });
    const tokenDecoded = jwt.decode(window.localStorage.token);

    if(!tokenDecoded){
      this.$router.push({ name: 'Login' })
    }

    api.get('processes').then((responseGetProcesses) => {
      this.processes = responseGetProcesses.data;
      this.processes.forEach((process, i) => {
        this.processes[i].user.fullName = process.user.name + ' ' + process.user.lastName;
        this.processes[i].customer.fullName = process.customer.name + ' ' + process.customer.lastName;
      });
    });
  }
}
</script>
