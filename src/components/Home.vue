<template>
  <div class="">
    <div class="row">
      <div class="col-sm-6">
        <h1>Dashboard</h1>
        <p class="text-muted">Welcome {{ account.username }}</p>
        <hr>
        <ul class='list-unstyled'>
          <li>Name: {{ account.first_name }} {{ account.last_name }}</li>
          <li>Email: {{ account.email }}</li>
          <li>UUID: {{ account.id }}</li>
          <br>
          <small>
            <li>Created at: {{ account.created_at }}</li>
            <li>Updated at: {{ account.updated_at }}</li>
          </small>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown'
import Alert from './Alert'
export default {
  name: 'home',
  components: {
    Dropdown,
    Alert
  },
  data () {
    return {
      account: {
        id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  methods: {
    getUser () {
      this.$http.get('http://localhost:8000/me/').then((response) => {
        this.account.id = response.body.id
        this.account.first_name = response.body.first_name
        this.account.last_name = response.body.last_name
        this.account.username = response.body.username
        this.account.email = response.body.email
        this.account.created_at = response.body.created_at
        this.account.updated_at = response.body.updated_at
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getUser()
    })
  }
}
</script>
