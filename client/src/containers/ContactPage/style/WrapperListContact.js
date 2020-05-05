import styled from "styled-components";

const WrapperListContact = styled.div`
    .list-item {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        .avatar {
            margin-right: 5px;
        }
    }
    .list-item-hover:hover {
        background-color: #f3f3f3;
        cursor: pointer;
    }
    div {
        color: #000000a6;
    }
`;

export default WrapperListContact;
