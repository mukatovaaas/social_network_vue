<template>
    <div>
        <h1>User Chat</h1>
        <h2>Chat with {{this.user.username}}</h2>
        <template v-if="users !== 'Loading events...'">
            <UserChatCard v-for="message in messages" :key="message" :message="message"/>
        </template>

    </div>
</template>

<script>
    import axios from 'axios'
    import UserChatCard from '../components/UserChatCard'

    export default {
        components: {UserChatCard},
        data() {
            return {
                user: 'Loading ...',
                messages: [],
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('http://mukatova-social-network-django.herokuapp.com/api/users/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.user = response['data']));
            axios
                .get('http://mukatova-social-network-django.herokuapp.com/api/chat/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.messages = response['data']));
        }
    }
</script>
