<template>
  <form @submit.prevent="login">
    <label for="username">
      Username:
    </label>
    <input v-model="username" type="username" name="username" value>
    <label for="password">
      Password:
    </label>
    <input v-model="password" type="password" name value>
    <p v-if="status === 400">
      Invalid login info.
    </p>
    <button type="submit" name="button">
      Login
    </button>
  </form>
</template>

<script>
export default {
  name: 'LoginUser',
  data () {
    return {
      username: '',
      password: '',
      status: null
    }
  },
  methods: {
    login () {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(() => { this.$router.push({ name: 'dashboard' }) })
        .catch(err => { this.status = err.response.status })
    }
  }
}
</script>
