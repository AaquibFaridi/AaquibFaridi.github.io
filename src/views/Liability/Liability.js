import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {encryptdata} from 'utility/context/SecurityTool'
import {
	Card,
	FormText,
	CardHeader,
	CardTitle,
	CardBody,
	FormGroup,
	Row,
	Col,
	Input,
	Form,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	TabContent,
	TabPane,
	Label
} from 'reactstrap'
import classnames from 'classnames'

import Ccube from 'utility/Ccube'
import PopUp from 'utility/Popup'
import AssetAccordion from '../Portfolio/AssetAccordion'
import options from './LiabilitiesOption'
import axios from 'axios'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import 'assets/scss/plugins/extensions/toastr.scss'
import 'assets/scss/plugins/extensions/dropzone.scss'
import {getData, addData} from 'redux/actions/data-list/'
import Select from 'react-select'
import themeConfig from 'configs/themeConfig'
import {Delete, Edit, Trash} from 'react-feather'
import 'assets/scss/pages/data-list.scss'
import 'assets/scss/components/app-loader.scss'
import 'assets/scss/plugins/extensions/dropzone.scss'
import Sidebar from '../Nominee/NomineeSidebar'
import handleKeyMobileNumber from 'utility/context/InputTypeNum'

const colourOptions2 = [
	{value: 'Text', label: 'Text', color: '#00B8D9', isFixed: true},
	{value: 'textarea', label: 'Text Area', color: '#0052CC', isFixed: true},
	{value: 'Date', label: 'Date', color: '#0052CC', isFixed: true},
	{value: 'Number', label: 'Number', color: '#0052CC', isFixed: true},
	{value: 'File', label: 'File', color: '#0052CC', isFixed: true}
]

