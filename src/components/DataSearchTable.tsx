import React, { useState } from 'react';
import styled from 'styled-components';
import { InputDisable } from '@/common/colors';
import SelectBox from './SelectBox';
import Pagination from './Pagination';

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
const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
`;

interface Project {
  id: number;
  p_key: string;
  name: string;
  img_url: string;
  status: string;
}

interface DataTableProps {
  projects: Project[];
  projectId: number;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const DataSearchTable: React.FC<DataTableProps> = ({ projects, projectId, setProjects }) => {
  const [selectedValue, setSelectedValue] = useState<string>('20'); // 페이지당 항목 수 (기본값 20)
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 (기본값 1)

  const options = [
    { value: '20', label: 'View 20 each' },
    { value: '50', label: 'View 50 each' },
    { value: '100', label: 'View 100 each' },
  ];

  // 페이지당 항목 수와 총 페이지 계산
  const itemsPerPage = parseInt(selectedValue, 10);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // 현재 페이지에 해당하는 프로젝트 계산
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const visibleProjects = projects.slice(startIdx, endIdx);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // SelectBox 값 변경 핸들러
  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value);
      setCurrentPage(1); // 페이지 수를 변경하면 첫 페이지로 이동
    };

  return (
    <>
      <Section>
        <div>{`Total: ${'1,000'}`}</div>
        <SelectBox
          options={options}
          value={selectedValue}
          onChange={handleSelectChange(setSelectedValue)}
          border="none"
          width="15%"
          height="44px"
          color={InputDisable}
        />
      </Section>
      <TableWrapper>
        <thead>
          <tr>
            <th>P_key</th>
            <th>상품명</th>
            <th>img_url</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {visibleProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.p_key}</td>
              <td>{project.name}</td>
              <td>{project.img_url}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>

      {/* 페이지네이션 버튼 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default DataSearchTable;
