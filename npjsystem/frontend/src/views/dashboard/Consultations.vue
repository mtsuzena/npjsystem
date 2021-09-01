<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    class="grey lighten-5 mb-6"
  >
    <v-alert
      dense
      text
      type="success"
      :value="alertSucess"
      border="top"
      transition="slide-y-transition"
    >
      {{msg}}
    </v-alert>
    <dialog-calender
      v-if="calenderDateSelected != null && dialog != false"
      :dateCalender="calenderDateSelected"
      :consultationId="consultationId"
      :open="dialog"
      @closeDialog="closeDialog"
      @saveDialog="saveObject"
      @cancellAttendance="cancellAttendance"
    ></dialog-calender>
    <div>

      <v-sheet
        tile
        height="75"
        class="d-flex"
        color="transparent"
      >
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-container class="fluid">
          <v-select
            cols="12"
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="Dias da semana"
            class="d-flex pa-2 mb-3"
          />
        </v-container>

        <v-spacer/>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>

          <v-sheet height="900">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @click:date="openDialogCalender"
              @click:event="showEvents"
              locale="pt-br"
              color="green"
            />
          </v-sheet>

    </div>
  </v-container>
</template>

<script>

import axios from "axios";
import configs from "../../config/configs";
const jwt = require('jsonwebtoken');

let api = axios.create({
  baseURL: configs.API_URL,
  headers: {
    'auth-token': window.localStorage.token
  }
});

export default {
  name: 'ConsultationsConsultations',
  components: {
    DialogCalender: () => import('./components/DialogCalender'),
    PendingsProcessChecklists: () => import( './components/PendingsProcessChecklists'),
  },

  data() {
    return {
      msg: '',
      alertSucess: false,
      markeds: [],
      consultationId: '',
      calenderDateSelected: Date,
      dialog: false,
      consultations: {},
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [1, 2, 3, 4, 5],
      weekdays: [
        {text: 'Domingo - Sábado', value: [0, 1, 2, 3, 4, 5, 6]},
        {text: 'Segunda-Feira - Domingo', value: [1, 2, 3, 4, 5, 6, 0]},
        {text: 'Segunda-Feira - Sexta-Feira', value: [1, 2, 3, 4, 5]},
        {text: 'Segunda-Feira, Quarta-Feira, Sexta-Feira', value: [1, 3, 5]},
      ],
      value: '',
      events: [],
      colors: ['blue', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }
  },
  methods: {
    cancellAttendance(){
      this.alertSucess = true;
      this.saveObject();
      this.alerts(1, 'Atendimento cancelado :)');
    },
    alerts(alert, msg){
      //arrumar dps isso
      this.msg = msg;
      window.setInterval(() => {
            this.alertSucess = false;
      }, 3400);
    },
    openDialogCalender({date}) {
      this.consultationId = '';
      this.calenderDateSelected = new Date(`${date} 00:00:00`)
      this.dialog = true
    },
    showEvents(e){
      this.consultationId = e.event.id;
      this.calenderDateSelected =new Date(`${e.day.date}  00:00:00`);
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false;
    },
    saveObject() {
      this.getConsultation();
    },
    complete(index) {
      this.list[index] = !this.list[index]
    },
    getEvents({start, end}) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date('2021-04-01 00:00:00')
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date('2021-04-20 23:00:00')

        events.push({
          name: 'gdd',
          start: first,
          //end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }
      this.events = events
    },
    getEventColor(event) {
      return event.color
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
   async insertEvents(arr) {

      this.events = []

      arr.forEach((value)=>{
        this.events.push({
          id: value.id,
          name: `| Atendimento ao Cliente: ${value.customer.name}`,
          start: new Date(value.consultationDate),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: '00:00',
          format: '24hr'
        });
      });

    },
    async getConsultation(){
        await api.get(`consultations/`).then((response) => {
          this.consultations = response.data;
        });
    }
  },
  watch: {
    consultations() {
      this.insertEvents(this.consultations);
    },
  },
   created() {
      this.getConsultation();
  }
}
</script>


<style scoped>
>>>.v-calendar-weekly__day-label .transparent{
  background-color:#b5b5b5 !important;
}
</style>
