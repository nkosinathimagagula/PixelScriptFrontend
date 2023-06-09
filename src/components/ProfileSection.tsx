import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import { readData } from "../api/PSAPI";
import { ExtractResponse } from "../types/text";
import { DocumentContainer } from "./DocumentContainer";

export const ProfileSection = () => {
    const [response, setResponse] = useState<ExtractResponse[] | null>(null);
    const [onView, setOnView] = useState<boolean>(false);
    const [record, setRecord] = useState<ExtractResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleApplyClick = () => {
        const from_date = (document.getElementById("from") as HTMLInputElement).value;
        const to_date = (document.getElementById("to") as HTMLInputElement).value;
        const file_type = (document.getElementById("file-type") as HTMLSelectElement).value;

        setLoading(true);

        readData(file_type, from_date, to_date, setResponse);
    }
    
    useEffect(handleApplyClick, [])

    useEffect(() => {
        setLoading(false);
    }, [response])
    

    return (
        <section className="bg-[#374151] w-full min-h-screen sm:pt-20 pt-16">
            <div className="flex flex-col w-full h-full">
                <div className={onView ? 'hidden' : 'flex flex-row w-full sm:p-10 p-5 items-center justify-evenly'}>
                    <h3 className="text-[25px] text-[#e0fbfc]">Filter</h3>

                    <div className="bg-[#eefeff] w-[1px] h-full"/>

                    <div className="flex sm:flex-row flex-col sm:gap-10 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[16px] text-[#e0fbfc]">from:</label>
                            <input type="date" id="from" className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[16px] text-[#e0fbfc]">to:</label>
                            <input type="date" id="to" className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[16px] text-[#e0fbfc]">file type:</label>
                            <select id="file-type" className="bg-[#eefeff] w-auto h-8 rounded-lg outline-none border-none" >
                                <option value="">ANY</option>
                                <option value="image/jpeg">JPG</option>
                                <option value="image/png">PNG</option>
                                <option value="pdf">PDF</option>
                                <option value="doc">WORD-DOC</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-[#eefeff] w-[1px] h-full"/>

                    <button 
                        onClick={handleApplyClick}
                        className={ loading ? 'hidden' : 'bg-[#00ffef] text-[#374151] rounded-lg sm:w-24 w-16 h-8 hover:bg-[#77fff7] button-hover'}
                    >
                        Apply
                    </button>

                    {loading ? <ThreeDots height={50} width={50} color="#00ffef" /> : null}
                </div>

                <div className={onView ? 'hidden' : 'w-full sm:px-20 px-5 pb-10'}>
                    <div className="w-full bg-[#293241] flex flex-col p-5 rounded-2xl ">
                        <h2 className="text-[30px] text-[#e0fbfc]">Results</h2>
                        
                        <div className="w-full py-2 overflow-auto">
                            { 
                                response ?
                                <table className="w-full text-left">
                                    <thead className="bg-gray-700 uppercase">
                                        <tr className="border-gray-500 h-10 border-b">
                                            <th scope="col" className="text-gray-300 px-5 font-normal text-[18px]">
                                                Date
                                            </th>
                                            <th scope="col" className="text-gray-300 px-5 font-normal text-[18px]">
                                                Filetype
                                            </th>
                                            <th scope="col" className="text-gray-300 px-5 font-normal text-[18px]">
                                                Text
                                            </th>
                                            <th scope="col" className="text-gray-300 px-5 font-normal text-[18px]">
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            response.map((item, index) => (
                                                <tr key={index} className="border-gray-500 border-b justify-evenly">
                                                    <td  scope="row" className="text-[#eefeff] p-5 h-8 font-light text-[16px]">
                                                        {item.date}
                                                    </td>
                                                    <td scope="row" className="text-[#eefeff] p-5 h-8 font-light text-[16px]">
                                                        {item.file_type}
                                                    </td>
                                                    <td scope="row" className="text-[#eefeff] p-5 h-8 font-light text-[16px]">
                                                        {item.text.slice(0, 50)} ...
                                                    </td>
                                                    <td scope="row" className="p-5 h-8 font-light text-[10px]">
                                                        <button
                                                            onClick={() => {
                                                                setRecord(item);
                                                                setOnView(true);
                                                            }}
                                                            className="bg-[#00ffef] text-[#374151] rounded-lg w-12 h-6 font-normal hover:bg-[#77fff7] button-hover"
                                                        >
                                                            Open
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>

                                :

                                <div className="w-full flex flex-col justify-center items-center">
                                    <div className="bg-gray-700 w-full h-[1px]"/>
                                    <h2 className="text-[16px] text-[#e0fbfc] py-2">No result found</h2>
                                    <div className="bg-gray-700 w-full h-[1px]"/>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className={record ? 'flex sm:p-10 p-5' : 'hidden'}>
                    <DocumentContainer response={record} setOnView={setOnView} setRecord={setRecord}/>
                </div>
            </div>
        </section>
    )
}
