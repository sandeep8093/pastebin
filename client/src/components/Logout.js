import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  width: 80vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(205, 255, 255, 0.5)
    ),
  
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 30px;
  background-color: white;

`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
margin-left:150px;
margin-bottom:20px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;




const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Logout = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("hello");
    window.localStorage.clear();
    
  };
  return (<>
   
    <Container>
      
      <Wrapper>
        <Title>Log Out</Title>
        <Form>
            Come Back Soon your cart is ready, We will be missing you!!
            <Link to ={`/`} >
          <Button onClick={handleClick} >
            LOGOUT
          </Button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Logout;
