# OrderSystem 餐饮行业点菜/预订管理系统
## 项目背景
项目正式版已经运行超过1年，目前开源版本为技术改造版；    
## 功能介绍
1.用户通过微信小程序进行点菜然后通过选择时间、选择包房进行预定；  
2.管理后台主要功能是点菜、维护菜品、分类、方案、预定时间设定、预定通知、优惠券设置等；  
## 🔥主要使用的技术栈  
### 移动端后台管理系统: 
- vue
- vue-router
- vuex
- axios
- vant
- ···  
### 接口提供，接口权限校验: 
- koa2
- jwt
- oss
- sequelize
- ···  
### 数据库
- mysql  
### 用户端
- 微信小程序  
### 目录
#### 管理后台
>./src
#### 接口服务
>./service
>./service/config/db.js     数据库连接相关配置   
>./service/config/oss.js    阿里云OSS对象服务配置  
>./service/app.js           Koa2全局配置  
>./service/db/              数据库SQL文件




#### 管理后台
- 登录/注销
- 菜品管理
- 分类管理
- 点菜功能
#### 用户前台

#### 接口列表
...
--- 


## 快速开始 
### 管理后台
### 安装
```
npm install
```

### 运行
```
npm run serve
```

### 编译
```
npm run build
```

### 语法检测
```
npm run lint
```

### 接口服务
### 安装
```
npm install
```
### 运行
```
npm start
```
  
>💡 目前仅开源部分管理后台整理过的功能，陆续整理完善功能，Github发布的版本均可以正常运行，完成的功能也存在注释不完整的情况请谅解正在努力完善中...   
> 🚀问题及建议欢迎投稿 lzread@163.com



## 浏览器支持

>现代浏览器以及 Android 4.0+, iOS 8.0+.  

---
## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。