import React from 'react'
//import PropTypes from 'prop-types'
import {Button, ListGroup, ListGroupItem} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {X, Layers, Star, Bookmark, Check, Trash} from 'react-feather'
import {connect} from 'react-redux'
import {changeFilter} from 'redux/actions/diary/index'
const DiarySidebar = props => {
	const {selectedFilter} = props
	return (
		<React.Fragment>
			<span
				className='sidebar-close-icon'
				onClick={() => props.mainSidebar(false)}
			>
				<X size={15} />
			</span>
			<div className='todo-app-menu'>
				<div className='add-task'>
					<Button.Ripple
						block
						className='btn-block'
						color='warning'
						onClick={() => {
							props.addTask('open')
							props.mainSidebar(false)
						}}
					>
						Add Notes
					</Button.Ripple>
				</div>
				<PerfectScrollbar
					className='sidebar-menu-list'
					options={{
						wheelPropagation: false
					}}
				>
					<ListGroup className='font-medium-1'>
						<ListGroupItem
							className='border-0 pt-0'
							action
							onClick={() => {
								props.changeFilter('all')
							}}
						>
							<Layers
								color={
									selectedFilter === 'all' ? 'var(--warning)' : 'currentColor'
								}
								size={22}
							/>
							<span
								className='align-middle ml-1'
								style={{
									color:
										selectedFilter === 'all'
											? 'var(--warning)'
											: 'var(--currentColor)'
								}}
							>
								All
							</span>
						</ListGroupItem>
					</ListGroup>
					<hr />
					<h5 className='mt-2 mb-1 pt-25'>Filters</h5>
					<ListGroup className='font-medium-1'>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('important')
							}}
							active={
								props.routerProps.location.pathname === '/diary/important'
									? true
									: false
							}
							style={{
								padding: '0.5rem',
								backgroundColor:
									selectedFilter === 'important' ? 'var(--danger)' : '',
								borderTopRightRadius: '0.5rem'
							}}
						>
							<Star size={22} />
							<span
								className='align-middle ml-1'
								style={{color: 'var(--currentColor)'}}
							>
								Important
							</span>
						</ListGroupItem>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('starred')
							}}
							style={{
								padding: '0.5rem',
								backgroundColor: selectedFilter === 'starred' ? '#07ab9e' : ''
							}}
							active={
								props.routerProps.location.pathname === '/diary/starred'
									? true
									: false
							}
						>
							<Bookmark size={22} />
							<span className='align-middle ml-1'>Bookmark</span>
						</ListGroupItem>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('completed')
							}}
							style={{
								padding: '0.5rem',
								backgroundColor: selectedFilter === 'completed' ? '#09b6cd' : ''
							}}
							active={
								props.routerProps.location.pathname === '/diary/completed'
									? true
									: false
							}
						>
							<Check size={22} />
							<span className='align-middle ml-1'>Completed</span>
						</ListGroupItem>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('trashed')
							}}
							style={{
								padding: '0.5rem',
								backgroundColor: selectedFilter === 'trashed' ? '#e12727' : ''
							}}
							active={
								props.routerProps.location.pathname === '/diary/trashed'
									? true
									: false
							}
						>
							<Trash size={22} />
							<span className='align-middle ml-1'>Trashed</span>
						</ListGroupItem>
					</ListGroup>
					<hr />
					<h5 className='mt-2 mb-1 pt-25'>Labels</h5>
					<ListGroup className='font-medium-1'>
						<ListGroupItem
							type='button'
							className='border-0'
							onClick={() => {
								props.changeFilter('personal')
							}}
						>
							<span className='bullet bullet-primary align-middle' />
							<span
								className='align-middle ml-1'
								style={{
									color:
										selectedFilter === 'personal'
											? 'var(--primary)'
											: 'var(--currentColor)'
								}}
							>
								Personal
							</span>
						</ListGroupItem>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('professional')
							}}
						>
							<span className='bullet bullet-warning align-middle' />
							<span
								className='align-middle ml-1'
								style={{
									color:
										selectedFilter === 'professional'
											? 'var(--warning)'
											: 'var(--currentColor)'
								}}
							>
								Professional
							</span>
						</ListGroupItem>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('others')
							}}
						>
							<span className='bullet bullet-success align-middle' />
							<span
								className='align-middle ml-1'
								style={{
									color:
										selectedFilter === 'others'
											? 'var(--success)'
											: 'var(--currentColor)'
								}}
							>
								Others
							</span>
						</ListGroupItem>
						<ListGroupItem
							className='border-0'
							onClick={() => {
								props.changeFilter('todo')
							}}
						>
							<span className='bullet bullet-danger align-middle' />
							<span
								className='align-middle ml-1'
								style={{
									color:
										selectedFilter === 'todo'
											? 'var(--danger)'
											: 'var(--currentColor)'
								}}
							>
								TO DO List
							</span>
						</ListGroupItem>
					</ListGroup>
				</PerfectScrollbar>
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	console.log('state find', state.todoApp.todo.routeParam)
	return {
		selectedFilter: state.todoApp.todo.routeParam
	}
}
export default connect(mapStateToProps, {changeFilter})(DiarySidebar)
