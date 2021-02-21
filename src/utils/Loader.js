import React from 'react';
import loader from "./../img/gif-loader.gif";
import styled from "styled-components";

const Loader = () => {
    return (
        <LoaderWrapper>
            <img src={loader} alt="loader"/>
        </LoaderWrapper>
    )
}

export default Loader

const LoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`