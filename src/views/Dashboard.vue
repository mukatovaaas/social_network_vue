<template>
    <div>
        <h1>Dashboard</h1>
        <hr>
        <p>{{log}}</p>
        <form v-on:submit="sub" action="#" method="post">
            <textarea v-model="content" placeholder="content"></textarea>
            <button type="submit">Post</button>
        </form>
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
                posts: [],
                content: "",
                current: '',
                log: '',
            }
        },
        mounted() {
            var token = localStorage.getItem('user')
            axios
                .get('https://mukatova-social-network-django.herokuapp.com/api/posts/', {headers: {'Authorization': `JWT ${token.substring(1, token.length - 1)}`}})
                .then(response => (this.posts = response['data']));
        },
        methods: {

            sub: function (event) {
                event.preventDefault();
                if (this.content === "") {

                    this.log = "Empty post!!";
                } else {
                    var token = localStorage.getItem('user');
                    axios.defaults.headers.common['Authorization'] = `JWT ${token.substring(1, token.length - 1)}`;
                    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                    axios
                        .post('https://mukatova-social-network-django.herokuapp.com/api/post/', {
                            content: this.content
                        })
                        .then(response => (this.current = response['data']))
                    this.log = "Posted";
                }
            }
        }
    }
</script>
