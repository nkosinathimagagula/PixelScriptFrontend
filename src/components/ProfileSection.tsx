import { readData } from "../api/PSAPI";

export const ProfileSection = () => {

    const handleApplyClick = () => {
        const from_date = (document.getElementById("from") as HTMLInputElement).value;
        const to_date = (document.getElementById("to") as HTMLInputElement).value;
        const file_type = (document.getElementById("file-type") as HTMLSelectElement).value;

        console.log(from_date, to_date, file_type);
        readData(file_type, from_date, to_date);
        
    }
    
    return (
        <section className="bg-[#374151] w-full h-screen sm:pt-20 pt-16">
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row w-full sm:p-10 p-5 items-center justify-evenly">
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
                                <option value="image/jpg">JPG</option>
                                <option value="image/png">PNG</option>
                                <option value="pdf">PDF</option>
                                <option value="doc">WORD-DOC</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-[#eefeff] w-[1px] h-full"/>

                    <button 
                        onClick={handleApplyClick}
                        className="bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover"
                    >
                        Apply
                    </button>
                </div>

                <div className="w-full sm:px-20 px-10">
                    <div className="w-full bg-[#293241] flex flex-col p-5 rounded-2xl ">
                        <h2 className="text-[30px] text-[#e0fbfc]">Results</h2>
                        
                        <div className="w-full">
                            <table className="w-full">
                                <thead className="bg-gray-700 uppercase">
                                    <tr>
                                        <th className="text-gray-300 font-normal text-[18px]">
                                            Date
                                        </th>
                                        <th className="text-gray-300 font-normal text-[18px]">
                                            Filetype
                                        </th>
                                        <th className="text-gray-300 font-normal text-[18px]">
                                            Text
                                        </th>
                                        <th className="text-gray-300 font-normal text-[18px]">
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr className="border-gray-500 border-b">

                                        </tr>
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
