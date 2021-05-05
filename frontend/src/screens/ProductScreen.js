import './ProductScreen.css';

const ProductScreen = () =>{
    return <div className="productscreen">
            <div className='productscreen__left'>
                <div className='left__image'>
                    <img src='https://source.unsplash.com/ZtTI0BAxf2U/2250x4000' alt='product name'/>
                </div>
                
                <div className='left__info'>
                    <p className='left__name'>Product 1</p>
                    <p>Price: $399.99</p>
                    <p>Description: loremasdasdksahdfkasudf kajsdhkasjdhfkasjdhfaksdf hasdkfhkasdhfkasdhf</p>
                </div>

            </div>
            <div className='productscreen__right'>
                <div className='right__info'>
                    <p>
                        Price: <span>$399.99</span>
                    </p>
                    <p>
                        Status: <span>In Stock</span>
                    </p>
                    <p>
                        Qty
                    <select>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    </p>
                    <p>
                        <button type='button'>Add To Cart</button>
                    </p>
                </div>
            </div>
        </div>;
    
};

export default ProductScreen;