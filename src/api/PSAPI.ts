import { Dispatch, SetStateAction } from "react";
import { ExtractResponse } from "../types/text";
import { Token } from "../types/token";

export const extractText = (props: {imageFile: File | null, setResponse: Dispatch<SetStateAction<ExtractResponse | null>>}) => {
    const access_token = localStorage.getItem("access_token");

    const formData = new FormData();

    const { imageFile, setResponse } = props;

    if (imageFile !== null) {
        formData.append("image", imageFile, imageFile.name)
    }
    

    fetch("http://127.0.0.1:8000/api/PST/extract/", {
        method: "POST",
        body: formData,
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + access_token
        }
    })
    .then(res => res.json())
    .then(data => setResponse(data))
    .catch(error => console.log(error))
}

export const signup = (props: {name: string, email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>}) => {
    const { name, email, password, setLoading } = props;
    
    fetch("http://127.0.0.1:8000/api/PST/users/", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "form/x-www-form-urlencoded",
            "accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        setLoading(false);
        console.log(data);
        
    })
    .catch(error => console.log(error))
}


export const signin = (props: {email: string, password: string, setToken: Dispatch<SetStateAction<Token>>}) => {
    const formData = new FormData();

    const { email, password, setToken } = props;

    formData.append("username", email)
    formData.append("password", password)
    // formData.append("grant_type", "")
    // formData.append("scope", "")
    // formData.append("client_id", "")
    // formData.append("client_secret", "")

    fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        body: formData,
        headers: {
            "accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        setToken(data);
        localStorage.setItem("access_token", data.access_token);
    })
    .catch(error => console.log(error))
}
