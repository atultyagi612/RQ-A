import React from 'react'
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";
function Loader(props) {
    const DarkBackground = styled.div`
    display: none; 
    position: fixed; 
    z-index: 999; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0, 0, 0,1); 
    background-color: rgba(255, 255, 255, 1);
  
    ${(props) =>
      props.disappear &&
      css`
        display: block; /* show */
      `}
  `;
  return (
    <DarkBackground disappear={props.loader}>
        <LoadingOverlay
          active={true}
          spinner={<BounceLoader />}
        //   spinner={true}
          text="DOWNLODING..."
        >
          {/* <p>Some content or children or something.</p> */}
        </LoadingOverlay>
      </DarkBackground>
  )
}

export default Loader