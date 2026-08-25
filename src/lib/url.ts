/**
 * Construit une adresse valide en tenant compte du sous-dossier du site
 * (voir « base » dans astro.config.mjs).
 *
 * Toujours passer par cette fonction pour les liens internes :
 * un lien écrit « en dur » casserait si l'adresse du site changeait.
 */
export function lien(chemin: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const suite = chemin.startsWith("/") ? chemin : `/${chemin}`;
  return `${base}${suite}` || "/";
}

/** Vrai si l'adresse courante correspond à l'entrée de menu donnée. */
export function estActif(cheminCourant: string, cible: string): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const courant = cheminCourant.replace(base, "").replace(/\/$/, "") || "/";
  const dest = cible.replace(/\/$/, "") || "/";
  return dest === "/" ? courant === "/" : courant.startsWith(dest);
}
