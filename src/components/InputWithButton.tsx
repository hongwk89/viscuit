import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ marginTop: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  > button {
    margin-top: ${(props) => props.marginTop};
  }
`;

const InputWithButton = ({ children, marginTop }: { children: ReactNode; marginTop: string }) => {
  return <Wrapper marginTop={marginTop}>{children}</Wrapper>;
};
export default InputWithButton;
