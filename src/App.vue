<template>
  <div id="wrapper" v-bind:class="{ background: !user.authenticated }">
    <navbar v-if="user.authenticated" type="default" placement="top">
      <a slot="brand" href="/" title="Home" class="navbar-brand">
        <span class="glyphicon glyphicon-comment" aria-hidden="true"></span>
        Ceres
      </a>
      <li><router-link to="/home">Home</router-link></li>
      <li slot="right"><a @click="logout()">Logout</a></li>
    </navbar>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import auth from './auth'
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      user: auth.user
    }
  },
  methods: {
    logout () {
      auth.logout(this, 'login')
    }
  }
}
</script>

<style>
.background {
  padding-top: 0px!important;
  background: #4CA1AF; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #4CA1AF , #C4E0E5); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #4CA1AF , #C4E0E5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#wrapper {
  height:100vh;
  padding-top: 50px;
}
</style>

<style scoped>
  .navbar-brand > span {
    font-size: 1.4rem;
  }
</style>
