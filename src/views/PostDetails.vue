<template>
    <div>
        <h1>Post comments</h1>
        <hr>
        <form v-on:submit="post">
            <textarea v-model="content"></textarea>
            <button type="submit" name="button">
                Send
            </button>
        </form>
        <template v-if="comments !== 'Loading comments...'">
            <CommentCard v-for="comment in comments" :key="comment" :comment="comment"/>
        </template>

    </div>
</template>

<script>
    import axios from 'axios'
    import CommentCard from '../components/CommentCard'

    export default {
        components: {CommentCard},
        data() {
            return {
                comments: 'Loading posts...',
                user: '##',
                response: '',
                content:'',
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('https://mukatova-social-network-django.herokuapp.com/api/comments/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.comments = response['data']));
        },
        methods: {
            post(event) {
                event.preventDefault();
                let token = localStorage.getItem('user');
                axios.defaults.headers.common['Authorization'] = `JWT ${token.substring(1, token.length - 1)}`;
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                axios
                    .post('https://mukatova-social-network-django.herokuapp.com/api/comments/' + this.$route.params.id, {
                        post: this.$route.params.id,
                        content: this.content,
                    })
                    .then(response => (
                        this.response = response['data']
                    ))


            }
        }

    }
</script>
