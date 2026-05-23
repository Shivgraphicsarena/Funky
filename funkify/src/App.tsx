import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import NewArrivals from "./components/NewArrivals";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { Product, CartItem } from "./types";

export default function App() {
  // Configurable WhatsApp Phone routing state
  const [whatsAppNumber, setWhatsAppNumber] = useState("919999999999");
  
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Persistent Wishlist state (local storage backed)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("funkify_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("funkify_wishlist", JSON.stringify(next));
      } catch (e) {
        console.error("Storage error:", e);
      }
      return next;
    });
  };

  // Search filter query string
  const [searchQuery, setSearchQuery] = useState("");

  // Product Detail dynamic page selection
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  // Add Item to cart logic
  const handleAddToCart = (
    product: Product,
    size: string,
    colorHex: string,
    colorName: string,
    quantity: number
  ) => {
    setCart((prevCart) => {
      // Check if exact variant (id + size + colorHex) is already in the bag
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.colorHex === colorHex
      );

      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + quantity
        };
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            product,
            size,
            colorHex,
            colorName,
            quantity
          }
        ];
      }
    });

    // Auto trigger the cart drawer for seamless feedback
    setCartOpen(true);
  };

  // Update item counts in checkout bag
  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      const nextQty = nextCart[index].quantity + delta;
      
      if (nextQty <= 0) {
        nextCart.splice(index, 1);
      } else {
        nextCart[index] = {
          ...nextCart[index],
          quantity: nextQty
        };
      }
      return nextCart;
    });
  };

  // Remove element from bag
  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      nextCart.splice(index, 1);
      return nextCart;
    });
  };

  // Calculate overall basket badges count
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Smooth scroll handler to the showroom
  const handleScrollToShop = () => {
    setActiveProductId(null); // Reset back to main catalog list first
    setTimeout(() => {
      const catalogSection = document.getElementById("shop");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Trigger scroll and view detailing of a new arrival card click
  const handleProductSelection = (pId: string) => {
    setActiveProductId(pId);
    setTimeout(() => {
      const catalogSection = document.getElementById("shop");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-black antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* Primary Brand Navigation Header */}
      <Header
        whatsAppNumber={whatsAppNumber}
        setWhatsAppNumber={setWhatsAppNumber}
        cartCount={totalCartCount}
        onCartToggle={() => setCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* High impact streetwear Hero Banner */}
      <Hero onShopClick={handleScrollToShop} />
      
      {/* Main product showroom with filters, search, detail modals */}
      <Catalog
        onAddToCart={handleAddToCart}
        activeProductId={activeProductId}
        setActiveProductId={setActiveProductId}
        searchQuery={searchQuery}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />
      
      {/* Testimonials with reviews */}
      <Testimonials />
      
      {/* Street narrative and manifesto info */}
      <About />
      
      {/* New Arrivals carousel collection */}
      <NewArrivals
        onProductClick={handleProductSelection}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />
      
      {/* Corporate detailed notes and footer anchors */}
      <Footer />

      {/* Floating sliding checkout Cart Drawer */}
      <CartDrawer
        cartItems={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        whatsAppNumber={whatsAppNumber}
        onClearCart={() => setCart([])}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
