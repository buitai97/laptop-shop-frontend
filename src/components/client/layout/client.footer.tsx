import { GithubOutlined, TwitterOutlined, LinkedinOutlined, XOutlined } from "@ant-design/icons";

export default function AppFooter() {
    return (
        <footer style={{ background: "#45595b" }} className="text-gray-300 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Brand */}
                <div className="text-lg font-semibold text-white">
                    © {new Date().getFullYear()} Tech Store
                </div>

                {/* Links */}
                <nav className="flex gap-6">
                    <a href="#" className="text-white! hover:text-black! transition">About</a>
                    <a href="#" className="text-white! hover:text-black! transition">Contact</a>
                    <a href="#" className="text-white! hover:text-black! transition">Privacy</a>
                </nav>

                {/* Socials */}
                <div className="flex gap-4 text-xl">
                    <a href="https://github.com" target="_blank" className=" w-10 h-10 flex items-center justify-center rounded-full">
                        <GithubOutlined />
                    </a>
                    <a href="https://x.com" target="_blank" className=" w-10 h-10 flex items-center justify-center rounded-full">
                        <XOutlined />
                    </a>
                    <a href="https://linkedin.com" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full">
                        <LinkedinOutlined />
                    </a>
                </div>
            </div>
        </footer>
    );
}