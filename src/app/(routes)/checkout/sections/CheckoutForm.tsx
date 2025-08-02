// components/CheckoutForm.tsx
"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { clearCart, CartItem } from "@/redux/cartSlice";
import { placeOrder, Order } from "@/redux/orderSlice";
import type { RootState, AppDispatch } from "@/redux/store";

type FormState = {
  fullName: string;
  address: string;
  phone: string;
};

const validatePhone = (phone: string) => /^\+?[0-9]{7,15}$/.test(phone.trim());

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
    if (!validatePhone(form.phone))
      newErrors.phone = "Valid phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }
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

  if (submittedOrder) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white border rounded-2xl shadow flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Thank You!</h2>
            <p className="text-gray-600">
              Your order has been placed successfully.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border">
          <p className="text-sm mb-1">
            <span className="font-medium">Order ID:</span>{" "}
            <span className="font-mono">{submittedOrder.id}</span>
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">Name:</span> {submittedOrder.fullName}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">Address:</span>{" "}
            {submittedOrder.address}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">Phone:</span> {submittedOrder.phone}
          </p>
          <p className="text-sm font-medium mt-2">
            Total: ${submittedOrder.total.toFixed(2)}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Items</h3>
          <ul className="space-y-2">
            {submittedOrder.items.map((it) => (
              <li
                key={it.id}
                className="flex justify-between bg-white border rounded p-3"
              >
                <div>
                  <p className="font-medium">{it.title}</p>
                  <p className="text-xs text-gray-500">Qty: {it.quantity}</p>
                </div>
                <div className="font-semibold">
                  ${(it.price * it.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="grid gap-10 md:grid-cols-2">
        {/* left: form */}
        <div className="bg-white border rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">Checkout</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your shipping details to complete the order.
          </p>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Shipping Address
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main St, Dhaka, Bangladesh"
                rows={3}
                className={`w-full border rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.address ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+8801XXXXXXXXX"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.phone ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* right: summary */}
        <div className="bg-gray-50 border rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex-1 space-y-4">
            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start bg-white border rounded p-3"
              >
                <div className="flex flex-col">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(total + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            We’ll never share your personal information. Secure checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
