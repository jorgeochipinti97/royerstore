"use client";
import { GlobeDemo } from "@/components/ui/globeDemo";
import gsap, { Power1 } from "gsap";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CardProduct } from "@/components/ui/Cards/CardProduct";
import { products } from "@/utils/products";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
import { Button } from "@/components/ui/button";
import useCarritoStore from "@/utils/cartStore";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BuyerForm } from "@/components/Forms/buyerForm";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export default function Home() {
  useEffect(() => {
    gsap.to(".textOne", {
      opacity: 1.2,
      ease: Power1.easeIn,
      delay: 1,
      duration: 0.2,
    });
    gsap.to(".textTwo", {
      opacity: 1,
      ease: Power1.easeIn,
      delay: 1.6,

      duration: 0.2,
    });

    setRiverProducts(products.filter((e) => e.equipo == "river"));
    setArgentinaProducts(products.filter((e) => e.equipo == "argentina"));
    setBocaProducts(products.filter((e) => e.equipo == "boca"));
  }, []);

  const [argentinaProducts, setArgentinaProducts] = useState([]);
  const [bocaProducts, setBocaProducts] = useState([]);
  const [riverProducts, setRiverProducts] = useState([]);
  const productos = useCarritoStore((state) => state.productos);
  const removerProducto = useCarritoStore((state) => state.removerProducto);
  const decrementarCantidad = useCarritoStore(
    (state) => state.decrementarCantidad
  );
  const incrementarCantidad = useCarritoStore(
    (state) => state.incrementarCantidad
  );

  const total = useCarritoStore((state) =>
    state.productos.reduce((acc, producto) => acc + producto.quantity, 0)
  );

  return (
    <div className=" bg-black  flex items-center flex-col pb-10">
      <div className="fixed right-2 bottom-3 z-50">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">
              <span className="bg-sky-500 border border-black text-white px-2 py-1 absolute bottom-8 right-10 text-md font-geist rounded-full">
                {total}
              </span>
              <svg
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g>
                  <path
                    fill="#000"
                    d="M4.97 9.81A2 2 0 016.961 8H17.04a2 2 0 011.99 1.81l.762 8a2 2 0 01-1.99 2.19H6.2a2 2 0 01-1.991-2.19l.761-8z"
                    opacity="0.15"
                  ></path>
                  <path
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 11.01V11m8 .01V11M8 8V7a4 4 0 018 0v1M8 8H6.84a2 2 0 00-1.993 1.834l-.666 8A2 2 0 006.174 20h11.652a2 2 0 001.994-2.166l-.667-8A2 2 0 0017.16 8H16M8 8h8"
                  ></path>
                </g>
              </svg>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cart</AlertDialogTitle>
              <AlertDialogDescription>
                {" "}
                <Table>
                  <TableCaption>List of your cart items</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productos.map((producto) => (
                      <TableRow key={producto.title}>
                        <TableCell className="text-xs">
                          {producto.title} - {producto.size.toUpperCase()}{" "}
                          {producto.personalization}
                        </TableCell>
                        <TableCell>${producto.price}</TableCell>
                        <TableCell>{producto.quantity}</TableCell>
                        <TableCell className="">
                          <Button
                            variant="outline"
                            onClick={() => incrementarCantidad(producto.title)}
                          >
                            +
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => decrementarCantidad(producto.title)}
                          >
                            -
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => removerProducto(producto.title)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    className="border rounded-xl p-2 border-black"
                  >
                    <Button className="w-full my-1">Buy</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cart</AlertDialogTitle>
                      <AlertDialogDescription>
                        <BuyerForm products={productos} />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Alert
        style={{ display: "none", opacity: 0 }}
        className="alerta fixed bottom-2 right-2 z-50 w-3/12"
      >
        <AlertTitle>Added to Cart!</AlertTitle>
        <AlertDescription>
          The product has been successfully added to your shopping cart.
        </AlertDescription>
      </Alert>
      <p
        className=" textOne gradientText mt-20 font-geist font-bold text-4xl md:text-7xl text-center tracking-tighter   z-50"
        style={{ opacity: 0.4 }}
      >
        Royer Store
      </p>
      <p
        style={{ opacity: 0.4 }}
        className="textTwo font-mono text-white text-center mt-2 font-light text-xl z-50"
      >
        Worldwide free shipping{" "}
      </p>
      <Badge className="my-5 font-geist text-xl">+800 shippings</Badge>
      <span className="font-geist text-white  text-xl flex">
        🇦🇷{" "}
        <svg
          width={20}
          className="mx-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#f5f5f7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 12h12m0 0l-5-5m5 5l-5 5"
          ></path>
        </svg>
        🇧🇩 🇰🇷 🇺🇸 🇲🇽 🇧🇷 🇨🇳 🇸🇬 🇦🇪 🇨🇱
      </span>

      <p className="text-white font-geist font-bold">AND MUCH MORE COUNTRIES</p>
      <GlobeDemo />
      <p className="font-extralight text-white  tracking-tighter relative top-10 font-geist text-3xl  text-center mb-5">
        Global Shipping, Trusted and Secure
      </p>
      <div className="flex md:flex-row justify-around items-center mt-10 ">
        <img
          src="/fedex.png"
          className="bg-violet-900 w-[40%] md:w-[200] p-5 rounded-xl "
        />
        <img
          src="/dhl.svg"
          className="mt-5 md:mt-0 w-[45%] md:w-[250] bg-yellow-400 p-5 rounded-xl "
        />
      </div>

      <div className="mt-10">
        <p className="text-white  text-center font-bold tracking-tighter text-2xl md:text-6xl my-5">
          Cheer for Argentina in the Copa America with Royer
        </p>
        <p className="text-white text-center   mb-10 tracking-tighter text-xl md:text-2xl my-5">
          Support the team and enjoy worldwide free shipping on all orders!
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2
        "
        >
          <div className="flex justify-center">
            <video
              src="https://res.cloudinary.com/dwtnrs4ix/video/upload/v1717044014/nffzfaclsq6pbrymlane.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="h-[80vh] shadowarg rounded-xl "
            />
          </div>
          <div className="flex justify-center h-full mt-10 md:mt-0 items-center">
            <Card className="h-fit p-5 w-11/12 md:w-10/12 shadowarg">
              <CardTitle className='tracking-tighter text-xl text-center '>🎉 Win Big with Royer Sport! 🎉</CardTitle>
              <CardContent>
                <p className="text-xl tracking-tighter mt-10">
                  Every purchase is a chance to win a ticket to the Argentina
                  vs. Peru match 🇦🇷🇵🇪 and an official AEROREADY two-star jersey
                  ⭐⭐! <br />
                  Show your support for Argentina and enjoy our exclusive
                  offers. 🎁
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xl tracking-tighter mt-10">
                  🚀 Don't miss out – shop now and cheer for Argentina! 🛒
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <p
          className="mt-10 
text-4xl md:text-6xl font-bold font-geist  text-center tracking-tighter  argentina"
        >
          ARGENTINA
        </p>
        <div className="flex justify-center">
          <img
            src="/banner.jpg"
            className="w-screen md:w-10/12 shadowarg my-5 rounded-xl"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  ">
        {argentinaProducts.map((e, index) => (
          <div key={index}>
            <CardProduct product={e} />
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-4xl md:text-6xl font-bold font-geist  tracking-tighter  boca">
        BOCA JUNIORS
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3  ">
        {bocaProducts.map((e, index) => (
          <div key={index}>
            <CardProduct product={e} />
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-4xl md:text-6xl font-bold font-geist  tracking-tighter  river">
        RIVER PLATE
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3  ">
        {riverProducts.map((e, index) => (
          <div key={index}>
            <CardProduct product={e} />
          </div>
        ))}
      </div>
    </div>
  );
}
