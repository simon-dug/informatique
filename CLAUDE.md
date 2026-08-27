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
  « Contenu des cours » et vit à `/contenu-des-cours`. Sur la page d'une
  semaine, les objectifs s'affichent **avant** le déroulement du cours,
  sous le titre « Objectifs du cours » : c'est l'ordre voulu par Simon.
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
**coordonnées** affichées en cartes sur la page « Me contacter » et dans le
pied de page ne s'écrivent pas dans le Markdown : elles viennent de
`contact` dans `src/site.config.ts`, et une entrée vide n'affiche rien.
Il y a **deux adresses** : `courrielEcole` (celle du centre de services,
pour les élèves, les parents et l'école) et `courrielPro` (celle de
consultant, pour tout ce qui vient de l'extérieur). Le texte des sections
de `me-contacter.md` nomme la bonne adresse pour chaque public : c'est du
texte, pas une coordonnée à centraliser.

### Markdown pur, jamais MDX

Les fichiers de contenu sont du `.md` standard, sans JSX ni ligne d'import.
Raison : Simon écrit dans Obsidian, qui n'ouvre pas le MDX, et le MDX casse
sur un `{` ou un `<` isolé dans du texte français.

Les blocs enrichis passent par un greffon remark maison
(`src/lib/remark-blocs.mjs`) qui fournit `:::astuce`, `:::attention`,
`:::important`, `:::note`, `:::collaboration`, `::youtube{id="…"}` et
`::fichier{url="…"}`.
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

`src/lib/url.ts`. Le site est servi à la racine de
`cours.simonduguay.com`, mais il a vécu dans le sous-dossier
`/informatique` sur GitHub Pages ; une adresse écrite en dur casserait au
prochain changement de domaine. La règle reste donc entière.

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
- **Images d'un tutoriel** : elles vivent dans
  `src/content/tutoriels/images/` et s'appellent par un chemin relatif
  (`![Texte descriptif](./images/nom.png)`). C'est Astro qui règle alors
  l'adresse et l'optimisation. Une adresse absolue (`/images/…`)
  contournerait cette optimisation. Ce dossier `images` est
  exclu du chargeur de la collection (`src/content.config.ts`) : ce qu'il
  contient n'est pas un tutoriel.
- **Déposer des images sans les nommer** : Simon glisse ses captures dans
  `images-a-classer/`, à la racine, puis demande de les classer. Le
  travail attendu : renommer selon le tutoriel et le numéro d'étape
  (`drive-dossier-02-menu.png`), déplacer dans
  `src/content/tutoriels/images/`, insérer l'appel d'image **avec un
  texte de remplacement qui décrit ce qu'on doit voir**, puis vider le
  dossier de dépôt. Ce dossier est hors de `src/` et de `public/` : rien
  n'en est publié. Voir `images-a-classer/LISEZ-MOI.md`.
- Un renvoi vers un tutoriel inexistant **doit** faire échouer la
  construction (`reference("tutoriels")` dans `src/content.config.ts`).
  C'est un garde-fou voulu, pas une rigidité à contourner.

---

## État actuel et points en suspens

- **Licence** : CC BY-NC-SA 4.0 pour le contenu, MIT pour le code
  (`LICENSE.md`). Décidé.
- **Contact** : les deux adresses (`courrielEcole` et `courrielPro`) sont
  remplies dans `site.config.ts` à la demande explicite de Simon ; elles
  paraissent donc dans le pied de page de chaque page. Ne jamais ajouter
  d'autre coordonnée sans qu'il l'ait demandée — le site est public et
  indexé. **Nom de l'école** : toujours vide, volontairement.
- **Adresse du site** : `https://cours.simonduguay.com`, un sous-domaine du
  domaine personnel de Simon (registraire Squarespace, ancien Google
  Domains). Le site ne vit plus dans le sous-dossier `/informatique` :
  `base` vaut `"/"`. Le domaine repose sur deux pièces à garder
  cohérentes — `public/CNAME` dans le dépôt, et l'enregistrement DNS
  `cours` (CNAME vers `simon-dug.github.io`) chez le registraire.
  Ne pas supprimer `public/CNAME` : GitHub oublierait le domaine à la
  publication suivante. L'ancienne adresse
  `simon-dug.github.io/informatique` redirige toute seule vers la nouvelle.
- **Branche et publication** : la branche principale est `main`, et c'est
  **la seule branche qui met le site en ligne** : le flux de publication
  (`.github/workflows/deploy.yml`) n'écoute qu'elle. Un travail poussé sur
  une autre branche ne publie rien tant qu'il n'a pas été amené sur `main`.
  Les anciennes branches `claude/…` sont conservées pour l'historique ;
  elles ne publient plus.
- **Pages d'information** : « À propos » et « Me contacter ». Simon a
  écarté pour l'instant les pages évaluation, fonctionnement du labo et
  FAQ.
- **Année scolaire** : 2026-2027, à confirmer.

---

## Avant de créer une nouvelle page

Simon relit le texte **avant** qu'il existe dans le dépôt. Quand le travail
demandé crée une nouvelle page — un tutoriel, une semaine, une page
d'information —, écrire **tout son texte dans la conversation** d'abord :
titre, texte de présentation, chaque section, chaque encadré, les textes
de remplacement des images. Pas un résumé, pas « voici le plan » : le texte
tel qu'il sera lu par les élèves, pour qu'il soit corrigé sur le coup.

Créer le fichier une fois le texte approuvé. Cette règle vise le texte
destiné aux élèves ; elle ne s'applique pas aux modifications d'une page
existante, ni aux fichiers techniques.

## Avant de livrer un changement

1. `npm run build` doit passer — c'est ce que fera GitHub.
2. `npm run check` doit rester à zéro erreur.
3. Vérifier le rendu **en clair et en sombre**, et à la largeur d'un
   téléphone : le site n'a jamais de débordement horizontal.
4. Pour un changement visuel, vérifier aussi le **mode présentation**
   (bouton « Présenter ») et l'**aperçu avant impression**.

Écrire les messages de commit en français, comme le reste du projet.
