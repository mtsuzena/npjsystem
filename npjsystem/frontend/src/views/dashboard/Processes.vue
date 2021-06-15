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
                'items-per-page-text':'Pendências por página'
              }"
              item-key="number"
              @click:row="redirectToDetailedProcessScreen"
              class="py-3"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        class="ma-2"
        color="success"
      >
        Cadastrar Processo
      </v-btn>
    </v-row>  
  </v-container>
</template>

<script>

import axios from 'axios'
const jwt = require('jsonwebtoken');
const configs = require('../../config/configs');

export default {
  name: 'Processes',
  components: {
  },
  data() {
    return {
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
          text: 'Referente a:',
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
          text: 'Cliente',
          value: 'customer.name',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Responsável',
          value: 'user.name',
          align: 'left',
        },
      ],
    }
  },
  methods: {
    redirectToDetailedProcessScreen(process) {
      this.$router.push(`processDetailed/${process.number}`);
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

    api.get('processes').then((responseGetProcesses) => {
      this.processes = responseGetProcesses.data;   
    });
  }
}
</script>
