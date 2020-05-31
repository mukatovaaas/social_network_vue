<template>
    <div class="event-card">
        <span>{{ post.created_at }}</span>
        <h4>{{ post.content }}</h4>

        <form v-if="!post.is_liked" v-on:submit="like">
            <input type="hidden" v-model="post.id">
            <button type="submit" name="button">
                Like
            </button>
        </form>
        <p v-else>Liked</p>
        <p>{{post.likes}} likes</p>
        <a :href="'/comments/' + post.id">Show comments</a>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'EventCard',
        props: {
            post: {
                type: Object,
                default: () => ({})
            }
        },
        methods: {
            like (event) {
                event.preventDefault();
                let token = localStorage.getItem('user');
                axios.defaults.headers.common['Authorization'] = `JWT ${token.substring(1, token.length - 1)}`;
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                axios
                    .post('https://mukatova-social-network-django.herokuapp.com/api/like/', {
                        post: this.post.id,
                    })
                    .then(response => (
                        this.response = response['data']
                    ))
            },

        }
    }
</script>

<style scoped>
    .event-card {
        width: 13em;
        margin: 1em auto 1em auto;
        padding: 1em;
        border: solid 1px #2c3e50;
        cursor: pointer;
        transition: all 0.2s linear;
    }

    .event-card:hover {
        transform: scale(1.01);
        box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }

    .event-card h4 {
        font-size: 1.4em;
        margin-top: 0.5em;
        margin-bottom: 0.3em;
    }
</style>
