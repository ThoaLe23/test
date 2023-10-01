import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 4px 0;
`
export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 500px;
  margin: 15px 300px;
  padding: 30px;
  border-radius:10px;
  gap: 20px;
`
export const WrapperLabel = styled.label`
  color: #000;
  font-size: 12px;
  line-height: 30px;
  font-weight: 600;
  text-align: left;
  width: 60px;
`
export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
export const WrapperUploadFile = styled(Upload)`
  & .ant-upload-list-item-container{
    display: none;
  }
`
