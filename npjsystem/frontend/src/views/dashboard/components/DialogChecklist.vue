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
          v-if="verificaSePermiteCriarChecklist()"
          class="ma-2"
          color="green"
          v-bind="attrs"
          v-on="on"
          @click="desab"
        >
          Cadastrar checklist
        </v-btn>
        <v-btn
          v-else
          class="ma-2"
          color="green"
          @click="retornarErro('Você nao possui permissao para criar uma atividade')"
        >
          Cadastrar checklist
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar fixed>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title>Inserir checklist</v-toolbar-title>
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
                label="Checklist:"
                prepend-icon="fas fa-clipboard-list"
                :rules="nameChecklistRules"
                v-model="processChecklist.name"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-dialog
                ref="dialog"
                v-model="modalFinish"
                :return-value.sync="dateFinish"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="processChecklist.deadline"
                    label="Término em:"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="dateRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="processChecklist.deadline"
                  scrollable
                  :min="disabledDates"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modalFinish = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(processChecklist.deadline)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Responsável: "
                :items="items"
                item-text="text"
                item-value="value"
                :filter="customFilter"
                @click.once.prevent="getUser"
                v-model="processChecklist.userId"
                prepend-icon="fas fa-user-friends"
                :rules="usersRules"
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
            @click="saveCheckList"
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
  name: "DialogChecklist",
  props: {
    process: {},
    checklist: {},
    dialog_m: '',

  },

  data() {
    return {
      checklist2: {},
      nameChecklistRules: [
        v => !!v || 'Preencha o nome do checklist!',
        v => (v && v.length < 25) || 'Tamanho maior que 25 caracteres!',
      ],
      dateRules: [
        v => !!v || 'Selecione a data de finalização do checklist!',
      ],
      usersRules: [
        v => !!v || 'Selecione um responsável!',
      ],
      modalFinish: false,
      dateFinish: '',
      disabledDates: this.formatDate(new Date(Date.now() - 8640000)),
      dialog: false,
      valid: true,
      items: [],
      processChecklist: {
        name: '',
        deadline: '',
        processId: this.process.id,
        isChecked: false,
        userId: '',
        createAt: new Date(),
      }
    }
  },
  methods: {
    retornarErro(msg) {
      this.msgErro = msg;
      this.$emit('generateAlert', 3, msg);
    },
    verificaSePermiteCriarChecklist(){
      const tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'CREATE_PROCESS_CHECKLIST');
      if(permissao) {
        return true
      }else{
        return false
      }
    },
    desab(){
      this.dialog_m = false;
    },
    async getUser() {
      await api.get(`users/`).then((responseUsers) => {
        responseUsers.data.forEach((value) => {
          this.items.push({
            text: value.name + ' ' + value.lastName,
            value: value.id
          });
        })
      })
    },
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
    cancellProcess() {
      this.dialog = false;
      this.dialog_m=false;
      this.$emit('dialogs', false);
      this.$refs.form.reset();
    },
    async saveCheckList() {
      if(this.dialog_m === true){
        await api.put(`processChecklists/${this.checklist.id}`, this.processChecklist)
          .then((response) => {
              this.dialog = false;
              this.$emit('updateList', this.checklist.id);
              this.$refs.form.reset();
            }, (error) => {
              console.log(error);
            }
          )
        ;
      }
      else if (this.$refs.form.validate()) {
        await api.post('/processChecklists', this.processChecklist)
          .then((response) => {
              this.dialog = false;
              this.$emit('updateList', response.data.id);
              this.$refs.form.reset();
            }, (error) => {
              console.log(error);
            }
          )
        ;
      }
    }
  },
  watch: {
    dialog_m(){
      if (this.dialog_m === true){
        this.dialog = true;
        this.processChecklist.name = this.checklist.name;
        console.log(this.checklist.deadline);
        this.processChecklist.deadline = this.checklist.deadline;
        this.processChecklist.processId = this.checklist.processId;
        this.processChecklist.userId = this.checklist.userId;
        this.getUser();
        delete this.processChecklist['createAt'];
      }
    }
  },
  created() {}
}
</script>

<style scoped>
</style>
