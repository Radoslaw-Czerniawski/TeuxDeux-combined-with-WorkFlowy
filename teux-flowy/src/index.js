import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  display: grid;
  min-height: 100vh;
  overflow: hidden;
  grid-template-rows: auto 1fr auto;
`
ReactDOM.render(
    <StyledAppContainer>
        <App />
    </StyledAppContainer>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
