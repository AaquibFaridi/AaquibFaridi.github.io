import React, {useState} from 'react'
import {
	Row,
	Col,
	Collapse,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	TabContent,
	TabPane,
	FormText
} from 'reactstrap'
import axios from 'axios'
import PopUp from 'utility/Popup'
import classnames from 'classnames'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {Edit, Trash, ChevronDown} from 'react-feather'

const MsgHistory = props => {
	const [collapseID, setcollapseID] = useState('')
	const [status, setstatus] = useState('Closed')
	const [open, setopen] = useState('')
	const [deleteID, setdeleteID] = useState('')

	const deletesender = id => {
		axios
			.delete(`/backendapi/sender/deletebyid/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authtoken')}`
				}
			})
			.then(res => {
				toast.success('Message deleted successfully!')
			})
			.catch()
	}
	const toggleCollapse = collapseIDnew => {
		setcollapseID(collapseID !== collapseIDnew ? collapseIDnew : '')
	}
	const onEntered = id => {
		id === collapseID && setstatus('Opened')
	}
	const onEntering = id => {
		id === collapseID && setstatus('Opening...')
	}
	const onExited = id => {
		id === collapseID && setstatus('Closed')
	}
	const onExiting = id => {
		id === collapseID && setstatus('Closing...')
	}
	const formatme = val => {
		const title = props.colorOption?.[val] ? props.colorOption[val] : val
		return title
	}
	const getContent = e => {
		let nomin = ''
		e?.nominees?.length &&
			e.nominees.forEach((n, idx) => {
				if (idx === e.nominees.length - 1) {
					nomin = nomin + n?.name
				} else {
					nomin = `${nomin + n?.name}, `
				}
			})
		const content = (
			<div>
				<Row>
					<Col md='5' sm='12'>
						<FormText>
							<b> Type : </b> {e.type}
							<br />
							<b> Description : </b> {e.desc}
							<br />
							<b> Date : </b> {e?.date?.split('T')[0]}
							<b> Time : </b> {e?.time}
						</FormText>
					</Col>
					<Col md='5' sm='12'>
						<FormText>
							<b>Status :</b>{' '}
							{e.status === 0 ? (
								<span style={{color: 'var(--warning)'}}>Pending</span>
							) : (
								<span style={{color: 'green'}}>Delivered</span>
							)}{' '}
							<br />
							<b>Nominees :</b> {nomin}
						</FormText>
					</Col>
					<Col md='2' sm='12'>
						<FormText>
							<b>
								{' '}
								<Edit
									className='cursor-pointer mr-1'
									size={window.screen.width < 500 ? 13 : 20}
									onClick={() => {
										props.editItem(e)
									}}
								/>
							</b>
							<br />
							<b>
								<Trash
									className='cursor-pointer'
									size={window.screen.width < 500 ? 13 : 20}
									onClick={() => {
										setdeleteID(e._id)
										setopen(true)
									}}
								/>
							</b>
						</FormText>
					</Col>
				</Row>
			</div>
		)
		return content
	}
	const accordionMarginItems =
		props.collapseItems?.length > 0 ? (
			props.collapseItems.map(collapseItem => {
				return (
					<div className='collapse-margin' key={collapseItem._id}>
						<PopUp
							handleConfirm={() => {
								deletesender(deleteID)
								setopen(false)
							}}
							isOpen={open}
							closeModal={() => setopen(false)}
						/>
						<Card
							onClick={() => toggleCollapse(collapseItem._id)}
							className={classnames({
								'collapse-collapsed':
									status === 'Closed' && collapseID === collapseItem._id,
								'collapse-shown':
									status === 'Opened' && collapseID === collapseItem._id,
								'closing':
									status === 'Closing...' && collapseID === collapseItem._id,
								'opening':
									status === 'Opening...' && collapseID === collapseItem._id
							})}
						>
							<CardHeader>
								<CardTitle className='lead collapse-title collapsed'>
									{/* Message:{formatme(collapseItem.type)} Subject: */}
									{formatme(collapseItem.title)}
								</CardTitle>
								<ChevronDown size={15} className='collapse-icon' />
							</CardHeader>
							<Collapse
								isOpen={collapseItem._id === collapseID}
								onEntering={() => onEntering(collapseItem._id)}
								onEntered={() => onEntered(collapseItem._id)}
								onExiting={() => onExiting(collapseItem._id)}
								onExited={() => onExited(collapseItem._id)}
							>
								<CardBody>{getContent(collapseItem)}</CardBody>
							</Collapse>
						</Card>
					</div>
				)
			})
		) : (
			<span style={{fontSize: '12px', marginTop: '-10px'}}>
				No Messages Found
			</span>
		)

	return (
		<React.Fragment>
			<ToastContainer />
			<Card
				style={{
					paddingBottom: '1.5rem',
					paddingRight: '0.5rem',
					marginBottom: props.page === 'portfolio' ? '2.2rem' : '1rem'
				}}
			>
				<CardHeader>
					<CardTitle>{props.heading}</CardTitle>
				</CardHeader>

				<CardBody
					className='card_body'
					style={{
						maxHeight:
							props.page === 'portfolio' ? '260px' : ' calc(100vh - 435px)'
					}}
				>
					<TabContent activeTab={'1'}>
						<TabPane tabId='1'>
							<div className='vx-collapse'>{accordionMarginItems}</div>
						</TabPane>
						<TabPane className='component-code' tabId='2'>
							hey
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</React.Fragment>
	)
}
export default MsgHistory
