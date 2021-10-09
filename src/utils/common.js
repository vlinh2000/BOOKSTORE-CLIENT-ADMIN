import { ICON_BYE, ICON_ERR, ICON_HI, TOAST_CONFIG } from "constants/Global";
import { toast } from "react-toastify";

//handle get token
export const getToken = () => {
    try {
        const { currentUser } = JSON.parse(localStorage.getItem("persist:auth"));
        const { auth: { token } } = JSON.parse(currentUser);
        return token;
    } catch (error) {
        return null;
    }
}
//handle toast 
export const toastSuccess = (message, action) => {
    let icon;
    switch (action) {
        case "HI": icon = () => <img alt="hi" width="25px" height="25px" src={ICON_HI} />; break;
        case "BYE": icon = () => <img alt="bye" width="25px" height="25px" src={ICON_BYE} />; break;
        default: icon = "🚀";
    }

    toast.success(message, { ...TOAST_CONFIG, icon });
}

export const toastError = message => {
    toast.error(message, { ...TOAST_CONFIG, icon: () => <img width="25px" height="25px" alt="error" src={ICON_ERR} /> });
}