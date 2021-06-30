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
          :color="materialCardColor"
          title="Revisão Documento"
          class="px-5 py-3"
        >
          <v-card-text>
            <div>
              <v-stepper
                non-linear
                value="1"
              >
                <v-stepper-header>
                  <v-stepper-step
                    complete
                    editable
                    edit-icon="pending"
                    step="1"
                    @click="paraAprovarClicado"
                  >
                    Para aprovar
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    complete
                    editable
                    edit-icon="loop"
                    step="2"
                    @click="emAprovacaoClicado"
                  >
                    Em aprovação
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    complete
                    editable
                    edit-icon="done"
                    step="3"
                    @click="aprovadoClicado"
                  >
                    Aprovado
                  </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-data-table
                      :headers="paraAprovarHeaders"
                      :items="processChecklistsParaAprovar"
                      item-key="name"
                      class="elevation-1"
                    >
                      <template v-slot:item.btnEnviarParaAprovacao="{ item }">
                        <v-btn class="mx-2" dark small color="red" @click="enviarParaAprovacao(item)">
                          <v-icon dark>mdi-send</v-icon>
                          <span>Enviar para aprovação</span>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <span> INSERIR LISTA DE DOCUMENTOS QUE ESTAO EM APROVAÇÃO AQUI!</span>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <span> INSERIR LISTA DE DOCUMENTOS QUE FORAM APROVADOS AQUI!</span>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
const configs = require('../../config/configs');
const jwt = require('jsonwebtoken');

export default {
  name: 'DocumentReview',
  components: {
  },
  data() {
    return {
      materialCardColor: 'red',
      processChecklistsParaAprovar: [],
      // processChecklistsParaAprovar: [
      //   {
      //     name: 'nome test',
      //     user: {
      //       fullName: 'Nome Responsavel'
      //     },
      //     document: {
      //       fileName: 'Nome do Doc'
      //     },
      //     process: {
      //       number: 'Number'
      //     }
      //   },
      //   {
      //     name: 'nome test 2',
      //     user: {
      //       fullName: 'Nome Responsavel 2'
      //     },
      //     document: {
      //       fileName: 'Nome do Doc 2'
      //     },
      //     process: {
      //       number: 'Number2'
      //     }
      //   },
      // ],
      processChecklistEmAprovacao: {},
      processChecklistsAprovados: [],
      paraAprovarHeaders: [
        {
          text: 'Nome Checklist',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { 
          text: 'Numero do Processo', 
          value: "process.number",
          align: 'center',
        },
        { 
          text: 'Documento', 
          value: "document.fileName",
          align: 'center',
        },
        { 
          text: 'Responsavel', 
          value: "user.fullName",
          align: 'center',
        },
        { 
          text: 'Aprovar', 
          value: "btnEnviarParaAprovacao",
          align: 'center',
        },
      ],
    }
  },
  methods: {
    enviarParaAprovacao(processChecklistParaAprovar){
      this.processChecklistEmAprovacao = processChecklistParaAprovar;
      console.log(this.processChecklistEmAprovacao);
    },
    paraAprovarClicado(){
      this.materialCardColor = 'red';
    },
    emAprovacaoClicado(){
      this.materialCardColor = 'orange';
    },
    aprovadoClicado(){
      this.materialCardColor = 'green';
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
    api.get(`users/${tokenDecoded.id}`).then((responseGetUserById) => {
      this.user = responseGetUserById.data;
    });

    api.get(`processes/byUserId/${tokenDecoded.id}`).then((responseGetProcessesByUserId) => {

      let processes = responseGetProcessesByUserId.data;

      processes.forEach((process, i) => {
        process.processChecklists.forEach((procesChecklist, i) => {
          if(procesChecklist.status === 2){
            let splitDocName = procesChecklist.document.fileName.split('-', 2);
            let docName = splitDocName[1];
            procesChecklist.document.fileName = docName; 
            this.processChecklistsParaAprovar.push(procesChecklist);
          }
          if(procesChecklist.status === 3){
            this.processChecklistsAprovados.push(procesChecklist);
          }
        });

      });
    });

  },
}
</script>