'use client'

import { useState, useEffect } from 'react'

// dados mokados
const mockProducts = [
    {
        id: 1,
        name: "Smartphone Android",
        description: "Smartphone Android com 128GB de armazenamento",
        price: 899.99,
        image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    },
    {
        id: 2,
        name: "Fone de Ouvido Bluetooth",
        description: "Fone sem fio com cancelamento de ruído",
        price: 299.99,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 1,
        name: "Smartphone Android",
        description: "Smartphone Android com 128GB de armazenamento",
        price: 899.99,
        image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    },
    {
        id: 2,
        name: "Fone de Ouvido Bluetooth",
        description: "Fone sem fio com cancelamento de ruído",
        price: 299.99,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 1,
        name: "Smartphone Android",
        description: "Smartphone Android com 128GB de armazenamento",
        price: 899.99,
        image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    },
    {
        id: 2,
        name: "Fone de Ouvido Bluetooth",
        description: "Fone sem fio com cancelamento de ruído",
        price: 299.99,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    }


]

export default function Home() {
    const [products, setProducts] = useState(mockProducts)
    const [cart, setCart] = useState<any[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (product: any) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity === 0) {
            removeFromCart(productId)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Loja Mobile</h1>
                </div>
            </header>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            {/* Cart */}
            <CartSidebar
                cart={cart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                totalPrice={getTotalPrice()}
            />
        </div>
    )
}

function ProductCard({ product, onAddToCart }: { product: any, onAddToCart: (product: any) => void }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-3">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            R$ {product.price.toFixed(2)}
          </span>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    )
}

function CartSidebar({
                         cart,
                         isCartOpen,
                         setIsCartOpen,
                         onUpdateQuantity,
                         onRemoveFromCart,
                         totalPrice
                     }: {
    cart: any[],
    isCartOpen: boolean,
    setIsCartOpen: (open: boolean) => void,
    onUpdateQuantity: (id: number, quantity: number) => void,
    onRemoveFromCart: (id: number) => void,
    totalPrice: number
}) {
    return (
        <>
            {/* Cart Floating Button */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
            >
                <div className="flex items-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
                    </svg>
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cart.reduce((total: number, item: any) => total + item.quantity, 0)}
            </span>
                    )}
                </div>
            </button>

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsCartOpen(false)}>
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-3/4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Carrinho</h2>
                                <button onClick={() => setIsCartOpen(false)} className="text-gray-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {cart.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
                            ) : (
                                <>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                                                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-sm">{item.name}</h3>
                                                    <p className="text-green-600 font-bold">R$ {item.price.toFixed(2)}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => onRemoveFromCart(item.id)}
                                                    className="text-red-500 p-1"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t mt-4 pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-bold">Total:</span>
                                            <span className="text-xl font-bold text-green-600">R$ {totalPrice.toFixed(2)}</span>
                                        </div>
                                        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                            Finalizar Compra
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}