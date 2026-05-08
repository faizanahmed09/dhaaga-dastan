"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { X, Truck } from "lucide-react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >{`Cart (${totalItems})`}</LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <PopoverPanel
            static
            className="hidden small:flex flex-col fixed top-0 right-0 h-screen bg-white shadow-2xl w-[400px] text-ui-fg-base z-[100]"
            data-testid="nav-cart-dropdown"
          >
            {/* Drawer Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-brand-surface">
              <h3 className="font-heading text-2xl font-light text-brand-primary">Your Bag ({totalItems})</h3>
              <button onClick={close} className="text-gray-400 hover:text-brand-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            {cartState && cartState.items?.length ? (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Free Shipping Progress Bar */}
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck size={16} className="text-brand-secondary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                      {subtotal > 15000 
                        ? "You've unlocked Free Shipping!" 
                        : `Add Rs. ${15000 - subtotal} for Free Shipping`}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-secondary transition-all duration-500 ease-out"
                      style={{ width: `${Math.min((subtotal / 15000) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                  
                  {/* Upsell Section */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <span className="text-sm font-semibold tracking-widest uppercase text-brand-secondary mb-4 block">
                      You Might Also Like
                    </span>
                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-gray-100 flex-shrink-0 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1610461888750-10bfc600b874?q=80&w=300&auto=format&fit=crop" 
                          alt="Matching Dupatta" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-semibold text-brand-primary text-sm">Chiffon Dupatta</h4>
                        <span className="text-gray-500 text-xs mb-2">Rs. 2,500</span>
                        <button className="text-xs font-bold text-brand-primary underline self-start hover:text-brand-secondary transition-colors">
                          ADD TO BAG
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Drawer Footer (Subtotal & Actions) */}
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500">
                      Subtotal
                    </span>
                    <span
                      className="font-heading text-xl font-bold text-brand-primary"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-6 text-center">
                    Taxes and shipping calculated at checkout
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <LocalizedClientLink href="/cart" passHref>
                      <Button
                        className="w-full h-12 border border-brand-primary text-brand-primary font-bold uppercase tracking-widest text-xs hover:bg-brand-surface"
                        variant="secondary"
                        data-testid="go-to-cart-button"
                      >
                        View Bag
                      </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/checkout" passHref>
                      <Button
                        className="w-full h-14 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-secondary transition-colors"
                        data-testid="checkout-button"
                      >
                        Secure Checkout (COD Available)
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1 items-center justify-center p-8 text-center bg-brand-surface/30">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                  <span className="font-heading text-2xl font-light">0</span>
                </div>
                <h4 className="font-heading text-xl font-bold text-brand-primary mb-2">Your bag is empty</h4>
                <p className="text-sm text-gray-500 mb-8">
                  Looks like you haven't added anything to your bag yet. Discover our latest collections.
                </p>
                <LocalizedClientLink href="/store" className="w-full">
                  <Button 
                    onClick={close}
                    className="w-full h-12 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-secondary transition-colors"
                  >
                    Start Shopping
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
