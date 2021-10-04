import LOGO from '../assets/images/logo.png'

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


export { LOGO, ORDERS_SERIES, ORDERS_OPTIONS, REVENUE_SERIES, REVENUE_OPTIONS }