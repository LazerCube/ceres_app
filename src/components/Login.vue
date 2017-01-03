<template>
    <div class="col-sm-6 col-sm-offset-3">
      <div class="card card-container">
        <form class="form-login">
          <h3 class="form-signin-heading">Welcome Back!</h3>
          <!-- <hr class="colorgraph"> -->
          <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              v-model="credentials.username"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="credentials.password"
            >
          </div>
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-lg btn-primary btn-block btn-signin"
              @click="submit()">Sign in</button>
            </div>
        </form>
        <a href="#" class="forgot-password">
          <small>Forgot your password?</small>
        </a>
        <router-link to="/sign-up"><small>Register</small></router-link>
      </div>
    </div>
  </template>

<script>
import auth from '../auth'

export default {
  name: 'login',
  data () {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit () {
      var credentials = {
        grant_type: 'password',
        username: this.credentials.username,
        password: this.credentials.password,
        client_id: 'AAABBBCCC'
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(this, credentials, 'home')
    }
  }
}
</script>

<style>
.card-container.card {
  max-width: 450px;
  padding: 40px 40px;
}

.card {
  background-color: #F7F7F7;
  /* just in case there no content*/
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}

.form-signin-heading {
    text-align: center;
    margin-bottom: 30px;
    font-weight: 500;
}

.btn.btn-signin {
    padding: 0px;
    font-size: 14px;
    height: 36px;
}

/*.colorgraph {
    height: 7px;
    border-top: 0;
    background: #c4e17f;
    border-radius: 5px;
    background-image: -webkit-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
    background-image: -moz-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
    background-image: -o-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
    background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}*/
</style>
