import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Terms from './Terms.jsx'
import Privacy from './Privacy.jsx'

const path = window.location.pathname.replace(/\/$/, '') || '/'
const Page = path === '/terms' ? Terms : path === '/privacy' ? Privacy : App
const routeMeta = {
  '/terms': {
    title: 'Terms of Service | NexoraArts',
    description: 'Commission terms covering payments, revisions, delivery, cancellation, and artwork usage rights at NexoraArts.',
  },
  '/privacy': {
    title: 'Privacy Policy | NexoraArts',
    description: 'How NexoraArts collects, uses, stores, and protects information submitted through commission inquiries.',
  },
}

if (routeMeta[path]) {
  document.title = routeMeta[path].title
  document.querySelector('meta[name="description"]')?.setAttribute('content', routeMeta[path].description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.nexoraglobal.space${path}`)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', routeMeta[path].title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', routeMeta[path].description)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://www.nexoraglobal.space${path}`)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
