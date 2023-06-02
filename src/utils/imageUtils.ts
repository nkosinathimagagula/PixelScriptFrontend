import { Dispatch, SetStateAction } from "react";

export const convertImage = (files: FileList | null, setImage: Dispatch<SetStateAction<string>>) => {
    if (files) {
        const reader = new FileReader();

        const fileRef = files[0] || "";
        const fileType: string= fileRef.type || "";

      
        reader.readAsBinaryString(fileRef);
        reader.onload=(ev: ProgressEvent<FileReader>) => {
            const newImage: string = ev.target ? ( typeof(ev.target.result) === "string" ? ev.target.result : "" ) : "";

            setImage(`data:${fileType};base64,${btoa(newImage)}`);
        }  
    }
  }
