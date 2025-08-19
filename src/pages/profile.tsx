import React, { useEffect, useState } from 'react';
import { MainSection } from '../components/MainSection';
import styled from 'styled-components';
import Input from '@/components/Input';
import { Font_L, Font_XL, InputDisable, Weight_SizeL, Weight_SizeS } from '../common/colors';
import Button from '@/components/ButtonComponent';
import SelectBox from '@/components/SelectBox';
import FooterButton from '@/components/FooterButton';
import Modal from '@/components/Modal';
import ContactInfo from '@/components/ContactInfo';
import useInput from '@/hooks/useInput';
import { Info } from './signUp/info';
import Popup from '@/components/Popup';
import { pw_regexp } from '@/utils/regExp';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

const MainContent = styled.div`
  padding: 30px;
`;

const ProfileSection = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  gap: 24px;
  h5 {
    font-size: ${Font_L};
    font-weight: ${Weight_SizeS};
    width: 50%;
    max-width: 243px;
    display: flex;
    align-items: center;
  }
  > div > div {
    width: 100% !important;
    > div {
      width: 100% !important;
    }
  }
  > div:nth-child(9) > div {
    width: 100% !important;
    > div:nth-child(1) {
      width: 150px !important;
    }
  }
  input {
    width: 100% !important;
  }
`;

const Items = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  span {
    font-size: ${Font_L};
    font-weight: ${Weight_SizeS};
    width: 50%;
    max-width: 243px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h3 {
    font-size: ${Font_XL};
    font-weight: ${Weight_SizeL};
    margin-top: 16px;
  }
  span {
    font-size: 14px;
    color: ${InputDisable};
    font-weight: 500;
    &::before {
      content: '*';
      color: #fc5058;
      margin: 0 4px;
    }
  }
`;

const BottomSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
`;

const ModalItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  span {
    font-size: ${Font_L};
    font-weight: ${Weight_SizeS};
    width: 50%;
    max-width: 243px;
  }
  margin-bottom: 24px;
`;

const ModalBodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePage: React.FC = () => {
  const { token } = useToken();
  // 각각의 Input 상태를 관리하는 useState 훅
  const [email, setEmail] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disalbed, setDisabled] = useState(false);
  const [pw, setPw] = useState(['', '', '']);
  const [on, setOn] = useState(true);
  const [popup, setPopup] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setFirstPw = (val: string) => {
    setPw((prev) => [val, prev[1], prev[2]]);
  };
  const setSecondPw = (val: string) => {
    setPw((prev) => [prev[0], val, prev[2]]);
  };
  const setNewPw = (val: string) => {
    setPw((prev) => [prev[0], prev[1], val]);
  };

  const pw1Input = useInput('', setFirstPw);
  const pw2Input = useInput('', setSecondPw);
  const pw3Input = useInput('', setNewPw);

  // Input 값이 변경될 때 호출되는 함수
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const [info, setInfo] = useState<Info>({
    company: '',
    country: '',
    address: '',
    address2: '',
    city: '',
    zipCode: '',
    mobileCode: '+1',
    mobileNumber: '',
    manager: '',
  });
  const setValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    if ((key === 'mobileNumber' || key === 'zipCode') && /\D/g.test(e.target.value)) {
      return;
    }

    setInfo((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const goHome = () => {
    setPopup(false);
  };

  const updateFuntion = () => {
    axios
      .get('https://viscuitapi.aedi.ai/update_user_info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: info,
        },
      })
      .then((res) => {
        var userInfo = res.data;
        setEmail(userInfo.email);
        setInfo(userInfo);
      });
  };

  const updatePassword = () => {
    var dataInfo = {
      password: pw1Input.value,
      password2: pw2Input.value,
      password3: pw3Input.value,
    };
    axios
      .get('https://viscuitapi.aedi.ai/update_password', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: dataInfo,
        },
      })
      .then((res) => {
        console.log(res);
        closeModal();
        setPopup(true);
      });
  };
  useEffect(() => {
    if (disalbed && pw_regexp.test(pw[0]) && pw[0] === pw[1]) {
      setOn(false);
      return;
    }

    setOn(true);
  }, [pw, disalbed]);

  useEffect(() => {
    axios
      .get('https://viscuitapi.aedi.ai/user_info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        var userInfo = res.data;
        setEmail(userInfo.email);
        setInfo(userInfo);
      });
  }, []);

  const errorText = [
    { text: '비밀번호가 일치하지 않습니다. 다시 입력해 주세요.', color: '#FF8126' },
    { text: '비밀번호가 일치합니다.', color: '#17A15F' },
  ];
  return (
    <MainSection title="정보 변경">
      <MainContent>
        <ProfileSection>
          <Items>
            <span>이메일</span>
            <Input value={email} onChange={handleInputChange(setEmail)} width="100%" disabled />
          </Items>
          <Items>
            <span>비밀번호</span>
            <Button
              label="비밀번호 변경"
              button_type="Thirdary"
              onClick={openModal}
              width="150px"
              fill={false}
            />
          </Items>
          <Content>
            <h3>Contact information</h3>
            <span>필수 입력</span>
          </Content>
          <ContactInfo flex="flex" info={info} setValue={setValue} />
        </ProfileSection>
        <BottomSection>
          <FooterButton
            label="취소"
            button_type="Cancel"
            onClick={() => alert('Clicked!')}
            fill={false}
          />
          <FooterButton label="수정" onClick={updateFuntion} />
        </BottomSection>
      </MainContent>
      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="비밀번호 변경">
        <ModalItems>
          <span>비밀번호</span>
          <Input
            eyes={true}
            placeholder="현재 비밀번호 입력"
            width="100%"
            {...pw1Input}
            description={!pw_regexp.test(pw[0]) && pw[0].length > 0}
            description_content="영문, 숫자, 특수문자(~!@#$%^&*) 조합 8자 이상 입력해 주세요."
            description_color="#FF8126"
          />
        </ModalItems>
        <ModalItems>
          <span>새 비밀번호</span>
          <Input
            width="100%"
            eyes={true}
            {...pw2Input}
            description={!pw_regexp.test(pw[1]) && pw[1].length > 0}
            description_content="영문, 숫자, 특수문자(~!@#$%^&*) 조합 8자 이상 입력해 주세요."
            description_color="#FF8126"
          />
        </ModalItems>
        <ModalItems>
          <span>새 비밀번호 확인</span>
          <Input
            width="100%"
            placeholder="새 비밀번호 확인"
            eyes={true}
            {...pw3Input}
            description={pw[2].length > 0}
            description_content={pw[1] !== pw[2] ? errorText[0].text : errorText[1].text}
            description_color={pw[1] !== pw[2] ? errorText[0].color : errorText[1].color}
          />
        </ModalItems>
        <ModalBodyWrapper>
          <Button
            label="변경"
            onClick={() => {
              updatePassword();
            }}
          />
        </ModalBodyWrapper>
      </Modal>
      <Popup
        open={popup}
        click={goHome}
        title="변경이 완료되었습니다"
        buttonName="Back to Home"
        closeBtn={false}
      />
    </MainSection>
  );
};

export default ProfilePage;
