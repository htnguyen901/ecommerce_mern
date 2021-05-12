import React from 'react';

const AdminActionBtns = () => (
	<div className='bg-light my-2'>
		<div className='container'>
			<div className='row pb-3'>
				<div className='col-md-4 my-1'>
					<button
						className='btn btn-outline-dark btn-block'
						data-toggle='modal'
						data-target='#addCategoryModal'
					>
						<i className='fas fa-plus'> Add Category</i>
					</button>
				</div>

				<div className='col-md-4 my-1'>
					<button
						className='btn btn-outline-dark btn-block'
						data-toggle='modal'
						data-target='#addToysModal'
					>
						<i className='fas fa-plus'> Add Toys</i>
					</button>
				</div>

				<div className='col-md-4 my-1'>
					<button className='btn btn-outline-dark btn-block'>
						<i className='fas fa-money-check-alt'> View Orders</i>
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default AdminActionBtns;