import { Cancel, InputDisable, ViscuitColor } from '@/common/colors';
import styled from 'styled-components';

const Ul = styled.ul<{ order: 1 | 2 | 3 }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  top: 16px;
  right: calc(100% + 30px);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 0px;
    height: 99%;
    border: 1px dotted ${InputDisable};
  }
  > li {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${Cancel};
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    &.active {
      background: ${ViscuitColor};
    }
  }
`;

interface Order {
  order: 1 | 2 | 3;
}

const SignUpOrder = ({ order }: Order) => {
  return (
    <Ul order={order}>
      {[1, 2, 3].map((step, index) => (
        <li key={index} className={order === step ? 'active' : ''}>
          {step}
        </li>
      ))}
    </Ul>
  );
};
export default SignUpOrder;
