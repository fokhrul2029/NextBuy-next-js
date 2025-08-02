"use client";

import Spinner from "@/components/Spinner";
import { addToCart } from "@/redux/cartSlice";
import { useGetProductByIdQuery } from "@/redux/store/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

interface ProductDetailsProps {
  id: string;
}

interface Product {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface RootState {
  cart: {
    items: Array<{
      id: number;
      title: string;
      price: number;
      quantity: number;
    }>;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id) as {
    data: Product | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading || !product) return <Spinner />;
  if (isError) return <h1>Error...</h1>;

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (): void => {
    if (isInCart) {
      Swal.fire({
        title: "Product is already in cart!",
        icon: "info",
      });
      return;
    }

    setIsAddedToCart(true);
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );

    Swal.fire({
      title: "Product added to cart!",
      icon: "success",
    });
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(product.rating.rate)}</div>
              <span className="text-gray-600 text-sm">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-blue-600">
              ${product.price}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-lg transition duration-300 ${
                  isInCart
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isAddedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={isInCart}
              >
                {isInCart
                  ? "Already in Cart"
                  : isAddedToCart
                  ? "✓ Added to Cart!"
                  : "Add to Cart"}
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Product ID:</span>
                  <span>{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span>{product.rating.rate}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Reviews:</span>
                  <span>{product.rating.count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
