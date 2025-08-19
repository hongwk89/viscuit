import { Font_XXL, Gray, Sky, ViscuitColor, Weight_SizeL } from '@/common/colors';
import LinkIcon from '../icons/link.svg';
import SubSidebar from '@/components/SubSidebar';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import CodeBlock from '@/components/CodeBlock';

const MainWrapper = styled.div`
  display: flex;
  padding: 36px 50px;
`;

const Section = styled.section`
  flex: 1;
  min-height: auto;
  gap: 60px;
  border-radius: 10px;
  background: #ffffff;
  margin: 36px;
  padding: 44px 30px;
`;

const Title = styled.p`
  font-size: ${Font_XXL};
  font-weight: ${Weight_SizeL};
`;

const DivText = styled.section<{ flex?: string }>`
  display: flex;
  flex-direction: ${({ flex }) => (flex ? 'revert' : 'column')};
  justify-content: ${({ flex }) => (flex ? 'start' : 'center')};
  margin: 28px 0;
  align-items: ${({ flex }) => (flex ? 'center' : 'start')};
  gap: 8px;
`;

const BlueUrl = styled.span`
  display: flex;
  align-items: center;
  background: ${Sky};
  padding: 8px 16px;
  padding-right: 42px;
  color: ${ViscuitColor};
`;

const TableWrapper = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 32px;
  th,
  td {
    padding: 16px;
    text-align: start;
    vertical-align: middle;
    line-height: 1.4;
    border-bottom: 1px solid ${Gray};
  }
  td:nth-child(1) {
    width: 220px;
    border-right: 1px solid ${Gray};
  }

  th {
    text-align: center;
    background-color: #f2f2f2;
    border-right: 1px solid #fff;
  }
  tr:nth-child(even) {
    background: #f7f8fa;
  }
