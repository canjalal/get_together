import { createContext, useContext, useState } from "react";

export const GroupFormContext = createContext();

export const GroupFormProvider = (props) => {
    const [formData, setFormData] = useState({
        location: "",
        keywords: "",
        name: "",
        description: ""
    });

    const [pageNum, setPageNum] = useState(0);

    const [pageisDone, setPageisDone] = useState(false)

    return (
        <GroupFormContext.Provider value={{ formData, setFormData,
            pageNum, setPageNum,
            pageisDone, setPageisDone}}>
                {props.children}
            </GroupFormContext.Provider>
    );
}