# Images à classer

Dépose ici les captures d'écran que tu veux voir apparaître dans un
tutoriel, **sans te soucier du nom des fichiers**. Ensuite, demande à
Claude de les classer : il les renomme, les range au bon endroit et
ajoute l'appel d'image dans le tutoriel visé.

## Comment déposer

1. Glisse les images dans ce dossier (`images-a-classer/`).
2. Numérote-les dans l'ordre des étapes si l'ordre compte. N'importe
   quelle façon de numéroter fonctionne : `1.png`, `2.png`, `3.png`, ou
   `capture 1.png`, ou même les noms que ton appareil leur donne, du
   moment que l'ordre alphabétique correspond à l'ordre des étapes.
3. Dis à Claude à quel tutoriel elles appartiennent. Exemple :
   « Les images dans images-a-classer sont pour le tutoriel
   Créer un dossier dans Drive. »

Si l'ordre alphabétique ne correspond pas à l'ordre des étapes, dis-le
simplement en toutes lettres — par exemple : « la fenêtre de nom, c'est
la dernière étape ».

## Ce que Claude fait ensuite

- Il renomme chaque image selon le tutoriel et son numéro d'étape.
  Exemple : `drive-dossier-02-menu.png`
- Il la déplace dans `src/content/tutoriels/images/`
- Il ajoute l'image dans le tutoriel avec un texte de remplacement
  (le texte lu à voix haute par un lecteur d'écran, et affiché si
  l'image ne charge pas).
- Il vide ce dossier.

## Pourquoi ce dossier et pas un autre

Ce dossier vit **en dehors** de `src/` et de `public/` : son contenu
n'est jamais publié sur le site. C'est une zone de dépôt, pas un
entrepôt d'images. Les images qui servent vraiment vivent dans
`src/content/tutoriels/images/`, à côté des tutoriels qui les utilisent.

## Formats

`.png` pour une capture d'écran, `.jpg` pour une photo. Évite les
captures prises en photo avec un téléphone : illisibles au projecteur.
