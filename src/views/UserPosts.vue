<template>
    <div>
        <h1>User {{$route.params.id}}</h1>
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
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            // const header = `Authorization: JWT ${token.substring(1, token.length - 1)}`;
            axios
                .get('http://localhost:8000/api/posts/'+this.$route.params.id, {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.posts = response['data']));
        }
    }
</script>
