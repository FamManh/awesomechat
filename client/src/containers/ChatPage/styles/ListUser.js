import styled from 'styled-components'

const ListUser = styled.div`
    .list-item {
        padding: 5px 0px;
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
`;

export default ListUser
