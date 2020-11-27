import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { sidebarData } from './SidebarData';
import './styles.css';
import { IconContext } from 'react-icons';

import logo from '../../assets/logo.png';
import thanos from '../../assets/thanos.png';

export default function Navigation() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <div className="nav-content">
          <div className="nav-image-container">
            <img src={logo} alt="Logo" />
          </div>
          <div className="nav-title-container">
            <h1>Infinity War Campaign</h1>
          </div>
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          <li className="side-image-container">
            <img src={thanos} alt="thanos" />
          </li>
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
