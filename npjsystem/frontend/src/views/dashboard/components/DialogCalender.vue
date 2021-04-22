<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Agendar para o dia {{ dateCalender | dateFormat }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="people.name"
                  label="Nome do Cliente*"
                  type="text"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  type="email"
                  required
                  v-model="people.email"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Telefone*"
                  type="phone"
                  required
                  v-model="people.phone"
                />
              </v-col>

              <v-col cols="mg-12">
                <v-time-picker
                  format="24hr"
                  v-model="hour"
                ></v-time-picker>
              </v-col>

              <v-col
                cols="12"
              >
                <v-select
                  :items="['Flavio Augusto de Souza', 'Maria Joaquim', 'Victor Suzena', 'Sorriso Ronaldo']"
                  label="Responsável pelo atendimento*"
                  required
                  v-model="people.responsible"
                />
              </v-col>
              {{ people }}
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            X
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogCalender',
  props: {
    dateCalender: Date,
    open: Boolean,
  },
  filters: {
    dateFormat(value) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      return value.toLocaleDateString('pt-br', options)
    }
  },
  data() {
    return {
      dialog: this.open,
      hour: '',
      people: {
        date: this.dateCalender,
        name: '',
        email: '',
        phone: '',
        responsible: '',
      }
    }
  },
  methods: {
    close() {
      this.$emit("closeDialog")
    },
    save() {
      this.people.date.setHours(parseInt(this.hour.substring(0, 2)), parseInt(this.hour.substring(7, this.hour.length - 2)));
      //JSON.stringify(this.carrinho)
      this.$emit("saveDialog", this.people)
      this.close()
    }
  },
}
</script>
<style scoped>


</style>
