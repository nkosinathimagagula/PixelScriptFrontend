import { ExtractResponse } from "../types/text"
import { Writer } from "./Writer"

export const DocumentViewer = (props: {response: ExtractResponse | null}) => {
    
    return (
            <div id="document" className="bg-[#eefeff] sm:w-[55vw] w-full h-[55vh] rounded-xl overflow-y-auto p-5 scrolling">
                <Writer text={props.response?.text} headings={props.response?.headings} />
            </div>
    )
}