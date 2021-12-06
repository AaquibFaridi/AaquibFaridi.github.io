import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
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
import PopUp from 'utility/Popup'
import Ccube from 'utility/Ccube'
import options from './AssetOption'
import AssetAccordion from '../Portfolio/AssetAccordion'
import axios from 'axios'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import 'assets/scss/plugins/extensions/toastr.scss'
import 'assets/scss/plugins/extensions/dropzone.scss'
import {getData, addData} from 'redux/actions/data-list/'
import Select from 'react-select'
import {Edit, Trash, Delete} from 'react-feather'
import themeConfig from 'configs/themeConfig'
import {encryptdata} from 'utility/context/SecurityTool'
import 'assets/scss/pages/data-list.scss'
import 'assets/scss/components/app-loader.scss'
import Sidebar from '../Nominee/NomineeSidebar'
import handleKeyMobileNumber from 'utility/context/InputTypeNum'

const colourOptions2 = [
	{value: 'Text', label: 'Text', color: '#00B8D9', isFixed: true},
	{value: 'textarea', label: 'Text Area', color: '#0052CC', isFixed: true},
	{value: 'Date', label: 'Date', color: '#0052CC', isFixed: true},
	{value: 'Number', label: 'Number', color: '#0052CC', isFixed: true},
	{value: 'File', label: 'File', color: '#0052CC', isFixed: true}
]

