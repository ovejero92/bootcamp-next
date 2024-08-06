'use client';
import React, { useState } from "react";
import styles from "../styles.module.scss";
import MenuList from "./MenuList";

const Menu = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="">
            <div onClick={handleOpen}>
                <span className={styles.hambur}>&#9776;</span>
            </div>
            <MenuList handleClose={handleClose} open={open} />
        </div>
    )
}

export default Menu;
