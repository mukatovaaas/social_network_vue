<template>
    <div>
        <h1>User {{user.username}}</h1>
        <hr>
        {{response}}
        <p v-if="user.is_following">
            <template>
                <form v-on:submit="unfollow" action="#" method="post">
                    <button type="submit">Unfollow</button>
                </form>
            </template>
        </p>
        <p v-else>
            <template>
                <form v-on:submit="follow" action="#" method="post">
                    <button type="submit">Follow</button>
                </form>
            </template>
        </p>
        <hr>
        <template v-if="posts !== 'Loading events...'">
            <EventCard v-for="post in posts" :key="post.id" :post="post"/>
        </template>

    </div>
</template>

<script>
    import axios from 'axios'
    import EventCard from '../components/EventCard'

    export default {
        components: {EventCard},
        data() {
            return {
                posts: 'Loading posts...',
                user: '##',
                response: '',
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('https://mukatova-social-network-django.herokuapp.com/api/posts/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.posts = response['data']));

            axios
                .get('http://mukatova-social-network-django.herokuapp.com/api/users/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.user = response['data']));
        },
        methods: {
            unfollow: function (event) {
                event.preventDefault();
                var token = localStorage.getItem('user');
                axios.defaults.headers.common['Authorization'] = `JWT ${token.substring(1, token.length - 1)}`;
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                axios
                    .post('https://mukatova-social-network-django.herokuapp.com/api/unfollow/', {
                        following: this.user.id
                    })
                    .then(response => (
                        this.response = response['data']
                    ))
            },
            follow: function (event) {
                event.preventDefault();
                var token = localStorage.getItem('user');
                axios.defaults.headers.common['Authorization'] = `JWT ${token.substring(1, token.length - 1)}`;
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                axios
                    .post('https://mukatova-social-network-django.herokuapp.com/api/follow/', {
                        following: this.user.id
                    })
                    .then(response => (
                        this.response = response['data']
                    ))
            }
        }

    }
</script>
