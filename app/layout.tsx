import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from '@/lib/siteConfig';
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Manikanta Kumar Redrouthu | Lead Full Stack Developer',
    template: '%s | Manikanta Kumar Redrouthu',
  },
  description:
    'Advanced Lead Full Stack Developer with 8+ years building scalable, client-focused enterprise applications using Angular, .NET Core, TypeScript, Node.js, and Azure cloud integrations.',
  keywords: [
    'Manikanta Kumar Redrouthu',
    'Lead Full Stack Developer',
    'Angular Architect',
    'Software Engineer',
    '.NET Core Developer',
    'Angular Developer',
    'TypeScript',
    'Node.js',
    'Azure',
    'Enterprise Applications',
    'Portfolio',
    'India',
  ],
  authors: [{ name: 'Manikanta Kumar Redrouthu', url: SITE_URL }],
  creator: 'Manikanta Kumar Redrouthu',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Manikanta Kumar Redrouthu',
    title: 'Manikanta Kumar Redrouthu | Lead Full Stack Developer',
    description:
      'Advanced Lead Full Stack Developer with 8+ years building scalable enterprise applications using Angular, .NET Core, and Azure. Open to remote opportunities worldwide.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Manikanta Kumar Redrouthu | Lead Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manikanta Kumar Redrouthu | Lead Full Stack Developer',
    description:
      'Advanced Lead Full Stack Developer with 8+ years building scalable enterprise applications using Angular, .NET Core, and Azure.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body suppressHydrationWarning className={`${poppins.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Manikanta Kumar Redrouthu',
              url: SITE_URL,
              email: 'manikanta.redrouthu47@gmail.com',
              jobTitle: 'Advanced Lead Full Stack Developer',
              sameAs: [
                'https://github.com/Mkkumar47',
                'https://www.linkedin.com/in/manikanta-kumar-redrouthu-98b51b1a0',
              ],
            }),
          }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
