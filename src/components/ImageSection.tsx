import { useState, FormEvent } from "react";

import { convertImage } from "../utils/imageUtils";
import { extractText } from "../api/PSAPI";
import { ExtractResponse } from "../types/text";


const Writer = (props: {text: string | undefined, headings: string[] | undefined}) => {
    const separatedHeadings: string[] = [];
    const textSections = props.text?.split("\n\n");

    const tempHeadings = props.headings ? props.headings.map(element => element.split("\n\n")) : [];

    tempHeadings.map(element => {
        if (typeof(element) === 'object') {
            for (let i=0 ; i<element.length ; i++) {
                separatedHeadings.push(element[i]);
            }
        } else {
            separatedHeadings.push(element);
        }
    })

    const finalHeadings: string[] = separatedHeadings.map(element => element.replace("\n", ""));

    console.log(finalHeadings);
    
    return (
        <div>
            {
                textSections ? 
                textSections.map((element, index) => {
                    if (finalHeadings.includes(element)) {
                        return (
                            <div key={`d${index}`}>
                                <b key={`h${index}`}>{element}</b>
                                <br key={`lb${index}`}/>
                            </div>
                        )
                    }
                    return (
                        <div key={`d${index}`}>
                            <p key={`p${index}`}>{element}</p>
                            <br key={`lb${index}`}/>
                        </div>
                    )
                }) :
                null
            }
        </div>
    )
}


const DocumentViewer = (props: {response: ExtractResponse | null}) => {
    console.log(props.response);
    
    return (
            <div className="bg-[#f5f5f5] w-[50vw] h-[550px] overflow-auto">
                <Writer text={props.response?.text} headings={props.response?.headings}/>
            </div>
    )
}

export const ImageSection = () => {
    const [image, setImage] = useState<string>("");
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [response, setResponse] = useState<ExtractResponse | null>(null);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.files;

        convertImage(inputValue, setImage);
        setUploadedImage(inputValue ? inputValue[0] : inputValue);
    }

    const handleClick = () => {
        const imageFile = uploadedImage;
        extractText({imageFile, setResponse});
    }

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
                        <div className={image === "" ? 'flex sm:gap-20 gap-10' : 'hidden'}>
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

                        <div className={image === "" ? 'hidden' : 'flex sm:gap-20 gap-10'}>
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
                    </form>
                </div>

                <div className={response ? 'bg-[#293241] flex w-full h-full rounded-2xl p-5' : 'hidden'}>
                    <DocumentViewer response={response}/>

                    <div className="flex flex-col items-center sm:pl-16">
                        <div className="flex flex-row gap-5 pt-20">
                            <label></label>
                            <input 
                                type="text" 
                                placeholder="Paste (heading) text that was wrongly idetified as as paragraph (not bold)"
                                className="w-[45vw] h-10 rounded-lg outline-none border-none placeholder:text-[#808080] px-2"
                            />
                            <button
                                className="bg-[#00ffef] text-[#374151] rounded-lg w-20 h-10 hover:bg-[#77fff7] button-hover"
                            >
                                Update
                            </button>
                        </div>

                        <div className="flex flex-row gap-10 py-40">
                            <button className="bg-[#00ffef] text-[#374151] rounded-lg w-20 h-10 hover:bg-[#77fff7] button-hover">
                                Back
                            </button>
                            <button className="bg-[#00ffef] text-[#374151] rounded-lg w-20 h-10 hover:bg-[#77fff7] button-hover">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    )
}
