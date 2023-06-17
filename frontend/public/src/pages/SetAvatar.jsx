import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer'
import loader from "../assets/loader.gif"

function SetAvatar() {

    const api = "https://api.multiavatar.com/4567711";
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [selectedAvatars, setSelectedAvatars] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    //error message
    const toastOptions = {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
    };

    useEffect(() => {
        (async() =>{
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }
        })();
    // eslint-disable-next-line
    }, []);

    const setProfilePicture = async() => {
        if(selectedAvatars === undefined){
            toast.error("Please select an avatar.", toastOptions);
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatars],
            });
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    useEffect(() => {
        (async() =>{
            const data = [];
            for(let i=0; i<4; i++){
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        })();
    }, []);


return (
    <>
    {
        isLoading ? (
        <Container>
            <img src={loader} alt="loader" className="loader" />
        </Container>
        )
        : (
        <Container>
            <div className='title-container'>
                <h1>select avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((avatar,index)=>{
                        return(
                            <div key={index} className={`avatar ${selectedAvatars === index ? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatars(index)}/>
                            </div>
                        );
                    })
                }
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        <ToastContainer />
        </Container>
        )
    }

    </>
);
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #e0ffff;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: black;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #00bfff;
        }
    }
    .submit-btn {
        background-color: #00bfff;
        color: black;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color:#00bfff;
        }
    }
`;

export default SetAvatar