"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Logout } from "@mui/icons-material";
import { SidebarContext } from "./SidebarContext";
import { GoHomeFill } from "react-icons/go";
import { TbTruckDelivery, TbLogout2 } from "react-icons/tb";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { signOut } from "next-auth/react";

const sidebarItems = [
    {
        name: "Home",
        href: "/dashboard",
        icon: GoHomeFill,
    },
    {
        name: "Products",
        href: "/dashboard/product",
        icon: BsFillBoxSeamFill,
    },
    {
        name: "Orders",
        href: "/dashboard/order",
        icon: TbTruckDelivery,
    },
    {
        name: "Reports",
        href: "/dashboard/",
        icon: TbReportAnalytics,
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

    return (
        <div className="sidebar__wrapper">
            <button className="btn" onClick={toggleSidebarcollapse}>
                {isCollapsed ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed} style={{ paddingRight: "1rem" }}>
                <div className="sidebar__top">
                    <Image
                        width={80}
                        height={80}
                        className="sidebar__logo"
                        src="/logo.png"
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">Emdad</p>
                </div>
                <div className="sidebar__content">

                    <ul className="sidebar__list">
                        {sidebarItems.map(({ name, href, icon: Icon }) => {
                            return (
                                <li className="sidebar__item" key={name}>
                                    <Link
                                        className="sidebar__link"
                                        href={href}
                                    >
                                        <span className={`sidebar__icon ${pathname === href ? "sidebar__icon--active" : ""
                                            }`}>
                                            <Icon size="1.4rem" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
                                        </span>
                                        <span className="sidebar__name">{name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div>

                        <hr />
                        <Link
                            className="sidebar__link"
                            href={"/api/auth/signout"}
                        >

                            <span className={`sidebar__icon`}>
                                <TbLogout2 size="1.4rem" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
                            </span>
                            <span className="sidebar__name">Logout</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;