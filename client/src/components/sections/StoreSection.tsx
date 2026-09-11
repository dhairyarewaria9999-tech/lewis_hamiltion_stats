import React, { useState, useEffect } from 'react';
import { ProductItem } from '../../types';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';

interface StoreSectionProps {
  onAddToCart: (product: ProductItem, size: string, color: string) => void;
  onOpenCart: () => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ onAddToCart, onOpenCart }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  useEffect(() => {
    api.getProducts(selectedCategory)
      .then((data) => {
        setProducts(data);
        // Default first size & color for each product
        const initialSizes: Record<string, string> = {};
        const initialColors: Record<string, string> = {};
        data.forEach(p => {
          initialSizes[p.id] = p.sizes[0] || 'M';
          initialColors[p.id] = p.colors[0]?.name || 'Standard';
        });
        setSelectedSizes(prev => ({ ...initialSizes, ...prev }));
        setSelectedColors(prev => ({ ...initialColors, ...prev }));
      })
      .catch(() => {});
  }, [selectedCategory]);

  const categories = ['All', 'Outerwear', 'Hoodies', 'Headwear', 'Collections', 'Accessories'];

  const handleAdd = (product: ProductItem) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'M';
    const color = selectedColors[product.id] || product.colors[0]?.name || 'Standard';

    soundEngine.playClick();
    onAddToCart(product, size, color);

    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);
  };

  return (
    <section id="store" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-lh-border/60 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-lh-yellow font-mono text-xs uppercase tracking-widest mb-1.5">
            <ShoppingBag className="w-4 h-4 text-lh-yellow" />
            <span>+44 WORLD // HIGH PERFORMANCE STREETWEAR</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            CAPSULE <span className="text-lh-yellow">DROP 04</span>
          </h2>
        </div>

        <button
          onClick={onOpenCart}
          className="flex items-center space-x-2 text-xs font-mono text-lh-yellow hover:text-white uppercase tracking-wider transition-colors"
          data-cursor="OPEN BAG"
        >
          <span>VIEW CURRENT BAG</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              soundEngine.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-lh-yellow text-lh-void font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                : 'bg-lh-dark/80 hover:bg-lh-card border border-lh-border text-lh-muted hover:text-white'
            }`}
            data-cursor="CATEGORY"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => {
          const activeSize = selectedSizes[product.id] || product.sizes[0];
          const activeColor = selectedColors[product.id] || product.colors[0]?.name;
          const isAdded = recentlyAddedId === product.id;

          return (
            <div
              key={product.id}
              className="glass-panel rounded-2xl overflow-hidden border border-lh-border/80 hover:border-lh-yellow/40 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image Box */}
              <div className="relative h-72 w-full bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-lh-void/90 border border-lh-border text-[10px] font-mono font-bold text-lh-yellow uppercase backdrop-blur-md">
                    {product.tag}
                  </span>
                  {product.stockCount <= 15 && (
                    <span className="px-2.5 py-1 rounded-md bg-lh-red/90 text-[10px] font-mono font-bold text-white uppercase backdrop-blur-md">
                      ONLY {product.stockCount} REMAINING
                    </span>
                  )}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-lh-void/90 border border-lh-border text-xs font-mono font-bold text-white">
                  ${product.price} {product.currency}
                </div>
              </div>

              {/* Product Info & Controls */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-lh-muted">
                    {product.category}
                  </span>
                  <h3 className="font-display font-black text-xl uppercase text-white mt-1 group-hover:text-lh-yellow transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-lh-muted font-normal mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Size & Color Selectors */}
                <div className="space-y-3 pt-3 border-t border-lh-border/50">
                  {/* Size Selector */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-lh-muted">SIZE</span>
                    <div className="flex space-x-1.5">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => {
                            soundEngine.playHover();
                            setSelectedSizes(prev => ({ ...prev, [product.id]: size }));
                          }}
                          className={`px-2 py-1 rounded font-mono text-[10px] font-bold transition-colors ${
                            activeSize === size
                              ? 'bg-lh-yellow text-lh-void'
                              : 'bg-lh-dark hover:bg-lh-border text-lh-muted'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-lh-muted">COLOR</span>
                    <div className="flex space-x-2">
                      {product.colors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => {
                            soundEngine.playHover();
                            setSelectedColors(prev => ({ ...prev, [product.id]: color.name }));
                          }}
                          className={`w-4 h-4 rounded-full border transition-all ${
                            activeColor === color.name
                              ? 'border-lh-yellow scale-125'
                              : 'border-white/20 hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    isAdded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-lh-dark hover:bg-lh-yellow hover:text-lh-void border border-lh-border hover:border-transparent text-white'
                  }`}
                  data-cursor="ADD"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG // ${product.price}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
