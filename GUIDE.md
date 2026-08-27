# Guide d'utilisation du site

Ce guide s'adresse à toi, pas à un développeur. Il explique comment ajouter
une semaine de cours, écrire un tutoriel et publier le tout, sans jamais
toucher à du code.

---

## Les trois choses à savoir

1. **Tout le contenu est dans `src/content/`.** Un fichier `.md` = une page.
2. **Chaque fichier commence par un bloc entre `---`.** C'est la fiche
   d'identité de la page : titre, date, sujet. Le reste, en dessous, est le
   texte de la page.
3. **Tu ne touches jamais à la mise en forme.** Elle est déjà décidée, une
   fois pour toutes, dans `src/styles/global.css`. C'est ce qui garantit que
   toutes les pages se ressemblent.

---

## Travailler sur le site

```bash
npm install       # une seule fois, au tout début
npm run dev       # démarre l'aperçu sur http://localhost:4321
```

Laisse cette commande tourner pendant que tu écris : chaque fois que tu
enregistres un fichier, l'aperçu se met à jour tout seul.

Pour arrêter : `Ctrl + C` dans le terminal.

---

## Ajouter une semaine de cours

Crée un fichier dans `src/content/semaines/`, nommé `semaine-04.md`
(garde le zéro devant les chiffres de 1 à 9, pour que l'ordre reste correct).

```markdown
---
numero: 4
theme: "Le titre de la semaine"
date: 2026-09-21
etape: 1
resume: "Une ou deux phrases, affichées dans la liste des semaines."
objectifs:
  - "Premier objectif"
  - "Deuxième objectif"
tutoriels:
  - creer-un-dossier-dans-drive
brouillon: false
---

## Déroulement du cours

1. **Première activité** *(15 min)* — Description.
2. **Deuxième activité** *(20 min)* — Description.

## Travail à remettre

Ce que l'élève doit produire.
```

### Ce que veut dire chaque ligne

| Ligne | Obligatoire | Explication |
| --- | --- | --- |
| `numero` | oui | Sert à classer les semaines. |
| `theme` | oui | Le grand titre de la page. |
| `date` | oui | Toujours au format `AAAA-MM-JJ`. |
| `etape` | non | 1, 2 ou 3. Regroupe les semaines sur la page du plan de cours. |
| `resume` | oui | Une phrase, visible dans la liste. |
| `objectifs` | oui | Au moins un. Une ligne par objectif, précédée d'un tiret. |
| `tutoriels` | non | Le **nom de fichier** des tutoriels, sans le `.md`. |
| `brouillon` | non | `true` = la semaine reste invisible sur le site publié. |

> **Le lien vers un tutoriel est vérifié.** Si tu écris le nom d'un tutoriel
> qui n'existe pas, la publication échoue et te dit exactement où est
> l'erreur. C'est voulu : le site ne peut pas contenir de lien mort.

---

## Ajouter un tutoriel

Crée un fichier dans `src/content/tutoriels/`. Le nom du fichier devient
l'adresse de la page : `creer-un-dossier-dans-drive.md` donne
`.../tutoriels/creer-un-dossier-dans-drive`. Utilise des minuscules, des tirets à
la place des espaces, et pas d'accents dans le nom du fichier.

```markdown
---
titre: "Créer sa signature de courriel"
description: "Une phrase qui dit à quoi sert ce tutoriel."
sujet: "Suite Google"
outils: ["Gmail"]
niveau: "Débutant"
duree: "10 minutes"
maj: 2026-08-25
pour: ["Élèves", "Enseignants"]
---

Le texte du tutoriel commence ici.
```

### À propos du `sujet`

Le champ `sujet` sert de filtre sur la page des tutoriels. **Tu écris ce que
tu veux** : les boutons de filtre se construisent tout seuls à partir des
sujets réellement utilisés. Si tu ajoutes un tutoriel avec
`sujet: "Modélisation 3D"`, un bouton « Modélisation 3D » apparaît.

Un seul conseil : écris toujours le sujet **exactement de la même façon**.
« Suite Google » et « suite google » créeraient deux filtres différents.

### Les valeurs acceptées

- `niveau` : `Débutant`, `Intermédiaire` ou `Avancé` — rien d'autre.
- `pour` : `Élèves` et/ou `Enseignants`.
- `maj` : la date de dernière mise à jour, affichée sur la page. Pense à la
  changer quand tu retouches un tutoriel.

---

## Écrire le texte

C'est du **Markdown**, le même que dans Obsidian.

```markdown
## Un titre de section
### Un sous-titre

Du texte normal, avec du **gras**, de l'*italique* et du `code`.

- Une liste à puces
- Un deuxième élément

1. Une liste numérotée
2. Un deuxième élément

[Un lien](https://exemple.com)

> Une citation
```

### Les blocs spéciaux

Cinq encadrés sont disponibles. Le titre entre crochets est facultatif.

```markdown
:::note
Un rappel neutre.
:::

:::astuce
Un truc qui fait gagner du temps.
:::

:::attention[Titre personnalisé]
Un piège à éviter.
:::

:::important
Ce qu'il ne faut surtout pas manquer.
:::

:::collaboration
Comment on travaille ensemble sur cette tâche.
:::
```

L'encadré `collaboration` porte toujours le titre « Approche de
l'apprentissage : collaboration ».

### Une vidéo YouTube

```markdown
::youtube[Les boucles en Python]{id="dQw4w9WgXcQ"}
```

L'identifiant est la suite de caractères qui suit `v=` dans l'adresse
YouTube. Par exemple, dans
`https://www.youtube.com/watch?v=dQw4w9WgXcQ`, l'identifiant est
`dQw4w9WgXcQ`.

La vidéo s'affiche dans un lecteur qui s'adapte à la largeur de l'écran, et
qui utilise le mode sans témoins de connexion de YouTube.

### Un fichier à télécharger

Dépose d'abord le fichier dans `public/fichiers/`, puis :

```markdown
::fichier[Grille d'évaluation]{url="/fichiers/grille.pdf" info="PDF, 120 ko"}
```

> L'adresse commence par une barre oblique : elle part de la racine du
> site. Le nom du fichier doit être écrit exactement comme dans
> `public/fichiers/`, accents et majuscules compris.

### Une image

Dépose l'image dans `public/images/`, puis :

```markdown
![Description de ce qu'on voit](/images/capture.png)
```

La **description** n'est pas décorative : c'est ce que lira un logiciel de
lecture d'écran, et ce qui s'affiche si l'image ne charge pas. Décris ce
qu'on doit y voir, pas le nom du fichier.

### Du code

Trois accents graves, suivis du nom du langage :

````markdown
```python
for i in range(10):
    print(i)
```
````

---

## Publier

```bash
git add .
git commit -m "Ajout de la semaine 4"
git push
```

Une à deux minutes plus tard, le site public est à jour. Tu peux suivre la
publication dans l'onglet **Actions** du dépôt sur GitHub.

### Avant de publier, en cas de doute

```bash
npm run build
```

Cette commande construit le site comme le fera GitHub. Si elle affiche une
erreur, le message indique **le fichier et la ligne** à corriger. Tant
qu'elle passe, la publication passera aussi.

---

## Changer le nom, le contact ou la licence

Tout est dans **`src/site.config.ts`**, et nulle part ailleurs. Ce fichier
contient le nom du site, la signature, le nom de l'école, les liens de
contact, la licence et les entrées du menu. Chaque ligne est commentée.

---

## En cas de pépin

| Symptôme | Cause la plus fréquente |
| --- | --- |
| La publication échoue | Une information obligatoire manque dans un bloc `---`. Le message d'erreur nomme le fichier. |
| Une page n'apparaît pas | `brouillon: true` est resté dans le fichier. |
| Un tutoriel n'est pas trouvé par la recherche | La recherche porte sur le titre, la description, le sujet et les outils — pas sur le corps du texte. |
| L'accent d'un titre s'affiche mal | Le fichier doit être enregistré en UTF-8. |
| Une date s'affiche mal | Le format doit être `AAAA-MM-JJ`, sans guillemets. |
