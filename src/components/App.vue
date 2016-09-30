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
    @import "~va-commonstyle/utils.scss";
    @import "~va-commonstyle/normalize.scss";

    /* reset */
    body { 
        font-family: Arial, '微软雅黑', "microsoft yahei", Verdana, Helvetica, sans-serif; 
        font-size: rem(18px);
        background: #251e26;
    }

    .app {
    }
</style>