import { Dispatch, SetStateAction } from "react";
import { ExtractResponse } from "../types/text";

export const extractText = (props: {imageFile: File | null, setResponse: Dispatch<SetStateAction<ExtractResponse | null>>}) => {
    const formData = new FormData();

    if (props.imageFile !== null) {
        formData.append("image", props.imageFile, props.imageFile.name)
    }
    

    fetch("http://127.0.0.1:8000/api/PST/extract/", {
        method: "POST",
        body: formData,
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODU5NzAwMzJ9.jfwOEaPCSvPHyf4cDSRavAz9DsGisglmvc3pXTVbYsA"
        }
    })
    .then(res => res.json())
    .then(data => props.setResponse(data))
    .catch(error => console.log(error))
}
