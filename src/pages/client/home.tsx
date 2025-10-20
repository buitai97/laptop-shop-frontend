import { Carousel, Col, Row } from "antd";
import { Typography } from "antd";
import banner1 from "@/assets/hero-img-1.jpg";
import banner2 from "@/assets/hero-img-2.jpg";
import heroImg from "@/assets/hero-img.jpg"
import { useMediaQuery } from "react-responsive";
import FeatureProducts from "@/components/client/home/feature-products";

const images = [
    banner1,
    banner2,
];

const ClientHomePage = () => {
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
            <div className="px-10 py-10">
                <FeatureProducts />
            </div>
        </div>

    )
}

export default ClientHomePage;