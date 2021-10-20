import { Button } from "antd";
import { Form } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
    background-color:#FFF;
    padding:1rem 1.25rem;
    border-radius:10px;
    box-shadow:1px 1px 10px 0px #ddd;
    min-height:200px;
    margin-bottom:2rem;
`;

const TopStyled = styled.div`
   display:flex;
   justify-content:space-between;

   span{
       color:#969696;
       font-size:12px;
   }
`;


const TitleStyled = styled.p`
    color:#6e6b7b;
    font-size:1.15rem;
    font-weight:500;
    letter-spacing:0.5px;
`;

const AddButtonStyled = styled(Button)`
   margin-right:1rem;
   background:#7367f0!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#7367f0;
   
   span{
       color:#FFF;
    }
    &:hover,&:focus{
        span{
            transform:translate(0,-20%);   
        }
        border-color:#7367f0;
}
`;

const RemoveButtonStyled = styled(Button)`
   box-shadow:1px 1px 10px 0px #CCC;
   span{
    color:#ea5455;
   }
   &:hover,&:focus{
    span{
     transform:translate(0,-20%);   
    }
}
`;
const EditButtonStyled = styled(Button)`
   border-color:#ff9f43;
   margin-right:1rem;

   box-shadow:1px 1px 10px 0px #EEE;
   span{
       color:#ff9f43;
    }
    
    &:hover,&:focus{
        span{
         transform:translate(0,-20%);   
        }
        border-color:#ff9f43;
   }
   `;

const AddButton = styled(Button)`
   margin-top:1rem;
   background:#7367f0!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#7367f0;
   color:#FFF;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#ff9f43;
  }
`;

const ResetButton = styled(Button)`
   margin-top:1rem;
   background:#ff9f43!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#ff9f43;
   color:#FFF;
   margin-left:1rem;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
  }
`;

const FormItemStyled = styled(Form.Item)`
    margin-bottom:20px;

    .ant-form-item-explain.ant-form-item-explain-error{
        font-size:11px;
        margin-top:0.25rem;
    }
    label{
        color:#6e6b7b;
    }
`;

export { Wrapper, TopStyled, TitleStyled, AddButtonStyled, RemoveButtonStyled, EditButtonStyled, AddButton, FormItemStyled, ResetButton }