import styled from "styled-components";
import { deviceMobileL } from "../constants";

export const PlaybackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 30px 0 30px;
  background-color: #2c2a35;
  color: white;
  padding-bottom: 50px;
  border-radius: 20px;
`;

export const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and ${deviceMobileL} {
    flex-direction: column;
    gap: 30px;
    justify-content: center;
  }
`;

export const PlayBackControls = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  padding-left: 200px;
  @media screen and ${deviceMobileL} {
    padding-left: 50px;
  }
`;
export const Range = styled.input`
  width: 200px;
  background-color: red;
  @media screen and ${deviceMobileL} {
    width: 150px;
  }
`;

export const ZoomControl = styled.div`
  display: flex;
  gap: 30px;
  flex: 0 0 auto;
  right: 0px;
`;
