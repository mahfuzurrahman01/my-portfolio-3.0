import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, siteDescription, nameParts } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = siteConfig.url;
const AUTHOR = siteConfig.name;
const ROLE = siteConfig.role;
const OG_IMAGE = siteConfig.avatar;
const DESCRIPTION = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.handle} · ${AUTHOR} — ${siteConfig.ogRole}`,
    template: `%s · ${siteConfig.handle}`,
  },
  description: DESCRIPTION,
  applicationName: `${AUTHOR} Portfolio`,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: `${AUTHOR} — ${siteConfig.ogRole}`,
    description: DESCRIPTION,
    siteName: `${AUTHOR} Portfolio`,
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    username: siteConfig.socials.github.split("/").pop(),
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR} — ${siteConfig.ogRole}`,
    description: DESCRIPTION,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  alternateName: [...siteConfig.altNames],
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: ROLE,
  description: DESCRIPTION,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.country,
  },
  worksFor: {
    "@type": "Organization",
    name: siteConfig.currentEmployer,
  },
  knowsAbout: [...siteConfig.knowsAbout],
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.linkedin,
    siteConfig.socials.x,
    siteConfig.socials.devto,
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${AUTHOR} — Portfolio`,
  url: SITE_URL,
  author: { "@type": "Person", name: AUTHOR },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){localStorage.setItem('theme','dark');t='dark';}if(t==='dark')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
