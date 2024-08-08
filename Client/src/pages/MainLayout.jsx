import { Outlet } from "react-router-dom"
import NavBar from "../components/Navbar"

const MainLayout = () => {
    return (
        <div className="bg-[#F6F6F6]">
        <NavBar />
        <Outlet />
        </div>
    )
}

export default MainLayout