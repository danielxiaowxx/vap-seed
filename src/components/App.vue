<template>
    <div class="app" :class="{'horizontal-screen': isScreenHorizontal}">
        <hello></hello>
        <!-- Don't touch me -->

        <!--ajax request loading-->
        <img class="loading" v-show="isLoading" src="../assets/images/loading.gif">

        <!--横屏提示-->
        <div class="screen-horizontal-tip">
          <div class="mask"></div>
          <div class="tip">为了更好的体验, 请竖屏浏览</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Hello from './hello/index.vue'
    // Don't touch me - import

    var mo = function(e){e.preventDefault();};

    export default {
        ready() {

            // 横屏提示
            window.addEventListener("orientationchange", function() {
              console.log(window.orientation);
              if (window.orientation === 90 || window.orientation === -90) { // 横屏
                this.$data.isScreenHorizontal = true;
              } else {
                this.$data.isScreenHorizontal = false;
              }
            }.bind(this));

            Vue.http.options.timeout = 3 * 1000; // 设置超时时间，单位ms

            // 拦截请求
            Vue.http.interceptors.push((request, next) => {

                if (!request.noLoadingTip) {
                  this.$data.isLoading = true;
                }

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
                isScreenHorizontal: false
            }
        },
        watch: {
          isScreenHorizontal(val) {
            if (val) {
              document.addEventListener("touchmove", mo, false); //禁止页面滑动
            } else {
              document.removeEventListener("touchmove", mo); //禁止页面滑动
            }
          }
        },
        components: {
            Hello,
            // Don't touch me - component
        }
    }


</script>

<style lang="sass">
    @import "../common/style/utils.scss";
    @import "../common/style/normalize.scss";

    /* reset */
    body {
        font-family: Arial, '微软雅黑', "microsoft yahei", Verdana, Helvetica, sans-serif;
        font-size: rem(18px);
        background: #251e26;
    }

    .app {
        &.horizontal-screen {
          .screen-horizontal-tip {
            display: block;
          }
        }
        .screen-horizontal-tip {
          display: none;
          position: fixed;
          width: 100%;
          top:0;
          bottom: 0;
          z-index: 1500;
          .mask {
            position: absolute;
            width: 100%;
            top:0;
            bottom: 0;
            background-color: #000000;
            opacity: 0.8;
          }
          .tip {
            text-align: center;
            width: 100%;
            position: absolute;
            top: 50%;
            margin-top: rem(-32px);
            font-size: rem(32px);
            color: #ffffff;
          }
        }
        .loading {
          position:fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          z-index: 1200;
        }
    }
</style>
