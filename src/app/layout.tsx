import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://mafuzur.com";
const AUTHOR = "Mafuzur Rahman";
const AUTHOR_ALT = "Mahfuzur Rahman";
const ROLE = "Software Developer & Technical Writer";
const OG_IMAGE =
  "https://res.cloudinary.com/dka0q8f82/image/upload/c_fill,g_face,ar_1.91:1,w_1200,q_auto,f_auto/v1778646505/WhatsApp_Image_2026-05-12_at_23.02.53_pvo31f.jpg";

const DESCRIPTION = `${AUTHOR} (also spelled ${AUTHOR_ALT}) — software developer, full-stack engineer and technical writer from Dhaka, Bangladesh with 4+ years shipping AI-powered web and mobile products. Building with React, Next.js, TypeScript, Node.js, React Native, and Gemini/OpenAI agentic workflows across healthcare, ERP, and SaaS. Portfolio, projects, blog, and contact.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `swe-mafuz · ${AUTHOR} — Software Developer & AI Builder`,
    template: `%s · swe-mafuz`,
  },
  description: DESCRIPTION,
  applicationName: `${AUTHOR} Portfolio`,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  keywords: [
    "Mafuzur Rahman",
    "Mahfuzur Rahman",
    "Mafuzur Rahman portfolio",
    "Mahfuzur Rahman portfolio",
    "Mafuzur Rahman software developer",
    "Mahfuzur Rahman software developer",
    "Mafuzur Rahman frontend developer",
    "Mafuzur Rahman full stack developer",
    "Mafuzur Rahman AI engineer",
    "Mafuzur Rahman React developer",
    "Mafuzur Rahman Next.js developer",
    "Mafuzur Rahman Dhaka",
    "Mafuzur Rahman Bangladesh",
    "software developer Bangladesh",
    "frontend developer Dhaka",
    "React developer Bangladesh",
    "Next.js developer",
    "TypeScript engineer",
    "Node.js engineer",
    "React Native developer",
    "AI engineer",
    "agentic AI developer",
    "Gemini API developer",
    "OpenAI developer",
    "technical writer",
    "mafuzur.com",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: `${AUTHOR} — Software Developer & AI Builder`,
    description: DESCRIPTION,
    siteName: `${AUTHOR} Portfolio`,
    firstName: "Mafuzur",
    lastName: "Rahman",
    username: "mahfuzurrahman01",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${AUTHOR} — ${ROLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR} — Software Developer & AI Builder`,
    description: DESCRIPTION,
    creator: "@mahfuzur_kaizen",
    images: [OG_IMAGE],
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
  alternateName: [AUTHOR_ALT, "Mafuz"],
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: ROLE,
  description: DESCRIPTION,
  email: "mailto:mafuzur.rahman032@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
  },
  worksFor: {
    "@type": "Organization",
    name: "ESAP",
  },
  knowsAbout: [
    "Software Development",
    "Full-Stack Engineering",
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "Artificial Intelligence",
    "Agentic AI",
    "Gemini API",
    "OpenAI API",
    "Technical Writing",
  ],
  sameAs: [
    "https://github.com/mahfuzurrahman01",
    "https://www.linkedin.com/in/mafuzurrahman01/",
    "https://x.com/mahfuzur_kaizen",
    "https://dev.to/mahfuzurrahman01",
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
