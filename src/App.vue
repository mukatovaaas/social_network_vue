<template>
    <div id="app">
        <app-nav/>
        <router-view class="page" />
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import AppNav from './components/AppNav'

    export default {
        name: 'App',
        components: {
            // HelloWorld,
            AppNav,
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
