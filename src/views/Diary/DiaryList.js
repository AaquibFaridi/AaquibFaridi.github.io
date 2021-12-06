/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {
	FormGroup,
	Input,
	ModalBody,
	ModalFooter,
	CardFooter,
	Button,
	Modal,
	CardBody,
	Card
} from 'reactstrap'
import {Menu, Search, Bookmark, Star, Trash} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {connect} from 'react-redux'
import {
	getTodos,
	completeTask,
	starTask,
	importantTask,
	trashTask,
	searchTask
} from 'redux/actions/diary/index'
const DiaryList = props => {
	const [open, setopen] = useState(false)
	const [id, setid] = useState(null)
	const [todos, settodos] = useState([])
	const [value, setvalue] = useState('')
	const {pathname} = props?.routerProps?.location

	useEffect(() => {
		if (props.app.todo.todos) {
			settodos(props.app.todo.todos)
		}
	}, [props.app.todo])

	useEffect(() => {
		getdiaryLIst()
	}, [])

	const getdiaryLIst = async () => {
		if (!pathname) return
		await props.getTodos(pathname)
		settodos(props?.app?.todo?.todos)
	}

	const handleOnChange = e => {
		setvalue(e.target.value)
		props.searchTask(e.target.value)
	}
	const routerFilter = props.routerProps.match.params.filter
	const todosArr = value.length ? props.app.todo.filteredTodos : todos

	if (todosArr === undefined) {
		return (
			<div className='fallback-spinner vh-100'>
				<div className='loading'>
					<div className='effect-1 effects'></div>
					<div className='effect-2 effects'></div>
					<div className='effect-3 effects'></div>
				</div>
			</div>
		)
	}
	const renderTodos =
		todosArr.length > 0 ? (
			todosArr.map((todo, i) => {
				const options = {
					weekday: 'short',
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				}
				const today = new Date(todo.createdAt)
				return (
					<li
						style={{border: 'none', padding: '0', margin: '0 1.6rem'}}
						className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}
						key={i}
						onClick={() => {
							props.handleUpdateTask(todo)
						}}
					>
						<Modal
							isOpen={open}
							className='modal-dialog-centered'
							backdrop='static'
						>
							<ModalBody>
								Are you sure you want to delete this record?
							</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									className='button-label'
									onClick={() => {
										setopen(false)
									}}
								>
									Cancel
								</Button>
								<Button
									color='danger'
									onClick={() => {
										setopen(false)
										props.trashTask(id)
									}}
									className='button-label'
								>
									Delete
								</Button>
							</ModalFooter>
						</Modal>
						<Card className='mt-1 mb-0' style={{minHeight: '110px'}}>
							<CardBody className='p-0 d-flex'>
								<div id='left-content' className='w-100 p-1'>
									{window.screen.width <= 500 ? (
										<div id='top-content' className='d-block'>
											<i
												className='m-0'
												style={{fontSize: '1.15rem', fontWeight: 'bold'}}
											>
												{todo.title}
											</i>
											<p style={{fontSize: '1rem'}}>
												{today.toLocaleDateString('en-US', options)}
											</p>
										</div>
									) : (
										<div id='top-content' className='d-flex'>
											{/* <p style={{fontSize: '1rem'}}>
												{today.toLocaleDateString('en-US', options)}&nbsp;
												{'-'}
											</p> */}
											<p style={{fontSize: '1.15rem', fontWeight: 'bold'}}>
												{todo.title}
											</p>
										</div>
									)}
									<div id='bottom-content'>
										{todo.desc.length > 0 ? (
											<p
												className='todo-desc mb-0'
												style={{
													wordBreak: 'break-all',
													whiteSpace: 'normal',
													fontSize: '1.15rem'
												}}
											>
												{todo.desc}
											</p>
										) : (
											''
										)}
									</div>
								</div>
								<div id='options'>
									<div
										style={{maxHeight: '110px'}}
										className='d-flex flex-row justify-content-between'
									>
										{todo.isImportant && (
											<div
												style={{
													padding: '0.5rem',
													backgroundColor: 'var(--danger)',
													borderTopRightRadius: '0.5rem'
												}}
												onClick={e => {
													e.stopPropagation()
													props.importantTask(todo)
												}}
											>
												<Star
													size={23}
													color={'white'}
													// className={`${todo.isImportant ? 'text-danger' : ''}`}
												/>
											</div>
										)}
										{todo.isStarred && (
											<div
												style={{
													padding: '0.5rem',
													backgroundColor: '#07ab9e'
												}}
												onClick={e => {
													e.stopPropagation()
													props.starTask(todo)
												}}
											>
												<Bookmark
													size={23}
													color={'white'}
													// color={`${todo.isStarred ? 'white' : 'currentColor'}`}
												/>
											</div>
										)}
										{routerFilter !== 'trashed' ? (
											<div
												style={{
													padding: '0.5rem',
													// backgroundColor: todo.isTrashed ? '#e12727' : ''
													backgroundColor: '#e12727'
												}}
											>
												<Trash
													size={23}
													// color={`${todo.isTrashed ? 'white' : 'currentColor'}`}
													color={'currentColor'}
													onClick={e => {
														e.stopPropagation()
														setid(todo.id)
														setopen(true)
													}}
												/>
											</div>
										) : null}
									</div>
								</div>
							</CardBody>
							<CardFooter style={{fontSize: '0.8rem'}}>
								Edited On :
								<span>{today.toLocaleDateString('en-US', options)}</span>
							</CardFooter>
						</Card>
					</li>
				)
			})
		) : (
			<p className='p-1 text-center mt-2 font-medium-3 text-bold-500'>
				No tasks at this time
			</p>
		)

	return (
		<div className='content-right h-100'>
			<div className='todo-app-area h-100'>
				<div className='todo-app-list-wrapper h-100'>
					<div className='todo-app-list h-100'>
						<div className='app-fixed-search'>
							<div
								className='sidebar-toggle d-inline-block d-lg-none'
								onClick={() => props.mainSidebar(true)}
							>
								<Menu size={24} />
							</div>
							<FormGroup
								style={{
									display: 'flex',
									margin: 'auto',
									justifyContent: 'center'
								}}
								className='position-relative has-icon-left'
							>
								<div style={{borderRadius: '1.428rem'}}>
									<div className='form-control-position'>
										<Search size={15} />
									</div>
									<Input
										style={{
											width: '100%'
										}}
										type='text'
										placeholder='Search...'
										onChange={e => handleOnChange(e)}
										value={value}
									/>
								</div>
							</FormGroup>
						</div>
						<PerfectScrollbar
							className='todo-task-list'
							options={{
								wheelPropagation: false
							}}
						>
							<ul className='todo-task-list-wrapper'>{renderTodos}</ul>
						</PerfectScrollbar>
					</div>
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = state => {
	return {
		app: state.todoApp
	}
}
export default connect(mapStateToProps, {
	getTodos,
	completeTask,
	starTask,
	importantTask,
	trashTask,
	searchTask
})(DiaryList)
