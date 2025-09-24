import { NEXT_PUBLIC_API_BASEURL } from '@/utils/environment';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASEURL,
  },
};

export default nextConfig;
