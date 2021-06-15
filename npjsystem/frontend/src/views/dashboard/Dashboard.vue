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
      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-animation-play"
          title="Processos em andamento"
          :value="ongoingProcesses"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
            color="red"
            icon="mdi-alert-circle"
            title="Processos com pendências"
            :value="pendingProcesses"
          />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-check"
          title="Processos arquivados"
          :value="filedProcesses"
        />
      </v-col>
    </v-row>

    <v-divider class="mb-3"/>

    <v-row
      align="start"
      justify="space-around"
      class="grey lighten-5"
    >
      <v-col>
        <base-material-card
          icon="mdi-clipboard-text"
          color="red"
          title="Pendências"
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
              :headers="pendingHeaders"
              :items="pendingChecklists"
              :search="search"
              :footer-props="{
                'items-per-page-text':'Pendências por página'
              }"
              class="py-3"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
const jwt = require('jsonwebtoken');
const configs = require('../../config/configs');
export default {
  name: 'DashboardDashboard',
  components: {
    PendingsProcessChecklists: () => import( './components/PendingsProcessChecklists'),
  },

  data() {
    return {
      user: {},
      processes: {},
      ongoingProcesses: '',
      filedProcesses: '',
      pendingProcesses: '',
      pendingChecklists: [],
      search: '', 
      pendingHeaders: [
        {
          sortable: false,
          text: 'Nome',
          value: 'name',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Prazo',
          value: 'deadline',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Processo',
          value: 'process.number',
          align: 'left ',
        },
        {
          sortable: false,
          text: 'Responsavel',
          value: 'process.user.name',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Cliente',
          value: 'process.customer.name',
          align: 'left',
        },
      ],
    }
  },
  methods: {
  },
  beforeCreate(){
    let api = axios.create({
      baseURL: configs.API_URL,
      headers: {
        'auth-token': window.localStorage.token
      }
    });
    const tokenDecoded = jwt.decode(window.localStorage.token);
    api.get(`users/${tokenDecoded.id}`).then((responseGetUserById) => {
      this.user = responseGetUserById.data;
    });

    api.get(`processes/byUserId/${tokenDecoded.id}`).then((responseGetProcessesByUserId) => {

      this.processes = responseGetProcessesByUserId.data;
      
      let ongoingProcesses = 0;
      let filedProcesses = 0;
      let pendingProcesses = 0;

      this.processes.forEach((process, i) => {

        if(process.isFiled){
          filedProcesses += 1;
        }else{
          ongoingProcesses += 1;
        }

        let isPending = true;

        process.processChecklists.forEach((procesChecklist, i) => {
          if(!procesChecklist.isChecked){
            this.pendingChecklists.push(procesChecklist);
            if(isPending){
              pendingProcesses += 1;
              isPending = false;
            }
          }
        });

      });

      this.ongoingProcesses = ongoingProcesses.toString();
      this.filedProcesses = filedProcesses.toString();
      this.pendingProcesses = pendingProcesses.toString();

    });

  },
}
</script>
