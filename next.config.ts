import type { NextConfig } from 'next'

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
let veliteBuild: Promise<unknown> | undefined

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  veliteBuild = import('velite').then(m => m.build({ watch: isDev, clean: !isDev }))
}

const nextConfig: NextConfig = {
  /* config options here */
}

export default async function getNextConfig(): Promise<NextConfig> {
  // Generate the content exports before Next.js starts compiling pages.
  await veliteBuild
  return nextConfig
}
