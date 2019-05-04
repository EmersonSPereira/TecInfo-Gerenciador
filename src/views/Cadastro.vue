<template class="background">
  <v-container
    fluid
    grid-list-md
    text-xs-center
    class="background "
  >

    <v-flex
      text-xs-center
      xs12
      class="ma-1"
    >
      <v-card>
        <v-container grid-list-xl>
          <h2>Cadastro</h2>
          <v-layout
            wrap
            justify-space-between
          >

            <v-flex
              xs12
              md6
            >
              <v-form ref="form">
                <v-text-field
                  v-model="usuario.nome"
                  :rules="emailRules"
                  label="Nome"
                  required
                >
                </v-text-field>
                <v-text-field
                  v-model="usuario.telefone"
                  :rules="emailRules"
                  label="Telefone"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="usuario.cpf"
                  :rules="emailRules"
                  label="CPF"
                  required
                ></v-text-field>

              </v-form>
            </v-flex>

            <v-flex
              xs12
              md6
            >
              <v-text-field
                v-model="usuario.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                class="input-group--focused"
                :type="show ? 'text' : 'password'"
                v-model="usuario.senha"
                :rules="senhaRules"
                label="Senha"
                required
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                class="input-group--focused"
                :type="show ? 'text' : 'password'"
                v-model="senhaConfirma"
                :rules="senhaRules"
                label="Digite novamente a senha"
                required
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <h2>Endereço</h2>
          <v-layout wrap>

            <v-flex
              xs12
              md6
            >
              <v-text-field
                v-model="usuario.endereco.rua"
                label="Rua"
              ></v-text-field>

              <v-text-field
                v-model="usuario.endereco.cidade"
                label="Cidade"
              ></v-text-field>

            </v-flex>
            <v-flex
              xs12
              md2
            >
              <v-text-field
                v-model="usuario.endereco.numero"
                label="N°"
              ></v-text-field>

              <v-text-field
                v-model="usuario.endereco.estado"
                label="Estado"
              ></v-text-field>
            </v-flex>
            <v-flex
              xs12
              md4
            >
              <v-text-field
                v-model="usuario.endereco.bairro"
                label="Bairro"
              ></v-text-field>
              <v-text-field
                v-model="usuario.endereco.cep"
                label="CEP"
              ></v-text-field>
            </v-flex>

            <v-layout
              wrap
              justify-center
            >

              <v-flex
                xs12
                md4
              >

                <v-btn
                  color="success"
                  outline
                  block
                >
                  Cadastrar
                </v-btn>

              </v-flex>
              <v-flex
                xs12
                md4
              >

                <v-btn
                  color="indigo"
                  class="mb-5  mr-5"
                  outline
                  mr
                  block
                  @click="$router.push('login')"
                >
                  <v-icon>arrow_back</v-icon> Retornar ao login
                </v-btn>

              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>

  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    show: false,

    usuario: {
      nome: '',
      telefone: '',
      cpf: '',
      email: '',
      senha: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      },
      

    },

    senhaConfirma: '',


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
