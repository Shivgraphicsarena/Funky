import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Star, Sliders, ChevronDown, Check, ArrowLeft, Plus, Minus, MessageSquare, Send, X, Heart } from "lucide-react";
import { PRODUCTS_DATA, Product, ProductReview } from "../types";

interface CatalogProps {
  onAddToCart: (product: Product, size: string, colorHex: string, colorName: string, quantity: number) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  searchQuery: string;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const CATEGORIES = ["All", "T-Shirts"];
const SIZES_AVAILABLE = ["XS", "S", "M", "L", "XL", "XXL"];
const STYLES_AVAILABLE = ["Streetwear", "Minimalist", "Jaipur Heritage"];
const COLORS_LIST = [
  { name: "Midnight Black", hex: "#000000" },
  { name: "Goth Forest Green", hex: "#1B3E2F" },
  { name: "Warm Oat Beige", hex: "#EAE2B7" },
  { name: "Healing Lavender", hex: "#8C76AD" }
];

export default function Catalog({
  onAddToCart,
  activeProductId,
  setActiveProductId,
  searchQuery,
  wishlist,
  onToggleWishlist
}: CatalogProps) {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(3000); // max price 3000
  const [sortBy, setSortBy] = useState("popular");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Dynamic Product details parameters
  const [selectedSizeDetail, setSelectedSizeDetail] = useState("L");
  const [selectedColorDetail, setSelectedColorDetail] = useState(""); // hex code, set on product load
  const [detailQty, setDetailQty] = useState(1);
  const [detailTab, setDetailTab] = useState<"details" | "reviews" | "faqs">("reviews");
  const [detailImageIdx, setDetailImageIdx] = useState(0);

  // Write Review State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Local state to hold dynamically added reviews per product id
  const [customReviews, setCustomReviews] = useState<Record<string, ProductReview[]>>({});

  // Reset parameters when viewing a product
  const handleProductClick = (product: Product) => {
    setActiveProductId(product.id);
    setSelectedSizeDetail(product.sizes[0] || "L");
    setSelectedColorDetail(product.colorsHex[0] || "#000000");
    setDetailQty(1);
    setDetailTab("reviews");
    setDetailImageIdx(0);
    setShowReviewForm(false);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    
    // Smooth scroll to top when detail is loaded
    const scrollElem = document.getElementById("shop");
    if (scrollElem) {
      scrollElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorHex: string) => {
    setSelectedColors(prev =>
      prev.includes(colorHex) ? prev.filter(c => c !== colorHex) : [...prev, colorHex]
    );
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(st => st !== style) : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedStyles([]);
    setPriceRange(3000);
    setSortBy("popular");
  };

  // Submit dynamic review handler
  const handleAddReview = (e: React.FormEvent, pId: string) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      alert("Please fill out both your name and comment.");
      return;
    }

    const newReview: ProductReview = {
      id: "user-" + Date.now(),
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: "Today",
      verified: true
    };

    setCustomReviews(prev => ({
      ...prev,
      [pId]: [newReview, ...(prev[pId] || [])]
    }));

    // Reset Review fields
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    setShowReviewForm(false);
  };

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    // Filter by text search query inside header
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Filter by style
    if (selectedStyles.length > 0) {
      list = list.filter(p => selectedStyles.includes(p.style));
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      list = list.filter(p => p.sizes.some(size => selectedSizes.includes(size)));
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      list = list.filter(p => p.colorsHex.some(col => selectedColors.includes(col)));
    }

