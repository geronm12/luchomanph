import React from 'react';
import FB from "../../assets/png/Logo-Facebook.png";
import IG from "../../assets/png/Logo-Instagram.png";
import WP from "../../assets/png/Logo-Whatsapp.png";

import "./RightBar.scss";

export default function RightBar() {
    return (
        <div className="right-bar">
           <div className="right-bar__social-media">
                <img src={FB} alt="facebook"/>
                <a href="https://www.facebook.com/luchomanph">luchomanph</a>
            </div>
            <div className="right-bar__social-media">
                <img src={IG} alt="instagram"/>
                <a href="https://www.instagram.com/luchomanph/">@luchomanph</a>
            </div>
            <div className="right-bar__social-media">
                <img src={WP} alt="whatsapp"/>
                <h6>(381)6485869</h6>
            </div>
         
        </div>
    )
}
