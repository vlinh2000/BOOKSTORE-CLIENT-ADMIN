import LOGO from 'assets/images/logo.png'

import ICON_ERR from 'assets/images/err.png'
import ICON_BYE from 'assets/images/bye.png'
import ICON_HI from 'assets/images/hi.png'

const ORDERS_OPTIONS = {
    chart: {
        id: 'apexchart-earning'
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};

const ORDERS_SERIES = [{
    name: 'earning',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 0, 0, 0]
}]

const REVENUE_SERIES = [{
    name: 'revenue',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 0, 0, 0]
}]

const REVENUE_OPTIONS = {
    chart: {
        id: 'apexchart-revenue'
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};


//config Toastyfy

const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
}

export { LOGO, ORDERS_SERIES, ORDERS_OPTIONS, REVENUE_SERIES, REVENUE_OPTIONS, TOAST_CONFIG, ICON_BYE, ICON_HI, ICON_ERR }