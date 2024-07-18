import React, { useState, useEffect } from "react";
import "./styles/navbar.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <header>
      <nav className={isModalOpen ? "modal-active" : ""} id="nav">
        <Link to={"/"}>
          <div className="nav-logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="nav-elements">
          <ul>
            <Link to={"/"}>
              <li>ДОМОЙ</li>
            </Link>
            <li>ЖАНРЫ</li>
            <Link to={"/movies"}>
              <li>ФИЛЬМЫ</li>
            </Link>
            <Link to={"/auth/login"}>
              <li className="li-red">ВОЙТИ</li>
            </Link>
            <Link to={"/auth/register"}>
              <li className="li-red">РЕГИСТРАЦИЯ</li>
            </Link>
          </ul>
        </div>
        <button className="burger-menu" onClick={toggleModal}>
          <div />
          <div />
          <div />
        </button>
        <div className={`nav-modal ${isModalOpen ? "modal-active" : ""}`}>
          <ul>
            <Link to={"/"} onClick={toggleModal}>
              <li>ДОМОЙ</li>
            </Link>
            <li>ЖАНРЫ</li>
            <Link to={"/movies"} onClick={toggleModal}>
              <li>ФИЛЬМЫ</li>
            </Link>
            <Link to={"/auth/login"} onClick={toggleModal}>
              <li className="li-red">ВОЙТИ</li>
            </Link>
            <Link to={"/auth/register"} onClick={toggleModal}>
              <li className="li-red">РЕГИСТРАЦИЯ</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
