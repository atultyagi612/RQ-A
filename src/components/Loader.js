import React from 'react'
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";
LoadingOverlay.propTypes = undefined
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
    background-color: rgb(0, 0, 0,0.1); 
    background-color: rgba(0, 0, 0, 0.5);
  
    ${(props) =>
      props.disappear &&
      css`
        display: block; /* show */
      `}
  `;
  return (<>
    <DarkBackground disappear={props.loader}>
        <LoadingOverlay
          active={true}
          spinner={<BounceLoader />}
          text="Uploading..."
        >
        </LoadingOverlay>
      </DarkBackground>
      </>
  )
}

export default Loader