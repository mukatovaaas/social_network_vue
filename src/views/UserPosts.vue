<template>
    <div>
        <h1>User {{user.username}}</h1>
        <hr>
        <p v-if="user.is_following">
            <a :href="'/unfollow/'+user.id">unfollow</a>
        </p>
        <p v-else>
            <a :href="'/follow/'+user.id">Follow</a>
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
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            // const header = `Authorization: JWT ${token.substring(1, token.length - 1)}`;
            axios
                .get('https://mukatova-social-network-django.herokuapp.com/api/posts/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.posts = response['data']));

            axios
                .get('http://mukatova-social-network-django.herokuapp.com/api/users/' + this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.user = response['data']));
        }
    }
</script>
