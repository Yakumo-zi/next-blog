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
