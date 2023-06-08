import { Dispatch, SetStateAction } from "react";

import { DocumentViewer } from "./DocumentViewer";
import { ExtractResponse } from "../types/text";

export const DocumentContainer = (props: {response: ExtractResponse | null, setResponse?: Dispatch<SetStateAction<ExtractResponse | null>>, setImage?: Dispatch<SetStateAction<string>>, setOnView?: Dispatch<SetStateAction<boolean>>, setRecord?: Dispatch<SetStateAction<ExtractResponse | null>>}) => {
    const { response, setResponse, setImage, setOnView, setRecord } = props;

    const handleDownloadOnClick = () => {
        const filename: string = response ? "PS" + response.date + "~" + response.id + ".doc" : '';
        
        const element: string = (document.getElementById("document") as HTMLInputElement).innerText;
        const formatted: string = element.replace(/[\u00A0\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, "").replace(/ \n/g, " ");

        
        const downloadLink: HTMLAnchorElement = document.createElement('a');

        downloadLink.setAttribute("download", filename);
        downloadLink.setAttribute("href", "data:" + "text/docx;" + "charset=utf-8," + encodeURIComponent(formatted))

        downloadLink.click();
    }

    return (
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
                    if (setResponse !== undefined && setImage !== undefined) {
                        setResponse(null);
                        setImage("");
                    } else if (setOnView !== undefined && setRecord !== undefined){
                        setOnView(false);
                        setRecord(null);
                    }
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
    )
}
