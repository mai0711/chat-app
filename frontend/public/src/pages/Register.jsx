import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes'

function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    //error message
    const toastOptions = {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
    }

    //user can't go to register page after user logged in
    useEffect (()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
        // eslint-disable-next-line
    }, []);

    //validation to create user
    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        } else if (password.length < 6) {
            toast.error("Password should be equal or greater than 6 characters.", toastOptions);
            return false;
        } else if (email === "") {toast.error("Email is required.", toastOptions);
            return false;
        }
        return true;
    };

    //submit button(create user)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const { email, username, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
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
        <form action="" onSubmit={(event)=> handleSubmit(event)}>
            <div className='register'>
                <h1>Register</h1>
            </div>
            <input
                type='text'
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
            />
            <input
                type='email'
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
            />
            <input
                type='password'
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
            />
            <input
                type='password'
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>
                Already have an account? <Link to="/login"> Login</Link>
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
            border:0.1rem solid #FF8856;
            border-radius: 0.4rem;
            font-size: 1rem;
            width: 100%;

            &:focus {
                border: 0.1rem solid #FF8856;
                outline: none;
            }
        }

        button {
            background-color: #FF8856;
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
                background-color: #D2691E;
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

export default Register
