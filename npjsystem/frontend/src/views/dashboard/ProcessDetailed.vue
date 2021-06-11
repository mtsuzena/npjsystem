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
          :title="`Processo ${process.number} / (1 dia(s) em tramitação)`"
          class="px-5 py-3"
        >
          <v-card-text>
            
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
  name: 'ProcessDetailed',
  components: {

  },

  data() {
    return {
      process: {},
      processStatus: ''     
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

      }
    });
  }
}
</script>