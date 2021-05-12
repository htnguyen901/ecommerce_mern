import Product from '../components/Product';
import './HomeScreen.css';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';

//Actions

import {getProducts as listProducts} from '../redux/actions/productActionss';

    const HomeScreen = () => {

        const { products } = useSelector(state => state.products);

        return (
            <div className='container'>
                <div className='row'>
                    <div className='card-deck'>
                        {products &&
                            products.map(product => (
                                <Product 
                                    key={product._id} 
                                    productId = {product._id} 
                                    name = {product.name}
                                    price = {product.price}
                                    description = {product.description}
                                    fileName = {product.fileName}
                                />
                            ))}
                    </div>
                </div>
            </div>
        );
    
};

// const HomeScreen = () =>{

//     const dispatch = useDispatch();

//     const getProducts = useSelector((state) => state.getProducts);

//     const {products} = getProducts;

//     useEffect(() => { // everytime this page loads, make a dispatch to list products
//         dispatch(listProducts());
//     }, [dispatch]);

//     return (
//         <div className="homescreen">
//             <h2 className='homescreen__titan'>Explore Our New Products</h2>

//             <div className='homescreen__products'>
//             {(
//                 products.map((product) => 
//                 <Product 
//                     key={product._id} 
//                     productId = {product._id} 
//                     name = {product.name}
//                     price = {product.price}
//                     description = {product.description}
//                     fileName = {product.fileName}
//                 />)
//             )}
                
//             </div>
//         </div>
//     );
// };

export default HomeScreen;