"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await fetch(`http://localhost:5000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });

    setIsMutating(false);

    setTitle("");
    setPrice("");
    router.refresh();
    setModal(false);
  }

  return (
    <div className="m-12">
      <button className="btn" onClick={handleChange}>
        Add New Product
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h4 className="font-bold text-md">Add New Product</h4>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPrice(e.target.value)}
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
                  Add
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
