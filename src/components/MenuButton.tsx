import styled from 'styled-components';
import ArrowDownIcon from '../icons/arrow_down.svg';
import Logout from '../icons/logout.svg';
import { Hover } from '@/common/colors';
import { useState } from 'react';

const MenuWrap = styled.div`
  position: absolute;
  top: 0px;
  right: 50px;
  > button {
    display: flex;
    align-items: center;
    border: 0;
    background: none;
    font-weight: bold;
    font-size: 16px;
    height: 56px;
    cursor: pointer;
  }
  > ul {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    border-radius: 5px;
    li {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      cursor: pointer;
      &:hover {
        background: ${Hover};
      }
      > svg {
        margin-left: 25px;
      }
    }
  }
`;

const MenuButton = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <MenuWrap>
      <button type="button" onClick={handleClick}>
        Aisum <ArrowDownIcon />
      </button>
      {show && (
        <ul>
          <li>
            Logout <Logout />
          </li>
        </ul>
      )}
    </MenuWrap>
  );
};

export default MenuButton;
