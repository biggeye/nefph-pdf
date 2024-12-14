/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        // Specify directories to lint
        dirs: ['pages', 'components', 'lib', 'utils', 'app'],

        // Fail the build if there are lint errors
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
