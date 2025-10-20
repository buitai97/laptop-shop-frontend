import { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Badge, Typography, Tag, message, Slider, Divider, Checkbox, Input, Pagination } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { getProductsAPI } from '@/services/api';
import { useNavigate } from 'react-router';



const { Title, Text, Paragraph } = Typography;


const ProductsPage = () => {
    const [products, setProducts] = useState<IProduct[]>();
    const [loading, setLoading] = useState<any>({});
    const navigate = useNavigate()
    // filter states
    const [selectedFactories, setSelectedFactories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    const factories = Array.from(new Set(products?.map(p => p.factory)));
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProductsAPI(1, 10)
            console.log(res)
            const products = res.data.products
            setProducts(products)
        }
        fetchProducts()

    }, [])


    const handleFactoryChange = (checkedValues: any) => {
        setSelectedFactories(checkedValues);
    };

    const clearFilters = () => {
        setSelectedFactories([]);
        setPriceRange([0, 500]);
        setSearchTerm('');
        setInStockOnly(false);
    };

    const handleAddToCart = async (product: IProduct) => {
        setLoading((prev: any) => ({ ...prev, [product.id]: true }));


        // Simulate API call
        setTimeout(() => {
            setLoading((prev: any) => ({ ...prev, [product.id]: false }));
            message.success(`${product.name} added to cart!`);
        }, 1000);
    };


    const cardActions = (product: IProduct) => [
        <Button
            key="cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            loading={loading[product.id]}
            onClick={() => handleAddToCart(product)}
            disabled={product.quantity == 0}
            className={`${product.quantity != 0 ? 'bg-gradient-to-r! from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700' : ''} 
        transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        >
            {product.quantity != 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <Row gutter={[24, 24]} className="max-w-7xl mx-auto px-4">
                {/* Filter Sidebar */}
                <Col xs={0} md={6} lg={5}>
                    <Card
                        className="sticky shadow-lg rounded-xl"
                        title={
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Filters</span>
                                <Button type="link" size="small" onClick={clearFilters}>
                                    Clear All
                                </Button>
                            </div>
                        }
                    >
                        {/* Search */}
                        <div className="mb-6">
                            <Text strong className="block mb-2">Search</Text>
                            <Input
                                placeholder="Search products..."
                                prefix={<SearchOutlined />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                allowClear
                            />
                        </div>

                        <Divider />

                        {/* Brand Filter */}
                        <div className="mb-6">
                            <Text strong className="block mb-3">Brand</Text>
                            <Checkbox.Group
                                value={selectedFactories}
                                onChange={handleFactoryChange}
                                className="flex flex-col gap-2"
                            >
                                {factories.map(factory => (
                                    <Checkbox key={factory} value={factory}>
                                        {factory}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </div>

                        <Divider />

                        {/* Price Range */}
                        <div className="mb-6">
                            <Text strong className="block mb-3">
                                Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </Text>
                            <Slider
                                range
                                min={0}
                                max={2000}
                                value={priceRange}
                                onChange={(value) => setPriceRange(value as [number, number])}
                                tooltip={{ formatter: (value) => `$${value}` }}
                            />
                        </div>

                        <Divider />

                        {/* Availability */}
                        <div>
                            <Text strong className="block mb-3">Availability</Text>
                            <Checkbox
                                checked={inStockOnly}
                                onChange={(e) => setInStockOnly(e.target.checked)}
                            >
                                In Stock Only
                            </Checkbox>
                        </div>
                    </Card>
                </Col>

                {/* Products Grid */}
                <Col xs={24} md={18} lg={19}>
                    <Row gutter={[24, 24]}>
                        {products?.map((product: IProduct) => (
                            <Col
                                key={product.id}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                            >
                                <Badge.Ribbon
                                    text={product.target}
                                    className={product.target ? 'block' : 'hidden'}
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <div
                                                className="h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group"
                                                onClick={() => { navigate(`/products/${product.id}`) }}
                                            >
                                                <img
                                                    alt={product.name}
                                                    src={`${import.meta.env.VITE_API_BASE_URL}/images/product/${product.image}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                                />
                                            </div>
                                        }
                                        actions={cardActions(product)}
                                        className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl 
                                        hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out
                                        transform hover:scale-[1.02] overflow-hidden"
                                    >
                                        <div className="p-2">
                                            <Tag
                                                color="blue"
                                                className="mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                                            >
                                                {product.factory}
                                            </Tag>

                                            <Title
                                                level={4}
                                                className="mb-3 text-gray-800 leading-tight hover:text-blue-600! text-center transition-colors duration-300"
                                                ellipsis={{ rows: 1 }}
                                                onClick={() => { navigate(`/products/${product.id}`) }}
                                            >
                                                {product.name}
                                            </Title>

                                            <Paragraph
                                                className="text-gray-600! text-center mb-4 text-sm leading-relaxed"
                                                ellipsis={{ rows: 1 }}
                                            >
                                                {product.shortDesc}
                                            </Paragraph>

                                            <div className="flex justify-center items-center">
                                                <Text className="!text-2xl !text-gray-800 font-bold">
                                                    {new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }).format(product.price)}
                                                </Text>
                                            </div>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        ))}
                    </Row>

                    {products?.length === 0 && (
                        <div className="text-center py-12">
                            <Title level={3} type="secondary">No products found</Title>
                            <Text type="secondary">Try adjusting your filters</Text>
                        </div>
                    )}
                    <Pagination className="m-5!" align="center" defaultCurrent={1} total={50} />
                </Col>
            </Row>
        </div>
    )
}

export default ProductsPage