/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // to serve images that are not hosted where the page is hosted configure remote patterns
  images: {
    remotePatterns: [{
      protocol: 'https', // https protocol
      hostname: '*.supabase.co', // any domain with supabase.co
      port: '' // default port
    }]
  }
};

export default nextConfig;
