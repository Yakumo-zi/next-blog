# Next Blog

这是一个由Next.js与Tailwind Css编写而成的静态博客。

# requirements

+ node.js >=20.11.1

# Installation

```
git clone https://github.com/Yakumo-zi/next-blog
cd next-blog
npm i
npm run dev
```

# Usage

只需要将博客及其相关静态资源放入`public\posts`目录下即可，如果在博客中使用了外链，那么需要在`next.config.mjs`中配置允许外链的域名
```js
const nextConfig = {
    images:{
        dangerouslyAllowSVG:true,
        remotePatterns:[
            {
                protocol:"https",
                hostname:"camo.githubusercontent.com",
                port:'',
                pathname:"/**"
            },
        ]
    }
};

export default nextConfig;
```

## User Infomation Config

配置头像：替换`/public/avatar.jpg`为你自己的头像

配置MostUsedLanguage: 替换`/public/most_used_language.svg`为你自己的，关于如何获取MostUsedLanguage请自行Google。



## Front Matter

需要给每篇博客最前方加上元信息，否则无法解析博客的对应类型与tag还有发布时间，Front Matter格式如下：
```
---
title: 正则表达式
published: 2024-08-23
description: "学习正则表达式匹配规则，以及在Go中使用正则表达式"
tags: [other]
category: "其他"
draft: true
---
```
注意：
+ 当draft的值为`true`时，表示该博客为草稿，不会显示在列表中
+ tags推荐不多于三个

# Deploy

```
git clone https://github.com/Yakumo-zi/next-blog
cd next-blog
npm i
npm run build
npm run start
```
使用Nginx反向代理到localhost:3000端口即可部署完成。

# TODO
 - [ ] 后台管理
 - [ ] 使用docker一键部署
