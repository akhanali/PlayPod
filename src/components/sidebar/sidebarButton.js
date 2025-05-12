import React from 'react';
import './sidebarButton.css';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';

export default function SidebarButton(props) {
    const location = useLocation();

    const isActive = location.pathname === props.to;

    const buttonClass = isActive ? "button-body active" : "button-body"
  return <Link to={props.to}>
    <div className={buttonClass}>
        <IconContext.Provider value={{size: "24px", className: "button-icon"}}>
            {props.icon}
            <p className='button-title'>{props.title}</p>
        </IconContext.Provider>
    </div>
  </Link>
}
