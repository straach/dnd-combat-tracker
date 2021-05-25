import styled, { StyledComponent } from 'styled-components';
const Box = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: rgba(255,255,255,0.5);
    margin-top: 6px;
    height: 60px;
    transition: 0.1s ease-in;
`;

export default Box;