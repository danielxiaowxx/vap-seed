
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
yo vap:add-comp [component-name]
```


## 如何发布

```
npm run release
```


## 开发人员的工作流程

1. 编写component

2. 修改App.vue，把component显示在页面正确的位置

3. 如需调用远程API，可在`mock/data.js`中增加相应的API路径和模拟数据


## 如何处理图标

把需要合成雪碧图（Sprite）的图标都统一放在`src/assets/images/sprite-icons`目录，写样式的时候直接引用该目录的图标即可，发布期间会自动合成雪碧图


## 注意事项

1. 开发过程中chrome要开启no cache模式

2. 图片的修改采用更换名字的策略

3. 引入第三方组件或工具库时，需要声明在`webpack.config.dev.js`的`entry.vendor`数组里

## TODO

~~1. 编译的时候把VUE库独立出来，不要编译进bundle.js里面~~

2.VUE框架缓存

3.watch，增量build

~~4.mock数据~~

5.hot reload

6.打点日志

7.错误日志

8.font资源文件指纹

9.图片压缩
