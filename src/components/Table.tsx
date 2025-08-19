// components/DataTable.tsx
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Trash from '../icons/trash.svg';
import Copy from '../icons/copy.svg';
import CheckBoxOn from '../icons/checkBox_on.svg';
import CheckBoxOff from '../icons/checkBox_off.svg';
import { ViscuitColor } from '@/common/colors';

const TableWrapper = styled.table`
  width: calc(100% + 60px);
  border-collapse: collapse;
  th,
  td {
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    height: 55px;
  }

  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background: #f7f8fa;
  }
  margin: 0px -30px;
`;
const Section = styled.section<{ disabled: boolean }>`
  margin: -12px -12px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
  div {
    display: flex;
    align-items: center;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    cursor: pointer;
  }
`;

const FirstTd = styled.td`
  text-align: left !important;
  color: ${ViscuitColor};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LastError = styled.td`
  color: ${ViscuitColor};
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

interface DataTableProps {
  projects: Project[];
  onDelete: (id: number) => void;
  projectId: number;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const Table: React.FC<DataTableProps> = ({ projects, onDelete, projectId, setProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);

  // 개별 체크박스 클릭 핸들러
  const handleCheckboxChange = (id: number) => {
    setSelectedProjects(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((projectId) => projectId !== id) // 선택 해제
          : [...prevSelected, id] // 선택 추가
    );
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]); // 모든 선택 해제
    } else {
      setSelectedProjects(projects.map((project) => project.id)); // 모든 항목 선택
    }
  };
  // 선택된 프로젝트 삭제 핸들러
  const onDeleteSelected = () => {
    selectedProjects.forEach((id) => onDelete(id)); // 각 id에 대해 onDelete 호출
    setSelectedProjects([]); // 선택 목록 초기화
  };

  const onCopySelected = () => {
    const maxId = Math.max(...projects.map((project) => project.id), 0); // 현재 프로젝트 목록에서 가장 큰 id 찾기
    const copiedProjects = projects
      .filter((project) => selectedProjects.includes(project.id)) // 선택된 프로젝트만 필터링
      .map((project, index) => ({
        ...project,
        id: maxId + index + 1, // 새 id 할당 (기존 최대 id + 1, 2, 3...)
        name: `${project.name} (Copy)`, // 이름에 '(Copy)' 추가
      }));

    setProjects((prevProjects) => [...copiedProjects, ...prevProjects]); // 복사된 프로젝트를 기존 프로젝트에 추가
    setSelectedProjects([]); // 선택 목록 초기화
  };

  useEffect(() => {
    if (projectId) {
      let id = projectId;

      setSelectedProjects((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((projectId) => projectId !== id)
          : [...prevSelected]
      );
    }
  }, [projectId]);

  return (
    <>
      <Section disabled={selectedProjects.length === 0}>
        <div onClick={onCopySelected}>
          <Copy />
          <span>Copy</span>
        </div>
        <div onClick={onDeleteSelected}>
          <Trash />
          <span>SelectDelete</span>
        </div>
      </Section>

      <TableWrapper>
        <thead>
          <tr>
            <th>
              {/* 전체 선택 / 해제 아이콘 */}
              {selectedProjects.length === projects.length ? (
                <CheckBoxOn onClick={handleSelectAll} color="#f2f2f2" />
              ) : (
                <CheckBoxOff onClick={handleSelectAll} />
              )}
            </th>
            <th>프로젝트명</th>
            <th>등록일</th>
            <th>리전</th>
            <th>버킷명</th>
            <th>수집 시간</th>
            <th>수집 주기</th>
            <th>총 항목수</th>
            <th>Processed</th>
            <th>In processing</th>
            <th>Last Error</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                {/* 개별 체크박스 아이콘 */}
                {selectedProjects.includes(project.id) ? (
                  <CheckBoxOn onClick={() => handleCheckboxChange(project.id)} color="white" />
                ) : (
                  <CheckBoxOff onClick={() => handleCheckboxChange(project.id)} />
                )}
              </td>
              <FirstTd>{project.name}</FirstTd>
              <td>{project.date}</td>
              <td>{project.region}</td>
              <td>{project.bucket}</td>
              <td>{project.crawlTime}</td>
              <td>{project.crawlInterval}</td>
              <td>{project.totalItems}</td>
              <td>{project.processed}</td>
              <td>{project.inProcessing}</td>
              <LastError>{project.lastError}</LastError>
              <td style={{ cursor: 'pointer' }}>
                <Trash onClick={() => onDelete(project.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default Table;
