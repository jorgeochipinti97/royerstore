"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState();
  const getOrder = async (_id) => {
    const orders = await axios.get("/api/orders");
    const order_ = orders.data.filter((e) => e._id == _id);
    setOrder(order_[0]);
  };

  const verifyPayment = async (sessionId, orderId) => {
    try {
      const response = await axios.post("/api/verifyPayment", {
        session_id: sessionId,
      });

      const { data } = response;
      if (data.success && data.isPaymentApproved) {
        console.log("El pago fue aprobado.");
        const response = await axios.put(`/api/orders?_id=${orderId}`, {
          token: sessionId,
        });
        console.log(response);
      } else {
        console.log("El pago no fue aprobado.");
      }
    } catch (error) {
      console.error("Error al verificar el pago:", error);
    }
  };

  useEffect(() => {
    const orderId = searchParams.get("orderid");
    const session_id = searchParams.get("session_id");
    orderId && getOrder(orderId);
    session_id && verifyPayment(session_id, orderId);
  }, [searchParams]);

  return (
    <div className="h-screen w-screen">
      {order && (
        <div className="mt-20">
          <p className="font-geist text-center text-7xl font-bold tracking-tighter ">
            Payment Successful!
          </p>
          <p className="font-geist text-center text-xl font-semibold mt-2  ">
            Thank you for your purchase. Your payment has been successfully
            processed.
          </p>
          <p className="font-geist text-center mt-2 tracking-tighter  ">ID: {order._id}</p>
          <p className="font-geist text-center mt-2 tracking-tighter font-light ">
            You will receive an email shortly with your tracking code and
            further instructions on how to track your order.
          </p>
          <p className="font-geist text-center mt-2 text-xl font-bold tracking-tighter  ">
            Total Amount: ${order.total}
          </p>
          <p className="font-geist text-center mt-2 text-2xl  ">
            Here are the details of the products you have purchased:
          </p>

          <div className="flex justify-center mt-10">
            <div className="justify-center flex-wrap flex w-9/12">
              {order.orderItems.map((e,index) => (
                <Card className="w-[350px] m-2" key={index}>
                  <CardHeader>
                    <CardTitle className="text-center font-geist tracking-tighter">
                      {e.title}
                    </CardTitle>
                    <CardDescription className="flex justify-center">
                      <img src={e.images[0]} width={200} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-geist text-xl  tracking-tighter font-bold capitalize"></p>
                      <p className="font-geist text-xl  tracking-tighter font-bold uppercase">{e.size}</p>
                      <p className="font-geist text-xl tracking-tighter font-bold ">
                        Quantity: {e.quantity}
                      </p>
                      <p className="font-geist text-xl tracking-tighter font-bold ">$ {e.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
