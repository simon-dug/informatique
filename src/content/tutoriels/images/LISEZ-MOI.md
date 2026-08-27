# Images des tutoriels

Les images utilisées par les tutoriels vivent ici, à côté des fichiers
qui les appellent.

Dans un tutoriel, on les appelle **par un chemin relatif** :

```markdown
![Le bouton « + Nouveau », en haut à gauche du Drive.](./images/drive-dossier-01-nouveau.png)
```

Le `./images/` au début est important : écrite ainsi, l'image passe par
Astro, qui règle l'adresse tout seul et qui optimise l'image au passage.
Une adresse absolue (`/images/…`) contournerait cette optimisation et
casserait de nouveau si l'adresse du site changeait un jour.

Le texte entre crochets n'est pas décoratif : c'est ce que lit un
lecteur d'écran, et ce qui s'affiche si l'image ne charge pas. Décris
ce qu'on doit voir, pas « capture d'écran ».

Pour déposer de nouvelles images sans t'occuper des noms, utilise le
dossier `images-a-classer/`, à la racine du projet.
