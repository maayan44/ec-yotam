import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // Business constants — update here if pricing rules change
    const currency = '₪';
    const MIN_ORDER = 1499;
    const FREE_DELIVERY_THRESHOLD = 1699;
    const DELIVERY_FEE = 200;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const formatPrice = (amount) => `${Number(amount).toFixed(2)} ₪`

    // Global state
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    // Add item to cart — optimistic UI update then sync to backend
    const addToCart = async (itemId, size, quantity = 1) => {
        if (!token) {
            toast.error('יש להתחבר כדי להוסיף מוצרים לסל')
            navigate('/login')
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += quantity;
            } else {
                cartData[itemId][size] = quantity;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);

        try {
            await axios.post(backendUrl + '/api/cart/add', { itemId, size, quantity }, { headers: { token } })
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Total item count across all cart entries — memoized to avoid recalculating on every render
    const getCartCount = useMemo(() => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalCount;
    }, [cartItems])

    // Update item quantity — passing 0 removes the item
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    // Total cart value in ₪ — memoized, recalculates only when cart or products change
    const getCartAmount = useMemo(() => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItems[items]) {
                    try {
                        if (cartItems[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }
                    } catch (error) { }
                }
            }
        }
        return totalAmount;
    }, [cartItems, products])

    // Fetch all products from backend — called once on mount
    const getProductsData = async () => {
        try {
            setProductsLoading(true)
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setProductsLoading(false)
        }
    }

    // Fetch cart from backend using stored token
    const getUserCart = async (token) => {
        try {
            const response = await axios.get(backendUrl + '/api/cart/get', { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Load products on mount
    useEffect(() => {
        getProductsData()
    }, [])

    // Restore session from localStorage on mount — single effect avoids double cart fetch
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, []);

    // Delivery fee: free above threshold, otherwise fixed fee
    const value = {
        products, currency,
        delivery_fee: getCartAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE,
        MIN_ORDER,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        token, setToken,
        formatPrice,
        productsLoading,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;