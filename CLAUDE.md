# Le numérique avec Simon — mémoire du projet

Site de cours d'informatique au secondaire, écrit par Simon Duguay
(enseignant, pas développeur). Ce fichier existe pour qu'une nouvelle
session de Claude Code comprenne **pourquoi** le projet est fait ainsi, et
ne défasse pas des décisions prises volontairement.

Astro 5, site statique, publié sur GitHub Pages.
`npm run dev` · `npm run build` · `npm run check`

---

## Les trois publics, dans l'ordre

1. **Les élèves du secondaire** — c'est le public principal. Le vocabulaire,
   la longueur des phrases et la clarté des procédures se règlent sur eux.
2. **La projection en classe** — Simon projette ce site sur un projecteur.
   D'où la taille de police de base à 18 px, les contrastes forts et le
   mode présentation.
3. **Les collègues enseignants** — le site est public et réutilisable
   volontairement. Ne jamais rendre une ressource dépendante du contexte
   interne d'une seule école.

---

## Décisions structurantes — ne pas défaire sans demander

### La séparation contenu des cours / tutoriels

C'est **la** règle du site, posée explicitement par Simon.

- Une **semaine** (`src/content/semaines/`) dit *quand* et *pourquoi* :
  semaine, thème, objectifs, déroulement du cours. La section s'appelle
  « Contenu des cours » à l'écran ; son adresse reste `/plan-de-cours`
  (les URL n'ont pas été renommées pour ne pas casser les liens déjà
  partagés).
- Un **tutoriel** (`src/content/tutoriels/`) dit *comment* : une procédure,
  sur sa propre page, indépendante du calendrier.

Une semaine **renvoie** à un tutoriel par une référence, elle ne le contient
jamais. Un même tutoriel peut servir à plusieurs semaines et reste
consultable hors de tout contexte de cours — c'est ce qui le rend
réutilisable l'année suivante et par d'autres enseignants.

Ne jamais recopier le contenu d'un tutoriel dans une page de semaine, même
« pour la commodité ».

### Les pages d'information sont des pages, pas une section

« À propos » et « Me contacter » sont deux entrées de menu qui mènent
directement à `/a-propos` et `/me-contacter`. Il n'y a plus de page
d'index « Informations ».

Leur texte vit dans `src/content/infos/` (Markdown, modifiable dans
Obsidian) ; la page Astro qui l'affiche ne fait que l'habiller. Les
**coordonnées** de la page « Me contacter » ne s'écrivent pas dans le
Markdown : elles viennent de `contact` dans `src/site.config.ts`, et une
entrée vide n'affiche rien.

### Markdown pur, jamais MDX

Les fichiers de contenu sont du `.md` standard, sans JSX ni ligne d'import.
Raison : Simon écrit dans Obsidian, qui n'ouvre pas le MDX, et le MDX casse
sur un `{` ou un `<` isolé dans du texte français.

Les blocs enrichis passent par un greffon remark maison
(`src/lib/remark-blocs.mjs`) qui fournit `:::astuce`, `:::attention`,
`:::important`, `:::note`, `::youtube{id="…"}` et `::fichier{url="…"}`.
Pour ajouter un bloc, étendre ce greffon — ne pas introduire MDX.

### La bannière est dessinée, pas photographiée

`src/components/BanniereReseau.astro` calcule un réseau de points reliés à
partir d'une graine fixe, en SVG. Il ne s'agit pas d'un habillage
arbitraire : c'est la transposition de l'image de référence choisie par
Simon (bleu nuit, constellation cyan à droite). Avantages conservés
délibérément : quelques kilo-octets, netteté parfaite au projecteur 4K,
recoloration par variables CSS.

Ne pas remplacer par une image bitmap.

### Un seul fichier d'identité

`src/site.config.ts` contient le nom du site, la signature, l'école, les
contacts, la licence et le menu. Toute valeur de marque affichée sur le site
vient de là. Ne jamais écrire le nom du site ou un lien de contact en dur
dans un composant.

### Une seule feuille de style

`src/styles/global.css` porte toute la mise en forme, avec sa palette en
variables au sommet. Les styles propres à une page restent dans son bloc
`<style>`. Objectif de Simon : « un style uniforme ». Une page ne redéfinit
pas ses propres couleurs ni ses propres tailles de titre.

### Les liens internes passent par `lien()`

`src/lib/url.ts`. Le site vit dans le sous-dossier `/informatique` sur
GitHub Pages ; une adresse écrite en dur casserait au changement de domaine.

---

## Conventions de contenu

- **Tout en français**, y compris les noms de fichiers, de variables, de
  composants et de classes CSS. C'est délibéré : Simon doit pouvoir lire et
  modifier le projet.
- Le champ `sujet` d'un tutoriel est **libre** : les filtres de la page des
  tutoriels se construisent à partir des sujets réellement présents. Ne
  jamais figer une liste de sujets dans le code — Simon a prévenu que ses
  sujets changeraient en cours d'année.
- `brouillon: true` masque une page du site publié mais la garde visible en
  développement.
- **Images d'un tutoriel** : les déposer dans
  `src/content/tutoriels/images/` et les appeler par un chemin relatif
  (`![Texte](./images/nom.png)`). C'est Astro qui règle alors l'adresse et
  l'optimisation. Une adresse absolue (`/images/…`) casserait sous le
  sous-dossier `/informatique`.
- Un renvoi vers un tutoriel inexistant **doit** faire échouer la
  construction (`reference("tutoriels")` dans `src/content.config.ts`).
  C'est un garde-fou voulu, pas une rigidité à contourner.

---

## État actuel et points en suspens

- **Licence** : CC BY-NC-SA 4.0 pour le contenu, MIT pour le code
  (`LICENSE.md`). Décidé.
- **Contact et nom de l'école** : volontairement vides dans
  `site.config.ts`. Ne pas y inscrire d'adresse courriel sans que Simon
  l'ait explicitement demandé — le site est public et indexé. Tant que
  `contact.courriel` est vide, la page « Me contacter » n'affiche aucun
  moyen de joindre Simon (un rappel le signale en `npm run dev`).
- **Branche** : le dépôt n'a pas de `main`. La branche par défaut est
  `claude/secondary-cs-course-site-e580qy`, et le flux de publication
  (`.github/workflows/deploy.yml`) écoute les deux noms. À consolider sur
  `main` quand Simon le décidera.
- **Pages d'information** : « À propos » et « Me contacter ». Simon a
  écarté pour l'instant les pages évaluation, fonctionnement du labo et
  FAQ.
- **Année scolaire** : 2026-2027, à confirmer.

---

## Avant de livrer un changement

1. `npm run build` doit passer — c'est ce que fera GitHub.
2. `npm run check` doit rester à zéro erreur.
3. Vérifier le rendu **en clair et en sombre**, et à la largeur d'un
   téléphone : le site n'a jamais de débordement horizontal.
4. Pour un changement visuel, vérifier aussi le **mode présentation**
   (bouton « Présenter ») et l'**aperçu avant impression**.

Écrire les messages de commit en français, comme le reste du projet.
