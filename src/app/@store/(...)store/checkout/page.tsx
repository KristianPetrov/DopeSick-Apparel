export default function CheckoutInterceptDisable() {
  // Prevent the product intercepting route `@store/(...)store/[id]`
  // from treating `/store/checkout` as `id="checkout"` and rendering a modal.
  return null;
}

