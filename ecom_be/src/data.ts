import bcrypt from "bcryptjs";
import { Product } from "@/models/productModel";
import { User } from "@/models/userModel";

export const sampleProducts: Product[] = [
  {
    name: "Nike Slim shirt",
    slug: "nike-slim-shirt",
    category: "Shirts",
    image: "../images/p1.jpg",
    price: 120,
    countInStock: 10,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description:
      "A sleek, form-fitting shirt designed for ultimate comfort and style. Made with breathable fabric, it’s perfect for both workouts and casual wear.",
  },
  {
    name: "Adidas Fit Shirt",
    slug: "adidas-fit-shirt",
    category: "Shirts",
    image: "../images/p2.jpg",
    price: 100,
    countInStock: 20,
    brand: "Adidas",
    rating: 4.0,
    numReviews: 10,
    description:
      "Engineered for an active lifestyle, this shirt offers a snug yet flexible fit. Lightweight and moisture-wicking, it keeps you cool during any activity.",
  },
  {
    name: "Lacoste Free Pants",
    slug: "lacoste-free-pants",
    category: "Pants",
    image: "../images/p3.jpg",
    price: 220,
    countInStock: 0,
    brand: "Lacoste",
    rating: 4.8,
    numReviews: 17,
    description:
      "Classic Lacoste pants crafted for effortless movement and everyday comfort. Soft, durable fabric makes them ideal for casual outings or lounging.",
  },
  {
    name: "Nike Slim Pant",
    slug: "nike-slim-pant",
    category: "Pants",
    image: "../images/p4.jpg",
    price: 78,
    countInStock: 15,
    brand: "Nike",
    rating: 4.5,
    numReviews: 14,
    description:
      "Modern slim-fit pants that combine performance with style. Designed for flexibility and a streamlined look, perfect for training or casual wear.",
  },
];

export const sampleUsers: User[] = [
  {
    name: "John Silksong",
    email: "jsadmin@example.com",
    password: bcrypt.hashSync("123"),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("456"),
    isAdmin: false,
  },
];
