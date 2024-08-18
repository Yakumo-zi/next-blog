/** @type {import('next').NextConfig} */
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
