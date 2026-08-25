// ═══════════════════════════════════════════════════════════════
//  LE SEUL FICHIER À MODIFIER POUR CHANGER L'IDENTITÉ DU SITE.
//  Tout ce qui est écrit ici apparaît automatiquement dans l'en-tête,
//  le pied de page, l'onglet du navigateur et les aperçus de partage.
// ═══════════════════════════════════════════════════════════════

export const site = {
  /** Nom complet du site. Apparaît dans la bannière et le pied de page. */
  nom: "Le numérique avec Simon",

  /** Version courte, utilisée quand la place manque (mobile, onglet). */
  nomCourt: "Le numérique",

  /**
   * Signature affichée sous le nom.
   * Laisse la chaîne vide ("") pour n'afficher aucun slogan.
   */
  slogan: "",

  /** Phrase de présentation, utilisée par Google et les aperçus de partage. */
  description:
    "Site du cours d'informatique de Simon : plan de cours semaine par semaine, tutoriels et informations générales. Ressources libres pour les élèves et les enseignants.",

  /** Nom de l'enseignant, affiché dans le pied de page. */
  enseignant: "Simon Duguay",

  /** Nom de l'école. Laisse vide ("") pour ne pas l'afficher. */
  ecole: "",

  /** Année scolaire en cours. Affichée dans le plan de cours. */
  anneeScolaire: "2026-2027",

  /**
   * ── CONTACT ─────────────────────────────────────────────────
   * Chaque entrée remplie devient un lien dans le pied de page.
   * Laisse vide ("") ce que tu ne veux pas afficher publiquement.
   */
  contact: {
    courriel: "", // ex. "simon.duguay@monecole.qc.ca"
    site: "", // ex. "https://simonduguay.com"
    youtube: "", // ex. "https://youtube.com/@simonduguay"
    linkedin: "", // ex. "https://linkedin.com/in/simonduguay"
  },

  /**
   * ── LICENCE ─────────────────────────────────────────────────
   * Creative Commons Attribution - Pas d'utilisation commerciale -
   * Partage dans les mêmes conditions 4.0 International.
   *
   * Concrètement : un collègue peut reprendre et adapter tes ressources,
   * à condition de te créditer, de ne pas en faire un usage commercial,
   * et de partager son adaptation sous la même licence.
   */
  licence: {
    texte: "Contenu sous licence CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr",
  },

  /** Année de création, pour le © du pied de page. */
  anneeCreation: 2026,
} as const;

/**
 * ── NAVIGATION PRINCIPALE ─────────────────────────────────────
 * L'ordre ci-dessous est l'ordre du menu.
 */
export const navigation = [
  { titre: "Accueil", lien: "/" },
  { titre: "Plan de cours", lien: "/plan-de-cours" },
  { titre: "Tutoriels", lien: "/tutoriels" },
  { titre: "Informations", lien: "/infos" },
] as const;
