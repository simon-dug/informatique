# Images des tutoriels

Les images utilisées par les tutoriels vivent ici, à côté des fichiers
qui les appellent.

Dans un tutoriel, on les appelle **par un chemin relatif** :

```markdown
![Le bouton « + Nouveau », en haut à gauche du Drive.](./images/drive-dossier-01-nouveau.png)
```

Le `./images/` au début est important. Une adresse absolue
(`/images/…`) casserait, parce que le site vit dans le sous-dossier
`/informatique` sur GitHub Pages. Écrite ainsi, c'est Astro qui règle
l'adresse et qui optimise l'image au passage.

Le texte entre crochets n'est pas décoratif : c'est ce que lit un
lecteur d'écran, et ce qui s'affiche si l'image ne charge pas. Décris
ce qu'on doit voir, pas « capture d'écran ».

Pour déposer de nouvelles images sans t'occuper des noms, utilise le
dossier `images-a-classer/`, à la racine du projet.
