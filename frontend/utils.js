import {toast} from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.dismiss()
    toast.success(msg,{
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.dismiss()
    toast.error(msg,{
        position:'top-right',
        pauseOnHover:false
    })
}