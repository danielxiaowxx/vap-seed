## 项目描述

这是一个专用于开发H5活动的种子项目 (在实际生成的项目中, 这里的描述修改成你的H5活动的描述)


## 准备工作

- 安装Node，版本>=6

- 安装代码生成器

```
npm i yo -g
npm i generator-vap -g
```


## 如何初始化一个项目

```
yo vap
```


## 如何开发

```
npm run dev
```


## 如何增加一个component

```
yo vap:add-comp
```


## 如何发布

```
npm run release
```

window环境请执行以下
```
npm run release-win
```


## 开发人员的工作流程

1. 编写component

2. 修改App.vue，把component显示在页面正确的位置

3. 如需调用远程API，可在`mock/data.js`中增加相应的API路径和模拟数据


## 如何处理图标

需合成雪碧图(Sprite)的图标, 可在`src/assets/images/sprite-icons`目录建子目录, 然后把图标都放在该子目录下, 写样式的时候直接引用该目录的图标即可，发布期间会自动合成雪碧图


## 注意事项

1. 开发过程中chrome要开启no cache模式

2. 图片的修改采用更换名字的策略

3. 引入第三方组件或工具库时，如果想合并进verdor.js而不是app.js，则需要声明在`webpack.config.dev.js`的`entry.vendor`数组里

4. 使用jsonp时, 最好指定callback函数名为jsonp, 因为在微信中会把callback干掉, 导致结果异常 (Vue.http.get('http://path/to/api', {jsonp: 'jsonp'}))

## 常用工具库

项目使用了lodash这个最受欢迎的工具库，在使用其方法时，请按需依赖，如：

```
import _assign from 'lodash-es/assign';
```

## Q & A

- 如何自定义首屏加载提示动画?

修改`src/index.html`中的动画和样式，找到以下注释，根据实际进行修改

```
<!--resource loading style-->

<!--resources loading animation-->
```

- 如何自定义异步请求中提示动画？

更换`src/assets/images/loading.gif`动画。

默认是居中显示，如果想修改显示的位置，可在该文件`src/components/App.vue`中修改样式

```
.loading {
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
```

- 如何自定义默认的异步请求异常提示？

在`src/components/App.vue`中，在以下地方实现你自己的默认异步请求异常处理行为

```
} else if (!request.preventDefaultErrorHandler) { // 默认的异常处理，可通过在请求时传入options{preventDefaultErrorHandler: true}来取消该行为
    alert(response.status + '|' + response.statusText + '|' + response.data);
}
```

- 在哪里处理未登录的情况？

在`src/components/App.vue`中，把`alert('未登录');`修改成实际的交互

```
if (response.status === 401) { // 未登录
    alert('未登录');
...
```

- 某些请求想自定义自己的异常提示，不想用默认的异步请求提示，怎么办？

在异步请求时增加`options {preventDefaultErrorHandler: true}`，如下：

```
export function getTestMsg() {
  return Vue.http.get('/api/test/getMsg', {preventDefaultErrorHandler: true}).catch(err => {
    console.log('你可以绕过默认异常处理机制，自己爱昨滴昨滴啦')
  });
};
```

- 如何设置请求超时时间？

在`src/components/App.vue`中，更改以下值

```
Vue.http.options.timeout = 3 * 1000; // 设置超时时间，单位ms
```

- 如何将前端异常信息回传回服务器

在`src/index.js`文件的以下位置，把错误信息回传回服务器即可

```
window.onerror = err => {
  ...
}
```

## TODO

- tree-shacking ( 需要升级webpack到2, preset中删除babel-plugin-transform-es2015-modules-commonjs )

- Hot Module Reloading (HMR)


