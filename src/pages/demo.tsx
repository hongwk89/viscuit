import { Font_L, Font_M, Gray, Negative, Weight_SizeS, Weight_SizeSS } from '@/common/colors';
import Button from '@/components/ButtonComponent';
import Input from '@/components/Input';
import { MainSection, SubSection } from '@/components/MainSection';
import Radio from '@/components/Radio';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

const MainWrapper = styled.div`
  padding: 30px;
  overflow-x: hidden; /* 가로 스크롤 방지 */
`;

const DemoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  .margin {
    margin-top: 26px;
  }
`;

const Items = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  span:nth-child(1) {
    font-size: ${Font_L};
    font-weight: ${Weight_SizeS};
    width: 50%;
    max-width: 147px;
  }
  input {
    margin-right: 26px;
  }
`;

const ItemBox = styled.section<{ width?: string }>`
  display: flex;
  width: 100%;
  align-items: center;
  p {
    font-size: ${Font_M};
    font-weight: ${Weight_SizeSS};
    width: ${(props) => (props.width ? props.width : '100%')};
    padding-top: 3px;
    margin-right: 28px;
  }
`;

const Caution = styled.span`
  &::before {
    content: '※';
    margin-right: 4px;
    color: ${Negative};
    margin-left: 13px;
  }
`;

const ButtonBox = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const PreviewWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 216px;
  height: 234px;
  object-fit: contain;
  margin-right: 28px;
`;
const ImageSmilar = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  gap: 16px;
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
  }
  .swiper-button-next:after {
    color: #10163a;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;

const ImgDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 166px;
  height: 234px;
  border: 1px solid ${Gray};
  border-radius: 5px;
  img {
    width: 100%;
    height: 184px;
    object-fit: contain;
  }
  p {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CustomSwiper = styled(Swiper)<{ isBeginning: boolean }>`
  .swiper-button-prev {
    ${({ isBeginning }) => isBeginning && 'display: none;'}
  }
