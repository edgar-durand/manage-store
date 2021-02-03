import Swal from "sweetalert2"
import React from "react"

const msgNotification = (title, text, icon = "success|error|info|question|warning", confirmButtonText = "ACEPTAR", showCancelButton = false,cancelButtonText="CANCELAR") => (
    Swal.fire({
        title: title,
        html: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false,
        allowEscapeKey: false,
        focusConfirm: false,
        showCancelButton: showCancelButton,
        cancelButtonColor: 'rgb(26, 179, 148)',
        cancelButtonText: cancelButtonText,
        confirmButtonColor: 'rgb(26, 179, 148)',
        reverseButtons: false
    })
    //     .then(r => {
    //         if (r.value)
    //                 fnOk(r)
    //          else if (r.dismiss === Swal.DismissReason.cancel)
    //                 fnCancel(r)
    // })
)
export default msgNotification