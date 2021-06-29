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
              :custom-sort="customSortChecklists"
              :items="process.processChecklists"
              item-key="name"
              show-select
              class="elevation-1"
              @click:row="getProcessChecklistId"
            >
              <template v-slot:item.deadline="{ item }">
                <span>{{ new Date(item.deadline).toLocaleString() }}</span>
              </template>

              <template v-slot:item.status="{ item }">
                <span v-if="item.status == 0">Não iniciado</span>
                <span v-if="item.status == 1">Em aprovação</span>
                <span v-if="item.status == 2">Aprovado</span>
              </template>

              <template v-slot:item.document.fileName="{ item }">
                <v-btn v-if="item.document !== null" class="mx-2" fab dark small color="blue" @click="downloadDocument(item.document.fileName)">
                  <v-icon dark>mdi-file-download</v-icon>
                </v-btn>
                
                <input
                  v-if="item.document === null"
                  style="display: none"
                  type="file" 
                  @change="onFileSelected"
                  ref="fileInput"
                >
                <v-btn 
                  v-if="item.document === null" 
                  class="mx-2" 
                  fab 
                  dark 
                  small 
                  color="red" 
                  @click="$refs.fileInput.click()">
                    <v-icon dark>mdi-file-upload</v-icon>
                </v-btn>
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
const FileDownload = require('js-file-download');

export default {
  name: 'ProcessDetailed',
  components: {
  },
  data() {
    return {
      build: true,
      processChecklistId: null,
      selectedFile: null,
      process: {},
      processStatus: '',
      checklistsDone: [],
      oldChecklists: [],
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
          value: "user.fullName" 
        },
        { 
          text: 'Documento', 
          value: "document.fileName" ,
        },
        { 
          text: 'Status', 
          value: 'status' 
        },
      ],
    }
  },
  watch: {
    checklistsDone(){
      let api = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token
        }
      });

      // Salva Checklist como Done -> isChecked true
      if(this.checklistsDone.length > this.oldChecklists.length){
        let lastChecklist = this.checklistsDone.length - 1;
        console.log(this.checklistsDone[lastChecklist]);

        //Verifica se o checklist possui um documento antes de atualizar para Done
        //Caso nao possua um documento, gerar alerta de error
        if(this.checklistsDone[lastChecklist].document === null){
          this.checklistsDone.splice(lastChecklist, 1);
          console.log('Nao é possivel marcar o checklist como feito pois o mesmo nao possui um documento');
          return false;
        }

        api.put(`processChecklists/${this.checklistsDone[lastChecklist].id}`, {"isChecked": "true"});
      }
      
      //Salva checklist como nao feito -> isChecked false
      if(this.checklistsDone.length < this.oldChecklists.length){        
        this.oldChecklists.forEach((oldChecklists, i) => {
          let checklistRemovido = true;

          this.checklistsDone.forEach((newChecklists, i) => {
            if(newChecklists.name === oldChecklists.name){
              checklistRemovido = false;
            }
          });

          if(checklistRemovido){
            api.put(`processChecklists/${oldChecklists.id}`, {"isChecked": "false"});
          }

        });

      }

      
      this.oldChecklists = this.checklistsDone;
    }
  },
  methods: {
    getProcessChecklistId(processChecklist){
      this.processChecklistId = processChecklist.id;
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.uploadDocument();
    },
    uploadDocument(processChecklistId){
      let apiUpload = axios.create({
        baseURL: configs.API_URL,
        headers: {
            'auth-token': window.localStorage.token,
            'Content-Type': 'multipart/form-data'
          }
      });

      let apiAddDoc = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token
        }
      });

      let formData = new FormData();
      formData.append('file', this.selectedFile);

      apiUpload.post('documents/upload', formData).then((responseuUploadDocument) => {
        let fileName = responseuUploadDocument.data.fileName;
        apiAddDoc.post('documents', {"fileName": fileName, "processChecklistId": this.processChecklistId}).then((responseuAddDocument) => {
          window.location.reload(true);
        });
      });
    },
    downloadDocument(value){
      let api = axios.create({
        baseURL: configs.API_URL,
        responseType: 'arraybuffer',
        headers: {
            'auth-token': window.localStorage.token,
            'Accept': 'application/docx'
          }
      });

      api.get(`documents/download/${value}`).then((responseDonwloadDocument) => {
        const blob = new Blob([responseDonwloadDocument.data], {
          type: 'application/docx',
        });
        FileDownload(blob, value);
      });

    },
    customSortChecklists(items, index, isDesc) {
      let itemsSorted = [];

      // preenchendo o array primeiramente com os checklists nao feitos
      items.forEach(function(checklist) {
        if(checklist.isChecked === false){
          itemsSorted.push(checklist);
        }
      });

      // preenchendo o array com os checklists feitos
      items.forEach(function(checklist) {
        if(checklist.isChecked === true){
          itemsSorted.push(checklist);
        }
      });

      return itemsSorted;
    }
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
        this.process.processChecklists[i].user.fullName = procesChecklist.user.name + ' ' + procesChecklist.user.lastName;
        if(procesChecklist.isChecked){
          this.checklistsDone.push(procesChecklist);
          this.oldChecklists = this.checklistsDone;
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