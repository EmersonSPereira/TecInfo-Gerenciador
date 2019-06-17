<template >

  <v-container fluid class="background">
    
  
    <v-toolbar fixed=true >
      <v-toolbar-title class="headline  mr-4"><span>TecInfo</span>
        <span class="font-weight-light"> Gerenciador</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      
        <v-btn
          flat
          @click="dialog = true"
        >Novo Serviço +</v-btn>
    
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
          <v-list-tile @click="dialog = true">
            <v-list-tile-title>Novo Serviço + </v-list-tile-title>
          </v-list-tile>
          <v-list-tile >
            <v-list-tile-title><strong>{{usuario.email}}</strong></v-list-tile-title>
            
          </v-list-tile>
          <v-list-tile >
            <v-list-tile-title class="ml-2">- Editar</v-list-tile-title>
            
          </v-list-tile>
          <v-list-tile @click="deslogar()" >
            <v-list-tile-title class="ml-2" > - Sair</v-list-tile-title>
            
          </v-list-tile>
          

        </v-list>
      </v-menu>
    </v-toolbar>
<div>
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
                    type="tel"
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
                    v-model="servico.descricaoDefeito"
                    label="Descrição Defeito*"
                    type="text"
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
                    format="dd/MM/yyyy"
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

    <h1 class="margin white--text "  >Olá {{ usuario.nome }} Aqui estão seus serviços:</h1>
<div v-for="(item,id) of desserts" :key="item['.key']" >
     <v-layout class="mt-3">
    <v-flex xs12 sm6 offset-sm3>       
<v-card>
        <v-card-title primary-title>
          <div>
            <h3 >Dados do Cliente:  
              </h3>
            <div class="mt-4"> <span><strong> Nome: </strong> {{ item.nomeCliente }}</span> 
                  <span class="ml-5"><strong> Telefone: </strong> {{ item.telefone }}</span></div>
          </div>
        </v-card-title>

         <v-card-title primary-title>
          <div>
            <h3 >Dados do Serviço:  
              </h3>
            <div class="mt-4"> <span><strong> Equipamento: </strong> {{ item.equipamento }}</span> 
                  <span class="ml-5" ><strong> Data de Entrega Prevista: </strong> {{ item.dataEntrega }}</span>
                  </div>
          </div>
          
        </v-card-title>
        <v-card-title primary-title>
          <div>
            <h3 >Descrição Defeito:  
              </h3>
            <div class="mt-4"> <span>{{ item.descricaoDefeito }}</span> 
                  </div>
          </div>
          
        </v-card-title>

        

        <v-card-actions>
          <v-btn flat color="red" @click="deletarServiço(id)">Apagar</v-btn>
        </v-card-actions>
      </v-card>
      <v-spacer class="mt-3"></v-spacer>
      </v-flex>
  </v-layout>
</div>

<!-- Snack bar mostrando notificação -->
<v-snackbar
      v-model="snackbar"
      right="true"
      top= "true"
      color="success"
      vertical = "true"
      timeout="4000"
      
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        fechar
      </v-btn>
    </v-snackbar>

</div>
         
 </v-container>

</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'


export default {

  data () {
    return {
      usuario: this.exibirUsuario(),
      dialog: false,
      id:firebase.auth().currentUser.uid,
      confirmaDeletarServico: false,
      snackbar: false,
      text:'',

      servico: {
        nomeCliente: '',
        telefone: '',
        equipamento: '',
        descricaoDefeito: '',
        dataEntrega: '',
      },
      
      desserts: this.exibirServicos()
    }
  },

  methods: {
    deslogar () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    exibirUsuario () {
      var id = firebase.auth().currentUser.uid
      this.$http.get(`usuarios/${id}.json`).then(res => {
        this.usuario = res.data
      });
    },

    salvarServico () {
      var id = firebase.auth().currentUser.uid
      this.$http.post(`usuarios/${id}/servicos.json`, this.servico).then(
      ()=>{this.dialog = false,
      this.text = 'Serviço Salvo com Sucesso',
      this.snackbar = true,
      this.limparServico(),
      this.exibirServicos()
    })},

    limparServico() {
      this.servico.nomeCliente = '',
      this.servico.telefone = '',
      this.servico.equipamento='',
      this.servico.dataEntrega = '',
      this.servico.descricaoDefeito = ''
    },


    exibirServicos () {
      var id = firebase.auth().currentUser.uid
      this.$http.get(`usuarios/${id}/servicos.json`).then(res => {
        this.desserts = (res.data)

        
      });
    },

    deletarServiço(id) {
      
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Ao clicar em sim o serviço sera deletado e não sera possível recuperalo",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
          var uid = firebase.auth().currentUser.uid
          this.snackbar = true
          this.text = "Serviço deletado com sucesso"
          this.$http.delete(`usuarios/${uid}/servicos/${id}.json`).then(
            () => this.exibirServicos()
          )
            
        }
      })
      

    },


  },
}
</script>

<style scoped>
.background {
  background-image: linear-gradient(
    to right top,
    #061e41,
    #002033,
    #001e1f,
    #081810,
    #11120d
  );
}

.margin{
  margin-top: 80px;
  margin-left: 20px;
}
</style>
