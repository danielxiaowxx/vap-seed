<template>
    <div class="app">
        <hello></hello>
        <!-- Don't touch me -->

        <!--ajax request loading-->
        <img class="loading" v-show="isLoading" src="../assets/images/loading.gif">
    </div>
</template>

<script>
    import Vue from 'vue';
    import Hello from './hello/index.vue'
    // Don't touch me - import

    export default {
        ready() {

            Vue.http.options.timeout = 3 * 1000; // 设置超时时间，单位ms

            // 拦截请求
            Vue.http.interceptors.push((request, next) => {
                this.$data.isLoading = true;

                next(response => {
                    this.$data.isLoading = false;
  
                    if (!response.ok) {
                        if (response.status === 401) { // 未登录                           
                            alert('未登录');
                        } else if (!request.preventDefaultErrorHandler) { // 默认的异常处理，可通过在请求时传入options{preventDefaultErrorHandler: true}来取消该行为
                            alert(response.status + '|' + response.statusText + '|' + response.data);
                        }
                    } else {
                        response.body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;    
                    }
                         
                });
            });            
        },
        data() {
            return {
                isLoading: false,
            }           
        },
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
        .loading {
            position:absolute; 
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
</style>