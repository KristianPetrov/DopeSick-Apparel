import FloatingCartButton from "@/components/cart/FloatingCartButton";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingCartButton />
    </>
  );
}

