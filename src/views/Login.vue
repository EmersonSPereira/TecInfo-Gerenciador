<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <div class="container">
          <v-card
            class="container fluid text-md-center"
            max-width="500px"
          >
            <v-img src="https://firebasestorage.googleapis.com/v0/b/tecinfor-gerenciador.appspot.com/o/TecInfo%20Gerenciador.png?alt=media&token=a7a74d7a-ce45-49f9-a400-9e4bf1f00125"></v-img>
            <v-form class="container">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="senha"
                type="password"
                :rules="senhaRules"
                label="Senha"
                required
              ></v-text-field>
              <v-btn
                color="success"
                
                class="mt-3 mb-5"
                outline
                block
              >
                Entrar
              </v-btn>
              <span class="container fluid"><strong>Não tem conta?</strong> <v-btn
                  outline
                  small
                  color="info"
                >Cadastre-se</v-btn></span>
            </v-form>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  data: () => ({
    valid: true,

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
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 10px;
}
</style>
