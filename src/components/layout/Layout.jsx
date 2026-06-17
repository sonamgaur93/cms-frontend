import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import "./Layout.css";

function Layout({ children }) {

    return (

        <div>

            <Header />

            <div className="main-container">

                <Sidebar />

                <div className="content">

                    {children}

                </div>

            </div>

            <Footer />

        </div>

    );

}

export default Layout;