import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useCarritoStore from "@/utils/cartStore";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UserForm = ({ products }) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    products && console.log(products);
  }, [products]);

  const onSubmit = async (data) => {
    const totalPrice = products.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);

    const response = await axios.post("/api/orders", {
      name: data.name,
      lastname: data.lastname,
      taxid: data.taxid,
      address: data.address,
      phone: data.phone,
      zipCode: data.zipCode,
      phone: data.phone,
      city: data.city,
      country: data.country,
      orderItems: products,
      total: totalPrice,
    });
    if (response.data._id) {
      const url = await axios.post("/api/payment", {
        products: products,
        orderId: response.data._id,
      });
      push(url.data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input className="my-2" {...register("name")} placeholder="Name" />
      <Input
        className="my-2"
        {...register("lastName")}
        placeholder="Last Name"
      />
      <Input className="my-2" {...register("email")} placeholder="Email" />
      <Input className="my-2" {...register("phone")} placeholder="Phone" />
      <Input className="my-2" {...register("taxid")} placeholder="Tax ID" />
      <Input className="my-2" {...register("address")} placeholder="Address" />
      <Input className="my-2" {...register("city")} placeholder="City" />
      <Input className="my-2" {...register("country")} placeholder="Country" />
      <Input className="my-2" {...register("zipcode")} placeholder="Zip Code" />
      <div className="mt-5">
        <Button type="submit">Buy</Button>
      </div>
    </form>
  );
};
