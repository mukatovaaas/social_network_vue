<template>
    <form v-on:submit="send_message">
        <textarea v-model="sending_message"></textarea>
        <button type="submit" name="button">
            Send
        </button>
    </form>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'LoginUser',
        props: {
            user: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                recipient_id: this.$route.params.id,
                sending_message: '',
            }
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

        }
    }
</script>
