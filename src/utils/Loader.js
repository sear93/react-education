import React from 'react';
import loader from "./../img/gif-loader.gif";

const Loader = () => {
    console.log("Loading")
    return (
        <>
            <img src={loader} alt="loader"/>
        </>
    )
}

export default Loader