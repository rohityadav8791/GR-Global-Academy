# GR Global Academy

A complete, professional, and responsive official website for GR Global Academy - built with React, Vite, and clean CSS.

## Features

- Clean, traditional school website layout with professional design
- Fully responsive across mobile, tablet, laptop and desktop
- Semantic HTML and accessible markup
- Easy to update content (text, images, contact details, notices)
- Working front-end admission enquiry form with validation
- Optimized for performance and SEO
- No external heavy dependencies or complicated animations

## Tech Stack

- [React](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool and dev server
- Plain CSS with CSS variables for consistent theming

## Getting Started

### Prerequisites

- Node.js (v16.0 or higher recommended)
- npm

### Installation

1. Clone or extract the project
2. Navigate to the project directory:

   ```bash
   cd "D:\GR Global academy"
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── styles/        # Component-specific styles
│   ├── About.jsx
│   ├── Academics.jsx
│   ├── Admissions.jsx
│   ├── Contact.jsx
│   ├── EnquiryForm.jsx
│   ├── Facilities.jsx
│   ├── Footer.jsx
│   ├── Gallery.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Notices.jsx
│   └── Welcome.jsx
├── data/
├── App.jsx
├── index.css          # Global styles and theme
└── main.jsx

public/
└── images/            # Image assets (placeholders included)
```

## Customization Guide

### Basic Information
- **School Name & Logo**: Edit `src/components/Header.jsx` and `src/components/Footer.jsx` to update logo/text
- **Contact Details**: Update in `src/components/Contact.jsx` and `src/components/Footer.jsx`
- **Office Hours**: Update in `src/components/Contact.jsx`

### Content Sections
- **Welcome Message**: `src/components/Welcome.jsx`
- **About Section**: `src/components/About.jsx`
- **Academics**: `src/components/Academics.jsx` (placeholder content - edit as needed)
- **Facilities**: `src/components/Facilities.jsx` (placeholder content - edit as needed)
- **Notices & Announcements**: `src/components/Notices.jsx` (fully editable)

### Images
Place your images in `public/images/`. Update image paths in respective components:
- Hero image: `src/components/Hero.jsx` (currently using placeholder)
- About section image: `src/components/About.jsx`
- Gallery images: `src/components/Gallery.jsx`

Included placeholders: `hero-campus-placeholder.svg`, `school-placeholder.svg`, `gallery-placeholder.svg`. Replace with genuine, appropriately licensed photographs.

### Admission Enquiry Form
The form in `src/components/EnquiryForm.jsx` is front-end only. To make it functional, integrate with a form service such as:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [Getform](https://getform.io/)
- Your own backend API

## Design Notes

- Color palette: Navy (#1a2b5c), Navy light (#2f4a9b), Golden accent (#f2d77c), clean whites and grays
- Typography: Lato, Open Sans, Arial, sans-serif
- Layout prioritizes readability, accessibility, and functionality over visual effects
- Minimal, subtle hover effects only

## SEO

Basic meta tags are included in `index.html` including description, keywords and author. Update as needed.

## License & Notes

- This is a template website for GR Global Academy. All content placeholders marked as `[Editable]` should be replaced with official school information.
- Do not include fabricated affiliations, awards, testimonials or statistics. Only use confirmed information.
- Use real, appropriately licensed images.

## Support

For questions or modifications, refer to the component files - all content is clearly marked and easy to edit.
