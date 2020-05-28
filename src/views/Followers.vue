<template>
    <div>
        <h1>Followers</h1>
        <template v-if="users !== 'Loading events...'">
            <UserCard v-for="user in users" :key="user.id" :user="user"/>
        </template>
    </div>
</template>

<script>
    import axios from 'axios'
    import UserCard from '../components/UserCard'

    export default {
        components: {UserCard},
        data() {
            return {users: 'Loading users...'}
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('http://localhost:8000/api/followers/', {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.users = response['data']));
        }
    }
</script>
