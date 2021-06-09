<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    class="grey lighten-5 mb-6"
  > 
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
      process: {}      
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
    });
  }
}
</script>