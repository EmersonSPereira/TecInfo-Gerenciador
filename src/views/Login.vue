<template>
  <v-container
    fluid
    class="background"
  >
    <v-layout column>
      <v-flex xs12>
        <div class="container">
          <v-card
            flat
            tile
            class="container fluid text-md-center"
            max-width="450px"
          >

            <v-img
              class="imagem"
              :src="`https://firebasestorage.googleapis.com/v0/b/tecinfor-gerenciador.appspot.com/o/TecInfo%20Gerenciador.png?alt=media&token=a7a74d7a-ce45-49f9-a400-9e4bf1f00125`"
            >
              <template v-slot:placeholder>
                <v-layout
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular
                    indeterminate
                    color="black lighten-2"
                  ></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
            <v-form class="container">

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ><i class="material-icons">
                  account_circle
                </i></v-text-field>
              <v-text-field
                class="input-group--focused"
                :type="show ? 'text' : 'password'"
                v-model="senha"
                :rules="senhaRules"
                label="Senha"
                required
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
              ></v-text-field>
              <v-btn
                color="success"
                class="mt-3 mb-5"
                outline
                block
                @click="login()"
              >
                Entrar
              </v-btn>
              <span class="container fluid"><strong>Não tem conta?</strong>
                <v-btn
                  outline
                  small
                  color="info"
                  @click="$router.push('cadastro')"
                >Cadastre-se</v-btn>
              </span>
            </v-form>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
    <v-progress-linear
      :indeterminate="carregamento"
      :active="carregamento"
    ></v-progress-linear>
    <v-snackbar
      v-model="snackbar"
      :top="true"
      :right="true"
      :timeout=6000
      color="red"
      
    >
      {{ text }}
      <v-btn
        color="black"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>

</template>

<script>
import firebase from "firebase"
export default {
  data: () => ({
    valid: true,
    show: false,
    snackbar: false,
    carregamento: false,
    text: '',

    email: '',
    senha: '',
    emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+/.test(v) || 'Este email não é valido'
    ],
    senhaRules: [
      v => !!v || 'A senha é Obrigatória',
      v => v.length >= 5 || 'Senha muito curta'
    ],

  }),

  methods: {
    
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    login () {


      firebase.auth().signInWithEmailAndPassword(this.email, this.senha).then(
        res => {
          if (res) this.$router.push('home')
        }).catch(err => {
          if (err.code == "auth/invalid-email") {
             this.text = "O email não pode ser vazio"
            this.snackbar = true
          }else if(err.code == "auth/wrong-password") {
            this.text = "Senha Invalida"
            this.snackbar = true
          }


        })






    },
    carregaHome () {


    }
  }
}
</script>

<style scoped>
form {
  margin-top: 10px;
}
.imagem {
  margin-left: 30px;
}

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
</style>
