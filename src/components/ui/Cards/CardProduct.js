"use client";
import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jugadoresArgentina2Estrellas } from "@/utils/players";
import { useRouter } from "next/navigation";

import gsap, { Power1 } from "gsap";
import useCarritoStore from "@/utils/cartStore";
import { BuyerForm } from "@/components/Forms/buyerForm";

export const CardProduct = ({ product }) => {
  const { push } = useRouter();
  const [size, setSize] = useState();
  const [talles, setTalles] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  useEffect(() => {
    product && setTalles(product.talles);
    product && setSize(product.talles[0].nombre);
  }, [product]);

  const [selectedPlayer, setSelectedPlayer] = useState("");

  useEffect(() => {
    isAdded &&
      gsap.to(".alerta", {
        display: "block",
      });
    isAdded &&
      gsap.to(".alerta", {
        opacity: 1,
        ease: Power1.easeIn,
        delay: 0.5,
      });
    isAdded &&
      gsap.to(".alerta", {
        opacity: 0,
        ease: Power1.easeIn,
        delay: 2,
      });
    isAdded &&
      gsap.to(".alerta", {
        display: "none",

        delay: 2.5,
      });
  }, [isAdded]);

  return (
    <div className="flex justify-center">
      {product && (
        <Card className="w-10/12 mt-5">
          <CardHeader className="">
            <div className="flex justify-center">
              <Carousel className="w-9/12">
                <CarouselContent>
                  {product.images.map((e, index) => (
                    <CarouselItem key={index}>
                      <img src={`${e}`} className="w-12/12" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="ml-2 font-geist tracking-tighter">
              {product.title}
            </CardTitle>
            <p className=" text-xl font-geist tracking-tighter mt-5">
              ${selectedPlayer.length > 2 ? product.price + 20 : product.price}
            </p>

            <section className="mt-5">
              <AlertDialog>
                <AlertDialogTrigger className="border rounded-xl p-2 border-black">
                  {" "}
                  Show description
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{product.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {product.description}
                      <section>
                        <p className="font-geist text-gray-700 mt-5">
                          Select size
                        </p>
                        <div className="flex justify-start mt-2 flex-wrap">
                          {talles.length > 0 &&
                            talles.map((e, index) => (
                              <Button
                                key={index}
                                onClick={() => setSize(e.nombre)}
                                variant="icon"
                                className={`${
                                  e.nombre == size
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                                } border mx-1 border-black`}
                              >
                                {e.nombre.toUpperCase()}
                              </Button>
                            ))}
                        </div>
                      </section>
                      {product.equipo == "argentina" && (
                        <section className="mt-5">
                          <Select
                            onValueChange={(e) => setSelectedPlayer(e)}
                            value={selectedPlayer}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Player" />
                            </SelectTrigger>
                            <SelectContent>
                              {jugadoresArgentina2Estrellas.map((e, index) => (
                                <SelectItem key={index} value={e}>
                                  {e}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </section>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Exit</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </section>
            <section>
              <p className="font-geist text-gray-700 mt-5">Select size</p>
              <div className="flex justify-start mt-2 flex-wrap">
                {talles.length > 0 &&
                  talles.map((e, index) => (
                    <Button
                      key={index}
                      onClick={() => setSize(e.nombre)}
                      variant="icon"
                      className={`${
                        e.nombre == size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      } border m-1 border-black`}
                    >
                      {e.nombre.toUpperCase()}
                    </Button>
                  ))}
              </div>
            </section>
            {product.equipo == "argentina" && (
              <section className="mt-5">
                <Select
                  onValueChange={(e) => setSelectedPlayer(e)}
                  value={selectedPlayer}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Player" />
                  </SelectTrigger>
                  <SelectContent>
                    {jugadoresArgentina2Estrellas.map((e, index) => (
                      <SelectItem key={index} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>
            )}
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              className="border border-black w-full my-1"
              variant="outline"
              disabled={!size}
              onClick={() =>
                agregarProducto({
                  title: product.title,
                  price:
                    selectedPlayer.length > 2
                      ? product.price + 20
                      : product.price,
                  size: size,
                  personalization: `${selectedPlayer}`,
                  images: product.images,
                })
              }
            >
              Add to cart
            </Button>

            <AlertDialog>
              <AlertDialogTrigger
                asChild
                className="border rounded-xl p-2 border-black"
              >
                <Button disabled={!size} className="w-full my-1">
                  Shop Now!
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{product.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    <BuyerForm
                      products={[
                        {
                          title: product.title,
                          price:
                            selectedPlayer.length > 2
                              ? product.price + 20
                              : product.price,
                          size: size,
                          personalization: `${selectedPlayer}`,
                          quantity: 1,
                          images: product.images,
                        },
                      ]}
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
