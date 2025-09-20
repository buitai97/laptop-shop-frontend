import { Carousel, Col, Row, Tabs, type TabsProps, } from "antd";
import { useAppContext } from "@context/app.provider";
import { Typography } from "antd";
import banner1 from "@/assets/hero-img-1.jpg";
import banner2 from "@/assets/hero-img-2.jpg";
import heroImg from "@/assets/hero-img.jpg"
import { useMediaQuery } from "react-responsive";
import Products from "@/components/client/home/products";

const images = [
    banner1,
    banner2,
];

const ClientHomePage = () => {
    const { } = useAppContext()
    const productTabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'All',
            children: <Products />
        },

        {
            key: '2',
            label: 'Laptops',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Accessories',
            children: 'Content of Tab Pane 3',
        },



    ];
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    return (
        <div>
            <div style={{
                backgroundImage: `url(${heroImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <Row gutter={16} className="m-auto p-10">
                    <Col xs={{ span: 24 }} md={{ span: 14 }}>
                        <Typography className="text-cyan-900" style={{ fontSize: "5vw" }}>
                            A New Level of Tech Retailing in Orange County
                        </Typography>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 10 }} className="mt-5" >
                        <Carousel arrows>
                            {images.map((src, idx) => (
                                <div>
                                    <div key={idx}>
                                        <img
                                            className="rounded-2xl"
                                            src={src}
                                            alt={`Banner ${idx + 1}`}
                                            style={{
                                                width: isSmallScreen ? "100%" : "100%",
                                                maxHeight: isSmallScreen ? "300px" : "250px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </Col>
                </Row>


            </div>
            <Row className="p-10">

                <Col className="" span={24}>
                    <Tabs
                        items={productTabs}

                        defaultActiveKey="1"
                    />
                </Col>
            </Row>
        </div>

    )
}

export default ClientHomePage;