    // Filter by price
    list = list.filter(p => p.price <= priceRange);

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // popular (default) - no-sort or custom rating formula
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [searchQuery, selectedCategory, selectedSizes, selectedColors, selectedStyles, priceRange, sortBy]);

  // Find active product
  const activeProduct = useMemo(() => {
    return PRODUCTS_DATA.find(p => p.id === activeProductId) || null;
  }, [activeProductId]);

  // Active product unified reviews
  const activeProductReviews = useMemo(() => {
    if (!activeProduct) return [];
    const base = activeProduct.reviewsList;
    const added = customReviews[activeProduct.id] || [];
    return [...added, ...base];
  }, [activeProduct, customReviews]);

  return (
    <section id="shop" className="bg-white py-12 md:py-20 text-black font-sans border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Render Product Detail Screen or Grid Catalogue */}
        <AnimatePresence mode="wait">
          {activeProduct ? (
            /* ========================================================================= */
            /*                          PRODUCT DETAIL SCREEN (B&W)                      */
            /* ========================================================================= */
            <motion.div
              key="product-detail-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 text-left"
            >
              {/* Back breadcrumb bar */}
              <div className="flex items-center gap-2 text-neutral-500 text-xs py-1">
                <button
                  onClick={() => setActiveProductId(null)}
                  className="hover:text-black font-bold uppercase flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
                </button>
                <span>/</span>
                <span className="capitalize">{activeProduct.category}</span>
                <span>/</span>
                <span className="text-black font-bold truncate">{activeProduct.name}</span>
              </div>

              {/* Main Product display row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Photo Gallery (Left Side - 3 thumbnails, 1 large preview) */}
                <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
                  {/* Thumbnails row */}
                  <div className="flex md:flex-col gap-3 shrink-0">
                    {activeProduct.imagesList.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setDetailImageIdx(i)}
                        className={`w-16 h-16 md:w-20 md:h-20 bg-neutral-50 border rounded-2xl flex items-center justify-center p-1 overflow-hidden transition-all duration-200 cursor-pointer ${
                          detailImageIdx === i ? "border-black border-2" : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt="thumbnail angle"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Main Display Image */}
                  <div className="flex-grow aspect-square bg-[#F0EEED] rounded-3xl overflow-hidden flex items-center justify-center p-4 border border-neutral-100 relative group">
                    <img
                      src={activeProduct.imagesList[detailImageIdx] || activeProduct.image}
                      alt={activeProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition duration-500 ease-out"
                    />
                    {activeProduct.originalPrice && (
                      <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                        Sale Drop
                      </div>
                    )}
                  </div>
                </div>

                {/* Details purchase options (Right Side - size, color counters, metrics) */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black">
                      {activeProduct.name}
                    </h2>
                    
                    {/* Stars and rating block */}
                    <div className="flex items-center gap-2 mt-2 select-none">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(activeProduct.rating) ? "fill-current" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-black font-sans">
                        {activeProduct.rating}/5
                      </span>
                      <span className="text-neutral-400 text-xs font-medium">
                        ({activeProductReviews.length} Verified Reviews)
                      </span>
                    </div>

                    <p className="italic font-serif py-1.5 text-neutral-500 font-medium text-sm">
                      "{activeProduct.tagline}"
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-center gap-3.5 py-4 border-y border-neutral-100">
                    <span className="font-sans font-black text-2.5xl text-black">
                      ₹{activeProduct.price}
                    </span>
                    {activeProduct.originalPrice && (
                      <>
                        <span className="font-sans line-through text-neutral-400 text-lg decoration-2">
                          ₹{activeProduct.originalPrice}
                        </span>
                        <span className="bg-red-50 text-red-500 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full border border-red-100">
                          -{Math.round(((activeProduct.originalPrice - activeProduct.price) / activeProduct.originalPrice) * 100)}% DIFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description Paragraph */}
                  <div className="space-y-4">
                    <p className="text-[#333333] text-sm leading-relaxed font-sans">
                      {activeProduct.description}
                    </p>
                    
                    {/* Prints details mapping specs */}
                    <div className="grid grid-cols-2 gap-3 pb-2">
                      {activeProduct.frontPrintDesc && (
                        <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-xs">
                          <span className="block text-[9px] text-neutral-400 font-mono uppercase font-bold">FRONT SIDE INFO</span>
                          <span className="font-bold text-neutral-800">{activeProduct.frontPrintDesc}</span>
                        </div>
                      )}
                      {activeProduct.backPrintDesc && (
                        <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-xs">
                          <span className="block text-[9px] text-neutral-400 font-mono uppercase font-bold">BACK SIDE INFO</span>
                          <span className="font-bold text-neutral-800">{activeProduct.backPrintDesc}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Selector circles */}
                  <div>
                    <span className="block text-[11px] font-mono text-neutral-500 uppercase tracking-widest font-bold mb-2">
                      Select Color
                    </span>
                    <div className="flex items-center gap-2.5">
                      {activeProduct.colorsHex.map((colVal) => {
                        const isSelected = selectedColorDetail === colVal;
                        // Map hex to real name
                        const colObj = COLORS_LIST.find(c => c.hex.toLowerCase() === colVal.toLowerCase()) || { name: "Custom color", hex: colVal };
                        return (
                          <button
                            key={colVal}
                            onClick={() => setSelectedColorDetail(colVal)}
                            style={{ backgroundColor: colVal }}
                            className={`w-9 h-9 rounded-full border shadow-xs relative transition duration-150 cursor-pointer ${
                              isSelected ? "ring-2 ring-black ring-offset-2 scale-103" : "border-neutral-200 hover:scale-105"
                            }`}
                            title={colObj.name}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-white absolute inset-0 m-auto mix-blend-difference" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sizes pill selector */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest font-bold text-neutral-500 mb-2">
                      <span>Select Size</span>
                      <span className="opacity-60 underline cursor-pointer hover:text-black">Fit Chart (Oversized)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes.map((sz) => {
                        const isSelected = selectedSizeDetail === sz;
                        return (
                          <button
                            key={sz}
                            onClick={() => setSelectedSizeDetail(sz)}
                            className={`px-4.5 py-3 text-xs font-mono font-bold rounded-2xl border transition duration-200 cursor-pointer shrink-0 ${
                              isSelected
                                ? "bg-black text-white border-black"
                                : "bg-[#F0F0F0] border-transparent text-neutral-700 hover:border-neutral-300"
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Counter and Buy Drawer CTAs */}
                  <div className="flex gap-4 items-center pt-4 border-t border-neutral-100">
                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 border border-transparent">
                      <button
                        onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                        className="p-1 px-2.5 text-neutral-500 hover:text-black transition duration-150 cursor-pointer"
                        disabled={detailQty <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5 text-sm font-sans font-black select-none font-mono">
                        {detailQty}
                      </span>
                      <button
                        onClick={() => setDetailQty(detailQty + 1)}
                        className="p-1 px-2.5 text-neutral-500 hover:text-black transition duration-150 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        const colObj = COLORS_LIST.find(c => c.hex === selectedColorDetail) || { name: activeProduct.color, hex: selectedColorDetail };
                        onAddToCart(activeProduct, selectedSizeDetail, selectedColorDetail, colObj.name, detailQty);
                      }}
                      className="flex-grow bg-black hover:bg-neutral-800 text-white font-bold py-4 px-8 rounded-full text-xs uppercase tracking-widest transition duration-200 flex items-center justify-center gap-2 shadow hover:shadow-lg cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Lower Section Tabs: Product Details, Ratings, FAQ */}
              <div className="pt-12 border-t border-neutral-100 space-y-8">
                {/* Tabs selection buttons bar */}
                <div className="flex border-b border-neutral-200 text-center select-none">
                  {(["details", "reviews", "faqs"] as const).map((tab) => {
                    const isSelected = detailTab === tab;
                    const labels = {
                      details: "Product Details",
                      reviews: `Reviews (${activeProductReviews.length})`,
                      faqs: "FAQS & Care"
                    };
                    return (
                      <button
                        key={tab}
                        onClick={() => setDetailTab(tab)}
                        className={`flex-1 pb-4 text-xs md:text-sm font-bold uppercase tracking-wider transition ${
                          isSelected
                            ? "border-b-2 border-black text-black font-black"
                            : "text-neutral-400 hover:text-neutral-700"
                        }`}
                      >
                        {labels[tab]}
                      </button>
                    );
                  })}
                </div>

                {/* Switch tab content renders */}
                <div className="min-h-48 font-sans">
                  
                  {detailTab === "details" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm max-w-4xl"
                    >
                      <div>
                        <h4 className="font-extrabold text-black uppercase mb-3 font-sans">Craft & Thread Standards</h4>
                        <ul className="space-y-2.5">
                          {activeProduct.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-neutral-600 font-mono">
                              <span className="text-black font-bold">✦</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-black uppercase mb-3 font-sans">Social Narrative Concept</h4>
                        <div className="bg-neutral-50 p-4.5 rounded-2xl border border-neutral-100 italic font-serif leading-relaxed text-neutral-600 block text-xs md:text-sm">
                          "{activeProduct.instaStory}"
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {detailTab === "faqs" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4 max-w-2xl text-xs md:text-sm text-neutral-600"
                    >
                      <div className="border border-neutral-100 rounded-2xl p-4 bg-neutral-50">
                        <strong className="text-black block mb-1">How should I wash my overthinker tee?</strong>
                        <p className="leading-relaxed">Turn garment inside out. Cold wash with mild liquid detergent. Avoid tumble dry at high temperatures to protect the premium soft ink graphics.</p>
                      </div>
                      <div className="border border-neutral-100 rounded-2xl p-4 bg-neutral-50">
                        <strong className="text-black block mb-1">What is the fit of these drops?</strong>
                        <p className="leading-relaxed">Our drops are unisex streetwear and intentionally *oversized* (relaxed drop shoulders with wide armholes). We recommend buying your general size for that perfect streetwear drape, or size down if you prefer standard fit.</p>
                      </div>
                    </motion.div>
                  )}

                  {detailTab === "reviews" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      {/* Section header panel */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-base font-black uppercase text-black">Verifiable Reviews</h4>
                          <span className="text-xs text-neutral-550 leading-relaxed font-medium">Genuine experiences shared by customers wearing personality from Jaipur.</span>
                        </div>
                        
                        {/* Write a review clicker */}
                        <button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="bg-black hover:bg-neutral-800 text-white font-bold px-5 py-2.5 text-xs uppercase tracking-wider rounded-full transition duration-150 flex items-center gap-1 cursor-pointer shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{showReviewForm ? "Cancel Review" : "Write a Review"}</span>
                        </button>
                      </div>

                      {/* Display write a review form */}
                      <AnimatePresence>
                        {showReviewForm && (
                          <motion.form
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={(e) => handleAddReview(e, activeProduct.id)}
                            className="bg-neutral-50 border border-neutral-150 p-5 rounded-2xl max-w-lg space-y-4 text-xs font-sans"
                          >
                            <span className="block font-black text-xs uppercase tracking-wider text-black pb-1.5 border-b border-neutral-200">
                              ★ REVIEW OUR STREETWEAR VIBE
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] uppercase font-mono text-neutral-400 font-bold mb-1">Your Name</label>
                                <input
                                  type="text"
                                  value={reviewName}
                                  onChange={(e) => setReviewName(e.target.value)}
                                  placeholder="Jane Doe"
                                  className="w-full bg-white border border-neutral-200 px-3.5 py-2 rounded-xl focus:border-black outline-none font-bold"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] uppercase font-mono text-neutral-400 font-bold mb-1">Star Rating</label>
                                <select
                                  value={reviewRating}
                                  onChange={(e) => setReviewRating(Number(e.target.value))}
                                  className="w-full bg-white border border-neutral-200 px-3 py-2 rounded-xl focus:border-black outline-none font-bold cursor-pointer"
                                >
                                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                                  <option value={3}>⭐⭐⭐ (3/5)</option>
                                  <option value={2}>⭐⭐ (2/5)</option>
                                  <option value={1}>⭐ (1/5)</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-mono text-neutral-400 font-bold mb-1">Review Comments</label>
                              <textarea
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                placeholder="Explain the heavyweight drape, fit comfort, or general mood..."
                                rows={3}
                                className="w-full bg-white border border-neutral-200 px-3.5 py-2 rounded-xl focus:border-black outline-none leading-relaxed font-medium resize-none"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="bg-black hover:bg-neutral-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-1"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit My Review</span>
                            </button>
                          </motion.form>
                        )}
                      </AnimatePresence>

                      {/* Review Items list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeProductReviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="bg-white border rounded-2xl p-5 border-neutral-150 hover:border-neutral-300 transition-all duration-200 space-y-3 relative flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 select-none">
                                <div className="text-amber-400 flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3.5 h-3.5 ${
                                        i < rev.rating ? "fill-current animate-pulse-slow" : "opacity-30"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {rev.verified && (
                                  <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                    ✓ Verified
                                  </span>
                                )}
                              </div>

                              <div className="text-xs font-black text-black">
                                {rev.name}
                              </div>

                              <p className="text-xs md:text-sm text-[#444444] leading-normal font-sans">
                                "{rev.comment}"
                              </p>
                            </div>

                            <div className="text-[10px] text-neutral-400 font-mono mt-2 flex justify-between">
                              <span>Posted {rev.date}</span>
                              <span className="italic block capitalize font-sans">{activeProduct.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}

                </div>
              </div>

            </motion.div>
          ) : (
            /* ========================================================================= */
            /*                            CATALOGUE PRODUCT GRID SECTION                */
            /* ========================================================================= */
            <div key="catalog-listing-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* FILTER SIDEBAR (Visible on Desktop / Sliding panel on mobile) */}
              <div className="hidden lg:col-span-3 lg:block min-h-64 border border-neutral-100 rounded-3xl p-6 bg-white space-y-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <span className="font-sans font-black text-base uppercase tracking-tight text-black flex items-center gap-1.5">
                    <Sliders className="w-4.5 h-4.5 text-black" /> Filters
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-[10px] text-neutral-500 hover:text-black font-semibold uppercase hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Categories filter */}
                <div className="space-y-2 pb-5 border-b border-neutral-100">
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Category
                  </span>
                  <div className="space-y-1.5 font-sans font-medium text-sm text-neutral-600">
                    {CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === (cat === "All" ? "All" : cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`block w-full text-left transition duration-150 py-1 cursor-pointer text-xs ${
                            isActive ? "text-black font-extrabold pl-1 border-l-2 border-black" : "hover:text-black"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Range price filter */}
                <div className="space-y-2 pb-5 border-b border-neutral-100">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    <span>Max Price</span>
                    <span className="text-black font-black">₹{priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={3000}
                    step={100}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                    <span>₹500</span>
                    <span>₹3000</span>
                  </div>
                </div>

                {/* Color Selector filters */}
                <div className="space-y-2 pb-5 border-b border-neutral-100">
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Colors
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {COLORS_LIST.map((col) => {
                      const isSelected = selectedColors.includes(col.hex);
                      return (
                        <button
                          key={col.hex}
                          onClick={() => handleColorToggle(col.hex)}
                          style={{ backgroundColor: col.hex }}
                          className={`w-6 h-6 rounded-full border shadow-xs relative cursor-pointer ${
                            isSelected ? "ring-2 ring-black ring-offset-1 scale-103" : "border-neutral-200 hover:scale-110"
                          }`}
                          title={`${col.name}${isSelected ? ' (Selected)' : ''}`}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto mix-blend-difference" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizes filter checkboxes */}
                <div className="space-y-2 pb-5 border-b border-neutral-100">
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Sizes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SIZES_AVAILABLE.map((sz) => {
                      const isSelected = selectedSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          onClick={() => handleSizeToggle(sz)}
                          className={`w-9 h-9 text-[10px] font-mono font-semibold rounded-xl border transition duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-black text-white border-black"
                              : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dress Style filters */}
                <div className="space-y-2">
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Vibe / Style
                  </span>
                  <div className="space-y-1.5 font-sans font-medium text-sm text-neutral-600">
                    {STYLES_AVAILABLE.map((sty) => {
                      const isSelected = selectedStyles.includes(sty);
                      return (
                        <button
                          key={sty}
                          onClick={() => handleStyleToggle(sty)}
                          className={`block w-full text-left transition duration-150 py-1 cursor-pointer text-xs ${
                            isSelected ? "text-black font-extrabold pl-1 border-l-2 border-black" : "hover:text-black"
                          }`}
                        >
                          {sty} {isSelected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* PRODUCTS LIST GRID (Right Side - 9cols grid) */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Catalog header bar counters + sorting drop option */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                  <div className="text-left font-sans">
                    <h3 className="font-sans font-black uppercase text-xl md:text-2xl text-black flex items-center gap-2">
                      {selectedCategory === "All" ? "ALL PRODUCTS" : `${selectedCategory.toUpperCase()}`}
                      {searchQuery && <span className="text-neutral-400 text-xs font-bold leading-normal lowercase">searching: "{searchQuery}"</span>}
                    </h3>
                    <p className="text-neutral-400 text-xs font-semibold">
                      Showing {processedProducts.length} unique drops
                    </p>
                  </div>

                  {/* Sorting dropdown */}
                  <div className="flex items-center gap-2 justify-between">
                    {/* Mobile filter button trigger */}
                    <button
                      onClick={() => setShowMobileFilter(true)}
                      className="lg:hidden p-2.5 px-3.5 border border-neutral-250 hover:border-black rounded-full text-xs font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" /> Filters
                    </button>

                    <div className="flex items-center gap-1 flex-shrink-0 text-xs font-sans font-semibold text-neutral-500">
                      <span>Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-neutral-50 font-bold border border-neutral-200 hover:border-neutral-400 rounded-full px-3 py-1.5 outline-none text-black cursor-pointer"
                      >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Display mobile filters drawer dialog */}
                <AnimatePresence>
                  {showMobileFilter && (
                    <div className="fixed inset-0 bg-black/60 z-[95] flex justify-end lg:hidden">
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.25 }}
                        className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 text-left flex flex-col justify-between"
                      >
                        <div className="space-y-6">
                          <div className="flex items-center justify-between pb-4 border-b">
                            <span className="font-black text-base uppercase flex items-center gap-1.5"><Sliders className="w-4 h-4" /> Filters</span>
                            <button
                              onClick={() => setShowMobileFilter(false)}
                              className="p-1 cursor-pointer"
                            >
                              <X className="w-5 h-5 text-black" />
                            </button>
                          </div>

                          {/* Categories filter mobile */}
                          <div className="space-y-2">
                            <span className="block text-[10px] font-mono font-bold uppercase text-neutral-400">Category</span>
                            <div className="flex flex-wrap gap-1.5">
                              {CATEGORIES.map(cat => (
                                <button
                                  key={cat}
                                  onClick={() => setSelectedCategory(cat)}
                                  className={`px-3 py-2 text-xs rounded-xl border ${
                                    selectedCategory === cat ? "bg-black text-white" : "bg-neutral-50 text-neutral-600"
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Color select mobile */}
                          <div className="space-y-2">
                            <span className="block text-[10px] font-mono font-bold uppercase text-neutral-400">Colors</span>
                            <div className="flex flex-wrap gap-2">
                              {COLORS_LIST.map(col => {
                                const isSelected = selectedColors.includes(col.hex);
                                return (
                                  <button
                                    key={col.hex}
                                    onClick={() => handleColorToggle(col.hex)}
                                    style={{ backgroundColor: col.hex }}
                                    className={`w-7 h-7 rounded-full border relative ${isSelected ? "ring-2 ring-black" : ""}`}
                                  >
                                    {isSelected && <Check className="w-4 h-4 text-white absolute inset-0 m-auto mix-blend-difference" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sizes select mobile */}
                          <div className="space-y-2">
                            <span className="block text-[10px] font-mono font-bold uppercase text-neutral-400">Sizes</span>
                            <div className="flex flex-wrap gap-2">
                              {SIZES_AVAILABLE.map(sz => {
                                const isSelected = selectedSizes.includes(sz);
                                return (
                                  <button
                                    key={sz}
                                    onClick={() => handleSizeToggle(sz)}
                                    className={`w-9 h-9 text-xs font-mono font-bold rounded-xl border ${
                                      isSelected ? "bg-black text-white" : "bg-neutral-50"
                                    }`}
                                  >
                                    {sz}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        <div className="pt-6 border-t flex gap-2">
                          <button
                            onClick={() => {
                              clearFilters();
                              setShowMobileFilter(false);
                            }}
                            className="flex-1 py-3 bg-neutral-100 rounded-xl text-xs font-bold uppercase text-center"
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => setShowMobileFilter(false)}
                            className="flex-1 py-3 bg-black text-white rounded-xl text-xs font-bold uppercase text-center"
                          >
                            Apply Filters
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Display filtered results empty warning or main items grid */}
                {processedProducts.length === 0 ? (
                  <div className="bg-neutral-50 border border-neutral-100 rounded-2xl py-16 px-4 text-center space-y-3">
                    <span className="text-3xl">🏜️</span>
                    <h4 className="font-bold text-neutral-700">No products match your criteria</h4>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Try resetting your price range, toggling other color checkboxes, or search with different keywords.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold uppercase border hover:bg-neutral-800 transition"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {processedProducts.map((p) => {
                      // Dynamic total product reviews
                      const userInSessionReviews = customReviews[p.id] || [];
                      const totReviewsCount = p.reviewsCount + userInSessionReviews.length;
                      const isWishlisted = wishlist.includes(p.id);

                      return (
                        <div
                          key={p.id}
                          onClick={() => handleProductClick(p)}
                          className="group bg-white border border-neutral-100 rounded-[16px] md:rounded-[24px] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-left relative shadow-xs"
                        >
                          {/* Image wrap aspect ratio */}
                          <div className="aspect-square bg-[#F0EEED] overflow-hidden flex items-center justify-center p-2 relative">
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover rounded-xl group-hover:scale-104 transition duration-500 ease-out"
                            />
                            {p.originalPrice && (
                              <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white font-black text-[8px] md:text-[9px] uppercase tracking-wider px-1.5 md:px-2 py-0.5 rounded-full shadow-xs">
                                Special Drop
                              </span>
                            )}

                            {/* Wishlist Heart Overlay */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWishlist(p.id);
                              }}
                              className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/95 hover:bg-white rounded-full p-1.5 md:p-2 shadow-sm hover:shadow-md transition-all duration-200 z-10 text-neutral-400 hover:text-red-500 hover:scale-110 cursor-pointer"
                              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 transition-colors ${
                                  isWishlisted
                                    ? "fill-red-500 text-red-500"
                                    : "text-neutral-500 hover:text-red-500"
                                }`}
                              />
                            </button>
                          </div>

                          {/* Info panel */}
                          <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
                            <div className="space-y-1">
                              <h4 className="font-display font-black text-xs md:text-sm uppercase tracking-tight text-neutral-900 group-hover:text-neutral-500 transition line-clamp-1">
                                {p.name}
                              </h4>

                              {/* Star Ratings Row */}
                              <div className="flex items-center gap-1 select-none">
                                <div className="text-amber-400 flex items-center">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={idx}
                                      className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                                        idx < Math.floor(p.rating) ? "fill-current" : "opacity-30"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[9px] md:text-[10px] font-bold text-neutral-800 ml-0.5">
                                  {p.rating}/5
                                </span>
                              </div>

                              <div className="text-[10px] md:text-[11px] text-neutral-400 italic line-clamp-1 leading-normal pr-2 pt-0.5 font-medium">
                                "{p.tagline}"
                              </div>
                            </div>

                            {/* Price labels */}
                            <div className="flex items-center gap-1.5 md:gap-2 pt-2 md:pt-3 border-t border-neutral-100/60 mt-2.5 md:mt-3 select-none">
                              <span className="text-neutral-900 font-sans font-black text-xs md:text-sm">
                                ₹{p.price}
                              </span>
                              {p.originalPrice && (
                                <>
                                  <span className="line-through text-neutral-450 text-[10px] md:text-xs font-medium">
                                    ₹{p.originalPrice}
                                  </span>
                                  <span className="bg-red-50 text-red-500 text-[8px] md:text-[9px] font-black px-1 md:px-1.5 py-0.5 rounded-full">
                                    -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                                  </span>
                                </>
                              )}
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
