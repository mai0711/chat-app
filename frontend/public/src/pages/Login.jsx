import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes'

function Login() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
    })

    //error message
    const toastOptions = {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
    }

    //user can't go to login page after user logged in
    useEffect (()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
      // eslint-disable-next-line
    }, []);

    //validation to login
    const handleValidation = () => {
        const { username, password } = values;
        if (password === "") {
            toast.error("Username and password are required.", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Username and password are required.", toastOptions);
            return false;
        }
        return true;
    };

    //login button
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if(data.status === false){
                toast.error(data.message, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                navigate("/");
            }
        }
    };

    //input
    const handleChange = (event) =>{
        setValues({ ...values, [event.target.name]: event.target.value });
    };

  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=> handleSubmit(event)}>
            <div className='register'>
                <h1>Login</h1>
            </div>
            <input
                type='text'
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
            />
            <input
                type='password'
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
            />
            <button type="submit">Login</button>
            <span>
                Don't have an account? <Link to="/register"> Register</Link>
            </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    background-color: #e0ffff;
    align-items: center;

    .register {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        h1 {
            color: black;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #c0c0c0;
        border-radius: 2rem;
        padding: 2rem 5rem;

        input {
            padding: 0.8rem;
            border:0.1rem solid #00bfff;
            border-radius: 0.4rem;
            font-size: 1rem;
            width: 100%;

            &:focus {
                border: 0.1rem solid #00bfff;
                outline: none;
            }
        }

        button {
            background-color: #00bfff;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.4rem;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.5s ease-in-out;
            color: black;

            &:hover {
                background-color:#1e90ff;
            }
        }
        span {
            color: black;

            a {
                color: red;
                text-decoration: none;
                font-weight: bold;
            }
        }

    }

`;

export default Login

