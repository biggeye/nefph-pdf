/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    eslint: {
        // Specify directories to lint
        dirs: ['app', 'components', 'data', 'lib', 'utils'],

        // Fail the build if there are lint errors
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
