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
          icon="mdi-clipboard-text"
          color="success"
          title="Processos"
          class="px-5 py-3"
        >
          <v-card-text>
            <v-card-title
            >
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="processHeaders"
              :items="processes"
              :search="search"
              :footer-props="{
                'items-per-page-text':'Pendências por página'
              }"
              class="py-3"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        class="ma-2"
        color="success"
      >
        Cadastrar Processo
      </v-btn>
    </v-row>  
  </v-container>
</template>

<script>

export default {
  name: 'Processes',
  components: {

  },

  data() {
    return {
      processes: [
        {
          number: '10293',
          assessmentDate: 'asdsa',
          hearingDate: 'asd',
          regarding: 'Separacao Consensual',
          customer: 'CLiente',
          user: 'Usuario Responsael'
        },
        {
          number: '10293asdasd',
          assessmentDate: 'akkkksa',
          hearingDate: 'assssd',
          regarding: 'Vaga Creche',
          customer: 'CLiente 2',
          user: 'Usuario Responsael 2'
        },
      ],
      search: '', 
      processHeaders: [
        {
          sortable: false,
          text: 'Processo',
          value: 'number',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Data de Autuação',
          value: 'assessmentDate',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Referente a:',
          value: 'regarding',
          align: 'left ',
        },
        {
          sortable: false,
          text: 'Data de Audiência',
          value: 'hearingDate',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Cliente',
          value: 'customer',
          align: 'left',
        },
        {
          sortable: false,
          text: 'Responsável',
          value: 'user',
          align: 'left',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
