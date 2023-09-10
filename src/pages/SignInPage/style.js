import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
  flex:1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction:column;
  font-size:13px;
  h1{
    font-size: 30px;
    font-weight: 700;
  }

`
export const WrapperContainerRight = styled.div`
  width:300px;
  background:linear-gradient(136deg, rgb(218 246 237) -1%, rgb(241 220 235) 85%);
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  gap : 4px;

`
export const WrapperTextLight = styled.span`
  color: rgb(13,92,182);
  font-size:13px;
`