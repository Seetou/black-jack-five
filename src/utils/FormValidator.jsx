import styled from "styled-components";

const FormValidator = () => {
  return <Message>Please enter your pseudo!</Message>;
};

export default FormValidator;

const Message = styled.p`
  color: var(--error-clr);
  font-size: 1.2rem;
  text-align: center;
  font-weight: 700;
`;
