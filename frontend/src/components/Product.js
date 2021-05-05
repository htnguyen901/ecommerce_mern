import './Product.css';
import {Link} from 'react-router-dom';

const Product = () => {
    return (
        <div className='product'>
            <img src='https://source.unsplash.com/ZtTI0BAxf2U/2250x4000' alt='product name'/>

            <div className='product__info'>
                <p className='info__name'>Product 1</p>
                <p className='info__description'>
                    Dupasdasdaliwfjlasdkfja lsdf lasdjfalsdjf
                </p>

                <p className='info__price'>$399.99</p>
                
                <Link to={`/product/${1111}`} className='info__button'>View</Link>
            </div>

        </div>
    );
};

export default Product;