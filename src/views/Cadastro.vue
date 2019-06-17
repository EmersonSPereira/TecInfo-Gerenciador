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
                    :error-messages="telefoneErrors"
                    @input="$v.usuario.telefone.$touch()"
                    @blur="$v.usuario.telefone.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="usuario.cpf"
                    label="CPF"
                    mask="###.###.###-##"
                    required
                    :error-messages="cpfErrors"
                    @input="$v.usuario.cpf.$touch()"
                    @blur="$v.usuario.cpf.$touch()"
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
                    :error-messages="ruaErrors"
                    @input="$v.usuario.usuario.rua.$touch()"
                    @blur="$v.usuario.usuario.rua.$touch()"
                  ></v-text-field>

                  <v-text-field
                    v-model="usuario.endereco.cidade"
                    label="Cidade"
                    :error-messages="cidadeErrors"
                    @input="$v.usuario.usuario.cidade.$touch()"
                    @blur="$v.usuario.usuario.cidade.$touch()"
                  ></v-text-field>

                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-text-field
                    v-model="usuario.endereco.numero"
                    label="N°"
                    :error-messages="numeroErrors"
                    @input="$v.usuario.usuario.numero.$touch()"
                    @blur="$v.usuario.usuario.numero.$touch()"
                  ></v-text-field>

                  <v-text-field
                    v-model="usuario.endereco.estado"
                    label="Estado"
                    mask="AA"
                    :error-messages="estadoErrors"
                    @input="$v.usuario.usuario.estado.$touch()"
                    @blur="$v.usuario.usuario.estado.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    v-model="usuario.endereco.bairro"
                    label="Bairro"
                    :error-messages="bairroErrors"
                    @input="$v.usuario.usuario.bairro.$touch()"
                    @blur="$v.usuario.usuario.bairro.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="usuario.endereco.cep"
                    label="CEP"
                    mask="#####-###"
                    :error-messages="cepErrors"
                    @input="$v.usuario.usuario.cep.$touch()"
                    @blur="$v.usuario.usuario.cep.$touch()"
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
<!-- Snack bar mostrando notificação -->
<v-snackbar
      v-model="snackbar"
      right="true"
      top= "true"
      color="error"
      vertical = "true"
      timeout="4000"
      
    >
      {{ text }}
      <v-btn
        color="black"
        flat
        @click="snackbar = false"
      >
        fechar
      </v-btn>
    </v-snackbar>
  </v-container>
  
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs, email } from 'vuelidate/lib/validators'
import firebase from 'firebase'

import { db } from '../main'
import Swal from 'sweetalert2'


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
      telefone: { required, minLength: minLength(11) },
      cpf: { required, minLength: minLength(11) },
      endereco: {
        rua: { required, maxLength: maxLength(200) },
        numero: { required, maxLength: maxLength(10) },
        bairro: { required, maxLength: maxLength(40) },
        cidade: { required, maxLength: maxLength(40) },
        estado: { required, maxLength: maxLength(2) },
        cep: { required, maxLength: maxLength(8) },

      }


    },

  },
  data: () => ({
    valid: true,
    show: false,
    senhaConfirma: null,
    snackbar:false,
    text:'',

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

  firebase: {

    usuarios: db

  },

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
    },

    telefoneErrors () {
      const errors = []
      if (!this.$v.usuario.telefone.$dirty) return errors
      !this.$v.usuario.telefone.minLength && errors.push('Seu telefone parece ser muito pequeno')
      !this.$v.usuario.telefone.required && errors.push('O telefone é obrigatória')
      return errors
    },

    cpfErrors () {
      const errors = []
      if (!this.$v.usuario.cpf.$dirty) return errors
      !this.$v.usuario.cpf.minLength && errors.push('Seu CPF parece ser muito pequeno')
      !this.$v.usuario.cpf.required && errors.push('O CPF é obrigatória')
      return errors
    },

    ruaErrors () {
      const errors = []
      if (!this.$v.usuario.endereco.rua.$dirty) return errors
      !this.$v.usuario.endereco.rua.required && errors.push('Rua é obrigatório')
      return errors
    },

    numeroErrors () {
      const errors = []
      if (!this.$v.usuario.endereco.numero.$dirty) return errors
      !this.$v.usuario.endereco.numero.required && errors.push('Número é obrigatório')
      return errors
    },

    bairroErrors () {
      const errors = []
      if (!this.$v.usuario.endereco.bairro.$dirty) return errors
      !this.$v.usuario.endereco.bairro.required && errors.push('Bairro é obrigatório')
      return errors
    },

    cidadeErrors () {
      const errors = []
      if (!this.$v.usuario.endereco.cidade.$dirty) return errors
      !this.$v.usuario.endereco.cidade.required && errors.push('Cidade é obrigatório')
      return errors
    },

    estadoErrors () {
      const errors = []
      if (!this.$v.usuario.endereco.estado.$dirty) return errors
      !this.$v.usuario.endereco.estado.required && errors.push('Estado é obrigatório')
      return errors
    },

    cepErrors () {
      const errors = []
      if (!this.$v.usuario.endereco.cep.$dirty) return errors
      !this.$v.usuario.endereco.cep.required && errors.push('CEP é obrigatório')
      return errors
    },

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

      if (!this.$v.usuario.$invalid) {
        firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(

          () => {
            db.child(firebase.auth().currentUser.uid).set(this.usuario)
            Swal.fire({
              title: 'Cadastrado com Sucesso?',
              text: "Você será redirecionado para Aplicação",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.value) {
                this.$router.replace('home')
              }
            })

          },
        ).catch(err => {
           if(err.code == "auth/email-already-in-use"){
             this.text = "Este email já está sendo usado, por favor tente outro."
             this.snackbar = true
             console.log("entrou aqui")
           }

          })
      } else this.$v.usuario.$touch()
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
