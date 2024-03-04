import styled from "styled-components";
export const UploadContainer = styled.div`
  min-height: 300px;
  padding: 0 30px 0 30px;
  background-color: #2c3338;
  color: white;
`;
export const AudioContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  min-height: 300px;
  padding-left: 20px;
`;
export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ImportText = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
export const Import = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;
export const FileDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;
export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #c0e8f9;
  }
  // float: right;
  margin-bottom: 30px;
  // display: flex;
  // flex-direction: flex-reverse-end;
  margin-left: 90%;
`;
