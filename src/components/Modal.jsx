'use client'
import { useRef } from 'react'
// https://medium.com/@bomber.marek/how-to-use-dialog-in-react-easy-modals-tooltips-81e44d570c8a



function Modal({ children, icono, texto, className }) {

    const dialogRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) dialogRef.current.showModal();
    };

    const closeDialog = () => {
        if (dialogRef.current) dialogRef.current.close();
    };

    const handleClickOutside = () => {
        if (dialogRef.current)
            dialogRef.current.addEventListener('click', function (e) {
                const rect = dialogRef.current.getBoundingClientRect();
                const isInDialog = (rect.top <= e.clientY
                    && e.clientY <= rect.top + rect.height
                    && rect.left <= e.clientX
                    && e.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    dialogRef.current.close();
                }
            })
    }


    return (
        <>
            <div onClick={openDialog} className={className}>
                {icono} {texto}
            </div>

            <dialog ref={dialogRef} onClick={handleClickOutside}
                className={`backdrop:bg-black/50 backdrop:backdrop-blur-sm py-12 px-2 md:px-8 rounded-md 
                             fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
                             w-full mt-0 outline-none`}>

                {children}

                <div onClick={closeDialog} className="absolute top-4 right-4 cursor-pointer" >
                    ❌
                </div>
            </dialog>
        </>
    );
};



export default Modal;