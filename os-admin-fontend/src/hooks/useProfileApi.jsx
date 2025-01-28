import {  useQuery } from "react-query";

import { getMyProfile } from "../api/ProfileApi";

export const useMyProfile = (onSuccess, onError) => {
  return useQuery("profile", getMyProfile, {
    onSuccess: onSuccess ?? ((data) => console.log(data)),
    onError: onError ?? ((error) => console.error(error)),
  });
};
