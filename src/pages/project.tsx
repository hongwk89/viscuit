import React, { useEffect, useState } from 'react';
import { MainSection } from '../components/MainSection';
import styled from 'styled-components';
import { Font_L, Weight_SizeL, Weight_SizeS } from '../common/colors';
import Table from '@/components/Table';
import Input from '@/components/Input';
import Button from '@/components/ButtonComponent';
import Modal from '@/components/Modal';
import SelectBox from '@/components/SelectBox';
import SelectComponetBox from '@/components/SelectComponetBox';
import Popup from '@/components/Popup';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

// 스타일 정의
const MainWrapper = styled.div`
  padding: 30px;
`;

const Nodata = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: ${Font_L};
  font-weight: ${Weight_SizeL};
`;

const ModalBodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 36px;
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

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e4e7ea;
  border-radius: 5px;
  padding: 24px 20px;
`;

const TimeHead = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TimeBody = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const DirectWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DeleteWrap = styled.div`
  margin-bottom: 36px;
  > p {
    text-align: left;
    margin-bottom: 8px;
  }
`;

interface Project {
  id: number;
  name: string;
  date: string;
  region: string;
  bucket: string;
  totalItems: string;
  processed: string;
  crawlTime: string;
  crawlInterval: string;
  inProcessing: string;
  lastError: string;
}
const Project: React.FC = () => {
  const { token } = useToken();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: '프로젝트명1',
      date: '2024-07-29',
      region: 'Southeast Asia',
      bucket: 'aisum-bucket',
      totalItems: '4,587,555',
      crawlTime: '12:00PM',
      crawlInterval: '1일',
      processed: '1,587,555',
      inProcessing: '1,587,555',
      lastError: 'Invalid DB URL Data format',
    },
    {
      id: 2,
      name: '프로젝트명2',
      date: '2024-07-29',
      region: 'Southeast Asia',
      bucket: 'aisum-bucket',
      crawlTime: '12:00PM',
      crawlInterval: '1일',
      totalItems: '4,587,555',
      processed: '1,587,555',
      inProcessing: '1,587,555',
      lastError: 'Invalid DB URL Data format',
    },
    {
      id: 3,
      name: '프로젝트명3',
      date: '2024-07-29',
      region: 'Southeast Asia',
      bucket: 'aisum-bucket',
      crawlTime: '12:00PM',
      crawlInterval: '1일',
      totalItems: '4,587,555',
      processed: '1,587,555',
      inProcessing: '1,587,555',
      lastError: 'Invalid DB URL Data format',
    },
    {
      id: 4,
      name: '프로젝트명4',
      date: '2024-07-29',
      region: 'Southeast Asia',
      bucket: 'aisum-bucket',
      crawlTime: '12:00PM',
      crawlInterval: '1일',
      totalItems: '48,555',
      processed: '18,555',
      inProcessing: '10,555',
      lastError: 'Invalid DB URL Data format',
    },
    {
      id: 5,
      name: '프로젝트명5',
      date: '2024-07-29',
      region: 'Southeast Asia',
      bucket: 'aisum-bucket',
      crawlTime: '12:00PM',
      crawlInterval: '1일',
      totalItems: '4,555',
      processed: '1,555',
      inProcessing: '1,587,555',
      lastError: 'Invalid DB URL Data format',
    },
    {
      id: 6,
      name: '프로젝트명6',
      date: '2024-07-29',
      region: 'Southeast Asia',
      bucket: 'aisum-bucket',
      crawlTime: '12:00PM',
      crawlInterval: '1일',
      totalItems: '4,587,555',
      processed: '1,587',
      inProcessing: '1,587,555',
      lastError: 'Invalid DB URL Data format',
    },

    // 추가 데이터...
  ]);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [projectId, setProjectId] = useState<number>(0);

  //모달 상태 값
  const [projectName, setProjectName] = useState('');
  const [selectedValue, setSelectedValue] = useState<string>('option1');
  const [bucketName, setBucketName] = useState('');
  const [dbURL, setDbURL] = useState('');
  const [timeMA, setTimeMA] = useState('PM');
  const [timeHM, setTimeHM] = useState('12');
  const [slectTime, setSlectTime] = useState('');
  const [slectCycle, setSlectCycle] = useState('1d');
  const [isDirect, setIsDirect] = useState(false);
  const [directCycle, setDirectCycle] = useState('1');
  const [selectedDirectValue, setSelectedDirectValue] = useState<string>('d');

  const handleDelete = (id: number) => {
    axios
      .get('https://viscuitapi.aedi.ai/delete_project', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: id,
        },
      })
      .then((res) => {
        setProjects((prev) => prev.filter((project) => project.id !== id));
        setDeleteId('');
      });
  };

  const openIconModal = (id: number) => {
    setIsIconModalOpen(true);
    setDeleteId(id.toString());
  };

  const closeIconModal = () => {
    setIsIconModalOpen(false);
    setDeleteText('');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
    };
  const addFunction = () => {
    const dataInfo = {
      id: 123,
      name: projectName,
      date: new Date().toISOString().slice(0, 10),
      region: selectedValue,
      bucket: bucketName,
      // dbURL,
      // slectTime,
      // slectCycle,
      totalItems: '4,587,555',
      processed: '1,587,555',
      inProcessing: '1,587,555',
      lastError: 'Invalid DB URL Data format',
    };
    axios
      .get('https://viscuitapi.aedi.ai/add_project', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: dataInfo,
        },
      })
      .then((res) => {
        setProjects((prevProjects) => [res.data, ...prevProjects]);
        setIsModalOpen(false);
      });
    // name: '프로젝트명1',
    //     date: '2024-07-29',
    //     region: 'Southeast Asia',
    //     bucket: 'aisum-bucket',
    //     totalItems: '4,587,555',
    //     processed: '1,587,555',
    //     inProcessing: '1,587,555',
    //     lastError: 'Invalid DB URL Data format',
  };
  const delteFunction = (id: number) => {
    if (deleteText.toLowerCase() === 'delete') {
      handleDelete(id);
      closeModal();
      setDeleteText('');
      setProjectId(id);
      closeIconModal();
    } else {
      alert('Enter delete');
    }
  };
  const handleMAChange = (data: string) => {
    setTimeMA(data);
  };
  const handleCycleChange = (data: string) => {
    setSlectCycle(data);
    setIsDirect(false);
  };
  const handleDirect = () => {
    setSlectCycle('');
    setIsDirect(true);
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const options2 = [
    { value: 'd', label: 'day' },
    { value: 'w', label: 'week' },
  ];

  const generateHourButtons = () => {
    const hours =
      timeMA === 'PM'
        ? Array.from({ length: 12 }, (_, i) => i + 12) // 12:00 ~ 23:00
        : Array.from({ length: 12 }, (_, i) => i); // 00:00 ~ 11:00

    return hours.map((hour) => (
      <Button
        key={hour}
        label={`${hour.toString().padStart(2, '0')}:00`}
        width="124px"
        height="48px"
        onClick={() => setTimeHM(hour.toString())}
        fill={false}
        button_type={timeHM === hour.toString() ? 'ViscuitColor' : 'Cancel'}
      />
    ));
  };

  const TimeComponet = () => {
    return (
      <TimeWrapper>
        <TimeHead>
          <Button
            label="AM"
            width="79px"
            height="32px"
            onClick={() => handleMAChange('AM')}
            radius="5px 0px 0px 5px"
            fill={timeMA === 'AM' ? true : false}
            button_type={timeMA === 'AM' ? 'ViscuitColor' : 'Cancel'}
          />
          <Button
            label="PM"
            width="79px"
            height="32px"
            onClick={() => handleMAChange('PM')}
            radius="0 5px 5px 0"
            fill={timeMA === 'PM' ? true : false}
            button_type={timeMA === 'PM' ? 'ViscuitColor' : 'Cancel'}
          />
        </TimeHead>
        <TimeBody>{generateHourButtons()}</TimeBody>
      </TimeWrapper>
    );
  };

  const CycleComponet = () => {
    return (
      <TimeWrapper>
        <TimeBody>
          <Button
            label="12Hour"
            width="124px"
            height="48px"
            onClick={() => handleCycleChange('12h')}
            radius="5px"
            fill={false}
            button_type={slectCycle === '12h' ? 'ViscuitColor' : 'Cancel'}
          />
          <Button
            label="1Day"
            width="124px"
            height="48px"
            onClick={() => handleCycleChange('1d')}
            radius="5px"
            fill={false}
            button_type={!isDirect && slectCycle === '1d' ? 'ViscuitColor' : 'Cancel'}
          />
          <Button
            label="2Day"
            width="124px"
            height="48px"
            onClick={() => handleCycleChange('2d')}
            radius="5px"
            fill={false}
            button_type={!isDirect && slectCycle === '2d' ? 'ViscuitColor' : 'Cancel'}
          />
          <Button
            label="2Day"
            width="124px"
            height="48px"
            onClick={() => handleCycleChange('3d')}
            radius="5px"
            fill={false}
            button_type={!isDirect && slectCycle === '3d' ? 'ViscuitColor' : 'Cancel'}
          />
          <Button
            label="1Week"
            width="124px"
            height="48px"
            onClick={() => handleCycleChange('1w')}
            radius="5px"
            fill={false}
            button_type={!isDirect && slectCycle === '1w' ? 'ViscuitColor' : 'Cancel'}
          />
          <Button
            label="Direct"
            width="124px"
            height="48px"
            onClick={() => handleDirect()}
            radius="5px"
            fill={false}
            button_type={isDirect ? 'ViscuitColor' : 'Cancel'}
          />
        </TimeBody>
        {isDirect && (
          <DirectWrapper>
            <Input
              type="number"
              value={directCycle}
              onChange={handleInputChange(setDirectCycle)}
              width="78%"
              placeholder="1Day"
            />
            <SelectBox
              options={options2}
              value={selectedDirectValue}
              onChange={handleSelectChange(setSelectedDirectValue)}
              width="30%"
              height="44px"
            />
          </DirectWrapper>
        )}
      </TimeWrapper>
    );
  };

  useEffect(() => {
    if (timeMA && timeHM) {
      const hour = parseInt(timeHM);
      if (timeMA === 'AM' && hour >= 0 && hour <= 11) {
        setSlectTime(timeHM + timeMA);
      }
      if (timeMA === 'PM' && hour >= 12 && hour <= 23) {
        setSlectTime(timeHM + timeMA);
      }
    }
  }, [timeMA, timeHM]);

  useEffect(() => {
    if (isDirect && directCycle && selectedDirectValue) {
      setSlectCycle(directCycle + selectedDirectValue);
    }
  }, [isDirect, directCycle, selectedDirectValue]);

  // useEffect(() => {
  //   axios
  //     .get('https://viscuitapi.aedi.ai/get_project', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("데이터 조회 성공");

  //     });
  // }, []);
  return (
    <MainSection title="Project" label="Add Project" onClick={openModal}>
      <MainWrapper>
        {!projects ? (
          <Nodata>Please add a project</Nodata>
        ) : (
          <div>
            <Table
              projects={projects}
              setProjects={setProjects}
              onDelete={openIconModal}
              projectId={projectId}
            />
          </div>
        )}
      </MainWrapper>
      {/* 삭제 팝업 */}
      <Popup
        type="warning"
        popupStyle="landscape"
        title="삭제 하시겠습니까?"
        buttonName="삭제"
        cancel={true}
        open={isIconModalOpen}
        close={() => setIsIconModalOpen(false)}
        click={() => delteFunction(parseInt(deleteId))}
      >
        <DeleteWrap>
          <p>삭제하시려면 Delete를 입력해주세요</p>
          <Input
            placeholder="Delete"
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
          />
        </DeleteWrap>
      </Popup>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add project"
        width="625px"
        overflowY={true}
      >
        <ModalItems>
          <span>Project Name</span>
          <Input
            value={projectName}
            onChange={handleInputChange(setProjectName)}
            width="100%"
            placeholder="알파벳, 숫자, 특수문자(_,-)만 입력"
          />
        </ModalItems>
        <ModalItems>
          <span>Select region</span>
          <SelectBox
            options={options}
            value={selectedValue}
            onChange={handleSelectChange(setSelectedValue)}
            width="100%"
          />
        </ModalItems>
        <ModalItems>
          <span>Bucket name</span>
          <Input
            value={bucketName}
            onChange={handleInputChange(setBucketName)}
            width="100%"
            placeholder="알파벳, 숫자, 특수문자(_,-)만 입력"
            description={true}
            description_content="상품 이미지가 저장될 스토리지 버킷명을 입력해 주세요."
          />
        </ModalItems>
        <ModalItems>
          <span>Enter DB URL</span>
          <Input
            value={dbURL}
            onChange={handleInputChange(setDbURL)}
            width="100%"
            placeholder="Enter DB URL"
            description={true}
            description_content="DB File Format을 확인 후 입력해 주세요."
          />
        </ModalItems>
        <ModalItems>
          <span>Collection time</span>
          <SelectComponetBox value={slectTime} width="100%" customComponent={<TimeComponet />} />
        </ModalItems>
        <ModalItems>
          <span>Collection cycle</span>
          <SelectComponetBox
            value={slectCycle}
            width="100%"
            stay={isDirect}
            customComponent={<CycleComponet />}
          />
        </ModalItems>
        <ModalBodyWrapper>
          <Button
            button_type="Thirdary"
            fill={false}
            height="50px"
            label="Cancel"
            onClick={() => closeModal()}
          />
          <Button
            label="Add"
            height="50px"
            // disabled={deleteText.toLowerCase() === 'delete' ? false : true}
            onClick={() => addFunction()}
          />
        </ModalBodyWrapper>
      </Modal>
    </MainSection>
  );
};

export default Project;
