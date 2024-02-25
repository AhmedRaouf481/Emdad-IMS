"use client"
import Image from "next/image";
import { MdPeopleAlt } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { SidebarContext } from "./SidebarContext";
import { GoHomeFill } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillBoxSeamFill } from "react-icons/bs";

const sidebarItems = [
    {
        name: "Home",
        href: "/dashboard",
        icon: GoHomeFill,
    },
    {
        name: "Items",
        href: "/dashboard/item",
        icon: BsFillBoxSeamFill,
    },
    {
        name: "Orders",
        href: "/dashboard/order",
        icon: TbTruckDelivery,
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
                            href={"/login"}
                        >

                            <span className="sidebar__name">Login</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;