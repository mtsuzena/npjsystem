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
                <span>Professor Responsável: {{ process.user.name }} {{ process.user.lastName }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Data de Autuação: {{ new Date(process.begins_date).toLocaleString() }}</span>
              </v-col>
              <v-col>
                <span v-if="!process.court_hearing_date">Data de Audiência: Nenhuma data marcada</span>
                <span v-else>Data de Audiência: {{ new Date(process.court_hearing_date).toLocaleString() }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span>Requerente: {{ process.customer.name }} {{ process.customer.lastName }}</span>
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
            <v-row>
              <v-col align="right">
                <v-btn
                  v-if="!process.isFiled"
                  class="ma-2"
                  color="red"
                  @click="arquivarProcesso()"
                >
                  Arquivar processo
                </v-btn>
                <v-btn
                  v-else
                  class="ma-2"
                  color="green"
                  @click="desarquivarProcesso()"
                >
                  Desarquivar processo
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>

<!--Tabs-->

    <template>
      <v-card color="basil">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="green"
          grow
        >
          <v-tab>
            Andamento processual
          </v-tab>
          <v-tab>
            Movimentações do processo
          </v-tab>
          <v-tab>
            Audiências
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row
                  align="start"
                  justify="space-around"
                  class="lighten-5"
                >
                  <v-col>
                    <base-material-card
                      color="green"
                      title="Lista de checagem do andamento processual"
                      class="px-5 py-3"
                    >
                      <v-card-text>
                        <v-data-table
                          :footer-props="{'items-per-page-text':'Checklists por página'}"
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

                          <template v-slot:top>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                              <v-card>
                                <v-card-title class="text-h5">Tem certeza de que deseja excluir essa atividade?</v-card-title>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="darken-1" text @click="closeDelete">Cancelar</v-btn>
                                  <v-btn color="darken-1" text @click="deleteItemConfirm">Sim</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>

                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="editItem(item)"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              small
                              @click="deleteItem(item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>

                          <template v-slot:no-data>
                            <span>Sem atividades</span>
                          </template>

                          <template v-slot:item.status="{ item }">
                            <span v-if="item.status == 0">Não iniciado</span>
                            <span v-if="item.status == 1">Em elaboração</span>
                            <span v-if="item.status == 2">Em aprovação</span>
                            <span v-if="item.status == 3">Aprovado</span>
                            <span v-if="item.status == 4">Reprovado</span>
                          </template>

                          <template v-slot:item.document.fileName="{ item }">
                            <v-tooltip left>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-if="item.document !== null"
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="#0986b8"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="downloadDocument(item.document.fileName)"
                                >
                                  <v-icon dark>mdi-file-download</v-icon>
                                </v-btn>
                              </template>
                              <span>Baixar documento anexado</span>
                            </v-tooltip>

                            <input
                              v-if="item.document === null || item.status == 4"
                              style="display: none"
                              type="file"
                              @change="onFileSelected"
                              ref="fileInput"
                            >

                            <v-tooltip right>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-if="item.document === null"
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="red"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="$refs.fileInput.click()">
                                  <v-icon dark>mdi-file-upload</v-icon>
                                </v-btn>
                              </template>
                              <span>Anexar documento</span>
                            </v-tooltip>

                            <v-tooltip right>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-if="item.status == 4 || item.status == 1"
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  v-bind="attrs"
                                  v-on="on"
                                  :color="corBotaoUploadParaChecklistReprovado(item)"
                                  @click="$refs.fileInput.click()">
                                  <v-icon dark>mdi-file-upload</v-icon>
                                </v-btn>
                              </template>
                              <span>Anexar documento corrigido</span>
                            </v-tooltip>
                          </template>
                        </v-data-table>
                        <dialog-checklist
                          @generateAlert="generateAlert"
                          :process="process"
                          :checklist="unicoChecklist"
                          :dialog_m="updateCheck"
                          @updateList="updateList"
                          @dialogs="updateModal"
                        ></dialog-checklist>
                      </v-card-text>
                    </base-material-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row
                  align="start"
                  justify="space-around"
                  class="lighten-5"
                >
                  <v-col>
                    <base-material-card
                      color="green"
                      title="Movimentações do processo"
                      class="px-5 py-3"
                    >
                      <br>
                      <v-divider></v-divider>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="Titulo"
                            class="purple-input"
                            v-model="tituloMovimentacao"
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            label="Descrição"
                            class="purple-input"
                            v-model="descricaoMovimentacao"
                          />
                        </v-col>
                        <v-col>
                          <div align="center">
                            <v-btn
                              class="ma-2"
                              color="green"
                              @click="salvarMovimentacaoDoProcesso"
                            >
                              Inserir movimentação
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                      <br>
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

                          <v-badge
                            @click.native="removerMovimentacaoProcesso(processMovement.id)"
                            color="error"
                            icon="mdi-delete-forever"
                            overlap
                          >
                            <v-card class="elevation-2">
                              <v-card-title class="text-h5">
                                {{processMovement.actionName}}
                              </v-card-title>
                              <v-card-text>{{processMovement.actionDescription}}</v-card-text>
                            </v-card>
                          </v-badge>
                        </v-timeline-item>
                      </v-timeline>
                    </base-material-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row
                  align="start"
                  justify="space-around"
                  class="lighten-5"
                >
                  <v-col>
                    <base-material-card
                      color="green"
                      title="Lista de checagem de audiencias"
                      class="px-5 py-3"
                    >
                      <v-card-text>
                        <v-data-table
                          :footer-props="{'items-per-page-text':'Checklists por página'}"
                          :headers="headersCourt"
                          :items="process.audiencias"
                          item-key="name"
                          class="elevation-1"
                          @click:row="getProcessChecklistId"
                        >
                          <template v-slot:item.data="{ item }">
                            <span>{{ item.data }}</span>
                          </template>

                          <template v-slot:item.tipo="{ item }">
                            <span v-if="item.tipo == 0">Conciliação</span>
                            <span v-if="item.tipo == 1">Instrução</span>
                            <span v-if="item.tipo == 2">Julgamento</span>
                          </template>

                          <template v-slot:top>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                              <v-card>
                                <v-card-title class="text-h5">Tem certeza de que deseja excluir essa audiencia?</v-card-title>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="darken-1" text @click="closeDeleteAudiencia">Cancelar</v-btn>
                                  <v-btn color="darken-1" text @click="deleteItemConfirmAudiencia">Sim</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>

                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              small
                              @click="deleteItemAudiencia(item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>

                          <template v-slot:item.clienteNotificado="{item}">
                              <v-checkbox
                                v-model="item.clienteNotificado"
                                label="Cliente notificado"
                                v-if="item.clienteNotificado === true"
                                @change="notificarCliente($event, item)"
                              ></v-checkbox>

                              <v-checkbox
                                v-model="item.clienteNotificado"
                                label="Cliete não notificado"
                                v-if="item.clienteNotificado === false"
                                @change="notificarCliente($event, item)"
                              ></v-checkbox>
                          </template>

                          <template v-slot:item.modalidade="{ item }">
                            <span v-if="item.modalidade == 1">Presencial</span>
                            <span v-if="item.modalidade == 2">Online</span>
                          </template>
                          <!--<template v-slot:item.testemunhasAudiencia="{ item }">
                            <v-tooltip left>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-bind="attrs"
                                  v-on="on"
                                  class="mx-2" dark small color="green" >
                                  <span>Testemunhas</span>
                                </v-btn>
                              </template>
                              <span>Ver informações das testemunhas</span>
                            </v-tooltip>
                          </template> -->
                        </v-data-table>
                        <dialog-audiencia
                          :processdd="this.process"
                          @attAudiencias = "attAudiencias"
                        ></dialog-audiencia>
                      </v-card-text>
                    </base-material-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
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
const FileDownload = require('js-file-download');
const jwt = require('jsonwebtoken');

const api = axios.create({
  baseURL: configs.API_URL,
  headers: {
    'auth-token': window.localStorage.token
  }
});


export default {
  name: 'ProcessDetailed',
  components: {
    DialogChecklist: () => import('./components/DialogChecklist'),
    DialogAudiencia: () => import('./components/DialogAudiencia'),
  },
  data() {
    return {
      nomeUsuarioLogado: null,
      pMovement: {
        actionName: null,
        actionDescription: null,
        userId: null,
        processId: null
      },
      unicoChecklist: {},
      unicoAudiencia: {},
      updateCheck: false,
      updateAudiencia: false,
      tab: null,
      items: [
        'Andamento processual', 'Movimentações do processo', 'Audiências',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      tituloMovimentacao: null,
      descricaoMovimentacao: null,
      build: true,
      processChecklistId: null,
      audienciaId: null,
      processChecklistSelected: null,
      audienciaSelected: null,
      selectedFile: null,
      process: {},
      processStatus: '',
      checklistsDone: [],
      oldChecklists: [],
      selected: [],
      alertMsg: '',
      snackbar: false,
      dialog: false,
      dialogAudiencia: false,
      dialogDelete: false,
      dialogDeleteAudiencia: false,
      editedIndex: -1,
      editedIndexAudiencia: -1,
      editedItem: {
        name: '',
        deadline: '',
        responsavel: '',
      },
      editedItemAudiencia: {
        name: '',
        deadline: '',
        responsavel: '',
      },
      color: 'info',
      colors: [
        'info',
        'success',
        'warning',
        'error',
      ],
      direction: 'top center',
      headersCourt: [
        {
          text: 'Tipo de audiência:',
          align: 'start',
          sortable: false,
          value: 'tipo',
        },
        {
          text: 'Data da audiência:',
          value: 'data'
        },
        {
          text: 'Cliente notificado:',
          value: "clienteNotificado"
        },
        {
          text: 'Modalidade:',
          value: "modalidade"
        },
        {
          text: 'Local:',
          value: "local"
        },
        {
          text: 'Ações',
          value: 'actions',
          sortable: false
        }
      ],
      headers: [
        {
          text: 'Nome Atividade',
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
        {
          text: 'Ações',
          value: 'actions',
          sortable: false
        },
      ],
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogAudiencia (val) {
      val || this.closeAudiencia()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogDeleteAudiencia (val) {
      val || this.closeDeleteAudiencia()
    },
    checklistsDone(){
      let api = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token
        }
      });

      // Salva Checklist como Done -> isChecked true
      if(this.checklistsDone.length > this.oldChecklists.length){

        let posicaoCkNovo = null;

        this.checklistsDone.forEach((ckDone, i) => {
          let ckNovo = true;
          this.oldChecklists.forEach((ckOld) => {
            if(ckDone.id == ckOld.id){
              ckNovo = false;
            }
          });
          if(ckNovo){
            posicaoCkNovo = i;
          }
        })

        let tokenDecoded = jwt.decode(window.localStorage.token);
        let permissao = tokenDecoded.roles.find(role => role.name === 'UPDATE_PROCESS_CHECKLIST');
        if(!permissao){
          this.checklistsDone.splice(posicaoCkNovo, 1);
          this.generateAlert(3, 'Você não possui permisão para alterar uma atividade');
          return false;
        }

        //Verifica se o checklist possui um documento antes de atualizar para Done
        //Caso nao possua um documento, gerar alerta de error
        if(this.checklistsDone[posicaoCkNovo].document === null){
          this.checklistsDone.splice(posicaoCkNovo, 1);
          this.generateAlert(3, 'Não há um documento anexado');
          return false;
        }

        if(this.checklistsDone[posicaoCkNovo].status === 4 && !this.checklistsDone[posicaoCkNovo].documentoReprovadoCorrigido){
          this.checklistsDone.splice(posicaoCkNovo, 1);
          this.generateAlert(3, 'Insira o documento corrigido');
          return false;
        }

        api.put(`processChecklists/${this.checklistsDone[posicaoCkNovo].id}`, {"isChecked": "true", "status": "2", "processId": this.checklistsDone[posicaoCkNovo].processId, "name": this.checklistsDone[posicaoCkNovo].name});
        window.location.reload(true);
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
            if(oldChecklists.status === 2){
              this.checklistsDone.push(oldChecklists);
              this.generateAlert(3, 'Documento em aprovação');
              return false;
            }
            if(oldChecklists.status === 3){
              this.checklistsDone.push(oldChecklists);
              this.generateAlert(3, 'Documento está aprovado');
              return false;
            }
          }

        });

      }

      this.oldChecklists = this.checklistsDone;
    }
  },
  computed: {
    parsedDirection () {
      return this.direction.split(' ')
    },
  },
  methods: {
    async notificarCliente(event, obj) {
      if(event){
        console.log('notificando cliente');
        console.log(obj)
        await api.put(`audiencias/${obj.id}`, {"clienteNotificado": true});

        this.pMovement.actionName = 'Notificação de Cliente';

        let data = new Date();
        var dia = data.getDate(); 
        var mes = data.getMonth();
        var ano = data.getFullYear(); 
        var hora = data.getHours();
        var min = data.getMinutes();
        var seg = data.getSeconds();

        let actionName = "Criação de Processo";
        this.pMovement.actionDescription = 
            'Usuário ' 
            + this.nomeUsuarioLogado
            + ' notificou o cliente '
            + this.process.customer.name + ' ' + this.process.customer.lastName
            + ' no dia'
            + ' ' + dia + '/' + (mes+1) + '/' + ano
            + ' às '
            + hora + ':' + min + ':' + seg + '.';

        await api.post(`processMovements`, this.pMovement);
      }else{
        await api.put(`audiencias/${obj.id}`, {"clienteNotificado": false});
      }
    },
    async desarquivarProcesso(){
      await api.post(`processes/${this.process.id}/arquivar/false`).then((response) => {
        if(response.status === 200){
          this.generateAlert(1, 'O processo foi desarquivado com sucesso');
          this.process.isFiled = false;
        }

        if(response.status === 401){
          this.generateAlert(3, 'Você não possui permissão para desarquivar o processo');
        }
      });
    },
    async arquivarProcesso(){
      await api.post(`processes/${this.process.id}/arquivar/true`).then((response) => {
        if(response.status === 200){
          this.generateAlert(1, 'O processo foi arquivado com sucesso');
          this.process.isFiled = true;
        }

        if(response.status === 401){
          this.generateAlert(3, 'Você não possui permissão para arquivar o processo');
        }
      });
    },
    updateModal(modal){
      this.updateCheck = modal;
    },

    async attAudiencias(response){
      await api.get(`audiencias/byProcessId/${this.process.id}`).then((r) => {
        this.process.audiencias = r.data;
        this.process.audiencias.forEach((t,k) => {
           //2021-12-27
            let ano = this.process.audiencias[k].data.substring(0, 4)
            let mes = this.process.audiencias[k].data.substring(5,7)
            let dia = this.process.audiencias[k].data.substring(8, 10)
            this.process.audiencias[k].data = dia + '/' + mes + '/' + ano;

        });

      });
    },
    async removerMovimentacaoProcesso(processMovementId){

      let tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'DELETE_PROCESS_MOVEMENTS');
      if(!permissao){
        this.generateAlert(3, 'Você não possui permisão para excluir movimentações do processo');
        return false;
      }

      await api.delete(`processMovements/${processMovementId}`).then((responseDeleteProcessMovement) => {
        console.log(responseDeleteProcessMovement)
        if(responseDeleteProcessMovement.status === 204){
          console.log("deletado com sucesso")

          this.process.processMovements.forEach((p, i) => {
            if(p.id === processMovementId){
              this.process.processMovements.splice(i, 1);
            }
          });

        }else{
          console.log("Nao foi possivel deletar o checklist")
          console.log(responseDeleteProcessMovement.data)
        }
      });
    },
    editItem (item) {
      let tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'UPDATE_PROCESS_CHECKLIST');
      if(permissao){
        this.unicoChecklist = item;
        this.updateCheck=true;
      }else{
        this.generateAlert(3, 'Você não possui permisão para alterar uma atividade');
      }
    },
    editItemAudiencia (item) {
      this.unicoAudiencia = item;
      this.updateAudiencia=true;
    },
    deleteItem (item) {
      let tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'DELETE_PROCESS_CHECKLIST');
      if(permissao){
        this.editedIndex = this.process.processChecklists.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      }else{
        this.generateAlert(3, 'Você não possui permisão para deletar uma atividade');
      }
    },
    deleteItemAudiencia (item) {
      console.log("Deletando a audiencia:")
      console.log(item)
      this.editedIndexAudiencia = this.process.audiencias.indexOf(item)
      this.editedItemAudiencia = Object.assign({}, item)
      this.dialogDeleteAudiencia = true
      this.deleteItemConfirmAudiencia();
    },
    async deleteItemConfirm () {
      this.closeDelete();

      let processChecklistId = this.process.processChecklists[this.editedIndex].id;
      await api.delete(`processChecklists/${processChecklistId}`).then((responseDeleteAtividade) => {
        console.log(responseDeleteAtividade)
        if(responseDeleteAtividade.status === 204){
          console.log("deletado com sucesso")
        }else{
          console.log("Nao foi possivel deletar o checklist")
          console.log(responseDeleteAtividade.data)
        }
      });
      this.process.processChecklists.forEach((procesChecklist, i) => {
        if(procesChecklist.id === processChecklistId){
          this.process.processChecklists.splice(i, 1)
        }
      })
    },
    async deleteItemConfirmAudiencia () {
      this.closeDeleteAudiencia();

      let audienciaId = this.process.audiencias[this.editedIndexAudiencia].id;
      await api.delete(`audiencias/${audienciaId}`).then((responseDeleteAtividade) => {
        console.log(responseDeleteAtividade)
        if(responseDeleteAtividade.status === 204){
          this.generateAlert(2, 'Audiência excluída com sucesso');
        }else{
          console.log("Nao foi possivel deletar o checklist")
          console.log(responseDeleteAtividade.data)
        }
      });
      this.process.audiencias.forEach((audiencia, i) => {
        if(audiencia.id === audienciaId){
          this.process.audiencias.splice(i, 1)
        }
      })
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeAudiencia () {
      this.dialogAudiencia = false
      this.$nextTick(() => {
        this.editedItemAudiencia = Object.assign({}, this.defaultItem)
        this.editedIndexAudiencia = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDeleteAudiencia () {
      this.dialogDeleteAudiencia = false
      this.$nextTick(() => {
        this.editedItemAudiencia = Object.assign({}, this.defaultItem)
        this.editedIndexAudiencia = -1
      })
    },
    save () {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      // this.close()
    },
    async updateList(id){
      let apiUpdateListProcess = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token,
          'Content-Type': 'multipart/form-data'
        }
      });
      this.process.processChecklists = [];
      await apiUpdateListProcess.get(`/processChecklists`).then((resp) =>{

         resp.data.forEach((value) => {
        if (this.process.id == value.processId){
          value.user.fullName = value.user.name + ' ' +  value.user.lastName;
          this.process.processChecklists.push(value);
        }

        })
      });
      this.unicoChecklist = null;
      this.updateCheck = false;
      // await  apiUpdateListProcess.get(`/processChecklists/${id}`)
      //   .then((response) => {
      //     response.data.user.fullName = response.data.user.name + ' ' +  response.data.user.lastName;
      //     this.process.processChecklists.push(response.data);
      //     this.updateProcessMovements();
      //   });
    },
    async updateProcessMovements(){
      let apiUpdateListProcess = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token,
        }
      });

      await  apiUpdateListProcess.get(`/processMovements/${this.process.id}`)
        .then((response) => {
          this.process.processMovements = response.data;
          this.process.processMovements.forEach((processMovement, i) => {
            this.process.processMovements[i].user.imgSrc = require('@/assets/avatar/' + processMovement.user.imgSrc);
          });
          this.process.processMovements.reverse();
        });
    },
    corBotaoUploadParaChecklistReprovado(checklist){
      if(checklist.documentoReprovadoCorrigido){
        return "green";
      }else{
        return "yellow";
      }
    },
    async salvarMovimentacaoDoProcesso(){

      const tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'CREATE_PROCESS_MOVEMENTS');
      if(!permissao) {
        this.tituloMovimentacao = null;
        this.descricaoMovimentacao = null;
        this.generateAlert(3, 'Você nao pode inserir movimentações no processo')
        return false
      }

      const user = jwt.decode(window.localStorage.token);
      let processMovement = {
        actionName: this.tituloMovimentacao,
        actionDescription: this.descricaoMovimentacao,
        userId: user.id,
        processId: this.process.id
      };

      let api = axios.create({
        baseURL: configs.API_URL,
        headers: {
          'auth-token': window.localStorage.token,
        }
      });

      await api.post(`processMovements`, processMovement);

      this.updateProcessMovements();
      this.tituloMovimentacao = null;
      this.descricaoMovimentacao = null;
    },
    setAlertColor (color) {
      this.color = this.colors[color];
    },
    getProcessChecklistId(processChecklist){
      this.processChecklistId = processChecklist.id;
      this.processChecklistSelected = processChecklist;
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      this.uploadDocument();
    },
    uploadDocument(){
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

      // Se o status for 4, o documento esta reprovado e na hora de upar
      // um novo doc temos que fazer um put no doc existente
      if(this.processChecklistSelected.status === 4 || this.processChecklistSelected.status === 1){
        apiUpload.post('documents/upload', formData).then((responseuUploadDocument) => {
          let fileName = responseuUploadDocument.data.fileName;
          apiAddDoc.put(`documents/${this.processChecklistSelected.document.id}`, {"fileName": fileName}).then((res)=> {
            apiAddDoc.put(`processChecklists/${this.processChecklistId}`, {"documentoReprovadoCorrigido": "true"}).then((res)=> {
              window.location.reload(true);
            });
          });
        });
      }else{
        apiUpload.post('documents/upload', formData).then((responseuUploadDocument) => {
          let fileName = responseuUploadDocument.data.fileName;
          apiAddDoc.post('documents', {"fileName": fileName, "processChecklistId": this.processChecklistId}).then((responseuAddDocument) => {
            apiAddDoc.put(`processChecklists/${this.processChecklistId}`, {"status": "1", "processId": this.processChecklistSelected.processId, "name": this.processChecklistSelected.name}).then((res)=> {
              window.location.reload(true);
            });
          });
        });
      }
    },
    sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    },
    generateAlert(color, msg){
      this.alertMsg = msg;
      this.setAlertColor(color);
      this.direction = 'top right';
      this.snackbar = true;
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
        let splitDocName = value.split('-', 2);
        let docName = splitDocName[1];
        FileDownload(blob, docName);
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

    const tokenDecoded = jwt.decode(window.localStorage.token);
    if(!tokenDecoded){
      this.$router.push({ name: 'Login' })
    }

    api.get(`users/${tokenDecoded.id}`).then((response) => {
      let user = response.data;
      this.nomeUsuarioLogado = user.name + ' ' + user.lastName;
    })

    api.get(`processes/byProcessNumber/${this.$route.params.processNumber}`).then((responseGetProcessByNumber) => {

      this.process = responseGetProcessByNumber.data;
      this.pMovement.processId = this.process.id;
      this.pMovement.userId = tokenDecoded.id;

      this.process.audiencias.forEach((t,k) => {
        //2021-12-27
        let ano = this.process.audiencias[k].data.substring(0, 4)
        let mes = this.process.audiencias[k].data.substring(5,7)
        let dia = this.process.audiencias[k].data.substring(8, 10)
        this.process.audiencias[k].data = dia + '/' + mes + '/' + ano;

      });

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

      this.process.processMovements.reverse();

    });
  }
}
</script>
