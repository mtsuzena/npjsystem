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
          color="green"
          :title="`Processo ${process.number} / ${processStatus}`"
          class="px-5 py-3"
        >
          <v-card-text>
            <v-row>
              <v-col>
                <span>Assunto: {{ process.processType.name }}</span>
              </v-col>
              <v-col>
                <span>Professor Responsável: {{ process.user.name }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Data de Autuação: {{ new Date(process.begins_date).toLocaleString() }}</span>
              </v-col>
              <v-col>
                <span>Data de Audiência: {{ new Date(process.court_hearing_date).toLocaleString() }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Requerente: {{ process.customer.name }}</span>
              </v-col>
              <v-col>
                <span>Requerido: {{ process.requerido }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Pasta Física: {{ process.pastaFisica }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row
      align="start"
      justify="space-around"
      class="grey lighten-5"
    >
      <v-col>
        <base-material-card
          color="red"
          title="Lista de checagem do andamento processual"
          class="px-5 py-3"
        >
          <v-card-text>
            <v-data-table
              v-model="checklistsDone"
              :headers="headers"
              :items="process.processChecklists"
              item-key="name"
              show-select
              class="elevation-1"
            >
              <template v-slot:item.deadline="{ item }">
                <span>{{ new Date(item.deadline).toLocaleString() }}</span>
              </template>

              <template v-slot:item.status="{ item }">
                <span v-if="item.status == 0">Não iniciado</span>
                <span v-if="item.status == 1">Em aprovação</span>
                <span v-if="item.status == 2">Aprovado</span>
              </template>

            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row
      align="start"
      justify="space-around"
      class="grey lighten-5"
    >
      <v-timeline>
        <v-timeline-item
          v-for="processMovement in process.processMovements"
          :key="processMovement"
          large
        >
          <template v-slot:icon>
            <v-avatar>
              <img :src="processMovement.user.imgSrc">
            </v-avatar>
          </template>
          <template v-slot:opposite>
            <span>{{processMovement.user.name}}</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="text-h5">
              {{processMovement.actionName}}
            </v-card-title>
            <v-card-text>{{processMovement.actionDescription}}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
const configs = require('../../config/configs');

export default {
  name: 'ProcessDetailed',
  components: {
  },
  data() {
    return {
      process: {},
      processStatus: '',
      checklistsDone: [],
      selected: [],
      headers: [
        {
          text: 'Nome Checklist',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { 
          text: 'Prazo de finalização', 
          value: 'deadline' 
        },
        { 
          text: 'Responsavel', 
          value: "status" 
        },
        { 
          text: 'Status', 
          value: 'status' 
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

    api.get(`processes/byProcessNumber/${this.$route.params.processNumber}`).then((responseGetProcessByNumber) => {

      this.process = responseGetProcessByNumber.data;

      if(this.process.isFiled){
        this.processStatus = '(processo arquivado)'
      }else{
        // CRIAR LOGICA DOS DIAS DE TRAMITAÇÃO AQUI...

        let beginsDate = new Date(this.process.begins_date);
        let currentDate = new Date();

        let difference = (currentDate.getTime()-beginsDate.getTime()) / 1000 / 60 / 60 / 24;

        let differenceInDecimal = parseInt(difference, 10);

        this.processStatus = `(${differenceInDecimal} dia(s) em tramitação)`;
      }

      this.process.processChecklists.forEach((procesChecklist, i) => {
        if(procesChecklist.isChecked){
          this.checklistsDone.push(procesChecklist);
        }
      });

      // Convertendo images path em uma importacao da imagem
      this.process.processMovements.forEach((processMovement, i) => {
        this.process.processMovements[i].user.imgSrc = require('@/assets/avatar/' + processMovement.user.imgSrc);
      });

    });
  }
}
</script>