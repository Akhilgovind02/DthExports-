import Nav from 'react-bootstrap/Nav';

function Home() {
  return (
    <div style={{height:'60px', backgroundColor:'white'}}>
    <Nav variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Standard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">dkdkj </Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
  );
}

export default Home;