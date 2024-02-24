"use client"
import Image from "next/image";
import { MdPeopleAlt } from "react-icons/md";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { SidebarContext } from "./SidebarContext";
import { GoHomeFill } from "react-icons/go";

const sidebarItems = [
    {
        name: "Home",
        href: "/",
        icon: GoHomeFill,
    },
    {
        name: "About",
        href: "/about",
        icon: MdPeopleAlt,
    },
    {
        name: "Mails",
        href: "/mails",
        icon: FiMail,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: TiContacts,
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
                        src="/Batman-logo.svg"
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">Emdad</p>
                </div>
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
            </aside>
        </div>
    );
};

export default Sidebar;