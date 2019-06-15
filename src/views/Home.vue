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
        to="/portfolio"
      >Portifólio</v-btn>
      <v-btn
        flat
        to="/stocks"
      >Ações</v-btn>
      <v-btn
        flat
        to=""
        @click="endDay"
      >Finalizar dia</v-btn>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn
          flat
          slot="activator"
        >{{usuario}}</v-btn>
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
        <v-list-tile @click="endDay">
          <v-list-tile-title>Finalizar dia</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="saveData">
          <v-list-tile-title>Salvar dados</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="loadDataLocal">
          <v-list-tile-title>Carregar dados</v-list-tile-title>
        </v-list-tile>
        
        
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-snackbar
      v-model="snackbar"
      :top="true"
      :right="true"
      :timeout= 6000
      color="success"
      
    >
      Sucesso ao Realizar Login
      <v-btn
        color="red"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</div>

</template>

<script>
import firebase from 'firebase'
export default {
  
  data() {
    return {
      usuario: firebase.auth().currentUser.email,
      snackbar: true,
    }
  },
  
  methods: {
    deslogar () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
}
</script>