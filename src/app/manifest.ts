import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vorlagenbude SaaS Suite',
    short_name: 'Vorlagenbude',
    description: 'Dein juristischer Schutzschild gegen Konzerne und Behörden.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1128',
    theme_color: '#FF3366',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
