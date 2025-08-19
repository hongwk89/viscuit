import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import AccountIcon from '../icons/account.svg';
import ArrowIcon from '../icons/arrow.svg';
import NoteIcon from '../icons/note.svg';
import SearchIcon from '../icons/search.svg';
import ReportIcon from '../icons/report.svg';
import DevelopmentIcon from '../icons/development.svg';
import EyesIcon from '../icons/eyes.svg';
import Link from 'next/link';
import { ViscuitColor } from '@/common/colors';

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 260px;
  height: 100%;
  background-color: #fcfcfd;
  padding: 15px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => (!$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 10;
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
})<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 15px 0;
  cursor: pointer;
  > svg {
    flex-shrink: 0;
  }
  > a {
    height: 40px;
    padding-left: ${({ isActive }) => (isActive ? '10px' : '0')};
  }
`;

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

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledArrowIcon = styled(ArrowIcon).withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  margin-left: auto;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const ATag = styled.a.withConfig({
  shouldForwardProp: (prop) => prop !== 'activePage',
})<{ activePage: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;

  &.sub {
    padding: 13px 0 13px 40px;
  }
  border-radius: 5px;
  background: ${({ activePage }) => (activePage ? '#E9EDFB' : 'none')};
  color: ${({ activePage }) => (activePage ? ViscuitColor : 'inherit')};
  font-weight: ${({ activePage }) => (activePage ? 'bold' : 'normal')};
`;

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();
  const path = router.pathname;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  useEffect(() => {
    if (['/profile', '/payment'].some((val) => path.includes(val))) {
      setActiveMenu('account');
    }
    if (['/project', '/template', '/apikey'].some((val) => path.includes(val))) {
      setActiveMenu('settings');
    }
    if (['/dailyReport', '/calculateReport'].some((val) => path.includes(val))) {
      setActiveMenu('reports');
    }
    if (['/apiDocs', '/adScript'].some((val) => path.includes(val))) {
      setActiveMenu('development');
    }
  }, []);

  return (
    <>
      <SidebarContainer $isOpen={isOpen}>
        <Head>VISCUIT</Head>
        <Menu>
          <MenuItem>
            <MenuTitle
              isActive={activeMenu === 'account'}
              onClick={() => handleMenuClick('account')}
            >
              <AccountIcon />
              <span>My Account</span>
              <StyledArrowIcon isActive={activeMenu === 'account'} />
            </MenuTitle>
            <SubMenu $isOpen={activeMenu === 'account'}>
              <SubMenuItem>
                <Link href="/profile">
                  <ATag className="sub" activePage={path.includes('/profile')}>
                    정보변경
                  </ATag>
                </Link>
              </SubMenuItem>
              <SubMenuItem>
                <Link href="/payment/paymentpreferences">
                  <ATag className="sub" activePage={path.includes('/payment')}>
                    Payment Preferences
                  </ATag>
                </Link>
              </SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <MenuTitle
              isActive={activeMenu === 'settings'}
              onClick={() => handleMenuClick('settings')}
            >
              <NoteIcon />
              <span>서비스 설정</span>
              <StyledArrowIcon isActive={activeMenu === 'settings'} />
            </MenuTitle>
            <SubMenu $isOpen={activeMenu === 'settings'}>
              <SubMenuItem>
                <Link href="/project">
                  <ATag className="sub" activePage={path.includes('/project')}>
                    프로젝트
                  </ATag>
                </Link>
              </SubMenuItem>
              <SubMenuItem>
                <Link href="/template">
                  <ATag className="sub" activePage={path.includes('/template')}>
                    템플릿 예시
                  </ATag>
                </Link>
              </SubMenuItem>
              <SubMenuItem>
                <Link href="/apikey">
                  <ATag className="sub" activePage={path.includes('/apikey')}>
                    APIKEY
                  </ATag>
                </Link>
              </SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <MenuTitle isActive={activeMenu === 'search'} onClick={() => handleMenuClick('search')}>
              <Link href="/dataSearch">
                <ATag activePage={path.includes('/dataSearch')}>
                  <SearchIcon />
                  데이터 검색
                </ATag>
              </Link>
            </MenuTitle>
          </MenuItem>
          <MenuItem>
            <MenuTitle
              isActive={activeMenu === 'reports'}
              onClick={() => handleMenuClick('reports')}
            >
              <ReportIcon />
              <span>보고서</span>
              <StyledArrowIcon isActive={activeMenu === 'reports'} />
            </MenuTitle>
            <SubMenu $isOpen={activeMenu === 'reports'}>
              <SubMenuItem>
                <Link href="/dailyReport">
                  <ATag className="sub" activePage={path.includes('/dailyReport')}>
                    일자별 보고서
                  </ATag>
                </Link>
              </SubMenuItem>
              <SubMenuItem>
                <Link href="/calculateReport">
                  <ATag className="sub" activePage={path.includes('/calculateReport')}>
                    정산리포트
                  </ATag>
                </Link>
              </SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <MenuTitle
              isActive={activeMenu === 'development'}
              onClick={() => handleMenuClick('development')}
            >
              <DevelopmentIcon />
              <span>Development</span>
              <StyledArrowIcon isActive={activeMenu === 'development'} />
            </MenuTitle>
            <SubMenu $isOpen={activeMenu === 'development'}>
              <SubMenuItem>
                <Link href="/apiDocs">
                  <ATag className="sub" activePage={path.includes('/apiDocs')}>
                    API Docs
                  </ATag>
                </Link>
              </SubMenuItem>
              <SubMenuItem>
                <Link href="/adScript">
                  <ATag className="sub" activePage={path.includes('/adScript')}>
                    AD Script Template
                  </ATag>
                </Link>
              </SubMenuItem>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <MenuTitle isActive={activeMenu === 'demo'} onClick={() => handleMenuClick('demo')}>
              <Link href="/demo">
                <ATag activePage={path.includes('/demo')}>
                  <EyesIcon />
                  Demo
                </ATag>
              </Link>
            </MenuTitle>
          </MenuItem>
        </Menu>
      </SidebarContainer>
      <HamburgerButton onClick={toggleSidebar}>☰</HamburgerButton>
    </>
  );
};

export default Sidebar;
