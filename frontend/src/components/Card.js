import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActionss';
import './Card.css';

const Card = ({ product }) => {
	const dispatch = useDispatch();

	return (
		<div className='col-md-4 my-3'>
			<div className='card h-100'>
				<a href='#!'>
					<img
						className='img-fluid'
						src={`/uploads/${product.fileName}`}
						alt='product'
					/>
				</a>

				<div className='card-body text-center'>
					<h5>{product.name}</h5>
					<hr />
					<h6 className='mb-3'>
						<span className='text-secondary mr-2'>
							{product.price.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</span>
					</h6>
					<p>
						{product.description.length > 60
							? product.description.substring(0, 60) + '...'
							: product.description.substring(0, 60)}
					</p>
					<Link
						to={`/admin/edit/product/${product._id}`}
						type='button'
						className='btn btn-secondary btn-sm mr-1 my-1'
					>
						<i className='far fa-edit pr-1'></i>
						Edit
					</Link>
					<button
						type='button'
						className='btn btn-dark btn-sm'
						onClick={() => dispatch(deleteProduct(product._id))}
					>
						<i className='far fa-trash-alt pr-1'></i>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
