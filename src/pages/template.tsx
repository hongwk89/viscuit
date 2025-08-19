import { Font_L, Gray, Shadow, Weight_SizeL } from '@/common/colors';
import Button from '@/components/ButtonComponent';
import CodeBlock from '@/components/CodeBlock';
import { MainSection } from '@/components/MainSection';
import Modal from '@/components/Modal';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const TableWrapper = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 32px;
  th,
  td {
    padding: 16px;
    width: 214px;
    text-align: center;
    vertical-align: middle;
    line-height: 1.4;
    border-bottom: 1px solid ${Gray};
    button {
      margin: auto;
    }
  }
  tr {
    th:nth-child(2n + 3),
    td:nth-child(2n + 3) {
      background: #f7f8fa;
    }
  }
  tr {
    > :nth-child(1) {
      width: 146px;
      background-color: ${Gray};
      font-size: ${Font_L};
      font-weight: ${Weight_SizeL};
    }
  }
`;

const ModalBottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

const Template: React.FC = (): ReactNode => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const script_code = `
    // !중요! 반드시 기사 본문보다 아래에 삽입하셔야 합니다 !!
    <link rel='stylesheet' href='https://api.aedi.ai/
    common/css/v1/aedi-ad.css'>
    <script src='https://api.aedi.ai/common/js/v1/
    aedi-ad.js'></script>
    <script type='text/javascript'>
        var AEDI_API_KEY = 'b5a1d925221b37e2e399f7b319038ba0';
        var aedi = new Aedi();
        var aediWritingTime = '0000-00-00 00:00:00'; 
    // 반드시 기사 날짜가 입력되어야 광고가 노출됩니다.
        var imgSelector = 
    document.querySelectorAll('.article-body img');
    // .img 해당 부분에 기사 이미지에 해당하는 Selector 요소를
    입력해 주세요
        aedi.adOpen(AEDI_API_KEY, imgSelector,
    aediWritingTime);
    </script>
  `;
  return (
    <>
      <MainSection title="템플릿 예시">
        <TableWrapper>
          <thead>
            <tr>
              <th>템플릿명</th>
              <th>일반 엣지</th>
              <th>듀얼 엣지</th>
              <th>더블 엣지</th>
              <th>사각 엣지</th>
              <th>AI 일반배너</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>템플릿 예시</td>
              <td>
                <img src="/imgs/edge.gif" alt="placeholder" width={166} height={184} />
              </td>
              <td>
                <img src="/imgs/dual_edge.gif" alt="placeholder" width={166} height={184} />
              </td>
              <td>
                <img src="/imgs/double_edge.gif" alt="placeholder" width={166} height={184} />
              </td>
              <td>
                <img src="/imgs/square_edge.gif" alt="placeholder" width={166} height={184} />
              </td>
              <td>
                <img src="/imgs/default_ai.png" alt="placeholder" width={166} height={184} />
              </td>
            </tr>
            <tr>
              <td>스크립트</td>
              <td>
                <Button
                  label="스크립트 보기"
                  button_type="Thirdary"
                  onClick={() => setIsModalOpen(true)}
                  width="150px"
                  fill={false}
                />
              </td>
              <td>
                <Button
                  label="스크립트 보기"
                  button_type="Thirdary"
                  onClick={() => setIsModalOpen(true)}
                  width="150px"
                  fill={false}
                />
              </td>
              <td>
                <Button
                  label="스크립트 보기"
                  button_type="Thirdary"
                  onClick={() => setIsModalOpen(true)}
                  width="150px"
                  fill={false}
                />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Request</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Response</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </TableWrapper>
      </MainSection>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="스크립트 예시" width="570px">
        <CodeBlock code={script_code} language="typescript" />
        <ModalBottomWrapper>
          <Button label="닫기" onClick={closeModal} height="48px" />
        </ModalBottomWrapper>
      </Modal>
    </>
  );
};

export default Template;
