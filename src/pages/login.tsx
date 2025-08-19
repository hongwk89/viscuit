import { ViscuitColor } from '@/common/colors';
import BeforeLoginTemplete from '@/components/BeforeLoginTemplete';
import Button from '@/components/ButtonComponent';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

const Form = styled.form`
  .input {
    margin-bottom: 32px;
    /* input {
      width: 400px;
      height: 45px;
      border-radius: 5px;
      border: 1px solid #e4e7ea;
      font-size: 16px;
      padding: 0 16px;
    } */
  }
  .save_find {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
    > a {
      color: ${ViscuitColor};
    }
  }
  .buttons {
    > p {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background: #e4e7ea;
      }
      position: relative;
      text-align: center;
      margin: 32px 0;
      > span {
        position: relative;
        z-index: 1;
        background: #fff;
        padding: 20px;
        text-align: center;
      }
    }
  }
`;

export default function Login() {
  const [checked, setChecked] = useState<boolean>();
  const cookie_name = 'viscuitEmail';
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const { setToken } = useToken();

  const onChange = (checked: boolean) => {
    setChecked(checked);
    if (checked) {
      Cookies.set(cookie_name, '1', { expires: 365 });
    } else {
      Cookies.remove(cookie_name);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    axios
      .post('https://viscuitapi.aedi.ai/login', {
        id: emailValue,
        pw: passwordValue,
      })
      .then((res) => {
        if (res.data.status === 'S') {
          setToken(res.data.token);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const cookie = Cookies.get(cookie_name);

    if (cookie) {
      setChecked(true);
    }
  }, []);

  return (
    <BeforeLoginTemplete>
      <Form onSubmit={handleSubmit}>
        <div className="input eamil">
          <Input width="400px" label="이메일 주소" placeholder="이메일 주소 입력" {...emailInput} />
        </div>
        <div className="input password">
          <Input label="Password" eyes={true} placeholder="Enter Password" {...passwordInput} />
        </div>
        <div className="save_find">
          <Checkbox id="saveEmail" label="이메일 주소 저장" checked={checked} onChange={onChange} />
          <Link href="/findPw">
            <a>비밀번호 찾기</a>
          </Link>
        </div>
        <div className="buttons">
          <Button label="Login" width="100%" height="56px" font_size="18px" />
          <p>
            <span>OR</span>
          </p>
          <Link href="/signUp">
            <Button
              button_type="Thirdary"
              label="Sign up"
              width="100%"
              height="56px"
              font_size="18px"
              fill={false}
              border_color="#E4E7EA"
            />
          </Link>
        </div>
      </Form>
    </BeforeLoginTemplete>
  );
}
