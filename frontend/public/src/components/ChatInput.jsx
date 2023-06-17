import React, { useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
// import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMessage }) {

    const [message, setMessage] = useState("");

    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // const handleEmojiHideShow = () => {
    //     setShowEmojiPicker(!showEmojiPicker);
    // };
    // const handleEmojiClick = (event, emojiObject) => {
    //     let msg = message;
    //     msg += emojiObject.emoji;
    //     setMessage(msg)
    // };


    const sendChat = (event) => {
        event.preventDefault();
        if(message.length > 0) {
            handleSendMessage(message);
            setMessage("");
        }
    }

    return (
        <Container>
            <div className="button-container">
                {/* <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiHideShow} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                    }
                </div> */}
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type='text' placeholder='type your message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color:#d3d3d3;
    border-radius: 2rem;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
    }
    .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    }
    .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: white;
    input {
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: black;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;

        &::selection {
        background-color:#00bfff;
        }
        &:focus {
        outline: none;
        }
    }
    button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:#00bfff;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
            font-size: 1rem;
        }
        }
        svg {
        font-size: 2rem;
        color: white;
        }
    }
    }
`;
