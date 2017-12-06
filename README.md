# Web__Blog

## 作者
>顺序无区别


| 姓名        | email           | 
| ----------	 |:-------------:|
|张烙铭		|1479844945@qq.com|
|李阳|530781348@qq.com|
|高浩然 负责人|593700742@qq.com|


## 没时间配置可以访问 ** http://test.damiangao.cn ** 来预览

## 配置说明

### 环境配置

#### 安装node.js
- [下载地址](https://nodejs.org/en/)
- 默认安装即可
- 打开CMD输入`node`若报错则说明没有配置环境变量
- 右键计算机属性
- 选择高级系统设置
- 添加一个用户变量
- 变量名`NODE_PATH` 路径输入node.js安装目录+'node_moules/npm/bin'
- 再次验证即可

#### Windows安装MongoDB
>其他系统安装[参考](http://www.runoob.com/mongodb/mongodb-tutorial.html)  

- [下载地址](https://www.mongodb.com/download-center#community) 下载Community Server
- 安装到D盘
- 在D盘**根目录**下新建data文件夹
- 在data文件夹下新建db文件夹
- 打开CMD进入mongo安装目录的bin目录下
- 输入`./mongod --dbpath D:/data/bin`回车执行 **不要关闭此CMD窗口**
- 进入mongo安装目录的bin目录下打开mongo.exe文件即可


### 运行
- 打开CMD进入软件根目录(codeBlog目录下)
- 输入 `npm install` 回车运行
- 输入 `npm install bower -g` 回车运行
- 输入 `bower install` 回车运行
- 输入 `npm start` 回车开始程序

### 预览
- 打开浏览器输入`localhost：3000`回车即可(建议只用Chrome浏览器或火狐浏览器)



# 任务进度

## 11.17
完成了登录注册

todo:移植评论部分功能以及加入管理员相关页面，查询所有用户

## 11.18

文章页：完成md渲染，代码块高亮
      todo:1、代码背景色，部分显示调整
          2、文章页整合
编辑页：完成编辑器所有功能
      todo:1、文章保存
          2、草稿箱
          3、文章修改
          4、md教程（类似csdn）


## 11.22
 完成编辑页，文章详情页，叠楼评论，加载动画

 todo:<br>
 -调整路由跳转，串联功能<br>
 -首页最新最热以及分页<br>
 -访客统计，分类，搜索<br>
 -操作提示

## 11.29
 -编辑页面全屏修复
 -文章页代码块完成

 todo：
 -搜索功能


