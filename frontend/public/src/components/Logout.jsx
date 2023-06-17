import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BiPowerOff } from "react-icons/bi"

export default function Logout() {

    const navigate = useNavigate();
    const handleClick = async() => {
        localStorage.clear();
        navigate("/login");
    }

  return (
    <div>
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    </div>
  )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #00bfff;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`;