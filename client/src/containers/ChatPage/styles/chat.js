import styled from 'styled-components';

const Chat = styled.div`
    flex: 1;
    // overflow-y: auto;
    overflow: auto;
    position: relative;
    padding: 5rem 2rem;
    background-color: #f9f9f9;

    .notification-message {
        color: #00000066;
        font-size: 12px;
        text-align: center;
        padding: 0.425rem 2rem;
    }
    .weakColor & {
        -webkit-filter: invert(100%);
        filter: invert(100%);
    }
    p {
        margin-bottom: 0;
    }
    .conversation {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1rem;
        display: flex;
    }
    .conversation-sent {
        justify-content: flex-end;
    }
    .body {
        position: relative;
        padding: 0.425rem 1rem;
        //background-color: white;
        border-radius: 1rem;
        max-width: 80%;
    }

    .body-sent {
        position: relative;
        background-color: #09f;
        color: white;
        float: right;
        order: 1;
        // text-align: right;
    }

    .body-sent-no-backdround {
        position: relative;
        color: white;
        float: right;
        order: 1;
        text-align: right;
    }
    .body-received {
        background-color: #f1f0f0;
    }
    .photo {
        width: 100px;
        height: 100px;
        display: inline-block;
        margin: 1px 3px;
        border-radius: 10px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    // .photo:not(:last-child) {
    //     margin: 0px 3px;
    // }
    .photo:last-child {
        margin-left: 3px;
    }
    .date {
        display: block;
        font-size: 11px;
        padding-top: 2px;
        font-weight: 600;
        color: ${(props) => props.theme.textColorSecondary};
        text-align: right;
    }
    .date-Sent {
        text-align: right;
    }
    input {
        flex: 1 1 0%;
        box-sizing: border-box;
    }
`;

export default Chat;
