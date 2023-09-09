import  styled  from "styled-components";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 15px;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover{
    color: #fff;
    background: #92B9E3;
    span{
       color:#fff;
    }
     width:100%;
     text-align: center;
     padding-bottom: 10px;
     
  }  
`
export const WrapperProducts = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
  flex-wrap: wrap;
`