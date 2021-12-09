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
                :value="steper"
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
                      :footer-props="{
                        'items-per-page-text':'Documentos por página'
                      }"
                      :headers="paraAprovarHeaders"
                      :items="processChecklistsParaAprovar"
                      item-key="name"
                      class="elevation-1"
                    >
                      <template v-slot:item.btnEnviarParaAprovacao="{ item }">
                        <v-btn class="mx-2" dark small color="green" @click="enviarParaAprovacao(item)">
                          <v-icon dark>mdi-send</v-icon>
                          <span>Enviar para aprovação</span>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <base-material-card
                      color="green"
                      :title="`Processo 090l090293.91283`"
                      class="px-5 py-3"
                      v-if="processChecklistEmAprovacao !== null"
                    >
                      <v-card-text>
                        <v-divider></v-divider>
                        <br></br>
                        <v-row>
                          <v-col>
                            <span>Elaborador: {{processChecklistEmAprovacao.user.name}}</span>
                          </v-col>
                          <v-col>
                            <span>Nome da Atividade: {{processChecklistEmAprovacao.name}}</span>
                          </v-col>
                          <v-col>
                            <span>Prazo da Atividade: {{ new Date(processChecklistEmAprovacao.deadline).toLocaleString() }}</span>
                          </v-col>
                        </v-row>
                        <br></br>
                        <v-divider></v-divider>
                        <br></br>
                        <v-row>
                          <v-col>
                            <div class="text-center">
                            <span>Documento em Revisão</span>
                              <v-btn class="mx-2" large color="green" @click="downloadDocument()">
                                <v-icon dark>mdi-file-download</v-icon>
                              </v-btn>
                            </div>
                          </v-col>
                          <v-divider
                            class="test"
                            vertical
                            width="100"
                            heigth="100"
                          ></v-divider>
                          <v-col>
                            <div class="text-center">
                              <input
                                style="display: none"
                                type="file"
                                @change="onFileSelected"
                                ref="fileInput"
                              >
                              <v-btn 
                                class="mx-2" 
                                large 
                                color="green"
                                @click="$refs.fileInput.click()"
                              >
                                <v-icon dark>mdi-file-upload</v-icon>
                              </v-btn>
                              <span>Anexar documento revisado</span>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <div class="text-center">
                              <v-textarea
                                outlined
                                name="input-7-4"
                                label="Considerações"
                                v-model.trim="consideracoesRevisaoProfessor"
                              ></v-textarea>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </base-material-card>
                    <base-material-card
                      color="red"
                      title="Selecione um documento para aprovar"
                      class="px-5 py-3"
                      v-else
                    >
                    </base-material-card>
                    <div v-if="processChecklistEmAprovacao !== null" class="text-center">
                      <v-btn 
                      class="mx-2"
                      color="green"
                      @click="aprovarDocument"
                      >
                        <span>Aprovar</span>
                      </v-btn>
                      <v-btn 
                        class="mx-2" 
                        color="#d40000" 
                        @click="reprovarDocument"
                      >
                        <v-icon dark>mdi-arrow-back</v-icon>
                        <span>Reprovar</span>
                      </v-btn>
                    </div>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-data-table
                      :footer-props="{
                        'items-per-page-text':'Documentos por página'
                      }"
                      :headers="aprovadosHeaders"
                      :items="processChecklistsAprovados"
                      item-key="name"
                      class="elevation-1"
                    >
                    </v-data-table>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </v-card-text>
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
const configs = require('../../config/configs');
const jwt = require('jsonwebtoken');
const FileDownload = require('js-file-download');
const apiDocGlobal = axios.create({
  baseURL: configs.API_URL,
  headers: {
    'auth-token': window.localStorage.token
  }
});

