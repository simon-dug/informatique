import { getCollection, getEntry, type CollectionEntry } from "astro:content";

/**
 * Fonctions communes à toutes les pages, pour que la logique
 * « quoi afficher et dans quel ordre » n'existe qu'à un seul endroit.
 *
 * Les fichiers marqués `brouillon: true` sont retirés du site publié,
 * mais restent visibles pendant que tu travailles en local (npm run dev).
 */

const enDeveloppement = import.meta.env.DEV;

function estVisible(entree: { data: { brouillon?: boolean } }) {
  return enDeveloppement || entree.data.brouillon !== true;
}

/** Semaines de cours, de la première à la dernière. */
export async function toutesLesSemaines(): Promise<CollectionEntry<"semaines">[]> {
  const semaines = await getCollection("semaines", estVisible);
  return semaines.sort((a, b) => a.data.numero - b.data.numero);
}

/** Tutoriels, classés par sujet puis par titre. */
export async function tousLesTutoriels(): Promise<CollectionEntry<"tutoriels">[]> {
  const tutoriels = await getCollection("tutoriels", estVisible);
  return tutoriels.sort(
    (a, b) =>
      a.data.sujet.localeCompare(b.data.sujet, "fr") ||
      a.data.titre.localeCompare(b.data.titre, "fr")
  );
}

/** Pages d'informations, dans l'ordre choisi. */
export async function toutesLesInfos(): Promise<CollectionEntry<"infos">[]> {
  const infos = await getCollection("infos", estVisible);
  return infos.sort(
    (a, b) =>
      a.data.ordre - b.data.ordre || a.data.titre.localeCompare(b.data.titre, "fr")
  );
}

/**
 * Une page d'information précise, par le nom de son fichier (sans le .md).
 * Ex. : pageInfo("parents") pour src/content/infos/parents.md
 *
 * Si le fichier n'existe pas, la construction du site échoue avec un
 * message clair, plutôt que d'afficher une page vide.
 */
export async function pageInfo(id: string): Promise<CollectionEntry<"infos">> {
  const page = await getEntry("infos", id);
  if (!page) {
    throw new Error(
      `Le fichier src/content/infos/${id}.md est introuvable : la page qui l'affiche ne peut pas être construite.`
    );
  }
  return page;
}

/**
 * Semaines dans lesquelles un tutoriel donné est utilisé.
 * Sert à afficher, au bas d'un tutoriel, le contexte de cours d'où il vient.
 */
export async function semainesLiees(idTutoriel: string) {
  const semaines = await toutesLesSemaines();
  return semaines.filter((s) => s.data.tutoriels.some((t) => t.id === idTutoriel));
}

/** Liste, sans doublon, des sujets réellement utilisés par les tutoriels. */
export function sujetsUtilises(tutoriels: CollectionEntry<"tutoriels">[]): string[] {
  return [...new Set(tutoriels.map((t) => t.data.sujet))].sort((a, b) =>
    a.localeCompare(b, "fr")
  );
}

/** Ex. : « Semaine du 31 août 2026 » */
export function semaineDu(d: Date): string {
  return `Semaine du ${dateCourte(d)}`;
}

/** Ex. : « 31 août 2026 » */
export function dateCourte(d: Date): string {
  return new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/**
 * Texte utilisé par la recherche dans les tutoriels : titre, description,
 * sujet et outils réunis, sans accents ni majuscules, pour qu'une recherche
 * de « fiabilite » trouve « fiabilité ».
 */
export function texteRecherche(t: CollectionEntry<"tutoriels">): string {
  return [t.data.titre, t.data.description, t.data.sujet, ...t.data.outils]
    .join(" ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
