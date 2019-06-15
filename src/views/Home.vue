<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="headline  mr-4"><span>TecInfo</span>
        <span class="font-weight-light"> Gerenciador</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          to="/"
        >Ínicio</v-btn>
        <v-btn
          flat
          @click="dialog = true"
        >Novo Serviço</v-btn>
        <v-btn
          flat
          @click="exibirServicos()"
        >Ações</v-btn>
        <v-btn
          flat
          to=""
          @click="exibirUsuario"
        >Finalizar dia</v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <v-btn
            flat
            slot="activator"
          >{{usuario.email}} ▽</v-btn>
          <v-list>
            <v-list-tile @click="editarUsuario()">
              <v-list-tile-title>Editar</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="deslogar()">
              <v-list-tile-title>Sair</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

      </v-toolbar-items>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile to="/">
            <v-list-tile-title>Ínicio</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/portfolio">
            <v-list-tile-title>Portifólio</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/stocks">
            <v-list-tile-title>Ações</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Finalizar dia</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Salvar dados</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Carregar dados</v-list-tile-title>
          </v-list-tile>

        </v-list>
      </v-menu>
    </v-toolbar>

    <!-- cadastrar serviço -->
    <v-layout
      row
      justify-center
    >
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >

        <v-card>
          <v-card-title>
            <span class="headline">Cadastrar Novo Serviço</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                  xs12
                  md8
                >
                  <v-text-field
                    v-model="servico.nomeCliente"
                    label="Nome Cliente"
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md4
                >
                  <v-text-field
                    v-model="servico.telefone"
                    label="Telefone"
                    required
                    mask="(##) # ####-####"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="servico.equipamento"
                    label="Equipamento*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="servico.descricaodefeito"
                    label="Descrição Defeito*"
                    type="password"
                    required
                  ></v-textarea>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    v-model="servico.dataEntrega"
                    label="Data Prevista de Entrega"
                    type="date"
                    required
                  ></v-text-field>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              flat
              @click="dialog = false"
            >Cancelar</v-btn>
            <v-btn
              color="green darken-1"
              flat
              @click="salvarServico()"
            >Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- Exibir Serviços -->
<tr v-for="(item,id) of desserts" :key="item['.key']">
            <td>{{ item.nomeCliente }}</td>
            <td>{{ item.telefone }}</td>
            <td>{{ id }}</td>
            
          </tr>
</div>

</template>

<script>
import firebase from 'firebase'

export default {

  data () {
    return {
      usuario: this.exibirUsuario(),
      dialog: false,
      id:'',

      servico: {
        nomeCliente: '',
        telefone: '',
        equipamento: '',
        descricaoDefeito: '',
        dataEntrega: '',
      },
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: []
    }
  },

  methods: {
    deslogar () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    exibirUsuario () {

      this.$http.get("usuarios/1d5IqER2xRPa4tov37N3eNQ074S2.json").then(res => {
        this.usuario = res.data
      });
    },

    salvarServico () {
      this.$http.post("usuarios/1d5IqER2xRPa4tov37N3eNQ074S2/servicos.json", this.servico)
      this.dialog = false
      alert("salvo com sucesso")
    },

    exibirServicos () {

      this.$http.get("usuarios/1d5IqER2xRPa4tov37N3eNQ074S2/servicos.json").then(res => {
        this.desserts = res.data
        console.log(this.desserts)
      });
    },


  },
}
</script>