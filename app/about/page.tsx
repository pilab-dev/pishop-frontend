import { subtitle, title } from "@/components/primitives";
import { productsApi } from "@/lib/client";

export default async function AboutPage() {
  const products = await productsApi.listProducts();

  return (
    <div>
      <h1 className={title()}>About</h1>

      <p className={subtitle()}>
        <strong>id:</strong> {products.length}
      </p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
