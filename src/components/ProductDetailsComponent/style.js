import { InputNumber } from "antd";
import { styled } from "styled-components";

// export const WrapperImageSmall = styled(Image)`
//   height: 64px;
//   width: 64px;
// `
// export const WrapperStyleColImage = styled(Col)`
//   flex-basics: unset;

export const WrapperStyleNameProduct= styled.h1`
  color: rgb(39, 39, 42);
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  word-break: break-word;
`
export const WrapperStyleTextSell = styled.span`
  color: #787878;
  font-size: 15px;
  line-height: 24px;
`
export const WrapperPriceProduct = styled.div`
  background: white;
  border-radius: 4px;
`
export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
  margin-right: 8px;
  padding-top:10px;
  background: #fff;
`
export const WrapperAddressProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsisl;
  }
  span.change-address {
    color: rgb(10, 104, 255);
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
  }
}
`
export const WrapperQuanityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 120px;
  border:1px solid #ccc;
  border-radius: 4px;
`

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm{
    width:60px;
    border-top: none;
    border-bottom: none;
    &.ant-input-number-handler-wrap{
      display:none;
    }
  }
`