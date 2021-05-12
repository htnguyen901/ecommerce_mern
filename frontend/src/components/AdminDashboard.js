import React, { useEffect } from 'react';
// components
import AdminHeader from './AdminHeader';
import AdminActionBtns from './AdminActionBtns';
import AdminCategoryModal from './AdminCategoryModal';
import AdminProductModal from './AdminProductModal';
import AdminBody from './AdminBody.js';
// redux
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
import { getProducts } from '../redux/actions/productActionss';

const AdminDashboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<section>
			<AdminHeader />
			<AdminActionBtns />
			<AdminCategoryModal />
			<AdminProductModal />
			<AdminBody />
		</section>
	);
};

export default AdminDashboard;

// import React from 'react';

// const AdminDashboard = () => {

//     // View

//     const showHeader = () => (
//         <div className='bg-dark text-white py-4'>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col-md-6'>
//                         <h1>
//                             <i className='fas fa-home'>  
//                                 Dashboard
//                             </i>
//                         </h1>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     const showActionBtns = () => (
//         <div className='bg-light my-2'>
//             <div className='container'>
//                 <div className='row pb-3'>
//                     <div className='col-md-4 my-1'>
//                         <button className='btn btn-outline-dark btn-block'
//                             data-toggle='modal'
//                             data-target='#addCategoryModal'>
//                             <i className='fas fa-plus'> Add Category</i>
//                         </button>
//                     </div>

//                     <div className='col-md-4 my-1'>
//                         <button className='btn btn-outline-dark btn-block'>
//                             <i className='fas fa-plus'> Add Toys</i>
//                         </button>
//                     </div>

//                     <div className='col-md-4 my-1'>
//                         <button className='btn btn-outline-dark btn-block'>
//                             <i className='fas fa-money-check-alt'> 
//                             {' '}
//                             View Orders
//                             </i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     const showCategoryModal = () => (
//         <div id='addCategoryModal' className='modal'>
//             inside model
//             <div className='modal-dialog modal-dialog-centered modal-lg'>
//                 <div className='modal-content'>
//                     <div className='modal-header'>header</div>
//                     <div className='modal-body'>body</div>
//                     <div className='modal-footer'>footer</div>
//                 </div>

//             </div>
//         </div>
//     );

//     //Render

//     return (
//         <section>
//             {showHeader()}
//             {showActionBtns()}
//             {showCategoryModal()}
//         </section>
//     );
// };

// export default AdminDashboard;