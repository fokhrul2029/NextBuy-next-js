"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, CartItem } from "@/redux/cartSlice";
import { placeOrder, Order } from "@/redux/orderSlice";
import type { RootState, AppDispatch } from "@/redux/store";
import SuccessPage from "./SuccessPage";
import OrderSummary from "./OrderSummary";

type FormState = {
  fullName: string;
  address: string;
  phone: string;
};

const CheckoutForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((s: RootState) => s.cart.items) as CartItem[];
  const [form, setForm] = useState<FormState>({
    fullName: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!/^\+?[0-9]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = "Valid phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || cartItems.length === 0) return;

    setIsSubmitting(true);
    const order: Order = {
      id: uuidv4(),
      fullName: form.fullName.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      dispatch(placeOrder(order));
      dispatch(clearCart());
      setSubmittedOrder(order);
      setIsSubmitting(false);
    }, 500);
  };

  // Success Page
  if (submittedOrder) {
    return <SuccessPage order={submittedOrder} />;
  }

  // Checkout Form
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600 mt-1">Complete your order details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="+8801XXXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isSubmitting
                  ? "Processing..."
                  : `Place Order ($${(total + 5).toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <OrderSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
