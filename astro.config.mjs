// @ts-check
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { remarkBlocs, remarkTableauxDefilants } from "./src/lib/remark-blocs.mjs";

// ─────────────────────────────────────────────────────────────
//  Configuration technique du site.
//  Pour changer le NOM, le CONTACT, la LICENCE ou l'ANNÉE SCOLAIRE,
//  ce n'est PAS ici : c'est dans src/site.config.ts
// ─────────────────────────────────────────────────────────────

export default defineConfig({
  // Adresse publique du site (domaine personnel).
  site: "https://cours.simonduguay.com",
  // Le site est servi à la racine du domaine : pas de sous-dossier.
  // Le domaine est déclaré à GitHub par le fichier « public/CNAME ».
  // Pour revenir un jour à l'adresse GitHub, il faudrait remettre
  // site: "https://simon-dug.github.io" et base: "/informatique".
  base: "/",
  trailingSlash: "ignore",
  markdown: {
    // Active les blocs spéciaux ( :::astuce , ::youtube , ::fichier ).
    // Voir src/lib/remark-blocs.mjs pour le mode d'emploi.
    remarkPlugins: [remarkDirective, remarkBlocs, remarkTableauxDefilants],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
