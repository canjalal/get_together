import { useRef } from "react";

const FileUploader = ({onFileSelect}) => {

    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        onFileSelect(e.target.files[0]);
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} ref={fileInput} />
            {/* <button onClick={}>Save image</button> */}
        </div>
    )
}
export default FileUploader;