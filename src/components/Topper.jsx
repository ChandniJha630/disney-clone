import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, provider  } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import {
  selectUserName,
  selectUserPhoto,
  selectUserEmail,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

const Topper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail);
  useEffect(() => {
    const checkUserAuth = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user);
          navigate("/home");
        }
      });
    };

    checkUserAuth();
  }, [userName, navigate]);

  const handleAuth = async () => {
    if (!userName) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential= result.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
       // const credential = provider.credentialFromError(error);
      });
    } else if(userName){
      auth
      .signOut()
      .then(() => {
        dispatch(setSignOutState());
      })
      .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
   

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      
      ) : (
        
        <>
       
          <NavMenu>
            <NavLink to="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </NavLink>
            <NavLink to="/search">
              <img src="/images/search-icon.svg" alt="Search" />
              <span>SEARCH</span>
            </NavLink>
            <NavLink to="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="Watchlist" />
              <span>WATCHLIST</span>
            </NavLink>
            <NavLink to="/original">
              <img src="/images/original-icon.svg" alt="Original" />
              <span>ORIGINALS</span>
            </NavLink>
            <NavLink to="/movie">
              <img src="/images/movie-icon.svg" alt="Movie" />
              <span>MOVIES</span>
            </NavLink>
            <NavLink to="/series">
              <img src="/images/series-icon.svg" alt="Series" />
              <span>SERIES</span>
            </NavLink>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
            <span>
              <UL>
              <Li onClick={handleAuth}>Sign out</Li>
              <Li>
          <NavLink to="/profile">profile</NavLink>
        </Li>
              </UL>
              </span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const UL=styled.ul`
list-style-type: none;
`
const Li=styled.li`
padding: 5px;
align-items:center;
border: 1px solid gray;
border-radius: 4px;
margin: 12px;
`
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 34px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 3px;
  font-size: 14px;
  letter-spacing: 1px;
  width: 300px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Topper;