export default {
  name: 'DocumentReview',
  components: {
  },
  data() {
    return {
      consideracoesRevisaoProfessor: null,
      alertMsg: '',
      snackbar: false,
      color: 'info',
      colors: [
        'info',
        'success',
        'warning',
        'error',
      ],
      direction: 'top center',
      documentUploaded: false,
      steper: '1',
      materialCardColor: 'green',
      selectedFile: null,
      processChecklistsParaAprovar: [],
      processChecklistEmAprovacao: null,
      processChecklistEmAprovacaoId: null,
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
          value: "document.fileNameWithoutHash",
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
      aprovadosHeaders: [
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
          value: "document.fileNameWithoutHash",
          align: 'center',
        },
        { 
          text: 'Responsavel', 
          value: "user.fullName",
          align: 'center',
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
    enviarParaAprovacao(processChecklistParaAprovar){
      
      this.processChecklistEmAprovacao = processChecklistParaAprovar;
      this.processChecklistEmAprovacaoAux = processChecklistParaAprovar;
      this.steper = '2';
      console.log('em aprova');
      console.log(this.processChecklistEmAprovacao);
    },
    paraAprovarClicado(){
      this.steper = '1';
    },
    emAprovacaoClicado(){
      this.steper = '2';
    },
    aprovadoClicado(){
      this.steper = '3';
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.documentUploaded = true;
    },
    reprovarDocument(){
      if(this.documentUploaded){
        this.uploadDocument();
      }
      apiDocGlobal.put(`processChecklists/${this.processChecklistEmAprovacao.id}`, {"status": "4", "consideracoesRevisaoProfessor": this.consideracoesRevisaoProfessor, "isChecked": "false", "documentoReprovadoCorrigido": "false", "processId": this.processChecklistEmAprovacao.processId, "name": this.processChecklistEmAprovacao.name});
      this.steper = '1';
      this.generateAlert(3, "Documento reprovado");
      // remove o checklist da lista de checklists para aprovar
      this.removeChecklistDaListaParaAprovar();
      // limpa processChecklistEmAprovacao
      this.processChecklistEmAprovacao = null;
    },
    aprovarDocument(){
      // Se um documento foi anexado entao chama a api pra salvar o doc
      if(this.documentUploaded){
        this.uploadDocument();
      }

      // atualiza status do checklist e adiciona as consdieracoes
      apiDocGlobal.put(`processChecklists/${this.processChecklistEmAprovacao.id}`, {"status": "3", "consideracoesRevisaoProfessor": this.consideracoesRevisaoProfessor, "processId": this.processChecklistEmAprovacao.processId, "name": this.processChecklistEmAprovacao.name});
      
      // remove o checklist da lista de checklists para aprovar
      this.removeChecklistDaListaParaAprovar();

      // adiciona o checklist na lista de aprovados
      this.processChecklistsAprovados.push(this.processChecklistEmAprovacao);
      
      this.steper = '3';
      this.generateAlert(1, "Documento aprovado");
      this.processChecklistEmAprovacao = null;
    },
    uploadDocument(){
      let apiUpload = axios.create({
        baseURL: configs.API_URL,
        headers: {
            'auth-token': window.localStorage.token,
            'Content-Type': 'multipart/form-data'
          }
      });

      let formData = new FormData();
      formData.append('file', this.selectedFile);

      apiUpload.post('documents/upload', formData).then((responseuUploadDocument) => {
        let fileName = responseuUploadDocument.data.fileName;
        apiDocGlobal.put(`documents/${this.processChecklistEmAprovacaoAux.document.id}`, {"fileName": fileName});
      });
    },
    downloadDocument(){
      let api = axios.create({
        baseURL: configs.API_URL,
        responseType: 'arraybuffer',
        headers: {
            'auth-token': window.localStorage.token,
            'Accept': 'application/docx'
          }
      });

      api.get(`documents/download/${this.processChecklistEmAprovacao.document.fileName}`).then((responseDonwloadDocument) => {
        const blob = new Blob([responseDonwloadDocument.data], {
          type: 'application/docx',
        });
        let splitDocName = this.processChecklistEmAprovacao.document.fileName.split('-', 2);
        let docName = splitDocName[1];
        FileDownload(blob, docName);
      });

    },
    setAlertColor (color) {
      this.color = this.colors[color];
    },
    removeChecklistDaListaParaAprovar(){
      this.processChecklistsParaAprovar.forEach((checklistEmAprovacao, i) => {
        if(checklistEmAprovacao.id === this.processChecklistEmAprovacao.id){
          this.processChecklistsParaAprovar.splice(i, 1);
        }
      });
    },
    generateAlert(color, msg){
      this.alertMsg = msg;
      this.setAlertColor(color);
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
    api.get(`users/${tokenDecoded.id}`).then((responseGetUserById) => {
      this.user = responseGetUserById.data;
    });

    api.get(`processes`).then((responseGetProcessesByUserId) => {

      let processes = responseGetProcessesByUserId.data;

      processes.forEach((process, i) => {
        process.processChecklists.forEach((procesChecklist, i) => {
          procesChecklist.user.fullName = procesChecklist.user.name + ' ' + procesChecklist.user.lastName;

          if(procesChecklist.status === 2){
            let splitDocName = procesChecklist.document.fileName.split('-', 2);
            let docName = splitDocName[1];
            procesChecklist.document.fileNameWithoutHash = docName; 
            this.processChecklistsParaAprovar.push(procesChecklist);
          }
          if(procesChecklist.status === 3){
            let splitDocName = procesChecklist.document.fileName.split('-', 2);
            let docName = splitDocName[1];
            procesChecklist.document.fileNameWithoutHash = docName; 
            this.processChecklistsAprovados.push(procesChecklist);
          }
        });

      });
    });
  },
}
</script>
