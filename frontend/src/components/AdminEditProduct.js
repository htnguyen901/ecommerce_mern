import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActionss';
import { getCategories } from '../redux/actions/categoryActions';

const AdminEditProduct = ({ match, history }) => {
	/****************************
	 * PARAMS
	 ***************************/
	const productId = match.params.productId;

	/****************************
	 * REDUX GLOBAL STATE PROPERTIES
	 ***************************/
	const dispatch = useDispatch();
	const { product } = useSelector(state => state.products);
	const { categories } = useSelector(state => state.categories);

	/****************************
	 * COMPONENT STATE PROPERTIES
	 ***************************/
	const [productImage, setProductImage] = useState(null);
	const [name, setProductName] = useState('');
	const [description, setProductDesc] = useState('');
	const [price, setProductPrice] = useState('');
	const [productCategory, setProductCategory] = useState('');
	const [countInStock, setProductQty] = useState('');

	/****************************
	 * LIFECYCLE METHODS
	 ***************************/
	useEffect(() => {
		if (!product) {
			dispatch(getProduct(productId));
			dispatch(getCategories());
		} else {
			setProductImage(product.fileName);
			setProductName(product.name);
			setProductDesc(product.description);
			setProductPrice(product.pricee);
			setProductCategory(product.productCategory);
			setProductQty(product.countInStock);
		}
	}, [dispatch, productId, product]);

	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleImageUpload = e => {
		const image = e.target.files[0];
		setProductImage(image);
	};

	const handleProductSubmit = async e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('productImage', productImage);
		formData.append('productName', name);
		formData.append('productDesc', description);
		formData.append('productPrice', price);
		formData.append('productCategory', productCategory);
		formData.append('productQty', countInStock);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		await axios
			.put(`/api/product/${productId}`, formData, config)
			.then(res => {
				history.push('/admin/dashboard');
			})
			.catch(err => {
				console.log(err);
			});
	};

	/****************************
	 * RENDERER
	 ***************************/
	return (
		<Fragment>
			<AdminHeader />
			<div className='container my-3'>
				<div className='row'>
					<div className='col-md-8 mx-auto'>
						<Link to='/admin/dashboard'>
							<span className='fas fa-arrow-left'>Go Back</span>
						</Link>
						<div>
							<br />
							<div className='modal-content'>
								<form onSubmit={handleProductSubmit}>
									<div className='modal-header bg-dark text-white'>
										<h5 className='modal-title'>
											Update Toy
										</h5>
									</div>
									<div className='modal-body my-2'>
										<Fragment>
											<label className='btn btn-dark mr-4'>
												Choose file
												<input
													type='file'
													name='productImage'
													accept='images/*'
													hidden
													onChange={handleImageUpload}
												/>
											</label>
											{productImage &&
											productImage.name ? (
												<span className='badge badge-secondary'>
													{productImage.name}
												</span>
											) : productImage ? (
												<img
													className='img-thumbnail'
													style={{
														width: '120px',
														height: '80px',
													}}
													src={`/backend/uploads/${productImage}`}
													alt='product'
												/>
											) : null}

											<div className='form-group'>
												<label className='text-secondary'>
													Name
												</label>
												<input
													type='text'
													className='form-control'
													name='name'
													value={name}
													onChange={e =>
														setProductName(
															e.target.value
														)
													}
												/>
											</div>
											<div className='form-group'>
												<label className='text-secondary'>
													Description
												</label>
												<textarea
													className='form-control'
													rows='3'
													name='description'
													value={description}
													onChange={e =>
														setProductDesc(
															e.target.value
														)
													}
												></textarea>
											</div>
											<div className='form-group'>
												<label className='text-secondary'>
													Price
												</label>
												<input
													type='text'
													className='form-control'
													name='price'
													value={price}
													onChange={e =>
														setProductPrice(
															e.target.value
														)
													}
												/>
											</div>
											<div className='form-row'>
												<div className='form-group col-md-6'>
													<label className='text-secondary'>
														Category
													</label>
													<select
														className='custom-select mr-sm-2'
														name='productCategory'
														value={productCategory}
														onChange={e =>
															setProductCategory(
																e.target.value
															)
														}
													>
														<option value=''>
															Choose one...
														</option>
														{categories &&
															categories.map(
																c => (
																	<option
																		key={
																			c._id
																		}
																		value={
																			c._id
																		}
																	>
																		{
																			c.category
																		}
																	</option>
																)
															)}
													</select>
												</div>

												<div className='form-group col-md-6'>
													<label className='text-secondary'>
														Quantity
													</label>
													<input
														type='number'
														className='form-control'
														min='0'
														max='1000'
														name='countInStock'
														value={countInStock}
														onChange={e =>
															setProductQty(
																e.target.value
															)
														}
													/>
												</div>
											</div>
										</Fragment>
									</div>
									<div className='modal-footer'>
										<button
											type='submit'
											className='btn btn-dark text-white'
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AdminEditProduct;