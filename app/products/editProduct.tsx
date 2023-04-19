"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function EditProduct(product: Product) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  return (
    <div className="m-12">
      <button className="btn btn-warning btn-sm" onClick={handleChange}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h4 className="font-bold text-md">Edit</h4>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Add Product Price"
              />
            </div>
            <div className="modal-action">
              <button type="button" onClick={handleChange} className="btn">
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
