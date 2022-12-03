import React, {useRef, useEffect, useState} from 'react';

// Custom hook:
// rename file and move to its own folder called customHooks or in utils
const useOutsideClickDetected = (modalRef, closeBtnRef = {current: null}) => {
    const [clickDetected, setClickDetected] = useState(false); // handle closeButton outside of this hook, use a Link

    useEffect(() => {
        const handleClickOutside = (e) => {
            e.stopPropagation();

            const validRefs = modalRef.current // && closeBtnRef.current;  // there need not be a valid close button
            console.log(`modalRef is ${modalRef.current} and closeBtnRef is ${closeBtnRef.current}`);

            const outsideClicked = (!modalRef.current.contains(e.target) || closeBtnRef.current?.contains(e.target))

            setClickDetected(validRefs && outsideClicked);
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [modalRef, closeBtnRef]);

    return clickDetected;
}

export default useOutsideClickDetected;