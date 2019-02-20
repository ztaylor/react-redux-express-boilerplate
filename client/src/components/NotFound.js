import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const MessageBox = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  padding: 40px;
  text-align: center;
  background-color: paleVioletRed;
  color: linen;
  border-radius: 20px;
  width: 400px;
`;

const NotFound = () => (
  <div>
    <Header />
    <div className="container">
      <MessageBox>Page not found!</MessageBox>
    </div>
  </div>
);

export default NotFound;
