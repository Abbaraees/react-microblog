import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import { Stack } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Posts from './components/Posts';
import Body from './components/Body';

function App() {
  const posts = [
    {
      id: 1,
      text: 'Hello, world!',
      timestamp: 'a minute ago',
      author: {
        username: 'susan',
      },
    },
    {
      id: 2,
      text: 'Second post',
      timestamp: 'an hour ago',
      author: {
        username: 'john',
      },
    },
  ];

  return (
    <Container fluid className="App"> 
      <Header />
      <Body sidebar>
        <Posts />
      </Body>
    </Container >
  );
}

export default App
