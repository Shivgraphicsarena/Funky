import React, { useState } from "react";
import { X, Trash2, Plus, Minus, Ticket, CreditCard, CheckCircle, MessageSquare, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, Product, PRODUCTS_DATA } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  whatsAppNumber: string;
  onClearCart?: () => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, size: string, colorHex: string, colorName: string, quantity: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  whatsAppNumber,
  onClearCart,
  wishlist,
  onToggleWishlist,
  onAddToCart
}: CartDrawerProps) {
  const cart = cartItems;
  const [activeTab, setActiveTab] = useState<"cart" | "wishlist">("cart");
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // as percentage, e.g. 20 for 20%
  const [appliedCodeString, setAppliedCodeString] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  
  // Checkout sequence states: "cart" -> "checkout" -> "confirmed"
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "confirmed">("cart");
  
  // Checkout form info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (code === "GET20") {
      setAppliedDiscount(20);
      setAppliedCodeString("GET20");
      setPromoCode("");
    } else if (code === "OVERTHINKER") {
      setAppliedDiscount(10);
      setAppliedCodeString("OVERTHINKER");
      setPromoCode("");
    } else if (code) {
      setPromoError("Invalid code. Try 'GET20' (20% off) or 'OVERTHINKER' (10% off)");
    }
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(0);
    setAppliedCodeString(null);
  };

  // Calculations
  const subtotal = cart.reduce((sums, item) => sums + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 99; // Free shipping over ₹1500
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const totalItemsCount = cart.reduce((sums, item) => sums + item.quantity, 0);

  const startCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep("checkout");
  };

  const executeWhatsAppCheckout = () => {
    if (!fullName || !phone || !address || !postalCode) {
      alert("Please fill in all details to proceed.");
      return;
    }
    
    // Structure WhatsApp message string
    let message = `*NEW ORDER - FUNKIFY STREETWEAR* 🧠🖤\n\n`;
    message += `*Customer Details:*\n`;
    message += `• Name: ${fullName}\n`;
    message += `• Phone: ${phone}\n`;
    message += `• Shipping Address: ${address}, Pincode: ${postalCode}\n\n`;
    
    message += `*Items Ordered:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* \n`;
      message += `   - Qty: ${item.quantity}\n`;
      message += `   - Size: ${item.size}\n`;
      message += `   - Color: ${item.colorName}\n`;
      message += `   - Price: ₹${item.product.price} each\n\n`;
    });
    
    if (appliedCodeString) {
      message += `*Promo Code:* ${appliedCodeString} (-${appliedDiscount}%)\n`;
    }
    message += `• Subtotal: ₹${subtotal}\n`;
    message += `• Discount: -₹${discountAmount}\n`;
    message += `• Delivery: ₹${deliveryFee === 0 ? "FREE" : "₹" + deliveryFee}\n`;
    message += `*• Total Bill: ₹${finalTotal}*\n\n`;
    message += `Please confirm my order and send payment QR details! 📦👕✨`;

    const waUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    
    // Mark as confirmed
    const fakeId = "FNK-" + Math.floor(Math.random() * 900000 + 100000);
    setOrderId(fakeId);
    setCheckoutStep("confirmed");
  };

  const executeSimulatedExpressPay = () => {
    if (!fullName || !phone || !address || !postalCode) {
      alert("Please fill in all details to proceed.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      const fakeId = "FNK-" + Math.floor(Math.random() * 900000 + 100000);
      setOrderId(fakeId);
      setCheckoutStep("confirmed");
    }, 1800);
  };

  const resetAllCheckout = () => {
    setCheckoutStep("cart");
    setFullName("");
    setPhone("");
    setAddress("");
    setPostalCode("");
    // Clear cart or keep it? In a real flow, success clears the cart. We can let the parent handle clearing cart if needed.
    // We'll let checkout keep cart until they click close.
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white text-black z-[70] shadow-2xl flex flex-col h-full font-sans border-l border-neutral-100"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold uppercase tracking-tight text-[15px]">YOUR CART</span>
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                  {totalItemsCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-black transition cursor-pointer"
                id="cart-drawer-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Display based on steps */}
            {checkoutStep === "cart" && (
              <>
                {/* Switchable Navigation Tabs: Bag vs Saved Wishlist */}
                <div className="flex border-b border-neutral-100 bg-neutral-50 px-2 shrink-0 select-none">
                  <button
                    onClick={() => setActiveTab("cart")}
                    className={`flex-1 py-3 text-center text-xs font-extrabold uppercase tracking-widest relative transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === "cart" ? "text-black border-b-2 border-black" : "text-neutral-450 hover:text-neutral-700"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>My Bag ({totalItemsCount})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`flex-1 py-3 text-center text-xs font-extrabold uppercase tracking-widest relative transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === "wishlist" ? "text-black border-b-2 border-black" : "text-neutral-450 hover:text-neutral-700"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wishlist.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
                    <span>Wishlist ({wishlist.length})</span>
                  </button>
                </div>

                {activeTab === "cart" ? (
                  <>
                    {/* Cart list */}
                    <div className="flex-grow overflow-y-auto p-5 space-y-4">
                      {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 animate-fade-in">
                          <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                            <Trash2 className="w-6 h-6 shrink-0" />
                          </div>
                          <div>
                            <h4 className="font-bold text-neutral-800">Your cart is empty</h4>
                            <p className="text-xs text-neutral-400 max-w-xs mt-1">
                              You haven't added any products to your cart yet. Explore our oversized Jaipur streetwear collection!
                            </p>
                          </div>
                          <button
                            onClick={onClose}
                            className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition"
                          >
                            Shop Collection
                          </button>
                        </div>
                      ) : (
                        cart.map((item, idx) => (
                          <div
                            key={`${item.product.id}-${item.size}-${item.colorHex}`}
                            className="flex gap-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 relative group animate-fade-in"
                          >
                            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-neutral-200/50 flex items-center justify-center p-1">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>

                            <div className="flex-grow flex flex-col justify-between py-0.5">
                              <div>
                                <div className="flex justify-between items-start gap-1">
                                  <h5 className="font-bold text-xs line-clamp-1 uppercase tracking-tight text-neutral-900">
                                    {item.product.name}
                                  </h5>
                                  <button
                                    onClick={() => onRemoveItem(idx)}
                                    className="text-neutral-400 hover:text-red-500 cursor-pointer p-0.5"
                                    title="Remove item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-neutral-500 font-mono mt-1">
                                  <span>Size: <strong className="text-neutral-800">{item.size}</strong></span>
                                  <span className="flex items-center gap-1">
                                    Color: 
                                    <span
                                      className="w-2 h-2 rounded-full border border-neutral-300"
                                      style={{ backgroundColor: item.colorHex }}
                                    />
                                    <strong className="text-neutral-800">{item.colorName}</strong>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2.5">
                                {/* Quantity selector */}
                                <div className="flex items-center border border-neutral-200 bg-white rounded-lg">
                                  <button
                                    onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                    className="p-1 px-2 text-neutral-400 hover:text-black transition"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2.5 text-xs font-bold font-mono">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                    className="p-1 px-2 text-neutral-400 hover:text-black transition"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <span className="font-extrabold text-xs text-neutral-900 font-mono">
                                  ₹{item.product.price * item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Subtotals & Promos */}
                    {cart.length > 0 && (
                      <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
                        {/* Promo Section */}
                        <div>
                          {appliedCodeString ? (
                            <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl px-3.5 py-2 text-xs">
                              <span className="font-medium flex items-center gap-1.5 font-mono">
                                <Ticket className="w-4 h-4 text-emerald-600" />
                                PROMO APPLIED: <strong>{appliedCodeString}</strong> (-{appliedDiscount}%)
                              </span>
                              <button
                                onClick={handleRemovePromo}
                                className="text-[10px] text-zinc-500 hover:text-black cursor-pointer font-bold uppercase hover:underline"
                              >
                                [Remove]
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={handleApplyPromo} className="space-y-1">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={promoCode}
                                  onChange={(e) => setPromoCode(e.target.value)}
                                  placeholder="Promo Code (GET20)"
                                  className="bg-white border border-neutral-200 px-3.5 py-2.5 rounded-xl text-xs flex-grow outline-none focus:border-black font-semibold"
                                />
                                <button
                                  type="submit"
                                  className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-neutral-800 transition"
                                >
                                  Apply
                                </button>
                              </div>
                              {promoError && (
                                <span className="text-[10px] text-red-500 font-mono block pl-1">
                                  {promoError}
                                </span>
                              )}
                            </form>
                          )}
                        </div>

                        {/* Math table */}
                        <div className="space-y-2 text-xs text-neutral-600 font-mono">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-neutral-900 font-bold">₹{subtotal}</span>
                          </div>
                          {appliedDiscount > 0 && (
                            <div className="flex justify-between text-emerald-600">
                              <span>Discount ({appliedDiscount}%)</span>
                              <span>-₹{discountAmount}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                          </div>
                          <div className="flex justify-between text-[14px] font-sans font-black text-neutral-900 pt-2 border-t border-neutral-100">
                            <span>TOTAL AMOUNT</span>
                            <span>₹{finalTotal}</span>
                          </div>
                        </div>

                        <button
                          onClick={startCheckout}
                          className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
                          id="cart-checkout-button"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Proceed with Checkout</span>
                        </button>
                        <p className="text-[9px] text-neutral-400 text-center uppercase tracking-wider font-mono">
                          💡 Tip: Use GET20 coupon for 20% flat discount!
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  /* Wishlist Viewport */
                  <div className="flex-grow overflow-y-auto p-5 space-y-4 animate-fade-in flex flex-col">
                    {wishlist.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 flex-grow">
                        <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center text-red-400">
                          <Heart className="w-6 h-6 shrink-0" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-850">Your Wishlist is Empty</h4>
                          <p className="text-xs text-neutral-400 max-w-xs mt-1 leading-relaxed">
                            Tap the heart button on streetwear garments in our showroom to persist them here.
                          </p>
                        </div>
                        <button
                          onClick={onClose}
                          className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition"
                        >
                          Explore Streetwear
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                            Saved Pieces ({wishlist.length})
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {PRODUCTS_DATA.filter((p) => wishlist.includes(p.id)).map((p) => (
                            <div
                              key={p.id}
                              className="flex gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 items-center justify-between"
                            >
                              <div className="flex gap-3 items-center min-w-0">
                                {/* Thumbnail */}
                                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-neutral-250/20 flex items-center justify-center p-1">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover rounded-lg"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                
                                {/* Info */}
                                <div className="space-y-0.5 min-w-0">
                                  <h5 className="font-bold text-xs uppercase tracking-tight text-neutral-900 line-clamp-1">
                                    {p.name}
                                  </h5>
                                  <p className="text-[10px] text-neutral-400 line-clamp-1 italic">
                                    "{p.tagline}"
                                  </p>
                                  <div className="flex items-center gap-1.5 pt-0.5">
                                    <span className="font-extrabold text-xs text-neutral-900 font-mono">
                                      ₹{p.price}
                                    </span>
                                    {p.originalPrice && (
                                      <span className="line-through text-neutral-400 text-[10px] font-mono">
                                        ₹{p.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Quick buy/add Actions */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => {
                                    // Add to cart with defaults
                                    onAddToCart(p, p.sizes[0] || "L", p.colorsHex?.[0] || "#010101", p.color || "Default", 1);
                                    setActiveTab("cart"); // Switch representation
                                  }}
                                  className="bg-black hover:bg-neutral-800 text-white rounded-full p-2 hover:scale-105 transition cursor-pointer"
                                  title="Add selection to Bag"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onToggleWishlist(p.id)}
                                  className="text-neutral-400 hover:text-red-500 rounded-full p-2 hover:bg-neutral-100 transition cursor-pointer"
                                  title="Remove Item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {checkoutStep === "checkout" && (
              <div className="flex-grow overflow-y-auto p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="text-xs text-neutral-500 font-bold hover:text-black hover:underline uppercase flex items-center gap-1 cursor-pointer mb-3"
                  >
                    ← Back to Cart
                  </button>

                  <h3 className="font-extrabold text-[15px] uppercase tracking-tight text-neutral-900 border-b border-neutral-100 pb-2">
                    SHIPPING & BILLING INFO
                  </h3>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-neutral-500 font-bold mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 rounded-xl focus:border-black outline-none font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-neutral-500 font-bold mb-1">
                        Contact Number (WhatsApp enabled)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 rounded-xl focus:border-black outline-none font-sans font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-neutral-500 font-bold mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House No, Street, City, State"
                        rows={3}
                        className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 rounded-xl focus:border-black outline-none leading-normal font-semibold resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-neutral-500 font-bold mb-1">
                        Postal Pincode
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="e.g. 302001"
                        maxLength={6}
                        className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 rounded-xl focus:border-black outline-none font-mono font-semibold"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-5 border-t border-neutral-100">
                  <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-150 text-[11px] text-neutral-500 leading-normal font-mono mb-2">
                    <span className="font-extrabold text-neutral-800 block mb-1">ORDER SUMMARY</span>
                    Total Items: {totalItemsCount} <br />
                    Final Bill: <strong className="text-neutral-900 text-[12px]">₹{finalTotal}</strong>
                  </div>

                  {/* WhatsApp Ordering Option */}
                  <button
                    onClick={executeWhatsAppCheckout}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE55] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 fill-current text-white" />
                    <span>Send Order to WhatsApp</span>
                  </button>

                  {/* Credit Card Express Option */}
                  <button
                    onClick={executeSimulatedExpressPay}
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white animate-spin rounded-full"></span>
                        Processing Payment...
                      </span>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-white" />
                        <span>Simulate Express Card Checkout</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === "confirmed" && (
              <div className="flex-grow p-5 flex flex-col items-center justify-center text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500"
                >
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </motion.div>

                <div>
                  <h3 className="font-extrabold text-neutral-800 text-lg uppercase tracking-tight">Order Confirmed!</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    Thank you for your purchase. Your order has been placed successfully and has been routed to our packaging hub.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 w-full text-left space-y-1.5 font-mono text-[11px] text-neutral-500">
                  <div>
                    Order reference: <strong className="text-neutral-800">{orderId}</strong>
                  </div>
                  <div>
                    Delivering to: <strong className="text-neutral-800">{fullName}</strong>
                  </div>
                  <div>
                    Shipping Address: <span className="text-neutral-700">{address}, {postalCode}</span>
                  </div>
                  <div>
                    Billed Amount: <strong className="text-neutral-900 font-extrabold">₹{finalTotal}</strong>
                  </div>
                </div>

                <div className="text-neutral-400 text-[10px] leading-relaxed italic max-w-xs font-mono">
                  ✨ Instant WhatsApp support is online. If you initiated WhatsApp routing, check your chats to finalize payment!
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition"
                  id="checkout-success-close"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
