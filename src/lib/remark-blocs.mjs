/**
 * ═══════════════════════════════════════════════════════════════
 *  Blocs spéciaux utilisables directement dans les fichiers .md
 * ═══════════════════════════════════════════════════════════════
 *
 *  ── Encadrés ──────────────────────────────────────────────────
 *
 *      :::astuce
 *      Un truc qui fait gagner du temps.
 *      :::
 *
 *      :::attention[Ne pas oublier]
 *      Un titre personnalisé se met entre crochets.
 *      :::
 *
 *  Types disponibles : note, astuce, attention, important,
 *  collaboration
 *
 *  ── Vidéo YouTube ─────────────────────────────────────────────
 *
 *      ::youtube[Les boucles en Python]{id="dQw4w9WgXcQ"}
 *
 *  L'identifiant est la suite de caractères après « v= » dans
 *  l'adresse YouTube. Le texte entre crochets est facultatif.
 *
 *  ── Fichier à télécharger ─────────────────────────────────────
 *
 *      ::fichier[Grille d'évaluation]{url="/fichiers/grille.pdf" info="PDF, 120 ko"}
 *
 * ═══════════════════════════════════════════════════════════════
 */

import { h } from "hastscript";
import { visit } from "unist-util-visit";

const ENCADRES = {
  note: { titre: "À retenir", icone: "📌" },
  astuce: { titre: "Astuce", icone: "💡" },
  attention: { titre: "Attention", icone: "⚠️" },
  important: { titre: "Important", icone: "🚩" },
  collaboration: {
    titre: "Approche de l'apprentissage : collaboration",
    icone: "🤝",
  },
};

/** Récupère le texte du [label] d'une directive, s'il y en a un. */
function libelle(noeud) {
  const premier = noeud.children[0];
  if (premier?.data?.directiveLabel) {
    const texte = premier.children.map((c) => c.value ?? "").join("");
    noeud.children.shift();
    return texte;
  }
  return null;
}

export function remarkBlocs() {
  return (arbre, fichier) => {
    visit(arbre, (noeud) => {
      // ── Encadrés : :::astuce ... :::
      if (noeud.type === "containerDirective" && ENCADRES[noeud.name]) {
        const modele = ENCADRES[noeud.name];
        const titre = libelle(noeud) ?? modele.titre;

        const corps = { ...noeud, type: "paragraph" };
        noeud.data = {
          hName: "aside",
          hProperties: h("aside", {
            class: `encadre encadre--${noeud.name}`,
          }).properties,
        };
        noeud.children = [
          {
            type: "html",
            value: `<span class="encadre__icone" aria-hidden="true">${modele.icone}</span><p class="encadre__titre">${titre}</p><div class="encadre__corps">`,
          },
          ...corps.children,
          { type: "html", value: "</div>" },
        ];
        return;
      }

      // ── Vidéo : ::youtube[Titre]{id="..."}
      if (noeud.type === "leafDirective" && noeud.name === "youtube") {
        const titre = libelle(noeud) ?? "Vidéo";
        const id = noeud.attributes?.id;

        if (!id) {
          fichier.fail(
            "Il manque l'identifiant de la vidéo : ::youtube[Titre]{id=\"...\"}",
            noeud
          );
          return;
        }

        noeud.type = "html";
        noeud.value = `<figure class="video">
  <div class="video__cadre">
    <iframe
      src="https://www.youtube-nocookie.com/embed/${id}"
      title="${titre.replace(/"/g, "&quot;")}"
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <figcaption>${titre} — <a href="https://www.youtube.com/watch?v=${id}" rel="noopener">voir sur YouTube</a></figcaption>
</figure>`;
        noeud.children = [];
        return;
      }

      // ── Téléchargement : ::fichier[Nom]{url="..." info="..."}
      if (noeud.type === "leafDirective" && noeud.name === "fichier") {
        const titre = libelle(noeud) ?? "Télécharger le fichier";
        const url = noeud.attributes?.url;
        const info = noeud.attributes?.info ?? "";

        if (!url) {
          fichier.fail(
            "Il manque l'adresse du fichier : ::fichier[Nom]{url=\"...\"}",
            noeud
          );
          return;
        }

        noeud.type = "html";
        noeud.value = `<p><a class="bouton bouton--secondaire" href="${url}" download>⬇ ${titre}${info ? ` <span class="petit">(${info})</span>` : ""}</a></p>`;
        noeud.children = [];
      }
    });
  };
}

/**
 * Enveloppe chaque tableau dans un conteneur défilant, pour qu'un tableau
 * large ne fasse jamais déborder la page sur un téléphone.
 */
export function remarkTableauxDefilants() {
  return (arbre) => {
    visit(arbre, "table", (noeud, index, parent) => {
      if (!parent || index === null) return;
      if (parent.type === "root" || parent.type === "blockquote") {
        parent.children.splice(index, 1, {
          type: "paragraph",
          data: { hName: "div", hProperties: { class: "table-defilante" } },
          children: [noeud],
        });
        return ["skip", index + 1];
      }
    });
  };
}
