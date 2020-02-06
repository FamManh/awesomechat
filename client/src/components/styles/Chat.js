import styled from 'styled-components';

const Chat = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding: 5rem 2rem;
  background-color: #f9f9f9;

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
    padding: 0.625rem 1rem;
    background-color: white;
    border-radius: 0.8rem;
    min-width: 100px;
  }

  .body-sent {
    position: relative;
    background-color: #e2f8ff;
    float: right;
    order: 1;
  }
  .date {
    display: block;
    font-size: 11px;
    padding-top: 2px;
    font-weight: 600;
    color: ${props => props.theme.textColorSecondary};
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
