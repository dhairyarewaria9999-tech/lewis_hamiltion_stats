import React, { useState } from 'react';
import { CartItem } from '../../types';
import { api } from '../../services/api';
import { soundEngine } from '../audio/SoundEngine';
import confetti from 'canvas-confetti';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
    orderId: string;
    total: number;
    customerName: string;
  } | null>(null);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    country: 'United Kingdom',
    city: 'London',
    address: '10 Downing Street'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customer.name.trim()) newErrors.name = 'Name is required';
    if (!customer.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!customer.address.trim()) newErrors.address = 'Street address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.price,
        })),
        customer
      };

      const result = await api.checkout(payload);
      if (result.success) {
        setIsSuccess(true);
        setOrderSummary({
          orderId: result.data.orderId,
          total: result.data.total,
          customerName: result.data.customerName,
        });

        // Trigger victory celebration audio & confetti
        soundEngine.playCelebration();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#CCFF00', '#9945FF', '#FF1801', '#FFFFFF']
        });

        onClearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md bg-lh-card border-l border-lh-border p-6 shadow-2xl flex flex-col justify-between h-full z-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-lh-border/60">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-lh-yellow" />
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">
              +44 BAG ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-lh-dark hover:bg-lh-card border border-lh-border text-lh-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess && orderSummary ? (
          <div className="my-auto py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-lh-yellow/20 text-lh-yellow flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-display font-black text-2xl uppercase text-white">
              DISPATCH CONFIRMED!
            </h4>
            <p className="text-xs font-mono text-lh-muted">
              Order Reference: <strong className="text-lh-yellow">{orderSummary.orderId}</strong>
            </p>
            <p className="text-xs text-lh-muted max-w-xs mx-auto">
              Thank you {orderSummary.customerName}. Your limited +44 capsule items are queued for express dispatch.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setIsCheckingOut(false);
                onClose();
              }}
              className="mt-6 px-6 py-3 rounded-xl bg-lh-yellow text-lh-void font-bold text-xs uppercase font-mono tracking-wider hover:bg-white transition-colors"
            >
              CONTINUE EXPLORING
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout Form */
          <form onSubmit={handleCheckoutSubmit} className="my-auto py-4 space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-lh-yellow mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="uppercase font-bold tracking-wider">EXPRESS CHECKOUT</span>
            </div>

            <div>
              <label className="block text-lh-muted mb-1 uppercase">Full Name</label>
              <input
                type="text"
                value={customer.name}
                onChange={e => setCustomer({ ...customer, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                placeholder="Lewis Hamilton"
                required
              />
              {errors.name && <span className="text-lh-red text-[10px]">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-lh-muted mb-1 uppercase">Email Address</label>
              <input
                type="email"
                value={customer.email}
                onChange={e => setCustomer({ ...customer, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                placeholder="lewis@hamilton.com"
                required
              />
              {errors.email && <span className="text-lh-red text-[10px]">{errors.email}</span>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-lh-muted mb-1 uppercase">Country</label>
                <input
                  type="text"
                  value={customer.country}
                  onChange={e => setCustomer({ ...customer, country: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-lh-muted mb-1 uppercase">City</label>
                <input
                  type="text"
                  value={customer.city}
                  onChange={e => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lh-muted mb-1 uppercase">Shipping Address</label>
              <input
                type="text"
                value={customer.address}
                onChange={e => setCustomer({ ...customer, address: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-lh-dark border border-lh-border text-white focus:border-lh-yellow outline-none"
                placeholder="Paddock Club Suite 44"
                required
              />
            </div>

            <div className="pt-2 border-t border-lh-border/60">
              <div className="flex justify-between py-1 text-lh-muted">
                <span>Subtotal:</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between py-1 text-lh-muted">
                <span>Express Shipping:</span>
                <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between py-2 text-base font-bold text-white border-t border-lh-border/40 mt-1">
                <span>Order Total:</span>
                <span className="text-lh-yellow">${total}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 py-3 rounded-xl bg-lh-dark border border-lh-border text-lh-muted hover:text-white uppercase font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-lh-yellow text-lh-void uppercase font-bold hover:bg-white transition-colors flex items-center justify-center space-x-1 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              >
                {isSubmitting ? 'PROCESSING...' : `PAY $${total}`}
              </button>
            </div>
          </form>
        ) : items.length === 0 ? (
          <div className="my-auto py-12 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-lh-muted/40 mx-auto" />
            <h4 className="font-display font-bold text-lg uppercase text-white">
              YOUR +44 BAG IS EMPTY
            </h4>
            <p className="text-xs text-lh-muted max-w-xs mx-auto">
              Explore the limited capsule streetwear collection and pick your gear.
            </p>
          </div>
        ) : (
          /* Item List */
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {/* Free Shipping Meter */}
            <div className="p-3 rounded-xl bg-lh-dark border border-lh-border/80">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-lh-muted">
                  {subtotal >= freeShippingThreshold
                    ? '🎉 FREE GLOBAL SHIPPING UNLOCKED!'
                    : `Add $${freeShippingThreshold - subtotal} more for Free Shipping`}
                </span>
                <span className="text-lh-yellow font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-lh-yellow rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex items-center space-x-3 p-3 rounded-xl bg-lh-dark/60 border border-lh-border/60"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-lh-border/50"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-xs uppercase truncate text-white">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-lh-muted mt-0.5">
                    <span>SIZE: {item.size}</span>
                    <span>•</span>
                    <span>COLOR: {item.color}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-lh-yellow mt-1">
                    ${item.product.price * item.quantity}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-lh-muted hover:text-lh-red transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-1 bg-lh-card px-1.5 py-0.5 rounded border border-lh-border text-xs font-mono">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="text-lh-muted hover:text-white px-1"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-1 text-white font-bold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="text-lh-muted hover:text-white px-1"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Checkout Bar */}
        {!isSuccess && !isCheckingOut && items.length > 0 && (
          <div className="pt-4 border-t border-lh-border/60 space-y-3">
            <div className="flex justify-between font-mono text-sm">
              <span className="text-lh-muted uppercase">SUBTOTAL:</span>
              <span className="text-white font-bold">${subtotal}</span>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                setIsCheckingOut(true);
              }}
              className="w-full py-3.5 rounded-xl bg-lh-yellow text-lh-void font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
