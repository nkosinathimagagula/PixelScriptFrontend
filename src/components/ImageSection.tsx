import { useState, FormEvent } from "react";

import { convertImage } from "../utils/imageUtils";


export const ImageSection = () => {
    const [image, setImage] = useState<string>("");

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.files;

        convertImage(inputValue, setImage);
    
    }

    return (
        <section className="bg-[#374151] w-full h-screen sm:pt-20 pt-16">
            <div className="w-full h-full flex flex-col items-center justify-center gap-5">
                {
                    image === "" ?
                    "" :
                    <img src={image} alt="image" className="w-60 h-60" />
                }

                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                    }}
                >
                    <div className="flex sm:gap-20 gap-16">
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
                            Upload
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
                </form>
            </div>
        </section>
    )
}
