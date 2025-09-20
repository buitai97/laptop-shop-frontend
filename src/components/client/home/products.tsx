import { Card, Pagination, Space } from "antd";

const Products = () => {
    const data = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        title: `Europe Street beat ${i + 1}`,
        description: "www.instagram.com",
        cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    }));

    const { Meta } = Card;
    return (
        <>
            <Space className="m-auto justify-start " wrap size={16}>
                {data.map((item) => (
                    <Card
                        key={item.id}
                        hoverable
                        style={{ width: 240 }}
                        cover={<img draggable={false} alt={item.title} src={item.cover} />}
                    >
                        <Meta title={item.title} description={item.description} />
                    </Card>
                ))}
            </Space>

            <Pagination className="mt-5!" align="center" defaultCurrent={1} total={50} />
        </>
    )
}

export default Products;