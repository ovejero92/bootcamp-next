'use client'
import styles from "../styles.module.scss";
import React, { useState } from "react";

const AccordionItem = ({title,children}) => {
    const [isOpen,setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
        <div onClick={toggleOpen} className="cursor-pointer text-white p-4 flex justify-between items-center lg:p-2 lg:border-none lg:hover:bg-gray-600">
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && (
            <div className={`${styles.accordionContent} bg-gray-800`}>
                {children}
            </div>
        )}
    </div>
    );
}

export default AccordionItem;