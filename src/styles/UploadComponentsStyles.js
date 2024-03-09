import styled from "styled-components";
import { deviceMobileL } from "../constants";
export const UploadContainer = styled.div`
  min-height: 100px;
  padding: 10px 30px 30px 30px;
  background-color: #2c2a35;
  color: white;
  border-radius: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
`;
export const AudioContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  min-height: 200px;
  padding-left: 20px;
  @media screen and ${deviceMobileL} {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-left: 0px;
  }
`;
export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and ${deviceMobileL} {
    flex-direction: column;
    gap: -10px;
  }
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
export const HeaderButton = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  @media screen and ${deviceMobileL} {
    flex-direction: column;
    gap: 0px;
    margin-left: -50%;
  }
`;
export const Button = styled.button`
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: #84aae6;
  &:hover {
    background-color: #19327d;
    color: white;
  }
  border: none;
  color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media screen and ${deviceMobileL} {
    margin-left: 30%;
    margin-top: 50px;
  }
`;