const AddLiability = props => {
	const colourOptions1 = [
		{
			value: 'Advances',
			label: props.messages?.colorOption?.['Advances']
				? props.messages?.colorOption?.['Advances']
				: 'Advances',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'Credit Card',
			label: props.messages?.colorOption?.['Credit Card']
				? props.messages?.colorOption?.['Credit Card']
				: 'Credit Card',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'EMI',
			label: props.messages?.colorOption?.['EMI']
				? props.messages?.colorOption?.['EMI']
				: 'EMI',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'Loan & Mortgages',
			label: props.messages?.colorOption?.['Loan & Mortgages']
				? props.messages?.colorOption?.['Loan & Mortgages']
				: 'Loan & Mortgages',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Ponzi Schemes',
			label: props.messages?.colorOption?.['Ponzi Schemes']
				? props.messages?.colorOption?.['Ponzi Schemes']
				: 'Ponzi Schemes',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'Recurring Payments',
			label: props.messages?.colorOption?.['Recurring Payments']
				? props.messages?.colorOption?.['Recurring Payments']
				: 'Recurring Payments',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'Others',
			label: props.messages?.colorOption?.['Others']
				? props.messages?.colorOption?.['Others']
				: 'Others',
			color: '#0052CC',
			isFixed: true
		}
	]
	const template = props.messages?.liabilityOption
		? props.messages?.liabilityOption
		: JSON.parse(JSON.stringify(options))
	const selectAssetRef = React.createRef()
	const selectNomineeRef = React.createRef()
	const selectCustomRef = React.createRef()
	const [open, setopen] = useState(false)
	const [test, settest] = useState(false)
	const [deleteID, setdeleteID] = useState(null)
	const [fname, setfname] = useState('')
	const [ftype, setftype] = useState('')
	const [liabilityShow, setliabilityShow] = useState(true)
	const [liabilityList, setliabilityList] = useState([])
	const [liabilityType, setliabilityType] = useState('')
	const [sidebar, setsidebar] = useState(false)
	const [addNew, setaddNew] = useState(false)
	const [currentData, setcurrentData] = useState(null)
	const [isLoading, setisLoading] = useState(false)
	const [nominees, setnominees] = useState([])
	const [modal, setmodal] = useState(false)
	const [selectedTemplate, setSelectedTemplate] = useState([])
	const [editItem, seteditItem] = useState(false)
	const [editId, seteditId] = useState('')
	const [isAddDisabled, setisAddDisabled] = useState(true)
	const [nomineeOption, setnomineeOption] = useState([
		{
			value: 'Add Nominee',
			label: 'Add Nominee',
			color: '#00B8D9',
			isFixed: false
		}
	])
	useEffect(() => {
		if (props.dataList.data.length) {
			const nomineeOption = [
				{
					value: 'Add Nominee',
					label: 'Add Nominee',
					color: '#00B8D9',
					isFixed: false
				}
			]
			props.dataList.data.forEach(e => {
				const temp = {
					value: e._id,
					label: `${e.name} - ${e.relation}`,
					color: '#00B8D9',
					isFixed: false
				}
				nomineeOption.push(temp)
			})
			setnomineeOption(nomineeOption)
			getAssets()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.dataList])

	useEffect(() => {
		!props.listLoading && props.getData()
		getAssets()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const handleSidebar = (boolean, addNew = false) => {
		setsidebar(boolean)
		if (addNew === true) {
			setcurrentData(null)
			setaddNew(true)
		}
	}
	const addData = async obj => {
		setisLoading(true)
		try {
			await props.addData(obj)
			setisLoading(false)
			handleSidebar(false, true)
		} catch {
			setisLoading(false)
			toast.error('Add Nominee Failed! Please contact admin')
		}
	}
	const deletecus = e => {
		editItem && setisAddDisabled(false)
		const temp3 = selectedTemplate.filter(x => {
			return e.key !== x.key
		})
		setSelectedTemplate(temp3)
	}
	const getAssets = () => {
		const user = JSON.parse(localStorage.getItem('logInUserData'))

		axios
			.get('/backendapi/user/liabilities/' + user._id, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('authtoken')
				}
			})
			.then(res => {
				const liabilityList = res ? res.data : []
				liabilityList.splice(0, liabilityList.length)

				user?.liabilities?.length &&
					user.liabilities.forEach((e, i) => {
						if (e.id) {
							let nomin = ''
							e?.nominees?.length &&
								e.nominees.forEach((n, idx) => {
									const sel = props.dataList.data.filter(x => x._id === n.id)
									if (sel.length) {
										if (idx === e.nominees.length - 1) {
											nomin = nomin + sel[0].name
										} else {
											nomin = nomin + sel[0].name + ', '
										}
									}
								})
							const cont = (
								<div>
									<Row>
										{e.liabilityDetails.map((x, i) => {
											if (x.val !== '') {
												return (
													<Col md='5' sm='12' key={i + x.key}>
														<FormText>
															<b>{x.key} :</b>{' '}
															{liabilityShow ? x.val : '***********'}
														</FormText>
													</Col>
												)
											} else return ''
										})}
										<Col md='5' sm='12'>
											<FormText>
												<b>Nominees :</b>{' '}
												{liabilityShow ? nomin : '*******************'}
											</FormText>
										</Col>
										<Col md='2' sm='12'>
											<FormText>
												<b>
													<Edit
														className='cursor-pointer mr-1'
														size={window.screen.width < 500 ? 13 : 20}
														onClick={() => {
															editItemfunc(e)
														}}
													/>
												</b>
												<b>
													<Trash
														className='cursor-pointer'
														size={window.screen.width < 500 ? 13 : 20}
														onClick={() => {
															setdeleteID(e.id)
															setopen(true)
														}}
													/>
												</b>
											</FormText>
										</Col>
									</Row>
								</div>
							)
							const ast = {
								id: i + 1,
								title: e.liabilityType,
								content: cont
							}
							liabilityList.push(ast)
						}
					})
				setliabilityList(liabilityList?.reverse())
			})
	}
	const toggleModal = () => {
		setmodal(!modal)
	}
	const addAssetsButtonValidation = () => {
		let isAddDisabled = false
		selectedTemplate.forEach(f => {
			if (f.mandatory && !f.val) {
				isAddDisabled = true
			}
		})
		setisAddDisabled(isAddDisabled)
	}
	const changeValue = (e, k) => {
		const selectedTemplateTemp = selectedTemplate
		const idx = selectedTemplateTemp.findIndex(x => x.key === k.key)
		if (e.length < 50) {
			selectedTemplateTemp[idx].val = e
			setSelectedTemplate(selectedTemplateTemp)
			addAssetsButtonValidation()
			settest(!test)
		}
	}
	const deleteLiabilty = id => {
		const user = JSON.parse(localStorage.getItem('logInUserData'))
		const idx = user.liabilities.findIndex(el => el.id === id)
		const deletednominee = []
		if (idx >= 0) {
			user.liabilities[idx].nominees.forEach(n => {
				n.objectid = user.liabilities[idx].id
				deletednominee.push(n)
			})
			user.liabilities.splice(idx, 1)
		} else return

		axios
			.post(
				'/backendapi/adddetails',
				{
					_id: user._id,
					liabilities: encryptdata(JSON.stringify(user.liabilities)),
					deletednominee
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				}
			)
			.then(res => {
				props.getData(props.parsedFilter)
				getAssets()
			})
			.catch()
		localStorage.setItem('logInUserData', JSON.stringify(user))
		toast.warning('Liability deleted successfully!')
		clearLiability()
		clearCustomField()
		setisAddDisabled(true)
	}
	const savechanges = e => {
		e.preventDefault()
		seteditItem(false)
		const user = JSON.parse(localStorage.getItem('logInUserData'))
		const as = {
			liabilityType,
			liabilityDetails: selectedTemplate,
			nominees,
			id: editId
		}

		const idx = user.liabilities.findIndex(el => el.id === editId)
		if (idx >= 0) {
			user.liabilities.splice(idx, 1)
			user.liabilities.push(as)
		} else return

		localStorage.setItem('logInUserData', JSON.stringify(user))

		axios
			.post(
				'/backendapi/adddetails',
				{
					_id: user._id,
					liabilities: encryptdata(JSON.stringify(user.liabilities))
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				}
			)
			.then(res => {
				toast.success('Edited successfully!')
				props.getData(props.parsedFilter)
				getAssets()
			})
			.catch()

		clearLiability()
		clearCustomField()
		setisAddDisabled(true)
	}
	const callAddLiability = e => {
		e.preventDefault()
		const user = JSON.parse(localStorage.getItem('logInUserData'))
		const as = {
			liabilityType,
			liabilityDetails: selectedTemplate,
			nominees,
			id: uuidv4()
		}
		nominees.forEach(n => {
			n.objectid = as.id
		})
		user.liabilities.push(as)
		axios
			.post(
				'/backendapi/adddetails',
				{
					_id: user._id,
					liabilities: encryptdata(JSON.stringify(user.liabilities))
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				}
			)
			.then(res => {
				props.getData(props.parsedFilter)
				getAssets()
			})
			.catch()
		localStorage.setItem('logInUserData', JSON.stringify(user))
		toast.success('Liability addedd successfully!')
		clearLiability()
		clearCustomField()
		setisAddDisabled(true)
	}
	const addfield = () => {
		if (liabilityType !== '') {
			const selectedTemplateTemp = selectedTemplate
			const size = selectedTemplateTemp.length
			let temp = ''
			const fig = selectedTemplateTemp.findIndex(
				data => data.key === fname + ftype
			)
			if (fig >= 0) {
				toast.error('Field Already Exist! Please add new field')
				return
			}
			if (selectedTemplate[size - 1].key === 'Attachments') {
				temp = selectedTemplateTemp[size - 1]
				selectedTemplateTemp[size - 1] = {
					key: fname + ftype,
					val: '',
					type: ftype,
					deletable: true
				}
				selectedTemplateTemp.push(temp)
				setSelectedTemplate(selectedTemplateTemp)
				setfname('')
				setftype('')
			} else {
				selectedTemplateTemp.push({
					key: fname + ftype,
					val: '',
					type: ftype,
					deletable: true
				})
				setSelectedTemplate(selectedTemplateTemp)
				setfname('')
				setftype('')
			}
			toggleModal()
		}
	}
	const changeNominee = event => {
		if (editItem) {
			setisAddDisabled(false)
		}
		const nominees = []
		event?.length &&
			event.forEach(e => {
				e.value === 'Add Nominee'
					? setsidebar(true)
					: nominees.push({id: e.value, name: e.label})
			})
		!event && setisAddDisabled(true)
		setnominees(nominees)
	}
	const clearLiability = () => {
		selectAssetRef.current.select.clearValue()
		selectNomineeRef.current.select.clearValue()
		setliabilityType('')
		setSelectedTemplate([])
		setnominees([])
		editItem && setisAddDisabled(true)
	}
	const clearCustomField = () => {
		setfname('')
		setftype('')
		selectCustomRef.current && selectCustomRef.current.select.clearValue()
	}
	const handleChange = e => {
		setisAddDisabled(true)
		setfname('')
		setftype('')
		setliabilityType(e ? e.value : undefined)
		setSelectedTemplate(e ? template[e.value] : {})
	}
	const editItemfunc = item => {
		const {liabilityDetails, liabilityType, nominees} = item // item.id is left
		setliabilityType(liabilityType)
		seteditItem(true)
		seteditId(item.id)
		setSelectedTemplate(liabilityDetails)
		setnominees(nominees)
	}
	const animateLabel = value => {
		if (value) {
			document.getElementById('buttonLabel').classList.remove('no-display')
			document.getElementById('buttonLabel').classList.add('button-text')
		} else {
			document.getElementById('buttonLabel').classList.add('no-display')
			document.getElementById('buttonLabel').classList.remove('button-text')
		}
	}
	const {messages, thumbView, getData, parsedFilter} = props
	return (
		<React.Fragment>
			<h2 className='warning spacing nodisplay'>
				{messages?.heading ? messages.heading : 'Liabilties'}
			</h2>
			<Row>
				<Col sm='12'>
					<div
						className={`data-list ${thumbView ? 'thumb-view' : 'list-view'}`}
					>
						<PopUp
							modalMessage={'Are you sure you want to delete this record?'}
							handleConfirm={() => {
								deleteLiabilty(deleteID)
								setopen(false)
							}}
							isOpen={open}
							closeModal={() => setopen(false)}
						/>
						<Sidebar
							show={sidebar}
							data={currentData}
							updateData={props.updateData}
							addData={addData}
							isLoading={isLoading}
							handleSidebar={handleSidebar}
							thumbView={thumbView}
							getData={getData}
							dataParams={parsedFilter}
							addNew={addNew}
						/>
						<div
							className={classnames('data-list-overlay', {
								show: sidebar
							})}
							onClick={() => handleSidebar(false, true)}
						/>
						<Row>
							<Col lg='8' md='6' sm='12'>
								<div
									style={{
										width: window.screen.width < 500 ? '100%' : '150%'
									}}
								>
									<Row>
										<Col sm='12'>
											<TabContent activeTab='1'>
												<TabPane tabId='1'>
													<Row>
														<ToastContainer />
														<Col lg='8' md='6' sm='12'>
															<Card>
																<CardHeader>
																	<CardTitle>
																		{messages?.subHeading
																			? messages.subHeading
																			: editItem
																			? 'Edit Liability Details'
																			: 'Add New Liability'}
																	</CardTitle>
																</CardHeader>
																<CardBody>
																	<Form>
																		<Row>
																			<Col md='6' sm='12'>
																				<FormGroup className='form-label-group'>
																					<Select
																						className='React'
																						classNamePrefix='select'
																						ref={selectAssetRef}
																						name='color'
																						options={colourOptions1}
																						isClearable={true}
																						isDisabled={editItem}
																						value={colourOptions1.filter(
																							option =>
																								option.value === liabilityType
																						)}
																						placeholder={
																							messages?.liabilityOptionText
																								? messages?.liabilityOptionText
																								: 'Select Liability Type...'
																						}
																						onChange={e => {
																							handleChange(e)
																						}}
																					/>
																					<Label for='nameMulti'>
																						Liability Type
																					</Label>
																				</FormGroup>
																			</Col>
																			<Col md='6' sm='12'>
																				<FormGroup className='form-label-group'>
																					<Select
																						isMulti
																						name='nominee'
																						options={nomineeOption}
																						value={nominees.map(n => {
																							const as = nomineeOption.filter(
																								e => {
																									return e.value === n.id
																								}
																							)
																							return {
																								value: as[0].value,
																								label: as[0].label
																							}
																						})}
																						ref={selectNomineeRef}
																						className='React'
																						classNamePrefix='select'
																						placeholder={
																							messages?.nomineeOption
																								? messages?.nomineeOption
																								: 'Select Nominees...'
																						}
																						id='nominee'
																						onChange={e => {
																							changeNominee(e)
																						}}
																					/>
																					<Label>Nominee</Label>
																				</FormGroup>
																			</Col>
																		</Row>
																		<Row>
																			{Object.keys(template).includes(
																				liabilityType
																			) &&
																				selectedTemplate.length &&
																				selectedTemplate.map((e, i) => {
																					return (
																						<Col md='6' sm='12' key={i}>
																							<FormGroup className='form-label-group'>
																								{e.deletable && (
																									<Delete
																										style={{
																											position: 'absolute',
																											right: '-5px',
																											top: '-7px'
																										}}
																										className='primary'
																										size={15}
																										onClick={() => {
																											deletecus(e)
																										}}
																									/>
																								)}
																								<Input
																									type={e.type}
																									onKeyPress={event =>
																										e.type === 'number' &&
																										handleKeyMobileNumber(event)
																									}
																									name={e.key}
																									id={e.id}
																									className='input-label'
																									placeholder={e.key}
																									value={e.val}
																									onChange={ev => {
																										changeValue(
																											ev.target
																												? ev.target.value
																												: ev.value,
																											e
																										)
																									}}
																								/>
																								<Label
																									for={e.id}
																									className={
																										themeConfig.theme === 'dark'
																											? 'dark-label'
																											: 'light-label'
																									}
																								>
																									{e.key}
																								</Label>
																							</FormGroup>
																						</Col>
																					)
																				})}
																		</Row>
																		<Row style={{marginTop: '15px'}}>
																			<Col
																				md='6'
																				sm='12'
																				style={{display: 'flex'}}
																			>
																				{liabilityType && (
																					<>
																						<Button
																							color='white'
																							outline
																							onClick={toggleModal}
																							className='add-button'
																							id='addButton'
																							onMouseEnter={() =>
																								animateLabel(true)
																							}
																							onMouseLeave={() =>
																								animateLabel(false)
																							}
																							style={{
																								backgroundColor:
																									'var(--warning)'
																							}}
																						>
																							+
																						</Button>
																						<div className='label-div'>
																							<span
																								id='buttonLabel'
																								className='no-display'
																							>
																								Add a Custom Field
																							</span>
																						</div>
																					</>
																				)}
																			</Col>
																			<Col sm='6'>
																				<FormGroup
																					className='action-right'
																					style={{
																						textAlign: 'right',
																						marginBottom: '0px'
																					}}
																				>
																					<Button.Ripple
																						outline
																						color='secondary'
																						type='reset'
																						className='button-label'
																						onClick={e => {
																							seteditItem(false)
																							clearLiability()
																						}}
																					>
																						{editItem
																							? 'Cancel'
																							: messages?.resetButton
																							? messages?.resetButton
																							: 'Reset'}
																					</Button.Ripple>
																					<Button.Ripple
																						color='warning'
																						type='submit'
																						className='button-label'
																						disabled={
																							nominees.length === 0 ||
																							!liabilityType ||
																							isAddDisabled
																						}
																						onClick={e => {
																							editItem
																								? savechanges(e)
																								: callAddLiability(e)
																						}}
																					>
																						{editItem
																							? 'Update'
																							: messages?.submitButton
																							? messages?.submitButton
																							: 'Add'}
																					</Button.Ripple>
																				</FormGroup>
																			</Col>
																		</Row>
																	</Form>
																</CardBody>
															</Card>
														</Col>
													</Row>

													<Row>
														<ToastContainer />
														<Col md='8'>
															<AssetAccordion
																heading={
																	messages?.subHeading
																		? messages.subHeading
																		: 'Liabilities List'
																}
																isLoading={props.listLoading}
																collapseItems={liabilityList}
																show={() => {
																	setliabilityShow(!liabilityShow)
																	getAssets()
																}}
																assetShow={liabilityShow}
															/>
														</Col>
													</Row>
												</TabPane>
											</TabContent>
										</Col>
									</Row>
								</div>
							</Col>
							<Ccube />{' '}
						</Row>

						<Row>
							{/* To add a */}
							<Col sm='12'>
								<Modal isOpen={modal} toggle={toggleModal} centered={true}>
									<ModalHeader
										toggle={toggleModal}
										tag='div'
										style={{
											color: 'var(--warning)',
											fontSize: '1.45rem',
											fontWeight: 'bold',
											letterSpacing: '1px',
											justifyContent: 'center'
										}}
									>
										Add Custom Field
									</ModalHeader>
									<ModalBody>
										<FormGroup className='form-label-group'>
											<Input
												type='email'
												name='Email'
												disabled={liabilityType === ''}
												id='EmailMulti'
												value={fname}
												placeholder='Enter Field Name'
												onChange={e => {
													setfname(e.target.value)
												}}
											/>
											<Label for='EmailMulti'>Enter Field Name</Label>
										</FormGroup>
										<FormGroup
											className='form-label-group'
											disabled={liabilityType === undefined}
										>
											<Select
												className='React'
												ref={selectCustomRef}
												disabled={liabilityType === undefined}
												classNamePrefix='select'
												isClearable={true}
												name='color'
												options={colourOptions2}
												placeholder='Select Field Type...'
												onChange={e => setftype(e ? e.value : ' ')}
											/>
											<Label for='nameMulti'>Field Type</Label>
										</FormGroup>
										<FormGroup
											className='form-label-group mb-0'
											style={{textAlign: 'right'}}
										>
											<Button.Ripple
												outline
												color='secondary'
												type='reset'
												className='mb-1 button-label'
												disabled={liabilityType === undefined}
												onClick={e => {
													clearCustomField()
												}}
											>
												{messages?.resetButton
													? messages?.resetButton
													: 'Reset'}
											</Button.Ripple>{' '}
											<Button.Ripple
												color='warning'
												disabled={fname === '' || ftype === ''}
												type='submit'
												className='button-label'
												onClick={e => addfield()}
											>
												{messages?.submitButton
													? messages?.submitButton
													: 'Add'}
											</Button.Ripple>
										</FormGroup>
									</ModalBody>
								</Modal>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</React.Fragment>
	)
}
const mapStateToProps = state => {
	return {
		dataList: state.dataList,
		messages: state?.customizer?.language?.Liability,
		listLoading: state.dataList.totalRecordsLoading
	}
}
export default connect(mapStateToProps, {getData, addData})(AddLiability)