const AddAssets = props => {
	const selectAssetRef = React.createRef()
	const selectNomineeRef = React.createRef()
	const selectCustomRef = React.createRef()
	const template = props.messages?.assetOption
		? props.messages?.assetOption
		: JSON.parse(JSON.stringify(options))
	const colourOptions1 = [
		{
			value: 'Bank Holdings',
			label: props.messages?.colorOption?.['Bank Holdings']
				? props.messages?.colorOption?.['Bank Holdings']
				: 'Bank Holdings',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Bills & Credits',
			label: props.messages?.colorOption?.['Bills & Credits']
				? props.messages?.colorOption?.['Bills & Credits']
				: 'Bills & Credits',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Cash Holdings',
			label: props.messages?.colorOption?.['Cash Holdings']
				? props.messages?.colorOption?.['Cash Holdings']
				: 'Cash Holdings',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Cryptocurrency',
			label: props.messages?.colorOption?.['Cryptocurrency']
				? props.messages?.colorOption?.['Cryptocurrency']
				: 'Cryptocurrency',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Funds & Deposit',
			label: props.messages?.colorOption?.['Funds & Deposit']
				? props.messages?.colorOption?.['Funds & Deposit']
				: 'Funds & Deposit',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'Investments',
			label: props.messages?.colorOption?.['Investments']
				? props.messages?.colorOption?.['Investments']
				: 'Investments',
			color: '#0052CC',
			isFixed: true
		},
		{
			value: 'Metals & Jewellery',
			label: props.messages?.colorOption?.['Metals & Jewellery']
				? props.messages?.colorOption?.['Metals & Jewellery']
				: 'Metals & Jewellery',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Policies',
			label: props.messages?.colorOption1?.Policies
				? props.messages?.colorOption1?.Policies
				: 'Policies',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Property',
			label: props.messages?.colorOption?.['Property']
				? props.messages?.colorOption?.['Property']
				: 'Property',
			color: '#00B8D9',
			isFixed: true
		},
		{
			value: 'Retirals',
			label: props.messages?.colorOption?.['Retirals']
				? props.messages?.colorOption?.['Retirals']
				: 'Retirals',
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
	const [editId, seteditId] = useState('')
	const [editObject, seteditObject] = useState(null)
	const [setT, setTt] = useState(false)
	const [addNew, setaddNew] = useState(false)
	const [open, setopen] = useState(false)
	const [deleteID, setdeleteID] = useState(null)
	const [fname, setfname] = useState('')
	const [ftype, setftype] = useState('')
	const [assetList, setassetList] = useState([])
	const [editItem, seteditItem] = useState('')
	const [assetType, setassetType] = useState('')
	const [sidebar, setsidebar] = useState(false)
	const [currentData, setcurrentData] = useState(null)
	const [isLoading, setisLoading] = useState(false)
	const [nominees, setnominees] = useState([])
	const [modal, setmodal] = useState(false)
	const [selectedTemplate, setselectedTemplate] = useState([])
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
		!props.listLoading && props.getData()
		//  &&
		// props.dataList.data.length &&
		getAssets()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
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
					label: e.name + ' - ' + e.relation,
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

	const deletecus = e => {
		editItem && setisAddDisabled(false)
		const temp3 = selectedTemplate.filter(x => {
			return e.key !== x.key
		})
		setselectedTemplate(temp3)
	}
	const getAssets = () => {
		const user = JSON.parse(localStorage.getItem('logInUserData'))

		axios
			.get(`/backendapi/user/assets/${user._id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authtoken')}`
				}
			})
			.then(res => {
				const assetList = res ? res.data : []

				assetList.splice(0, assetList.length)
				user?.assets?.length &&
					user.assets.forEach((e, i) => {
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
										{e?.assetDetails?.map((x, i) => {
											if (x.val !== '') {
												return (
													<Col md='5' sm='12' key={i + x.key}>
														<FormText>
															<b>{x.key} :</b> {x.val}
														</FormText>
													</Col>
												)
											} else return ''
										})}
										<Col md='5' sm='12'>
											<FormText>
												<b>Nominees :</b> {nomin}
											</FormText>
										</Col>
										<Col md='2' sm='12'>
											<FormText>
												<b>
													<Edit
														className='cursor-pointer mr-1'
														size={window.screen.width < 500 ? 13 : 20}
														onClick={() => {
															editItemFunc(e)
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
								title: e.assetType,
								content: cont
							}
							assetList.push(ast)
						}
					})
				setassetList(assetList?.reverse())
			})
	}
	const toggleModal = () => {
		if (modal) {
			clearCustomField()
		}
		setmodal(!modal)
	}
	const changeValue = (e, k) => {
		const selectedTemplateTemp = selectedTemplate
		const idx = selectedTemplate.findIndex(x => x.key === k.key)
		if (e.length < 50) {
			selectedTemplateTemp[idx].val = e
			setselectedTemplate(selectedTemplateTemp)
			setTt(!setT)
			addAssetsButtonValidation()
		}
	}
	const addAssetsButtonValidation = () => {
		let isAddDisabled = false
		selectedTemplate.forEach(f => {
			if (f.mandatory && !f.val.trim()) {
				isAddDisabled = true
			}
		})
		setisAddDisabled(isAddDisabled)
	}
	const savechanges = e => {
		e.preventDefault()
		seteditItem(false)
		const user = JSON.parse(localStorage.getItem('logInUserData'))
		const as = {
			assetType,
			assetDetails: selectedTemplate,
			nominees,
			id: editId
		}

		const idx = user.assets.findIndex(el => el.id === editId)
		if (idx >= 0) {
			user.assets.splice(idx, 1)
			user.assets.push(as)
		} else return

		localStorage.setItem('logInUserData', JSON.stringify(user))

		const deletednominee = []
		nominees.forEach(n => {
			n.objectid = editId
		})
		editObject.nominees.forEach(dn => {
			const idx = nominees.findIndex(x => x.id === dn.id)
			if (idx === -1) {
				dn.objectid = editId
				deletednominee.push(dn)
			}
		})

		axios
			.post(
				'/backendapi/adddetails',
				{
					_id: user._id,
					assets: encryptdata(JSON.stringify(user.assets)),
					nominees: nominees,
					deletednominee
				},
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('authtoken')
					}
				}
			)
			.then(res => {
				toast.success('Edited successfully!')
				props.getData(props.parsedFilter)
				getAssets()
			})
			.catch()

		clearAsset()
		clearCustomField()
		setisAddDisabled(true)
	}
	const callAddAsset = e => {
		e.preventDefault()
		const user = JSON.parse(localStorage.getItem('logInUserData'))
		const as = {
			assetType: assetType,
			assetDetails: selectedTemplate,
			nominees: nominees,
			id: uuidv4()
		}

		nominees.forEach(n => {
			n.objectid = as.id
		})
		user.assets.push(as)
		localStorage.setItem('logInUserData', JSON.stringify(user))
		axios
			.post(
				'/backendapi/adddetails',
				{
					_id: user._id,
					assets: encryptdata(JSON.stringify(user.assets)),
					nominees: nominees
				},
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('authtoken')
					}
				}
			)
			.then(res => {
				toast.success('Asset addedd successfully!')
				clearAsset()
				props.getData(props.parsedFilter)
				getAssets()
			})
			.catch()
		clearCustomField()
		setisAddDisabled(true)
	}
	const deleteAsset = id => {
		const user = JSON.parse(localStorage.getItem('logInUserData'))
		const idx = user.assets.findIndex(el => el.id === id)
		const deletednominee = []
		if (idx >= 0) {
			user.assets[idx].nominees.forEach(n => {
				n.objectid = user.assets[idx].id
				deletednominee.push(n)
			})
			user.assets.splice(idx, 1)
		} else return

		localStorage.setItem('logInUserData', JSON.stringify(user))
		axios
			.post(
				'/backendapi/adddetails',
				{
					_id: user._id,
					assets: encryptdata(JSON.stringify(user.assets)),
					deletednominee
				},
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('authtoken')
					}
				}
			)
			.then(res => {
				toast.warning('Deleted successfully!')
				props.getData(props.parsedFilter)
				getAssets()
			})
			.catch()

		clearAsset()
		clearCustomField()
		setisAddDisabled(true)
	}
	const addfield = () => {
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
		if (selectedTemplateTemp[size - 1].key === 'Attachments') {
			temp = selectedTemplateTemp[size - 1]
			selectedTemplateTemp[size - 1] = {
				key: fname + ftype,
				val: '',
				type: ftype,
				deletable: true
			}
			selectedTemplateTemp.push(temp)
			setselectedTemplate(selectedTemplateTemp)
			setfname('')
			setftype('')
		} else {
			selectedTemplateTemp.push({
				key: fname + ftype,
				val: '',
				type: ftype,
				deletable: true
			})
			setselectedTemplate(selectedTemplateTemp)
			setfname('')
			setftype('')
		}
		toggleModal()
	}
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
			toast.error('Failed to add Nominee! Please retry')
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
					: nominees.push({id: e.value, name: e.label, objectid: editId})
			})
		!event && setisAddDisabled(true)
		setnominees(nominees)
	}
	const clearAsset = () => {
		selectAssetRef.current && selectAssetRef.current.select.clearValue()
		selectNomineeRef.current && selectNomineeRef.current.select.clearValue()
		setassetType('')
		setselectedTemplate([])
		setnominees([])
		editItem && setisAddDisabled(true)
	}
	const clearCustomField = () => {
		setfname('')
		setftype('')
		selectCustomRef.current && selectCustomRef.current.select.clearValue()
	}
	const editItemFunc = item => {
		setisAddDisabled(true)
		const {assetDetails, assetType, nominees} = item // item.id is left
		setassetType(assetType)
		seteditItem(true)
		seteditId(item.id)
		seteditObject(item)
		setselectedTemplate(assetDetails)
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
				{messages?.heading ? messages.heading : 'Assets'}
			</h2>
			<Row>
				<Col sm='12'>
					<div
						className={`data-list ${thumbView ? 'thumb-view' : 'list-view'}`}
					>
						<PopUp
							handleConfirm={() => {
								deleteAsset(deleteID)
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
											<TabContent activeTab={'1'}>
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
																			? 'Edit Asset Details'
																			: 'Add New Asset'}
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
																						isDisabled={editItem}
																						value={colourOptions1.filter(
																							option =>
																								option.value === assetType
																						)}
																						name='color'
																						options={colourOptions1}
																						isClearable={true}
																						placeholder={
																							messages?.assetOptionText
																								? messages.assetOptionText
																								: 'Select Asset Type'
																						}
																						onChange={e => {
																							setisAddDisabled(true)
																							setfname('')
																							setftype('')
																							setassetType(
																								e ? e.value : undefined
																							)
																							setselectedTemplate(
																								e ? template[e.value] : {}
																							)
																						}}
																					/>
																					<Label for='nameMulti'>
																						{messages?.assetOptionText
																							? messages.assetOptionText
																							: 'Select Asset Type'}
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
																								? messages.nomineeOption
																								: 'Select Nominees'
																						}
																						id='nominee'
																						onChange={e => {
																							changeNominee(e)
																						}}
																					/>
																					<Label>
																						{messages?.nomineeOption
																							? messages.nomineeOption
																							: 'Select Nominees'}
																					</Label>
																				</FormGroup>
																			</Col>
																		</Row>
																		<Row>
																			{Object.keys(template).includes(
																				assetType
																			) &&
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
																										e.type.toLowerCase() ===
																											'number' &&
																										handleKeyMobileNumber(event)
																									}
																									name='city'
																									id='cityMulti'
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
																									for='cityMulti'
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
																				{assetType && (
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
																							clearAsset()
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
																						disabled={
																							// editItem
																							//   ? nominees.length === 0 ||
																							//     !assetType
																							//   :
																							nominees.length === 0 ||
																							!assetType ||
																							isAddDisabled
																						}
																						type='reset'
																						className='button-label'
																						onClick={e => {
																							editItem
																								? savechanges(e)
																								: callAddAsset(e)
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
																	messages?.textList
																		? messages?.textList
																		: 'Assets List'
																}
																isLoading={props.listLoading}
																collapseItems={assetList}
																colorOption={messages?.colorOption}
															/>
														</Col>
													</Row>
												</TabPane>
											</TabContent>
										</Col>
									</Row>
								</div>
							</Col>
							<Ccube />
						</Row>

						<Row>
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
												disabled={assetType === ''}
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
											disabled={assetType === undefined}
										>
											<Select
												id='optionSelect'
												className='React'
												ref={selectCustomRef}
												disabled={assetType === undefined}
												classNamePrefix='select'
												isClearable={true}
												options={colourOptions2}
												placeholder='Select Field Type...'
												onChange={e => setftype(e ? e.value : '')}
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
												disabled={assetType === undefined}
												onClick={e => {
													clearCustomField()
												}}
											>
												{messages?.resetButton
													? messages?.resetButton
													: 'Reset'}
											</Button.Ripple>
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
		listLoading: state.dataList.totalRecordsLoading
	}
}

export default connect(mapStateToProps, {getData, addData})(AddAssets)
