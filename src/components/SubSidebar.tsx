import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../icons/arrow.svg';
import { Font_M, ViscuitColor, Weight_SizeS, Weight_SizeSS } from '@/common/colors';

const SidebarContainer = styled.div`
  width: 260px;
  height: 100%;
  padding: 15px;
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const Head = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  font-size: 14px;
  color: #999fa5;
`;

const MenuTitle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean; immobility?: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 13px 16px;
  cursor: pointer;
  background: ${({ isActive, immobility }) =>
    immobility ? 'none' : isActive ? ViscuitColor : 'none'};
  border-radius: 5px;
  > svg {
    flex-shrink: 0;
  }
  > a {
    height: 40px;
    padding-left: ${({ isActive }) => (isActive ? '10px' : '0')};
  }
  span {
    color: ${({ isActive, immobility }) =>
      isActive ? (immobility ? 'black' : '#FFF') : 'inherit'};
    font-size: ${Font_M};
    font-weight: ${({ isActive }) => (isActive ? Weight_SizeS : Weight_SizeSS)};
  }
`;
//
const SubMenu = styled.ul<{ $isOpen: boolean }>`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: ${({ $isOpen }) => ($isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubMenuItem = styled.li`
  margin-bottom: 10px;
`;

const StyledArrowIcon = styled(ArrowIcon).withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  margin-left: auto;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const ATag = styled.a.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;

  &.sub {
    padding: 13px 0 13px 40px;
  }
  border-radius: 5px;
  color: ${({ isActive }) => (isActive ? '#FFF' : 'inherit')};
  font-size: ${Font_M};
  font-weight: ${({ isActive }) => (isActive ? Weight_SizeS : Weight_SizeSS)};
  background: ${({ isActive }) => (isActive ? ViscuitColor : 'none')};
`;

interface SubSidebarProps {
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const SubSidebar: React.FC<SubSidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  return (
    <SidebarContainer>
      <Head>AD Script Template</Head>
      <Menu>
        <MenuItem>
          <MenuTitle
            isActive={activeMenu === 'overview'}
            onClick={() => handleMenuClick('overview')}
          >
            <span>Overview</span>
          </MenuTitle>
        </MenuItem>
        <MenuItem>
          <MenuTitle
            isActive={activeMenu === 'parameter'}
            onClick={() => handleMenuClick('parameter')}
          >
            <span>key parameter</span>
          </MenuTitle>
        </MenuItem>
        <MenuItem>
          <MenuTitle
            isActive={activeMenu !== null && ['edge', 'secret'].includes(activeMenu)}
            onClick={() => {
              if (activeMenu === null || !['edge', 'secret'].includes(activeMenu)) {
                handleMenuClick('edge');
              }
            }}
            immobility="immobility"
          >
            <span>Customizing Guide</span>
            <StyledArrowIcon
              isActive={activeMenu !== null && ['edge', 'secret'].includes(activeMenu)}
            />
          </MenuTitle>
          <SubMenu $isOpen={activeMenu !== null && ['edge', 'secret'].includes(activeMenu)}>
            <SubMenuItem>
              <ATag
                className="sub"
                isActive={activeMenu === 'edge'}
                onClick={() => handleMenuClick('edge')}
              >
                Edge
              </ATag>
            </SubMenuItem>
            <SubMenuItem>
              <ATag
                className="sub"
                isActive={activeMenu === 'secret'}
                onClick={() => handleMenuClick('secret')}
              >
                Secret Box
              </ATag>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default SubSidebar;
