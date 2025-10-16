
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }), // Set the products state
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "plz fill in all fields" }; // Return error if any required fields are missing
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }); // Send a POST request to create a new product
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] })); // Add new product to the products state if save operation is successful
    return { success: true, message: "Product created successfully" }; // Return success message if product is created successfully
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products"); // Send a GET request to fetch all products
    const data = await res.json();
    set({products: data.data }); // Set the products state with fetched data 
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    }); // Send a DELETE request to delete a product
    const data = await res.json();
    if (!data.success) return {success: false, message: data.message}; // Return error message if delete operation fails
    set((state) => ({ products: state.products.filter((product) => product._id !== pid) })); // Remove deleted product from the products state if delete operation is successful
    return { success: true, message: data.message }; // Return success message if product is deleted successfully
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
      
  });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message }; // Return error message if update operation fails
    set((state) => ({
      products: state.products.map((product) => product._id === pid ? data.data : product),
    })); // Update the product in the products state if update operation is successful
    return { success: true, message: data.message}; // Return success message if product is updated successfully
},
})); // Create a store to manage products
