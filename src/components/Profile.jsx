import React from 'react'
import { useDispatch, useSelector} from "react-redux";
import { selectUserName, selectUserPhoto , selectUserEmail } from "../features/user/userSlice";
import styled from "styled-components";

function Profile() {
  
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const userEmail= useSelector(selectUserEmail);
  return (
    <PDiv>
      <DP src={userPhoto} alt="" />
      <Entry>{userName}</Entry>
      <Entry>{userEmail}</Entry>
    </PDiv>
  )
}

const PDiv= styled.div`
padding: 100px;
justify-items: center;
align-items:center;
background-color:white,
top: 100px;

`
const DP= styled.img`

height: 100px;
width:100px;
border-style:solid;
border-radius:50%;
`

const Entry= styled.h3`
font-size:14px;
justify-items:right;
aligh-items:center;
`

export default Profile
