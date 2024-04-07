// carritoStore.js

import { create } from "zustand";

const useCarritoStore = create((set) => ({
  productos: [],
  agregarProducto: (productoNuevo) =>
    set((state) => {
      const productoExistente = state.productos.find(
        (producto) => producto.title === productoNuevo.title
      );
      if (productoExistente) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        return {
          productos: state.productos.map((producto) =>
            producto.title === productoNuevo.title
              ? { ...producto, quantity: producto.quantity + 1 }
              : producto
          ),

          
        };



      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        return {
          productos: [...state.productos, { ...productoNuevo, quantity: 1 }],
        };
      }
    }),
  removerProducto: (titleProducto) =>
    set((state) => ({
      productos: state.productos.filter(
        (producto) => producto.title !== titleProducto
      ),
    })),
  decrementarCantidad: (titleProducto) =>
    set((state) => ({
      productos: state.productos
        .map((producto) =>
          producto.title === titleProducto && producto.quantity > 1
            ? { ...producto, quantity: producto.quantity - 1 }
            : producto
        )
        .filter((producto) => producto.quantity > 0), // Esto asegura no mantener productos con cantidad 0
    })),
  incrementarCantidad: (titleProducto) =>
    set((state) => ({
      productos: state.productos.map((producto) =>
        producto.title === titleProducto
          ? { ...producto, quantity: producto.quantity + 1 }
          : producto
      ),
    })),
  limpiarCarrito: () => set(() => ({ productos: [] })),
  cantidadTotal: () =>
    set((state) => ({
      // Calcula la cantidad total de productos en el carrito
      total: state.productos.reduce(
        (acc, producto) => acc + producto.quantity,
        0
      ),
    })),
}));

export default useCarritoStore;
