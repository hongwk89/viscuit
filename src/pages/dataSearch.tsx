import Input from '@/components/Input';
import { MainSection, SubSection } from '@/components/MainSection';
import SearchIcon from '../icons/search.svg';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/ButtonComponent';
import { Font_L, Weight_SizeL } from '@/common/colors';
import DataSearchTable from '@/components/DataSearchTable';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

const MainWrapper = styled.div`
  padding: 30px;
`;

const SearchWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 500px;
  gap: 8px;
`;

const Nodata = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: ${Font_L};
  font-weight: ${Weight_SizeL};
`;

interface Project {
  id: number;
  p_key: string;
  name: string;
  img_url: string;
  status: string;
}

const HomePage: React.FC = (): ReactNode => {
  const { token } = useToken();
  const [projects, setProjects] = useState<Project[]>(() => {
    const generatedProjects: Project[] = [];
    for (let i = 1; i <= 100; i++) {
      generatedProjects.push({
        id: i,
        p_key: `p_key${i}`,
        name: `프로젝트명${i}`,
        img_url: 'https://img.aisum.com/product',
        status: 'Ready',
      });
    }
    return generatedProjects;
  });

  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects); // 필터링된 프로젝트 상태

  // 검색어 입력 처리 함수
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 검색어 입력 후 엔터키 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키를 누르면 검색 실행
    }
  };

  // 검색 버튼 클릭 처리 함수
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      // 검색어가 비어있으면 전체 프로젝트 표시
      setFilteredProjects(projects);
    } else {
      // 검색어와 일치하거나 포함된 프로젝트 필터링
      const filtered = projects.filter(
        (project) =>
          project.p_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  useEffect(() => {
    axios
      .get('https://viscuitapi.aedi.ai/get_search_data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProjects(res.data);
      });
  }, []);
  return (
    <>
      <MainSection title="데이터 검색">
        <MainWrapper>
          <SearchWrapper>
            <Input
              value={searchTerm} // 검색어 상태에 바인딩
              onChange={handleSearchInputChange} // 검색어 변경 처리
              onKeyDown={handleKeyPress} // 엔터 키 입력 처리
              width="100%"
              height="48px"
              icon={<SearchIcon />}
              placeholder="P_key 또는 상품명을 입력해 주세요."
            />
            <Button label="Search" height="48px" onClick={handleSearch} /> {/* 검색 버튼 */}
          </SearchWrapper>
        </MainWrapper>
      </MainSection>
      <SubSection>
        <MainWrapper>
          {filteredProjects.length === 0 ? ( // 필터링된 프로젝트가 없을 때 처리
            <Nodata>No matching projects found</Nodata>
          ) : (
            <div>
              <DataSearchTable
                projects={filteredProjects}
                setProjects={setProjects}
                projectId={0}
              />{' '}
              {/* 필터링된 프로젝트 전달 */}
            </div>
          )}
        </MainWrapper>
      </SubSection>
    </>
  );
};

export default HomePage;
