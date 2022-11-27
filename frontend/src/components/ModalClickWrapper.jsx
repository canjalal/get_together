import React, {useRef, useEffect, useState} from 'react';

// Custom hook:

const useOutsideClickDetected = (modalRef, closeBtnRef = {current: null}) => {
    const [clickDetected, setClickDetected] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            // !document.getElementsByClassName('modal')[0]?.contains(e.target) || document.getElementsByClassName('close-icon')[0]?.contains(e.target)

            const validRefs = modalRef.current // && closeBtnRef.current;  // there need not be a valid close button
            console.log(`modalRef is ${modalRef.current} and closeBtnRef is ${closeBtnRef.current}`);

            const outsideClicked = (!modalRef.current.contains(e.target) || closeBtnRef.current?.contains(e.target))

            setClickDetected(validRefs && outsideClicked);
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [modalRef, closeBtnRef]);

    return clickDetected;
}

export default useOutsideClickDetected;