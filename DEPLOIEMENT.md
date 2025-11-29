# 🚀 Guide de Déploiement - Death Note Fansite

## Options de Déploiement

### 1️⃣ GitHub Pages (Recommandé - Gratuit)

```bash
# 1. Créer un repo GitHub
git init
git add .
git commit -m "Initial commit - Death Note Fansite"

# 2. Créer repo sur GitHub puis:
git remote add origin https://github.com/VOTRE-USERNAME/death-note-fansite.git
git branch -M main
git push -u origin main

# 3. Activer GitHub Pages
# Settings → Pages → Source: main branch → Save
```

**URL finale**: `https://VOTRE-USERNAME.github.io/death-note-fansite/`

---

### 2️⃣ Netlify (Recommandé - Gratuit)

1. Créer compte sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier du site
3. Site déployé en quelques secondes !

**Avantages**:
- Déploiement instantané
- HTTPS automatique
- Domaine personnalisé gratuit
- Formulaires fonctionnels

---

### 3️⃣ Vercel (Gratuit)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd Death-Note-Fansite
vercel
```

---

### 4️⃣ Serveur Local (Développement)

#### Avec Laragon (Windows)
```
1. Copier le dossier dans C:\laragon\www\
2. Démarrer Laragon
3. Ouvrir: http://localhost/Death-Note-Fansite/
```

#### Avec Python
```bash
cd Death-Note-Fansite
python -m http.server 8000
# Ouvrir: http://localhost:8000
```

#### Avec PHP
```bash
cd Death-Note-Fansite
php -S localhost:8000
# Ouvrir: http://localhost:8000
```

#### Avec Node.js
```bash
npx serve Death-Note-Fansite
```

---

## 📋 Checklist Avant Déploiement

### ✅ Vérifications Essentielles

- [ ] Toutes les pages s'affichent correctement
- [ ] Les images se chargent (chemins relatifs corrects)
- [ ] Le JavaScript fonctionne (menu, lightbox, formulaire)
- [ ] Tailwind CSS charge via CDN
- [ ] Responsive testé (mobile, tablette, desktop)
- [ ] Pas d'erreurs console (F12)
- [ ] Liens internes fonctionnent
- [ ] Formulaire se soumet (même si backend pas prêt)

### 🔍 Tests de Compatibilité

- [ ] Chrome/Edge ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Mobile (iOS) 📱
- [ ] Mobile (Android) 📱

---

## 🔧 Configuration .gitignore

Créer `.gitignore` à la racine:

```gitignore
# Fichiers système
.DS_Store
Thumbs.db
desktop.ini

# Éditeurs
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log

# Fichiers temporaires
*.tmp
*~

# Node modules (si utilisation future)
node_modules/
package-lock.json
```

---

## 📊 Optimisations Performance

### Images
```bash
# Compresser avec TinyPNG ou ImageOptim
# Convertir en WebP pour meilleure performance
```

### CSS/JS
```bash
# Si besoin de minification:
# CSS: cssnano, clean-css
# JS: terser, uglify-js
```

---

## 🌐 Configuration Domaine Personnalisé

### GitHub Pages
```
1. Acheter domaine (Namecheap, Google Domains)
2. Créer fichier CNAME avec: votredomaine.com
3. Configurer DNS:
   - Type: A
   - Host: @
   - Value: 185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153
```

### Netlify
```
1. Acheter domaine
2. Dans Netlify: Domain Settings → Add custom domain
3. Configurer DNS selon instructions Netlify
```

---

## 📈 Analyse & SEO

### Google Analytics
```html
<!-- Ajouter dans <head> de toutes les pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Meta Tags SEO
```html
<!-- Déjà présent, mais à vérifier -->
<meta name="description" content="Site de fans Death Note...">
<meta name="keywords" content="death note, manga, anime, Light, L">
<meta property="og:title" content="Death Note Fansite">
<meta property="og:image" content="URL_IMAGE">
<meta name="twitter:card" content="summary_large_image">
```

---

## 🔒 HTTPS & Sécurité

### GitHub Pages / Netlify
- HTTPS automatique ✅
- Certificat SSL gratuit ✅

### Headers de Sécurité (netlify.toml)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 📱 PWA (Progressive Web App) - Optionnel

### manifest.json
```json
{
  "name": "Death Note Fansite",
  "short_name": "Death Note",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#8b0000",
  "icons": [
    {
      "src": "/Assets/Images/Logo_pomme_death_note.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker (sw.js)
```javascript
const CACHE_NAME = 'death-note-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Assets/Css/style.css',
  '/Assets/Js/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

---

## 🐛 Troubleshooting

### Problème: Images ne s'affichent pas
```
Solution: Vérifier chemins relatifs
❌ /Assets/Images/image.jpg
✅ Assets/Images/image.jpg
```

### Problème: Tailwind ne charge pas
```
Solution: Vérifier connexion internet
CDN: https://cdn.tailwindcss.com
```

### Problème: JavaScript ne fonctionne pas
```
Solution: 
1. Vérifier console (F12)
2. Vérifier chemin script.js
3. Vérifier syntaxe JavaScript
```

---

## 📞 Support & Resources

- **Tailwind Docs**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org
- **GitHub Pages**: https://pages.github.com
- **Netlify Docs**: https://docs.netlify.com

---

## 🎯 Prochaines Étapes

1. ✅ Déployer le site
2. ⏳ Tester en production
3. ⏳ Configurer domaine personnalisé
4. ⏳ Ajouter Google Analytics
5. ⏳ Optimiser SEO
6. ⏳ Partager avec communauté!

---

**Bon déploiement ! 🚀**

*"Je crée un nouveau monde..."* - Light Yagami
