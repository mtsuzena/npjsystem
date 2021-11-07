<template>
  <div class="text-center">

    <v-dialog
      v-model="dialog"
      width="600"
      persistent
      scrollable
    >

      <template v-slot:activator="{on,attrs}">
        <v-btn
          class="ma-2"
          color="green"
          v-bind="attrs"
          v-on="on"
          value="true"
        >
          CADASTRAR PERFIL
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar fixed>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title>Cadastrar um novo perfil</v-toolbar-title>
            </v-col>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-alert
            dense
            text
            type="error"
            :value="alertSucess"
            border="top"
            transition="slide-y-transition"
          >
            {{ msg }}
          </v-alert>
          <v-form
            id="formUser"
            ref="form"
            lazy-validation
            v-model="valid"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Perfil:"
                  prepend-icon="far fa-id-badge"
                  v-model="profile.name"
                  :rules="[rules.required, rules.max]"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Descrição do perfil:"
                  prepend-icon="far fa-edit"
                  v-model="profile.description"
                />
              </v-col>
            </v-row>

            <v-spacer></v-spacer>
            <v-card-text class="text-center">Permissões</v-card-text>

            <v-treeview
              selectable
              rounded
              hoverable
              activatable
              open-all
              selection-type="leaf"
              :items="permissions"
              v-model="profile.roles"
            >
              <template v-slot:label="{ item }">
              <span
                :class="{ large: !!(item.id === 15) }"
                >
                    {{ $t(item.name) }}
              </span>
              </template>

            </v-treeview>


          </v-form>

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="green"
            small
            @click="allProfiles"
          >
            <v-icon>all_inbox</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text
            @click="cancelar"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="salvar"
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
  name: "DialogProfiles",
  props: {
    dialogProp: false,
    profileProp: '',
  },
  data() {
    return {
      dialog: false,
      att: '',
      valid: true,
      modal: false,
      alertSucess: false,
      msg: '',
      profile: {
        name: '',
        description: '',
        roles: []
      },
      permissions: [
        {
          id: 1,
          name: 'Regras dos perfis',
          children: []
        },
        {
          id: 2,
          name: 'Usuários',
          children: []
        },
        {
          id: 3,
          name: 'Perfis',
          children: []
        },
        {
          id: 4,
          name: 'Tipos de processos',
          children: []
        },
        {
          id: 5,
          name: 'Checklists dos processos',
          children: []
        },
        {
          id: 6,
          name: 'Processos',
          children: []
        },
        {
          id: 7,
          name: 'Clientes',
          children: []
        },
        {
          id: 8,
          name: 'Atendimentos',
          children: []
        },
        {
          id: 9,
          name: 'Movimentações dos processos',
          children: []
        },
        {
          id: 10,
          name: 'Documentos dos processos',
          children: []
        },
        {
          id: 11,
          name: 'Audiências',
          children: []
        }
      ],

      rules: {
        required: value => !!value || 'Não pode ser vazio.',
        x: value => [] || 'Favor selecionar uma permissão!',
        min: v => (v && v.length >= 8) || 'Tamanho minimo de 8 caracteres!',
        max: v => (v && v.length < 30) || 'Tamanho maior que 25 caracteres!',
      },
    }

  },
  watch: {
    dialogProp() {
      if (this.dialogProp === true) {

        this.dialog = true;
        this.profile.id = this.profileProp.id;
        this.profile.name = this.profileProp.name;
        this.profile.description = this.profileProp.description;
        this.att = true;
        this.profile.roles = [];
        this.profileProp.roles.forEach((v) => {
          this.profile.roles.push(v.id);
        });


      }
    },
  },

  methods: {
    alerts(alert, msg) {
      this.alertSucess = true;
      this.msg = msg;
      window.setInterval(() => {
        this.alertSucess = false;
      }, 4000);
    },

    allProfiles() {
      if (this.profile.roles.length === 0) {
        this.permissions.forEach((t) => {
          this.profile.roles.push(t.id);
        });
      } else {
        this.profile.roles = [];
      }
    },

    async getRoles() {

      await api.get('roles/').then((resposta) => {
        resposta.data.forEach((value) => {

          if (value.name.match(/ROLE$/))
            this.permissions[0].children.push({id: value.id, name: value.name});
          else if (value.name.match(/USER$/))
            this.permissions[1].children.push({id: value.id, name: value.name});
          else if (value.name.match(/PROFILE$/))
            this.permissions[2].children.push({id: value.id, name: value.name});
          else if (value.name.match(/PROCESS_TYPE$/))
            this.permissions[3].children.push({id: value.id, name: value.name});
          else if (value.name.match(/PROCESS_CHECKLIST$/))
            this.permissions[4].children.push({id: value.id, name: value.name});
          else if (value.name.match(/PROCESS$/))
            this.permissions[5].children.push({id: value.id, name: value.name});
          else if (value.name.match(/CUSTOMER$/))
            this.permissions[6].children.push({id: value.id, name: value.name});
          else if (value.name.match(/CONSULTATION$/))
            this.permissions[7].children.push({id: value.id, name: value.name});
          else if (value.name.match(/PROCESS_MOVEMENTS$/))
            this.permissions[8].children.push({id: value.id, name: value.name});
          else if (value.name.match(/DOCUMENT$/))
            this.permissions[9].children.push({id: value.id, name: value.name});
          else if (value.name.match(/AUDIENCIA$/))
            this.permissions[10].children.push({id: value.id, name: value.name});

        });

      });

    },
    async salvar() {
      console.log(this.profile);
      if (this.profile.roles.length !== 0) {
        if (this.att == true && this.profile.id != null) {
          this.att == false;
          await api.put(`profiles/${this.profile.id}`, this.profile)
            .then((resposta) => {
                this.dialog = false;
                this.$emit('atualizarLista2');
                this.$refs.form.reset();

              }, (error) => {
                console.log(error);
              }
            )
          ;

        } else if (this.$refs.form.validate() && this.att == false && this.profile.id == null) {
          console.log(this.profile);
          await api.post('profiles/', this.profile).then((resp) => {
            this.dialog = false;
            resp.data.roles = this.profile.roles;

            this.$emit('atualizarLista2');
            this.$refs.form.reset();
          }, (e) => {
            console.log(e);
          });
        }
      } else {
        this.alerts(1, 'Favor selecionar 1 permissão!')
      }

    },

    cancelar() {
      delete this.profile["id"];
      this.profile.roles = [];
      this.dialog = false;
      this.att = false;
      this.$emit('attDialog');
      this.$refs.form.reset();
    }
  },
  created() {
    this.getRoles();
  }

}
</script>

<style scoped>

</style>

