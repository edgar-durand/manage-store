import Swal from "sweetalert2";

const msgNotification = (title, text, icon = "success|error|info|question|warning", confirmButtonText = "ACEPTAR", showCancelButton = false,cancelButtonText="CANCELAR",reverseButtons=false) => (
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
        reverseButtons: reverseButtons
    })
    //     .then(r => {
    //         if (r.value)
    //                 fnOk(r)
    //          else if (r.dismiss === Swal.DismissReason.cancel)
    //                 fnCancel(r)
    // })
)
export default msgNotification