import { useMutation } from "react-query"
import { uploadFile } from "../api/uploadApi"

export const useFileUpload=(onSuccess)=>
{
    return useMutation(uploadFile,{
        onSuccess:onSuccess,
        onError:(error)=>{
            console.log(error)
        }
    })
}