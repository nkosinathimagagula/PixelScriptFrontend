import { useState, FormEvent, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import { convertImage } from "../utils/imageUtils";
import { extractText } from "../api/PSAPI";
import { ExtractResponse } from "../types/text";
import { DocumentViewer } from "./DocumentViewer";



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

    const handleDownloadOnClick = () => {
        const filename: string = response ? "PS" + response.date + "~" + response.id + ".doc" : '';
        
        const element: string = (document.getElementById("document") as HTMLInputElement).innerText;
        const formatted: string = element.replace(/[\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, "").replace(/ \n/g, " ");

        
        const downloadLink: HTMLAnchorElement = document.createElement('a');

        downloadLink.setAttribute("download", filename);
        downloadLink.setAttribute("href", "data:" + "text/docx;" + "charset=utf-8," + encodeURIComponent(formatted))

        downloadLink.click();
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

                <div className={response ? 'bg-[#293241] flex flex-col w-full overflow-auto h-full rounded-2xl p-5 gap-3 scrolling' : 'hidden'}>
                    <h2 className="text-[30px] text-[#e0fbfc]">Extracted Text [Bionic Reading]</h2>
                    <div className="flex sm:flex-row flex-col w-full sm:gap-20 gap-10">
                        <DocumentViewer response={response} />
                        <div className="sm:w-[30vw] w-full justify-center">
                            <h2 className="text-[30px] text-[#e0fbfc]">Info</h2>
                            <p className="text-white text-[16px] font-light tracking-widest leading-[30px] pt-5 sm:mr-10">
                                Below you can download the extracted text as a word document which you can easily edit. 
                                The text in the document does not have the bionic reading method appied.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row w-full gap-5 pt-5 justify-center">
                    <button
                        onClick={() => {
                            setResponse(null);
                            setImage("");
                        }}
                            className="bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover"
                        >
                           Back
                        </button>
                        <button
                        onClick={handleDownloadOnClick}
                            className="bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
