<template>
    <div class="app">
        <hello></hello>
        <!-- Don't touch me -->
    </div>
</template>

<script>
    import Hello from './hello/index.vue'
    // Don't touch me - import

    export default {
        components: {
            Hello,
            // Don't touch me - component
        }
    }
</script>

<style lang="sass">
    @import "../assets/styles/reset.css";
    .app {
    }
</style>