import React from 'react'
import styled from "styled-components"
import Robot from "../assets/robot.gif"

function Welcome( {currentUser} ) {
  return (
    <Container>
        <h1>Welcome <span>{currentUser.username}</span></h1>
        <h3>Please select a chat to start message.</h3>
        <img src={Robot} alt="Robot" />
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