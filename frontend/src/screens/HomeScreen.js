import Product from '../components/Product';
import './HomeScreen.css';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { getProducts as listProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const getProducts = useSelector((state) => state.getProducts);

    const { products, loading, error } = getProducts; //check for loading and error before mapping

    useEffect(() => { // everytime this page loads, make a dispatch to list products
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="homescreen">
            <h2 className='homescreen__titan'>Explore Our New Products</h2>

            <div className='homescreen__products'>
                { loading ? (
                    <h2>Loading...</h2> 
                ) : error ? ( 
                    <h2>{error}</h2> 
                ) : (
                    products.map((product) => <Product 
                        key={product._id} 
                        productId = {product._id} 
                        name = {product.name}
                        price = {product.price}
                        description = {product.description}
                        imageUrl = {product.imageUrl}
                    />)
                )}
                    
            </div>
        </div>
    );
    
};

// const HomeScreen = () =>{
//     return (
//     <div className="homescreen">
//             <h2 className='homescreen__titan'>Explore Our New Products</h2>

//             <div className='homescreen__products'>
//             { loading ? (
//                 <h2>Loading...</h2> 
//             ) : error ? ( 
//                 <h2>{error}</h2> 
//             ) : (
//                 products.map((product) => <Product 
//                     key={product._id} 
//                     productId = {product._id} 
//                     name = {product.name}
//                     price = {product.price}
//                     description = {product.description}
//                     imageUrl = {product.imageUrl}
//                 />)
//             )}
                
//             </div>
//         </div>
//     );
// };

export default HomeScreen;