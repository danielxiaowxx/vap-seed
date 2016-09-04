<template>
    <div class="app">
        <hello></hello>
    </div>
</template>

<script>
    import Hello from './hello/index.vue'

    export default {
        components: {
            Hello,
        }
    }
</script>

<style lang="sass">
    @import "../assets/styles/reset.css";
    .app {
    }
</style>