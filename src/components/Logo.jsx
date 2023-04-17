import styled from "styled-components";
const Logo = () => {
  return <Logostyle>BlackJack</Logostyle>;
};

export default Logo;

const Logostyle = styled.h1`
  font-size: 6rem;
  color: white;
  font-family: "Twinkle Star", cursive;

  @media (max-width: 37.438em) {
    font-size: 5rem;
  }

  @media (min-width: 56.313em) {
    font-size: 10rem;
  }
`;
