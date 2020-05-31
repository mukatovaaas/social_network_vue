<template>
    <div>
        <h1>User Chat</h1>
        <h2>Chat with {{this.user.username}}</h2>
        <form v-on:submit="send_message">
            <textarea v-model="sending_message"></textarea>
            <button type="submit" name="button">
                Send
            </button>
        </form>
        <template v-if="user">
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
                recipient_id: this.$route.params.id,
                sending_message: '',
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('http://mukatova-social-network-django.herokuapp.com/api/users/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.user = response['data']));
        },
        methods: {
            send_message: function (event) {
                event.preventDefault();
                let token = localStorage.getItem('user');
                axios.defaults.headers.common['Authorization'] = `JWT ${token.substring(1, token.length - 1)}`;
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                axios
                    .post('https://mukatova-social-network-django.herokuapp.com/api/chat/', {
                        message: this.sending_message,
                        recipient: this.$route.params.id,
                    })
                    .then(response => (
                        this.response = response['data']
                    ))

            },
            checkMessages() {
                this.messages = setInterval(() => {
                    var token = localStorage.getItem('user')
                    axios
                        .get('http://mukatova-social-network-django.herokuapp.com/api/chat/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                        .then(response => {
                            if (!(JSON.stringify(this.messages) === JSON.stringify(response['data']))) {
                                this.messages = response['data']
                            }
                        });
                }, 500)
            }
        },
        beforeDestroy() {
            clearInterval(this.messages)
        },
        created() {
            this.checkMessages()
        }
    }
</script>