`;
const HomePage: React.FC = (): ReactNode => {
  const [activeMenu, setActiveMenu] = useState<string | null>('overview');
  const cover_image_code = `
    (this.over_aedi.src = "①")
  `;
  const canvas_editing_code = `
    function showCanvasAD(responseJson) {
    …object

    //  Write custom code
    }
  `;
  const logo_edge_code = `
    logo_edge_Thumb: function (...parameters) {
    //…object
    
    function startImageRotation() {
            setTimeout(() => {
            img.src = img_url;
            setImageOnload(abf_info);
            }, 1000); //1초 로고
            setTimeout(() => {


            canvasParent.style.visibility = "hidden"
            canvasButton.style.visibility = "visible";
            img.src = logo_url;
            setImageOnload(abf_logo);
            startImageSecondRotaiton();
            }, 5000); //총 5초동안 광고 소재 화면 출력
        }
    }
  `;
  const double_edge_code = `
    function showCanvasDoubleAD(responseJson, el, index = r) {
        …object

        //  Write custom code
    }
  `;
  const secret_box_code = `
    function aedi_secret_box(...parameters) {
        …object

        //  Write custom code
    }
  `;

  return (
    <MainWrapper>
      <SubSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {activeMenu === 'overview' && (
        <Section>
          <Title>Overview</Title>
          <DivText flex="flex">
            <span>Full Script URL:</span>
            <BlueUrl>
              https://api.aedi.ai/common/js/v1/aedi-ad.js
              <LinkIcon />
            </BlueUrl>
          </DivText>
          <TableWrapper>
            <thead>
              <tr>
                <th>함수명</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>adOpen</td>
                <td>
                  사용자 사이트의 web,mobile Web의 기사페이지 에서 호출 하는 함수로 <br />
                  api_key와 이미지의 태그 선택자, 해당 기사의 날짜를 담아서 함수를 호출합니다.
                </td>
              </tr>
              <tr>
                <td>adCreate</td>
                <td>
                  - adOpen함수에서 호출했을때 이미지의 갯수 만큼 실행 되는 함수 <br />- LazyLoad를
                  감지 함수
                </td>
              </tr>
              <tr>
                <td>showAD</td>
                <td>api 호출 하는 함수 (url 필수 파라미터)</td>
              </tr>
              <tr>
                <td>showCanvasAD</td>
                <td>
                  - magic에서 받은 응답 값을 이용하여 캠버스 생성 <br />- offset3 함수를 이용하여
                  캠버스 좌표 및 사이즈 조절
                </td>
              </tr>
              <tr>
                <td>adThumb</td>
                <td>
                  - magic에서 받은 응답 값을 이용하여 캠버스 생성 <br />- offset3 함수를 이용하여
                  캠버스 좌표 및 사이즈 조절
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>
      )}
      {activeMenu === 'parameter' && (
        <Section>
          <Title>key parameter</Title>
          <DivText>
            <b>adOpen, adCreate</b>
          </DivText>
          <TableWrapper>
            <thead>
              <tr>
                <th>파라미터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>api_key</td>
                <td>매직을 호출하기 위한 키</td>
              </tr>
              <tr>
                <td>img</td>
                <td>이미지 셀렉터</td>
              </tr>
              <tr>
                <td>date</td>
                <td>api 호출 하는 함수 (url 필수 파라미터)</td>
              </tr>
              <tr>
                <td>showCanvasAD</td>
                <td>기사 날짜 (1달 이내여야 합니다)</td>
              </tr>
              <tr>
                <td>img_cap</td>
                <td>시크릿 박스 이미지 캡션 영역 (디폴트 null)</td>
              </tr>
            </tbody>
          </TableWrapper>
          <DivText>
            <b>showAD</b>
          </DivText>
          <TableWrapper>
            <thead>
              <tr>
                <th>파라미터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>url</td>
                <td>magic url</td>
              </tr>
            </tbody>
          </TableWrapper>
          <DivText>
            <b>showCanvasAD</b>
          </DivText>
          <TableWrapper>
            <thead>
              <tr>
                <th>파라미터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>responseJson</td>
                <td>magic 응답 값</td>
              </tr>
            </tbody>
          </TableWrapper>
          <DivText>
            <b>responseJson 내용</b>
          </DivText>
          <TableWrapper>
            <thead>
              <tr>
                <th>파라미터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>status</td>
                <td>상태 (SUCESS:성공 , FAILED: 실패)</td>
              </tr>
              <tr>
                <td>abf_info</td>
                <td>광고 소재의 비율,좌표,색상 등 정보</td>
              </tr>
              <tr>
                <td>img_url</td>
                <td>광고 이미지 url</td>
              </tr>
              <tr>
                <td>imp_url</td>
                <td>로그 정보 url</td>
              </tr>
              <tr>
                <td>imp2_url</td>
                <td>로그 정보 url</td>
              </tr>
              <tr>
                <td>resize_ratio</td>
                <td>비율 정보</td>
              </tr>
              <tr>
                <td>score</td>
                <td>유사도 점수</td>
              </tr>
              <tr>
                <td>zIndex</td>
                <td>캠버스의 z-index 값</td>
              </tr>
            </tbody>
          </TableWrapper>
          <DivText>
            <b>adThumb</b>
          </DivText>
          <TableWrapper>
            <thead>
              <tr>
                <th>파라미터</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>img_url</td>
                <td>광고 이미지 url</td>
              </tr>
              <tr>
                <td>imp_url</td>
                <td>로그 정보 url</td>
              </tr>
              <tr>
                <td>imp2_url</td>
                <td>로그 정보 url</td>
              </tr>
              <tr>
                <td>canvas</td>
                <td>캠버스 데이터</td>
              </tr>
              <tr>
                <td>offset</td>
                <td>캠버스 좌표 데이터</td>
              </tr>
              <tr>
                <td>abf_info</td>
                <td>광고 소재의 비율, 좌표, 색상 등 정보</td>
              </tr>
              <tr>
                <td>display_ratio</td>
                <td>비율 정보</td>
              </tr>
              <tr>
                <td>pv_imp_url</td>
                <td>로그 정보 url</td>
              </tr>
              <tr>
                <td>is_aedi</td>
                <td>커버 이미지(디폴트 0)</td>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>
      )}
      {activeMenu === 'edge' && (
        <Section>
          <Title>Edge</Title>
          <DivText>
            <b>Cover image</b>
            <span>기본으로 제공하는 url을 변경하면 커버 이미지를 변경할 수 있습니다.</span>
          </DivText>
          <CodeBlock code={cover_image_code} language="typescript" />
          <DivText>
            <span>기본 제공 커버 이미지 (테두리 제외)</span>
            <img src="/imgs/default_cover.png" alt="placeholder" width={166} height={184} />
          </DivText>

          <DivText>
            <b>Canvas Editing</b>
            <span>
              캔버스를 그려주는 함수에서 원하는 캔버스 디자인 및 기능을 추하하여 사용하실수
              있습니다.
            </span>
          </DivText>
          <CodeBlock code={canvas_editing_code} language="typescript" />
          <DivText>
            <b>LOGO_EDGE</b>
            <span>
              startImageRotation - 함수에서 화면 출력 시간 및 로고 출력 시간등 설정을 변경할 수
              있습니다.
            </span>
          </DivText>
          <CodeBlock code={logo_edge_code} language="typescript" />
          <DivText>
            <b>DOUBLE_EDGE</b>
            <span>
              더블 엣지의 캔버스를 그리는 함수에서 코드를 커스텀 하여 원하는 디자인으로 커스텀 하여
              사용 가능합니다.
            </span>
          </DivText>
          <CodeBlock code={double_edge_code} language="typescript" />
        </Section>
      )}
      {activeMenu === 'secret' && (
        <Section>
          <Title>Secret Box</Title>
          <DivText>
            <span>
              시크릿 박스를 그려주는 함수에서 애니메이션 등 원하는 기능 및 동작을 커스텀 하여
              사용할수 있습니다.
            </span>
          </DivText>
          <CodeBlock code={secret_box_code} language="typescript" />
        </Section>
      )}
    </MainWrapper>
  );
};

export default HomePage;
