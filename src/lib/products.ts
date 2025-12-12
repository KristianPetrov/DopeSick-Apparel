export type Product = {
  id: string;
  name: string;
  tag: string;
  image: string;
  priceCents: number;
};

export const PRODUCTS: Product[] = [
  {
    id: "look-dad-im-clean-hoodie-blk",
    name: "Look Dad I'm Clean DopeSick Hoodie Black",
    tag: "Hoodie",
    image: "/look-dad-im-clean-hoodie-blk.png",
    priceCents: 6500,
  },
  {
    id: "look-dad-im-sober-hoodie-blk",
    name: "Look Dad I'm Sober DopeSick Hoodie Black",
    tag: "Hoodie",
    image: "/look-dad-im-sober-hoodie-blk.png",
    priceCents: 6500,
  },
  {
    id: "look-mom-im-sober-hoodie-blk",
    name: "Look Mom I'm Sober DopeSick Hoodie Black",
    tag: "Hoodie",
    image: "/look-mom-im-sober-hoodie-blk.png",
    priceCents: 6500,
  },
  { id: "tee-1", name: "Signature Tee", tag: "T-Shirt", image: "/og.png", priceCents: 3500 },
  { id: "hoodie-1", name: "Recovery Hoodie", tag: "Hoodie", image: "/og.png", priceCents: 6000 },
  { id: "tank-1", name: "Grit Tank", tag: "Tank Top", image: "/og.png", priceCents: 3000 },
  { id: "tee-2", name: "Unapologetic Tee", tag: "T-Shirt", image: "/og.png", priceCents: 3500 },
  { id: "hoodie-2", name: "Rise Hoodie", tag: "Hoodie", image: "/og.png", priceCents: 6000 },
  { id: "tank-2", name: "Purpose Tank", tag: "Tank Top", image: "/og.png", priceCents: 3000 },
];

export function getProductById (id: string): Product
{
  return (
    PRODUCTS.find((p) => p.id === id) ?? {
      id,
      name: `Product ${id}`,
      tag: "Apparel",
      image: "/og.png",
      priceCents: 0,
    }
  );
}

export function formatMoney (cents: number)
{
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    (cents ?? 0) / 100,
  );
}

