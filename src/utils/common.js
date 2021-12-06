import { ICON_BYE, ICON_ERR, ICON_HI, TOAST_CONFIG } from "constants/Global";
import { toast } from "react-toastify";

//handle get token
export const getToken = () => {
    try {
        const { currentUser } = JSON.parse(localStorage.getItem("persist:auth"));
        console.log(currentUser);
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


//handle revenue

export const revenue = (bills) => {
    return parseFloat(bills.reduce((sum, bill) => sum + bill.totalPrice, 0)).toFixed(2);
}

//Handle top selling

export const getTopSelling = (bills, num) => {
    const products = bills.map(bill => bill.products);
    let listProduct = []
    let productUnique = [];
    products.forEach(element => {
        element = element.map(x => ({ _id: x._id, name: x.name, image: x.image, quantity: x.quantity, price: x.price }))
        listProduct = [...listProduct, ...element];
    });

    //  listProduct = [ [{}] , [{},{}] ] ;
    let productBought = listProduct.map(product => product._id);

    productBought = productBought.filter((idProduct, index) => productBought.indexOf(idProduct) === index);

    let result = [];

    productBought.map((idProduct) => {

        let productInfo = listProduct.filter(product => product._id === idProduct);
        // console.log(productInfo);
        let totalQuantity = productInfo.reduce((a, b) => a + b.quantity, 0);
        let item = ({ _id: productInfo[0]._id, name: productInfo[0].name, image: productInfo[0].image, price: productInfo[0].price, bought: totalQuantity });
        result = [...result, item];
    })

    result = result.sort((a, b) => b.bought - a.bought).slice(0, num);
    return result;
}
