import { readFileSync } from "node:fs";
import { join } from "node:path";

// Override elemen `img` dan `table` untuk semua konten Markdown.
//
// Astro hanya mendukung prop `components` pada MDX, bukan .md biasa, jadi
// pembungkusan dilakukan di lapisan prosesor Markdown — tetap otomatis,
// tidak ada markup yang perlu ditulis per gambar di file konten.
//
//   <p><img></p>  →  <figure class="figure-frame"><img><figcaption>alt</figcaption></figure>
//   <table>       →  <div class="table-scroll"><table></div>
//
// Objek biasa, bukan helper `defineHastPlugin`, supaya file ini tidak
// mengimpor apa pun di luar Node.

/** Baca lebar/tinggi dari header IHDR sebuah PNG. Mencegah layout shift. */
function pngSize(src) {
  if (!src.startsWith("/") || !src.toLowerCase().endsWith(".png")) return null;
  try {
    const buf = readFileSync(join("public", src));
    if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

const isElement = (node, tagName) =>
  node?.type === "element" && node.tagName === tagName;

/** Isi bermakna sebuah node — teks kosong/whitespace diabaikan. */
const meaningful = (children = []) =>
  children.filter(
    (child) => !(child.type === "text" && child.value.trim() === ""),
  );

function toFigure(img) {
  const alt = typeof img.properties?.alt === "string" ? img.properties.alt : "";
  const src = String(img.properties?.src ?? "");
  const size = pngSize(src);

  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["figure-frame"] },
    children: [
      {
        type: "element",
        tagName: "img",
        properties: {
          ...img.properties,
          ...(size ?? {}),
          loading: "lazy",
          decoding: "async",
          className: ["block", "w-full"],
        },
        children: [],
      },
      ...(alt
        ? [
            {
              type: "element",
              tagName: "figcaption",
              properties: { className: ["u-caption"] },
              children: [{ type: "text", value: alt }],
            },
          ]
        : []),
    ],
  };
}

export const satteriFigurePlugin = {
  name: "radlabs-figure",
  element: [
    {
      // Paragraf yang isinya hanya satu gambar → figure berbingkai.
      filter: ["p"],
      visit(node) {
        const inner = meaningful(node.children);
        if (inner.length === 1 && isElement(inner[0], "img")) {
          return toFigure(inner[0]);
        }
      },
    },
    {
      // Tabel selalu bisa di-scroll horizontal di layar sempit.
      // `tabindex` membuatnya bisa di-scroll lewat keyboard. Tanpa
      // `role="region"` — region tanpa nama aksesibel justru jadi temuan
      // aksesibilitas, dan namanya tidak ada di content/.
      filter: ["table"],
      visit(node, ctx) {
        ctx.wrapNode(node, {
          type: "element",
          tagName: "div",
          properties: {
            className: ["table-scroll"],
            tabindex: 0,
          },
          children: [],
        });
      },
    },
  ],
};
