<template>
    <div>
        <h1>Messages</h1>
        <div style="width: 50%; float:left">
            <h2>Chats</h2>
            <div v-for="(item, key) in users" :key="key">
                <hr>
                <a :href="'/messages/' + item">Chat with {{key}}</a>
                <hr>
            </div>
        </div>
        <div style="width: 50%; float:right">
            <h2>Last Messages</h2>
            <template v-if="messages !== 'Loading events...'">
                <MessageCard v-for="message in messages.slice(0, 5)" :key="message" :message="message"/>
            </template>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import MessageCard from '../components/MessageCard'
    // import UserChatCard from '../components/UserChatCard'

    export default {
        components: {MessageCard},
        data() {
            return {
                messages: ['Loading messages...'],
                users: {},
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('https://mukatova-social-network-django.herokuapp.com/api/chat/', {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => {
                    this.messages = response['data']
                    let users = {}
                    for (const message of this.messages) {
                        users[message.sender_] = message.sender
                        users[message.recipient_] = message.recipient
                    }
                    this.users = users

                });

        },
        methods: {
            checkMessages() {
                this.messages = setInterval(() => {
                    var token = localStorage.getItem('user')
                    axios
                        .get('https://mukatova-social-network-django.herokuapp.com/api/chat/', {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                        .then(response => {
                            if (!(JSON.stringify(this.messages) === JSON.stringify(response['data']))){
                                this.messages = response['data']
                            }
                        });

                }, 500)
            },

        },

        beforeDestroy() {
            clearInterval(this.messages)
        },
        created() {
            this.checkMessages()
        }

    }
</script>
