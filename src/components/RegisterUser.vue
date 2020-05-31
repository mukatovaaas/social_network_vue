<template>
    <div>
        <form @submit.prevent="register">
            <label for="username">
                Name:
            </label>
            <input v-model="username" type="text" name="username" value>
            <label for="email">
                Email:
            </label>
            <input v-model="email" type="email" name="email" value>

            <label for="password">
                Password:
            </label>
            <input v-model="password" type="password" name="password" value>
            <p v-if="status === 400">
                Please enter different info.
            </p>
            <ul>
                <li v-for="(item, key) in response" :key="key">
                    <p>{{ key }}</p>
                    <ul>
                        <li v-for="message in item" :key="message">
                            <p>{{ message }}</p>
                        </li>
                    </ul>
                </li>
            </ul>
            <button type="submit" name="button">
                Register
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'RegisterUser',
        data() {
            return {
                username: '',
                email: '',
                password: '',
                status: null,
                response: '',
            }
        },
        methods: {
            register() {
                this.$store
                    .dispatch('register', {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    .then(() => {
                        this.$router.push({name: 'dashboard'})
                    })
                    .catch(err => {
                        this.status = err.response.status
                        this.response = err.response.data
                    })
            }
        }
    }
</script>
