<template>
    <div class="event-card">
        <p>{{message.sender_}}: {{message.message}}</p>
        <small>{{message.created_at}}</small>
    </div>
</template>

<script>
    export default {
        name: 'UserChatCard',
        props: {
            message: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>

<style scoped>
    .event-card {
        width: 40em;
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
