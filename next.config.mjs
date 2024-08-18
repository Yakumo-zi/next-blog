/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG:true,
        remotePatterns:[
            {
                protocol:"https",
                hostname:"github-readme-stats-iota-sandy-24.vercel.app",
                port:'',
                pathname:"/**"
            },
            {
                protocol:"https",
                hostname:"avatars.githubusercontent.com",
                port:'',
                pathname:"/**"
            }
        ]
    }
};

export default nextConfig;
