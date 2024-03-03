import styled from "styled-components";

export const TimelineContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const WaveForms = styled.div`
  padding-top: 50px;
  border: 1px solid black;
  position: relative;
  display: flex;
  gap: 10px;
  height: 200px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const Controls = styled.div`
  padding-left: 50%;
  display: flex;
  gap: 10px;
`;
