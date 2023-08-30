import { Dispatch, SetStateAction } from "react";
import { ExtractResponse } from "../types/text";
import { Token } from "../types/token";

export const extractText = (imageFile: File | null, setResponse: Dispatch<SetStateAction<ExtractResponse | null>>) => {
    const access_token = sessionStorage.getItem("access_token");

    const formData = new FormData();

    // const { imageFile, setResponse } = props;

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

export const signup = (name: string, email: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>, setResponse: Dispatch<SetStateAction<string | null>>, setError: Dispatch<SetStateAction<string | null>>) => {
    // const { name, email, password, setLoading } = props;
    
    fetch("http://127.0.0.1:8000/api/PST/users/", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        setLoading(false);

        if (data.detail !== "user created") {
            setError(data.detail + ". Try again!");
        } else {
            setResponse(data.detail + ". You will now be redirected to the login page...");
        }

        console.log(data);
    })
    .catch((error) => {
        setLoading(false);
        setError("Could not connect. Check your network and try again.")
        console.log(error);
    })
}


export const signin = (email: string, password: string, setToken: Dispatch<SetStateAction<Token>>, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string | null>>) => {
    const formData = new FormData();

    // const { email, password, setToken } = props;

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
        if (Object.keys(data)[0] === "access_token" && Object.keys(data)[1] === "token_type") {
            setToken(data);
            sessionStorage.setItem("access_token", data.access_token);
            setLoading(false);
        } else {
            setError(data.detail + ". Try again!")
            setLoading(false);
        }
    })
    .catch((error) => {
        setError("Could not connect. Check your network and try again.");
        setLoading(false);
        console.log(error);
    })
}


export const readData = (file_type: string, from_date: string, to_date: string, setResponse: Dispatch<SetStateAction<ExtractResponse[] | null>>) => {
    const access_token = sessionStorage.getItem("access_token");

    fetch(`http://127.0.0.1:8000/api/PST/extract/data/?filetype=${file_type}&fromdate=${from_date}&todate=${to_date}`, {
            headers: {
                "accept": "application/json",
                "Authorization": "Bearer " + access_token
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.constructor === Array && data.length !== 0) {
                setResponse(data);
            } else {
                setResponse(null);
            }
        })
        .catch(error => console.log(error))
}
