import React from 'react'
import styled from "styled-components"
import Hello from "../assets/hello.gif"

function Welcome( {currentUser} ) {
  return (
    <Container>
        <h1>Welcome <span>{currentUser.username}</span></h1>
        <h3>Please select a chat to start message.</h3>
        <img style={{width:"250px", height:"250px"}} src={Hello} alt="Hello" />
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
    height: 20rem;
    }
    span {
    color: #00bfff;
    }
`

export default Welcome