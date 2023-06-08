import { useState, FormEvent, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import { convertImage } from "../utils/imageUtils";
import { extractText } from "../api/PSAPI";
import { ExtractResponse } from "../types/text";
import { DocumentContainer } from "./DocumentContainer";


export const ImageSection = () => {
    const [image, setImage] = useState<string>("");
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [response, setResponse] = useState<ExtractResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const inputValue: FileList | null = e.currentTarget.files;

        convertImage(inputValue, setImage);
        setUploadedImage(inputValue ? inputValue[0] : inputValue);
    }

    const handleClick = () => {
        setLoading(true);

        const imageFile: File | null = uploadedImage;
        extractText(imageFile, setResponse);
    }

    useEffect(() => {
        setLoading(false);
    }, [response])

    return (
        <section className="bg-[#374151] w-full h-screen sm:pt-20 pt-16">
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-10">
                <div className={response ? 'hidden' : 'bg-[#293241] flex flex-col items-center justify-center sm:w-[400px] w-full min-h-[400px] rounded-3xl sm:p-10 gap-5 p-5'}>
                    <span className="text-[30px] text-[#e0fbfc]">Add your image</span>
                    <p className={image === "" ? 'text-[#ffffff] font-light text-[16px] tracking-widest leading-[30px] py-5' : 'hidden'}>
                        Add an image using your camera or add from your files.
                    </p>

                    <p className={image === "" ? 'hidden' : 'text-[#ffffff] font-light text-[16px] tracking-widest leading-[30px]'}>
                        Preview:
                    </p>

                    {
                        image === "" ?
                        "" :
                        <img src={image} alt="image" className="w-60" />
                    }
                    
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                        }}
                    >
                        <div className={image === "" ? 'flex gap-10' : 'hidden'}>
                            <button
                                onClick={() => {
                                    document.getElementById("cameraFile")?.click();
                                }}
                                className="bg-[#00ffef] text-[#374151] rounded-lg w-28 h-10 hover:bg-[#77fff7] button-hover"
                            >
                                Camera
                            </button>
                            <input 
                                id="cameraFile"
                                name="cameraFile"
                                type="file" 
                                accept="image/*" 
                                capture="user" 
                                style={{
                                    display: "none"
                                }}
                                onChange={handleChange}
                            />

                            <button
                                onClick={() => {
                                    document.getElementById("uploadFile")?.click();
                                }}
                                className="bg-[#00ffef] text-[#374151] rounded-lg w-28 h-10 hover:bg-[#77fff7] button-hover"
                            >
                                Files
                            </button>
                            <input 
                                id="uploadFile"
                                name="uploadFile"
                                type="file" 
                                accept="image/*"
                                style={{
                                    display: "none"
                                }}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={image === "" ? 'hidden' : 'flex '}>
                            <div className={!loading ? 'flex gap-10' : 'hidden'}>
                                <button
                                    className="bg-[#00ffef] text-[#374151] rounded-lg w-28 h-10 hover:bg-[#77fff7] button-hover"
                                    onClick={() => {
                                        setImage("");
                                    }}
                                >
                                    Back
                                </button>

                                <button
                                    className="bg-[#00ffef] text-[#374151] rounded-lg w-28 h-10 hover:bg-[#77fff7] button-hover"
                                    onClick={handleClick}
                                >
                                    Continue
                                </button>
                            </div>
                        
                            {loading ? <ThreeDots height={50} width={50} color="#00ffef" /> : null}
                        </div>
                    </form>
                </div>

                <DocumentContainer response={response} setImage={setImage} setResponse={setResponse}/>
            </div>
        </section>
    )
}
