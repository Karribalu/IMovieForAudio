import styled from "styled-components";
import { deviceMobileL } from "../constants";

export const PlaybackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 30px 0 30px;
  // background-color: #a1a0a5;
  background-color: #2c2a35;
  color: white;
  padding-bottom: 50px;
  border-radius: 20px;
`;
export const TimelineContainer = styled.div`
  align-items: center;
  position: relative;
  display: flex;
  gap: 10px;
  height: 400px;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: 30px;
  background-color: #f6f7f7;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
export const TimelineHeader = styled.div`
  display: flex;
  gap: 45%;
`;
export const WaveForms = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 10px 0 10px;
`;

export const WaveForm = styled.div`
  border: 1px solid #e0e7eb;
  padding: 10px 0 10px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border-color: black;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;
export const PlayBackTime = styled.div`
  display: flex;
  justify-content: center;
`;

export const EmptyTimeline = styled.div`
  align-items: center;
  padding-left: 40%;
`;
export const PlayBackControls = styled.div`
  // padding-left: 50%;
  display: flex;
  gap: 10px;
  justify-content: center;
`;
export const Range = styled.input`
  width: 300px;
  background-color: red;
  @media screen and ${deviceMobileL} {
    width: 150px;
  }
`;
