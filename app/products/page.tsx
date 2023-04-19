import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import EditProduct from "./editProduct";

type Product = {
  id: number;
  title: string;
  price: number;
};

async function getProducts() {
  const res = await fetch(`http://localhost:5000/products`, {
    cache: `no-store`,
  });
  return res.json();
}

export default async function page() {
  const products: Product[] = await getProducts();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <AddProduct />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <DeleteProduct {...product} />
                <EditProduct {...product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
