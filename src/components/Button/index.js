import React from 'react';

import './styles.css';

export default function Button({ children, style, onClick }) {
  return (
    <button 
      className="new-campaign-button" 
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
