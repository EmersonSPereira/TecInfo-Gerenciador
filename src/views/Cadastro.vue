<template class="background">
  <v-container
    fluid
    grid-list-md
    text-xs-center
    class="background "
  >

    <v-layout
      wrap
      justify-center
    >
      <v-flex
        xs12
        md6
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
                    :error-messages="nameErrors"
                    :counter="100"
                    label="Nome"
                    required
                    @input="$v.usuario.nome.$touch()"
                    @blur="$v.usuario.nome.$touch()"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="usuario.telefone"
                    label="Telefone"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="usuario.cpf"
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
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.usuario.email.$touch()"
                  @blur="$v.usuario.email.$touch()"
                ></v-text-field>
                <v-text-field
                  class="input-group--focused"
                  :type="show ? 'text' : 'password'"
                  v-model="usuario.senha"
                  label="Senha"
                  required
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  @click:append="show = !show"
                  @input="$v.usuario.senha.$touch()"
                  @blur="$v.usuario.senha.$touch()"
                  :error-messages="senhaErrors"
                >
                  ></v-text-field>
                <v-text-field
                  class="input-group--focused"
                  :type="show ? 'text' : 'password'"
                  v-model="senhaConfirma"
                  label="Digite novamente a senha"
                  required
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  @click:append="show = !show"
                  @input="$v.senhaConfirma.$touch()"
                  @blur="$v.senhaConfirma.$touch()"
                  :error-messages="senhaConfirmaErrors"
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

              </v-layout>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    usuario: {
      nome: { required, maxLength: maxLength(100) },
      email: { required, email },
      senha: { required, minLength: minLength(8) }

    },
    senhaConfirma: {
      sameAsPassword: sameAs('usuario.senha')
    }
  },
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
  }),

  computed: {


    nameErrors () {
      const errors = []
      if (!this.$v.usuario.nome.$dirty) return errors
      !this.$v.usuario.nome.maxLength && errors.push('Seu não nome pode ter mais que 100 caracteres, por favor abrevie')
      !this.$v.usuario.nome.required && errors.push('O nome é obrigatório')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.usuario.email.$dirty) return errors
      !this.$v.usuario.email.email && errors.push('Hum...Isto não me parece um email valido')
      !this.$v.usuario.email.required && errors.push('O E-mail é obrigatório')
      return errors
    },
    senhaErrors () {
      const errors = []
      if (!this.$v.usuario.senha.$dirty) return errors
      !this.$v.usuario.senha.minLength && errors.push('Sua senha parece ser muito pequena, ela deve ter pelo menos 8 caracteres')
      !this.$v.usuario.senha.required && errors.push('O E-mail é obrigatório')
      return errors
    },

    senhaConfirmaErrors () {
      const errors = []
      if (!this.$v.senhaConfirma.$dirty) return errors
      !this.$v.senhaConfirma.sameAsPassword && errors.push('As senhas digitadas não são iguais')
      !this.$v.senhaConfirma.required && errors.push('O E-mail é obrigatório')
      return errors
    }
  },

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
