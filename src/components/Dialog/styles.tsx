import styled from "styled-components";

export const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const DialogContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DialogActions = styled.div`
  display: flex;
  align-self: flex-end;
  width: 100%;
  justify-content: center;
  gap: 24px;

  button {
    width: 100%;
    justify-content: center;
  }
`;
