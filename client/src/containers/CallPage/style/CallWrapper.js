import styled from "styled-components";

export const CallWrapper = styled.div`
    background-color: black;
    width: 100%;
    height: 100vh;
    text-align: center;
    overflow-x: hidden;
    overflow-y: hidden;
    .caller-video {
        width: 100%;
        height: 100%;
    }
    .listener-video {
        position: fixed;
        width: 250px;
        top: 20px;
        right: 20px;
    }
    .action-buttons {
        position: fixed;
        width: 100%;
        bottom: 30px;
        display: flex;
        justify-content: center;

        button {
            margin: 0px 5px;
        }
    }
`; 
