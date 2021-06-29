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
                    <span> INSERIR LISTA DE DOCUMENTOS PARA APROVAÇÃO AQUI!</span>
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

export default {
  name: 'DocumentReview',
  components: {
  },
  data() {
    return {
      materialCardColor: 'red',
    }
  },
  methods: {
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
  // beforeCreate(){
  //   let api = axios.create({
  //     baseURL: configs.API_URL,
  //     headers: {
  //       'auth-token': window.localStorage.token
  //     }
  //   });

  //   api.get(`processes/byProcessNumber/${this.$route.params.processNumber}`).then((responseGetProcessByNumber) => {

  //     this.process = responseGetProcessByNumber.data;

  //     if(this.process.isFiled){
  //       this.processStatus = '(processo arquivado)'
  //     }else{
  //       // CRIAR LOGICA DOS DIAS DE TRAMITAÇÃO AQUI...

  //       let beginsDate = new Date(this.process.begins_date);
  //       let currentDate = new Date();

  //       let difference = (currentDate.getTime()-beginsDate.getTime()) / 1000 / 60 / 60 / 24;

  //       let differenceInDecimal = parseInt(difference, 10);

  //       this.processStatus = `(${differenceInDecimal} dia(s) em tramitação)`;
  //     }

  //     this.process.processChecklists.forEach((procesChecklist, i) => {
  //       if(procesChecklist.isChecked){
  //         this.checklistsDone.push(procesChecklist);
  //       }
  //     });

  //   });
  // }
}
</script>