import { DollarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Form } from "antd";
import { Table } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
    background-color:#FFF;
    padding:1rem 1.25rem;
    border-radius:5px;
    box-shadow:1px 1px 25px 10px #ddd;
    min-height:170px;
    margin-bottom:1rem;
    position:relative;
    border:1px solid #39CCCC;
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
    color:#7367f0;
    font-size:1.15rem;
    font-weight:bold;
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
const CancelButton = styled(Button)`
   margin-top:1rem;
   margin-right:1rem;
   background:#ea5455!important;
   box-shadow:1px 1px 10px 0px #BBB;
   border-color:#ea5455;
   color:#FFF;
   
   &:hover,&:focus{
       color:#FFF;
       border-color:#7367f0;
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


const DolarIconStyled = styled(DollarOutlined)`
    color:#ff9f43;
    font-size:10px;
`;

const DolarTextStyled = styled.span`
   font-size:9px;
   color:#ea5455;
   font-style:italic;
`;

const TableStyled = styled(Table)`
    
     th{
        background-color:#0074F9!important;
        color:#FFF!important;
    }
    th,td{
        padding:0.5rem 0.75rem!important;
        text-align:center!important;
        font-size:13px!important;
        font-weight:500;
    }

    .ant-pagination li {
        border-radius:50%!important;
        border:none;
    }
    
    .ant-pagination-item-link{
        border-radius:50%!important;
        border:none;
        &:not([disabled]):hover{
            background:#EEE;
            color:#111;
        }
    }
    .ant-pagination-item:not(.ant-pagination-item-active):hover{
        background:#EEE;
        a{
            color:#111;
        }
    }
    
    .ant-pagination-item-active a{
        color:#FFF;
    } 
    .ant-pagination-item-active{
        background:#39CCCC;
        border-color:#39CCCC;
    }

`;

const BackgroundText = styled.span`
    display:inline-block;
    background:${props => props.color};
    box-shadow:1px 1px 25px -8px #BBB;
    padding:4px 10px;
    font-size:10px;
    font-weight:bold;
    color:#FFF;
    `;

export {
    Wrapper, TopStyled, TitleStyled, AddButtonStyled,
    RemoveButtonStyled, EditButtonStyled, AddButton,
    FormItemStyled, ResetButton, DolarIconStyled, CancelButton, DolarTextStyled
    , TableStyled, BackgroundText
}