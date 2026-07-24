import React from "react";
import { NavLink } from "react-router-dom";
import { Wallet } from "lucide-react";
import { NAV_ITEMS } from "../navConfig.js";

export default function Sidebar({ onNavigate }) {
  return (
    <>
      <div className="brand">
        <div className="brand__icon">
          <Wallet size={17} strokeWidth={2} />
        </div>
        <div className="brand__text">
          <span className="brand__title">Gestione Finanze</span>
          <span className="brand__sub">le tue finanze, in ordine</span>
        </div>
      </div>

      <ul className="nav-list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`}
                onClick={onNavigate}
              >
                <span className="nav-item__num">{item.num}</span>
                <Icon className="nav-item__icon" strokeWidth={1.8} />
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
