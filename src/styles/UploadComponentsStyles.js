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
  align-items: center;
  justify-items: center;
  align-content: center;
`;

export const Heading = styled.div`
  // display: flex;
  justify-content: space-between;
  @media screen and ${deviceMobileL} {
    flex-direction: column;
    gap: -10px;
  }
`;

export const DragAndDrop = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  padding-top: 30px;
  cursor: pointer;
`;
