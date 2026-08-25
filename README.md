# Le numérique avec Simon

Site du cours d'informatique de Simon Duguay, au secondaire. Il sert à la
fois de ressource pour les élèves, de support de projection en classe, et de
banque de ressources ouverte pour les collègues enseignants.

**→ [GUIDE.md](GUIDE.md) explique comment ajouter une semaine ou un tutoriel.**
C'est le seul document à lire pour alimenter le site au quotidien.

---

## Les trois sections

| Section | Rôle | Contenu |
| --- | --- | --- |
| **Plan de cours** | *quand* et *pourquoi* | Une page par semaine : date, thème, objectifs, déroulement du cours. |
| **Tutoriels** | *comment* | Une page par procédure, indépendante du calendrier, avec recherche et filtres par sujet. |
| **Informations** | le cadre | Le fonctionnement du cours, la démarche, les conditions de réutilisation. |

La séparation entre les deux premières est la règle structurante du site :
une semaine **renvoie** à un tutoriel, elle ne le contient jamais. Une même
procédure peut ainsi servir à plusieurs moments de l'année, et rester
consultable hors de tout contexte de cours.

## Ce que le site sait faire

- **Thème clair et sombre**, avec bascule dans l'en-tête. Le choix est
  retenu d'une visite à l'autre.
- **Mode présentation** sur les pages de contenu : le texte grossit, les
  menus disparaissent, il ne reste que le cours à projeter. `Échap` en sort.
- **Impression propre** : ni menus ni fonds colorés, l'adresse des liens
  externes est affichée, et la marque du site suit la feuille distribuée.
- **Recherche et filtres** dans les tutoriels, sans serveur : tout se passe
  dans le navigateur.
- **Liens vérifiés à la construction** : un renvoi vers un tutoriel
  inexistant fait échouer la publication plutôt que de créer un lien mort.

## Démarrer

```bash
npm install
npm run dev      # aperçu sur http://localhost:4321/informatique
npm run build    # vérifie que tout se construit, comme le fera GitHub
```

## Publication

Chaque envoi sur `main` déclenche `.github/workflows/deploy.yml`, qui
construit le site et le publie sur GitHub Pages.

**À faire une seule fois, sur GitHub :** *Settings → Pages → Source →
GitHub Actions*.

L'adresse publique et le sous-dossier sont réglés par `site` et `base` dans
`astro.config.mjs`. Pour brancher un domaine personnel, il faut changer
`base` pour `"/"` et ajouter un fichier `public/CNAME`.

## Organisation des fichiers

```
src/
├── site.config.ts        ← nom, contact, licence, menu : le seul fichier d'identité
├── content.config.ts     ← ce que doit contenir l'en-tête de chaque fichier .md
├── content/
│   ├── semaines/         ← une semaine de cours = un fichier
│   ├── tutoriels/        ← un tutoriel = un fichier
│   └── infos/            ← une page d'information = un fichier
├── components/           ← bannière, pied de page, cartes, barre d'outils
├── layouts/Base.astro    ← l'ossature commune à toutes les pages
├── lib/
│   ├── remark-blocs.mjs  ← les blocs :::astuce , ::youtube , ::fichier
│   └── contenu.ts        ← tri et filtrage du contenu
├── pages/                ← les adresses du site
└── styles/global.css     ← toute la mise en forme, en un seul endroit
```

## Identité visuelle

Le bleu nuit et le réseau de points lumineux de la bannière viennent de
l'image de référence choisie au départ. La bannière n'est pas une photo :
c'est un dessin vectoriel calculé à la construction (`BanniereReseau.astro`),
qui reste net sur un projecteur 4K et ne pèse que quelques kilo-octets.

Toutes les couleurs du site descendent de cette palette et sont déclarées en
haut de `src/styles/global.css`. En changer une la change partout.

## Technique

[Astro](https://astro.build) en site statique, sans base de données ni
serveur. Le contenu est du Markdown standard, lisible dans n'importe quel
éditeur, Obsidian compris.
