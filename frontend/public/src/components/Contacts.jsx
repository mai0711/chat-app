import React,{ useEffect, useState } from 'react'
import styled from 'styled-components'

function Contacts({ contacts, currentUser, changeChat }) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username);
        }
     // eslint-disable-next-line
    },[currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

return (
    <>
    {currentUserImage && currentUserName && (
        <Container>
            <div className="current-user">
                <div className="avatar">
                    <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                    />
                </div>
                <div className="username">
                    <h1>{currentUserName}</h1>
                </div>
            </div>
            <div className="brand">
                <h3>CHAT</h3>
            </div>
            <div className="contacts">
                {
                contacts.map((contact, index) => {
                    return (
                        <div
                            key={index}
                            className={`contact ${
                            index === currentSelected ? "selected" : ""
                            }`}
                            onClick={() => changeCurrentChat(index, contact)}
                        >
                            <div className="avatar">
                                <img
                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
            
        </Container>
    )}
    </>
);
}

        const Container = styled.div`
            display: grid;
            grid-template-rows: 15% 10% 75%;
            overflow: hidden;
            background-color: #a9a9a9;
            border-radius: 2rem;
            .brand {
                display: flex;
                align-items: center;
                gap: 1rem;
                justify-content: center;
                img {
                height: 2rem;
                }
            }
            .current-user {
                background-color: #191970;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                .avatar {
                    img {
                        height: 3rem;
                        max-inline-size: 100%;
                    }
                }
                @media screen and (min-width: 720px) and (max-width: 1080px) {
                gap: 0.5rem;
                .username {
                    h1 {
                    font-size: 1.5rem;
                    }
                }
                }
            }
            .contacts {
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: auto;
                gap: 0.8rem;
                &::-webkit-scrollbar {
                width: 0.2rem;
                }
                .contact {
                background-color: #d3d3d3;
                min-height: 5rem;
                cursor: pointer;
                width: 90%;
                border-radius: 1rem;
                padding: 0.4rem;
                display: flex;
                gap: 1rem;
                align-items: center;
                transition: 0.5s ease-in-out;
                .avatar {
                    img {
                    height: 2.5rem;
                    }
                }
                }
                .selected {
                background-color: #00bfff;
                }
            }
            `;
export default Contacts
