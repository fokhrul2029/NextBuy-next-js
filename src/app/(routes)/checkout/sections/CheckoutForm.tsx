"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckoutForm: React.FC = () => {
  const cartItem = useSelector((s: any) => s.cart.items);

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  console.log(cartItem);

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Form */}
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <p className="text-sm text-gray-600 mb-6">
            Fill in your details to complete the order.
          </p>

          <form className="space-y-5" noValidate>
            {/* Full Name */}
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
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-red-500 mt-1 invisible">
                {/* error placeholder */}
                Full name is required.
              </p>
            </div>

            {/* Shipping Address */}
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
                placeholder="123 Main St, Dhaka, Bangladesh"
                rows={3}
                className="w-full border border-gray-200 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-red-500 mt-1 invisible">
                Address is required.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+8801XXXXXXXXX"
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-red-500 mt-1 invisible">
                Valid phone number required.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {/* Item */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                  Img
                </div>
                <div>
                  <p className="font-medium">Product Name</p>
                  <p className="text-sm text-gray-500">Qty: 2</p>
                </div>
              </div>
              <div className="font-medium">$40.00</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                  Img
                </div>
                <div>
                  <p className="font-medium">Another Item</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
              </div>
              <div className="font-medium">$25.00</div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium">$65.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium">$5.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>$70.00</span>
              </div>
            </div>
          </div>

          {/* Thank you placeholder (hidden until submit) */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md hidden">
            <p className="font-semibold text-green-800 mb-1">Thank You!</p>
            <p className="text-sm text-green-700">
              Your order has been placed successfully. Order ID:{" "}
              <span className="font-mono">#12345</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
