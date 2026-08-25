import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// ═══════════════════════════════════════════════════════════════
//  Ce fichier décrit les informations que doit contenir l'en-tête
//  (le bloc entre les --- au début) de chaque fichier Markdown.
//
//  Si tu oublies une information obligatoire, le site refusera de
//  se construire et te dira exactement quel fichier corriger.
// ═══════════════════════════════════════════════════════════════

/** ── SEMAINES DE COURS ──────────────────────────────────────── */
const semaines = defineCollection({
  loader: glob({ base: "./src/content/semaines", pattern: "**/*.md" }),
  schema: z.object({
    /** Numéro de la semaine dans l'année (1, 2, 3...). Sert au tri. */
    numero: z.number().int().positive(),
    /** Thème de la semaine. C'est le grand titre de la page. */
    theme: z.string(),
    /** Date du premier cours de la semaine. Format : 2026-09-01 */
    date: z.coerce.date(),
    /** Étape du bulletin (1, 2 ou 3). Facultatif. */
    etape: z.number().int().min(1).max(3).optional(),
    /** Une ou deux phrases affichées dans la liste des semaines. */
    resume: z.string(),
    /** Ce que l'élève doit savoir faire à la fin de la semaine. */
    objectifs: z.array(z.string()).min(1),
    /**
     * Tutoriels de référence pour cette semaine.
     * Écris le nom du fichier du tutoriel, sans le .md
     * Ex. : tutoriels: ["signature-de-courriel"]
     * Si le tutoriel n'existe pas, la construction du site échouera :
     * c'est voulu, ça évite les liens morts.
     */
    tutoriels: z.array(reference("tutoriels")).default([]),
    /** Liens externes utiles (vidéo, article, outil en ligne). */
    liens: z
      .array(z.object({ titre: z.string(), url: z.string().url() }))
      .default([]),
    /** true = la semaine reste invisible sur le site publié. */
    brouillon: z.boolean().default(false),
  }),
});

/** ── TUTORIELS ──────────────────────────────────────────────── */
const tutoriels = defineCollection({
  // Le dossier « images » est exclu : ce qu'il contient n'est pas un
  // tutoriel, mais les captures d'écran appelées par les tutoriels.
  loader: glob({
    base: "./src/content/tutoriels",
    pattern: ["**/*.md", "!images/**"],
  }),
  schema: z.object({
    /** Titre du tutoriel, tel qu'il apparaît partout sur le site. */
    titre: z.string(),
    /** Une phrase qui dit à quoi sert le tutoriel. Affichée dans la liste. */
    description: z.string(),
    /**
     * Sujet du tutoriel : c'est ce qui sert de filtre sur la page
     * des tutoriels. Tu écris ce que tu veux — les filtres se
     * construisent tout seuls à partir des sujets réellement utilisés.
     * Ex. : "Suite Google", "Cybersécurité", "Modélisation 3D"
     */
    sujet: z.string(),
    /** Outils ou logiciels employés. Sert aussi à la recherche. */
    outils: z.array(z.string()).default([]),
    /** Difficulté approximative. */
    niveau: z.enum(["Débutant", "Intermédiaire", "Avancé"]).default("Débutant"),
    /** Temps approximatif. Ex. : "15 minutes" */
    duree: z.string().optional(),
    /** Date de la dernière mise à jour. Format : 2026-09-01 */
    maj: z.coerce.date(),
    /** Public visé : sert à orienter élèves et collègues. */
    pour: z.array(z.enum(["Élèves", "Enseignants"])).default(["Élèves"]),
    /** true = le tutoriel reste invisible sur le site publié. */
    brouillon: z.boolean().default(false),
  }),
});

/** ── INFORMATIONS GÉNÉRALES ─────────────────────────────────── */
const infos = defineCollection({
  loader: glob({ base: "./src/content/infos", pattern: "**/*.md" }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    /** Position dans le menu de la section (1 = en premier). */
    ordre: z.number().int().default(99),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { semaines, tutoriels, infos };