`;

const Demo: React.FC = (): ReactNode => {
  const { token } = useToken();
  const [selectedId, setSelectedId] = useState<string | number | ''>('service');
  const [selectedImg, setSelectedImg] = useState<string | number | ''>('image');
  const [isUrl, setIsUrl] = useState(''); // URL 상태로 관리
  const [isFile, setIsFile] = useState<File | null>(null); // 파일 상태로 관리
  const [isScore, setIsScore] = useState('');
  const [remainingSearches, setRemainingSearches] = useState(20);
  const [previewSections, setPreviewSections] = useState<ReactNode[]>([]); // 여러 섹션을 저장하는 배열
  const [isBeginning, setIsBeginning] = useState(true);

  const handleRadioChange = (id: string | number, field: string) => {
    if (field === 'service') {
      setSelectedId(id);
    } else if (field === 'image' || field === 'url') {
      setSelectedImg(id);
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setIsFile(file); // 파일 저장
    }
  };

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
  };

  const handleSearchClick = () => {
    axios
      .get('https://viscuitapi.aedi.ai/post_demo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: {
            service_type: selectedId,
            image_type: selectedImg,
            score: isScore,
            upload_img: selectedImg === 'image' ? isFile : isUrl,
          },
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          let newPreviewUrl: string | null = null;

          if (selectedImg === 'url' && isUrl) {
            newPreviewUrl = isUrl;
          }
          if (selectedImg === 'image' && isFile) {
            newPreviewUrl = URL.createObjectURL(isFile);
          }

          if (newPreviewUrl) {
            const newSection = (
              <SubSection key={newPreviewUrl}>
                <MainWrapper>
                  <PreviewWrapper>
                    <ImagePreview src={newPreviewUrl} alt="Uploaded or URL image" />
                    <ImageSmilar>
                      <CustomSwiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={res.data.matching_count ?? 16}
                        width={530}
                        slidesPerView={3}
                        navigation
                        onSlideChange={handleSlideChange}
                        isBeginning={isBeginning}
                      >
                        {[...Array(10)].map((_, index) => (
                          <SwiperSlide key={index} style={{ flexShrink: 0, width: '166px' }}>
                            <ImgDataBox>
                              <img src="/imgs/noimage.png" alt="placeholder" />
                              <p>유사도 점수 : {parseInt(isScore) + index}</p>
                            </ImgDataBox>
                          </SwiperSlide>
                        ))}
                      </CustomSwiper>
                    </ImageSmilar>
                  </PreviewWrapper>
                </MainWrapper>
              </SubSection>
            );

            setPreviewSections((prev) => [newSection, ...prev]);
            setIsFile(null);
            setIsUrl('');
          }
        }
        setRemainingSearches(res.data.count);
      });
    // if (remainingSearches > 0) {
    //   setRemainingSearches(remainingSearches - 1);
    // }
  };

  useEffect(() => {
    axios
      .get('https://viscuitapi.aedi.ai/get_demo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          let newPreviewUrl: string | null = null;

          if (selectedImg === 'url' && isUrl) {
            newPreviewUrl = isUrl;
          }
          if (selectedImg === 'image' && isFile) {
            newPreviewUrl = URL.createObjectURL(isFile);
          }

          if (newPreviewUrl) {
            const newSection = (
              <SubSection key={newPreviewUrl}>
                <MainWrapper>
                  <PreviewWrapper>
                    <ImagePreview src={newPreviewUrl} alt="Uploaded or URL image" />
                    <ImageSmilar>
                      <CustomSwiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={res.data.matching_count ?? 16}
                        width={530}
                        slidesPerView={3}
                        navigation
                        onSlideChange={handleSlideChange}
                        isBeginning={isBeginning}
                      >
                        {[...Array(10)].map((_, index) => (
                          <SwiperSlide key={index} style={{ flexShrink: 0, width: '166px' }}>
                            <ImgDataBox>
                              <img src="/imgs/noimage.png" alt="placeholder" />
                              <p>유사도 점수 : {parseInt(isScore) + index}</p>
                            </ImgDataBox>
                          </SwiperSlide>
                        ))}
                      </CustomSwiper>
                    </ImageSmilar>
                  </PreviewWrapper>
                </MainWrapper>
              </SubSection>
            );

            setPreviewSections((prev) => [newSection, ...prev]);
            setIsFile(null);
            setIsUrl('');
          }
        }
        setRemainingSearches(res.data.count);
      });
  }, []);
  return (
    <>
      <MainSection title="Demo">
        <MainWrapper>
          <DemoSection>
            <Items>
              <span>Service type</span>
              <ItemBox>
                <Radio
                  id="service"
                  selectedId={selectedId || ''}
                  onChange={(id) => handleRadioChange(id, 'service')}
                />
                <p>AI 상품 검색</p>
              </ItemBox>
            </Items>
            <Items>
              <span>Image</span>
              <ItemBox width="152px">
                <Radio
                  id="image"
                  selectedId={selectedImg || ''}
                  onChange={(id) => handleRadioChange(id, 'image')}
                />
                <p>파일 업로드</p>
                <Radio
                  id="url"
                  selectedId={selectedImg || ''}
                  onChange={(id) => handleRadioChange(id, 'url')}
                />
                <p>url</p>
              </ItemBox>
            </Items>
            <Items>
              <span>URL</span>
              <ItemBox>
                <Input
                  value={selectedImg === 'image' ? (isFile ? isFile.name : '') : isUrl}
                  onChange={
                    selectedImg === 'image' ? handleFileChange : handleInputChange(setIsUrl)
                  }
                  width="510px"
                  placeholder={selectedImg === 'image' ? '파일을 업로드하세요' : 'URL 입력'}
                  description={true}
                  description_content={`남은 검색: ${remainingSearches}번`}
                  description_color={'black'}
                  position={'absolute'}
                />
                {selectedImg === 'image' && (
                  <div style={{ marginLeft: '8px' }}>
                    {/* 파일 업로드 input */}
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      id="fileUpload"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="fileUpload">
                      <Button
                        label="File Upload"
                        fill={false}
                        button_type="Thirdary"
                        height="44px"
                        onClick={() => document.getElementById('fileUpload')?.click()}
                      />
                    </label>
                  </div>
                )}
                <Caution>하루 최대 20번 검색이 가능합니다.</Caution>
              </ItemBox>
            </Items>
            <Items className="margin">
              <span>Minimum Score</span>
              <ItemBox>
                <Input
                  value={isScore}
                  onChange={handleInputChange(setIsScore)}
                  width="286px"
                  placeholder="유사도 입력"
                  description={true}
                  description_content="유사도 점수 : 0 ~ 100"
                  description_color={'black'}
                  position={'absolute'}
                />
              </ItemBox>
            </Items>
            <ButtonBox>
              <Button label="Search" height="48px" onClick={handleSearchClick} />
            </ButtonBox>
          </DemoSection>
        </MainWrapper>
      </MainSection>

      {/* 역순으로 섹션 렌더링 */}
      {previewSections.map((section) => section)}
    </>
  );
};

export default Demo;
