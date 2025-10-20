import { useEffect, useState } from 'react';
import { ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useParams } from 'react-router';
import { getProductAPI } from '@/services/api';

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getProductAPI(+id!)
            const product = res.data
            setProduct(product)
        }
        fetchProduct()
    }, [])


    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };


    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}/images/product/${product?.image}`}
                                alt={product?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-4xl font-bold text-gray-900">{new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(product?.price! * 0.75)}</span>
                                <span className="text-xl text-gray-500 line-through">${product?.price}</span>
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                                    25% OFF
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed">{product?.detailDesc}</p>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 font-semibold"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Features */}
                        <div className="border-t pt-6 space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-600">Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <RotateCcw className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-600">30-Day Returns</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-600">2-Year Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}