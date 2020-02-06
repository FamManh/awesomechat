import styled from 'styled-components';

const CalendarStyles = styled.div`
  .ant-fullcalendar-year-select > div {
    border-radius: 4px 0 0 4px;
  }
  .ant-fullcalendar-month-select > div {
    border-radius: 0 4px 4px 0;
    margin-left: -1px;
  }
  .ant-select-open .ant-select-selection {
    z-index: 99;
  }
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month {
    height: calc((100vh - 184px) / 4);
  }
`;

export default CalendarStyles;
