import styled from 'styled-components';
import Success from '../icons/success.svg';
import Warning from '../icons/warning.svg';
import Button from '@/components/ButtonComponent';

const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'popupStyle', // 'sidebar' 속성이 DOM으로 전달되지 않도록 필터링
})<{ popupStyle: 'portrait' | 'landscape'; font_size: string; cdr: React.ReactNode }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: ${(props) => (props.popupStyle === 'portrait' ? '60px' : '40px 54px 37px')};
  width: ${(props) => (props.popupStyle === 'portrait' ? '364px;' : '420px')};
  background: #fff;
  border-radius: 14px;
  text-align: center;
  > .close {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 24px;
    height: 24px;
    background: none;
    border: 0;
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background: #000;
    }
    &::before {
      transform: translateY(-50%) rotate(45deg);
    }
    &::after {
      transform: translateY(-50%) rotate(-45deg);
    }
  }
  > h3 {
    font-size: ${(props) => props.font_size};
    line-height: 1.3;
    font-weight: bold;
    margin: ${(props) => (props.popupStyle === 'portrait' ? '26px 0 72px;' : '20px 0 36px')};
    ${(props) => props.children && `margin-bottom:20px`}
  }
  > .buttons {
    display: flex;
    gap: 16px;
  }
`;

interface popup {
  children?: React.ReactNode;
  open: boolean;
  close?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'confirm' | 'warning';
  title: string;
  closeBtn?: boolean;
  buttonName: string;
  cancel?: boolean;
  popupStyle?: 'portrait' | 'landscape';
  font_size?: string;
  click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Popup = ({
  children,
  open,
  close,
  type = 'confirm',
  title,
  closeBtn = true,
  buttonName,
  cancel = false,
  popupStyle = 'portrait',
  font_size = '24px',
  click,
}: popup) => {
  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      <Dim></Dim>
      <Content cdr={children} popupStyle={popupStyle} font_size={font_size}>
        {closeBtn && <button type="button" className="close" onClick={close}></button>}
        {type === 'confirm' ? <Success /> : <Warning />}
        <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
        {children && children}
        <div className="buttons">
          {cancel && (
            <Button
              button_type="Cancel"
              label="취소"
              fill={false}
              width="100%"
              height={popupStyle === 'portrait' ? '60px' : '48px'}
              onClick={close}
            />
          )}
          <Button
            label={buttonName}
            width="100%"
            height={popupStyle === 'portrait' ? '60px' : '48px'}
            font_weight="500"
            font_size={popupStyle === 'portrait' ? '18px' : '16px'}
            onClick={click}
          />
        </div>
      </Content>
    </div>
  );
};

export default Popup;
