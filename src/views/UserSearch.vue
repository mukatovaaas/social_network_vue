<template>
    <div>
        <h1>User Search</h1>
        <form v-on:submit="search_user">
            <input type="text" v-model="search">
            <input type="submit" value="Search">
        </form>
        <template v-if="users">
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
            return {
                users: [],
                search:'',
            }
        },
        methods:{
            search_user(event){
                event.preventDefault()
                var token = localStorage.getItem('user')
                axios
                    .get('http://mukatova-social-network-django.herokuapp.com/api/search/?search='+this.search, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                    .then(response => (this.users = response['data']));
            }
        }
    }
</script>
