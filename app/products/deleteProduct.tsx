"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleDelete(productId: number) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  return (
    <div className="m-12">
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h4 className="font-bold text-md">
            Are you sure to delete {product.title}?
          </h4>

          <div className="modal-action">
            <button type="button" onClick={handleChange} className="btn">
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="btn btn-accent"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Saving...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
