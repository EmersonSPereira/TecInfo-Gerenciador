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
                    mask="(##) # ####-####"
                  ></v-text-field>
                  <v-text-field
                    v-model="usuario.cpf"
                    label="CPF"
                    mask="###.###.###-##"
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-form ref="form">

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
                </v-form>
              </v-flex>
            </v-layout>
            <v-form ref="form">

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
                    mask="#####-###"
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
                      @click="cadastrar()"
                    >
                      Cadastrar
                    </v-btn>

                  </v-flex>

                </v-layout>

              </v-layout>
            </v-form>
          </v-container>
        </v-card>

      </v-flex>

    </v-layout>

  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs, email } from 'vuelidate/lib/validators'
import firebase from 'firebase'

export default {
  mixins: [validationMixin],

  validations: {

    senhaConfirma: {
      sameAsPassword: sameAs('usuario.senha'),
      required

    },
    usuario: {
      nome: { required, maxLength: maxLength(60) },
      email: { required, email },
      senha: { required, minLength: minLength(8) },
      telefone: { required, minLength: maxLength(11) },
      cpf: { required, maxLength: maxLength(11) },
      endereco: {
        rua: { required, maxLength: maxLength(200) },
        numero: { required, maxLength: maxLength(10) },
        bairro: { required, maxLength: maxLength(40) },
        cidade: { required, maxLength: maxLength(40) },
        Estado: { required, maxLength: maxLength(40) },
        cep: { required, maxLength: maxLength(8) },

      }


    },

  },
  data: () => ({
    valid: true,
    show: false,
    senhaConfirma: null,

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
      !this.$v.usuario.senha.required && errors.push('A senha é obrigatória')
      return errors
    },

    senhaConfirmaErrors () {
      const errors = []
      if (this.usuario.senha != this.senhaConfirma && this.senhaConfirma != null) {
        !this.$v.senhaConfirma.sameAsPassword && errors.push('As senhas não Correspondem')
        return errors      }

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
    },

    cadastrar () {

      if (this.$v.usuario.$invalid) {
        firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(
          // eslint-disable-next-line no-unused-vars
          (user) => {
            alert('sua conta foi criada com sucesso, você sera redirecionado para aplicação')
            this.$router.replace('home')
          },
          function (err) {
            alert('Oops.' + err.message)

          }
        )
      }
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
