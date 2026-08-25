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
  // Adresse publique du site (GitHub Pages).
  site: "https://simon-dug.github.io",
  // Sous-dossier du dépôt. Si un jour tu branches un domaine perso
  // (ex. informatique.simonduguay.com), remplace par : base: "/"
  base: "/informatique",
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
