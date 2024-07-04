"use client";

import { useDispatch } from "react-redux";
import { setUserInfo } from "../Featuers/Auth/AuthSlice";
import { useGetuserInfoByNameQuery } from "../Featuers/Auth/AuthAPIS";
import { useEffect } from "react";

const UserRelaod = () => {
  const dispatch = useDispatch();
  const { data: userData, refetch } = useGetuserInfoByNameQuery();

  useEffect(() => {
    refetch();
    if (userData?.data) {
      localStorage.setItem("Id", userData.data._id);
      localStorage.setItem("User_name", userData.data.Username);
      localStorage.setItem("User_email", userData.data.email);
    }
    if (userData?.error) {
      localStorage.setItem("Id", "");
      localStorage.setItem("User_name", "");
      localStorage.setItem("User_email", "");
    }

    const Get_user_Id = localStorage.getItem("Id");
    const Get_user_Name = localStorage.getItem("User_name");
    const Get_user_Email = localStorage.getItem("User_email");
    dispatch(
      setUserInfo({
        _id: Get_user_Id!,
        Username: Get_user_Name!,
        email: Get_user_Email!,
      })
    );
  }, [dispatch, userData]);
  return;
};

export default UserRelaod;
