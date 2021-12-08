<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogT"
      width="600"
      persistent
      scrollable
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="verificaSePermiteCriarUmProcesso()"
          class="ma-2"
          color="success"
          v-bind="attrs"
          v-on="on"
        >
          Cadastrar audiência
        </v-btn>
        <v-btn
          v-else
          class="ma-2"
          color="success"
          @click="emitirErro()"
        >
          Cadastrar audiência
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar fixed>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title>Cadastrar uma nova audiência</v-toolbar-title>
            </v-col>
          </v-toolbar>
        </v-card-title>
        <v-card-text>

          <v-form
            id="formAudi"
            ref="form"
            lazy-validation
            v-model="validT"
          >
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-autocomplete
                prepend-icon="fas fa-paste"
                label="Tipo:"
                :items="listaAudd"
                v-model="Objetaud.tipo"
                item-text="text"
                item-value="value"
                :rules="capetaRules"
                :filter="customFilter"
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
            >
              <v-dialog
                ref="dialog321"
                v-model="modalFinishTF"
                :return-value.sync="dateFinishTF"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="Objetaud.data"
                    label="Término em:"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="capetaRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="Objetaud.data"
                  scrollable
                  :min="disabledDatesIO"

                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modalFinishTF = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog321.save(Objetaud.data)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>



          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="CcAudienc"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!validT"
            color="primary"
            text
            @click="saveAudiencss"
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
  name: "DialogAudiencia",
  props: {processdd: String},

  data() {
    return {
      capetaRules: [
        v => !!v || 'Favor selecionar!',
      ],
      disabledDatesT: this.formatDate(new Date(Date.now() - 8640000)),
      dialogT: false,
      validT: true,
      dateActingT: '',
      menuT: false,
      modalFinishTF: '',
      dateFinishTF: '',
      modalActingT: false,
      disabledDatesIO: this.formatDate(new Date(Date.now() - 8640000)),
      listaAudd: [{text: "Conciliaçao", value: 1},{text: "Instrução", value: 2},{text: "Julgamento", value: 3}],
      Objetaud: {
        tipo: '',
        data: '',
        processId: '',
        clienteNotificado: false
      }
    }
  },
  methods: {
    formatDate(v) {
      let data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();
      return ano + "-" + mes + "-" + dia;
    },
    emitirErro(){
      this.$emit('generateAlert', 3, 'Você nao pode criar um processo');
    },
    verificaSePermiteCriarUmProcesso(){
      const tokenDecoded = jwt.decode(window.localStorage.token);
      let permissao = tokenDecoded.roles.find(role => role.name === 'CREATE_PROCESS');
      if(permissao) {
        return true
      }else{
        return false
      }
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.text.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    async saveAudiencss() {
      if (this.$refs.form.validate()) {
        this.Objetaud.processId =  this.processdd.id;
        this.Objetaud.data =this.Objetaud.data+' 00:00:00';
        this.Objetaud.tipo = this.Objetaud.tipo - 1;
        api.post('/audiencias', this.Objetaud)
            .then((response) => {
              this.dialogT = false;
              this.$refs.form.reset();
              this.$emit('attAudiencias', response.data);
            }, (error) => {
              console.log(error);
            });
        console.log(this.Objetaud);
      }
    },

    CcAudienc() {
      this.dialogT = false;
      this.$refs.form.reset();
    },

  },
  watch: {},
  created() {
  }
}
</script>

<style scoped>
</style>
