import React from 'react';

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark nb-4">
      <span className="navbar-brand">
        FERNADNO
      </span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  )
}
