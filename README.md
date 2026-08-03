# NexoraArts

Production website for [NexoraArts](https://www.nexoraglobal.space), a custom art studio serving VTubers, streamers, and digital creators.

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## Deployment

The `main` branch is deployed as a Render Static Site. The included `render.yaml` documents the build and SPA routing setup. Render should use:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Rewrite: `/*` → `/index.html`

The canonical production URL is `https://www.nexoraglobal.space/`. The apex domain redirects to `www`.

## Inquiry data

Commission requests are written to the `artInquiries` Firestore collection. Deploy `firestore.rules` with the Firebase CLI and enable Firebase App Check for the web app in the Firebase console. The frontend includes validation, a honeypot, and a submission cooldown, but server-side Firestore rules remain the security boundary.

Never commit private service-account credentials. Firebase web configuration identifies the public app and is not a server secret.

## SEO

SEO metadata and structured data live in `index.html`. Update `public/sitemap.xml`, social preview image URLs, and legal dates whenever site content changes substantially.
