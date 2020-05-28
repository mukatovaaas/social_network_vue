<template>
    <div>
        <h1>My followings</h1>
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
                .get('https://mukatova-social-network-django.herokuapp.com/api/following/', {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.users = response['data']));
        }
    }
</script>
