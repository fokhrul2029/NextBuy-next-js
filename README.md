# NextBuy-Shop

**NextBuy** is a modern eCommerce frontend application built with Next-js, TypeScript, and Tailwind CSS. It features a fully responsive design with a dynamic Product Listing Page showcasing all available items and an interactive Product Details Page that provides comprehensive information about each product, including images, descriptions, and pricing.

## Hyper links

**Live URL:** - https://next-buy-next-js.vercel.app

---

## SEO Techniques Used

This project implements several SEO best practices to improve discoverability, performance, and shareability:

### 1. **Dynamic Meta Tags**

- Page-specific `<title>` and `<meta name="description">` values.
- Templates for consistent branding (e.g., `%s - NextBuy`).

### 2. **robots.txt**

- Custom `robots.txt` to guide crawlers on what to index and what to avoid (e.g., blocking `/admin`).
- References the sitemap.

### 3. **Sitemap**

- Dynamic `sitemap.xml` generation including key pages and product detail pages to help search engines discover and crawl site structure.

### 4. **Semantic HTML & Accessibility**

- Proper use of landmarks (`<main>`, `<header>`, `<nav>`, `<footer>`, etc.), heading hierarchy, and ARIA where appropriate.
- Accessible content improves crawl quality and user experience.

### 5. **Performance Optimization**

- Image optimization via Next.js `<Image>` component (responsive sizing, lazy loading).
- Code splitting and selective hydration (App Router / dynamic imports).
- Fast Core Web Vitals (LCP/FID/CLS) through efficient rendering.

### 6. **Caching & ISR**

- Incremental Static Regeneration (ISR) or appropriate caching strategies ensure content is fresh but performant, balancing indexability with speed.

### 7. **SEO Defaults with Overrides**

- Global metadata defaults with per-page overrides to avoid missing tags while allowing customization.

---

## Features

- **Product Listing Page**
- **Product Details Page**
- **Order List Page**
- **Fully Responsive Design**
- **Cart Feature**

---

## Tech Stack

- **Next-js** (with TypeScript)
- **Tailwind CSS**
- **React Icons**
- **Redux and RTK Query**

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
APP_URL=https://next-buy-next-js.vercel.app
```

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

```bash
git clone https://github.com/fokhrul2029/NextBuy-next-js.git
cd NextBuy-next-js
```

2. **Install dependency**

```bash
npm install
# or
yarn install
```

3. **Run the application**

```bash
npm run dev
# or
yarn dev
```
