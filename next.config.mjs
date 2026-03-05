/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ndlsearch.ndl.go.jp',
            },
            {
                protocol: 'https',
                hostname: 'cover.openbd.jp',
            }
        ],
    },
};

export default nextConfig;
