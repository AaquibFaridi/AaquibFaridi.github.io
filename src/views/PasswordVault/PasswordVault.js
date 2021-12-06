import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Spinner} from 'reactstrap'
import PopUp from 'utility/Popup'
import Ccube from 'utility/Ccube'
import {
	Row,
	Col,
	TabContent,
	TabPane,
	Card,
	FormGroup,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Form,
	Alert,
	Button,
	CardHeader,
	CardBody,
	CardTitle,
	Label
} from 'reactstrap'
import DataTable from 'react-data-table-component'
import {encryptdata, decryptdata} from 'utility/context/SecurityTool'
import Select from 'react-select'
import {toast} from 'react-toastify'
import {Edit, Eye, Trash, ChevronDown} from 'react-feather'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import 'assets/scss/plugins/extensions/toastr.scss'
import 'assets/scss/plugins/extensions/react-paginate.scss'
import 'assets/scss/pages/data-list.scss'
import crypto from 'crypto'

import themeConfig from 'configs/themeConfig'

import 'assets/scss/plugins/extensions/dropzone.scss'

const EditComponent = props => {
	return (
		<div className='data-list-action'>
			<Edit
				className='cursor-pointer'
				size={window.screen.width < 500 ? 13 : 20}
				onClick={() => props.editRow(true)}
			/>
		</div>
	)
}
const DeleteComponent = props => {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Modal isOpen={open} className='modal-dialog-centered' backdrop='static'>
				<ModalBody>Are you sure you want to delete this record?</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={() => setOpen(false)}
						className='button-label'
					>
						Cancel
					</Button>
					<Button
						color='danger'
						onClick={() => {
							props.deleteRow()
							setOpen(false)
						}}
						className='button-label'
					>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
			<PopUp
				handleConfirm={() => {
					props.deleteRow()
					setOpen(false)
				}}
				isOpen={open}
				closeModal={() => setOpen(false)}
			/>
			<div className='data-list-action'>
				<Trash
					className='cursor-pointer'
					size={window.screen.width < 500 ? 13 : 20}
					onClick={() => setOpen(true)}
				/>
			</div>
		</>
	)
}
const ViewComponent = props => {
	return (
		<div className='data-list-action'>
			<Eye
				className='cursor-pointer'
				size={window.screen.width < 500 ? 13 : 20}
				onClick={() => {
					if (!props.showPass) {
						props.set()
					} else {
						let passwordShowTime = JSON.parse(
							localStorage.getItem('logInUserData')
						).pwdtime
						if (passwordShowTime > 10 || passwordShowTime < 2) {
							passwordShowTime = 3
						}
						toast.warning(
							`Wait for ${passwordShowTime} seconds as one password is already visible !`
						)
					}
				}}
			/>
		</div>
	)
}
const selectedStyle = {
	rows: {
		selectedHighlighStyle: {
			'backgroundColor': 'rgba(115,103,240,.05)',
			'color': '#7367F0 !important',
			'boxShadow': '0 0 1px 0 #7367F0 !important',
			'&:hover': {
				transform: 'translateY(0px) !important'
			}
		}
	}
}
const colourOptions1 = [
	{
		value: 'App',
		label: 'App',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Bank',
		label: 'Bank',
		color: '#00B8D9',
		isFixed: true
	},

	{
		value: 'Card',
		label: 'Card',
		color: '#00B8D9',
		isFixed: true
	},

	{
		value: 'Educational Portal',
		label: 'Educational Portal',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Email',
		label: 'Email',
		color: '#0052CC',
		isFixed: true
	},
	{
		value: 'E-commerce',
		label: 'E-commerce',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Finance',
		label: 'Finance',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Goverment Portal',
		label: 'Goverment Portal',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'HealthCare',
		label: 'HealthCare',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Office Portal',
		label: 'Office Portal',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Social Media',
		label: 'Social Media',
		color: '#00B8D9',
		isFixed: true
	},
	{value: 'Custom', label: 'Custom', color: '#0052CC', isFixed: true}
]
const PasswordVault = props => {
	const selectAssetRef = React.createRef()
	const [isLoading, setisLoading] = useState(false)
	const [showPass, setshowPass] = useState(false)
	const [editItem, seteditItem] = useState(false)

	const [editData, seteditData] = useState(null)
	const [modal, setmodal] = useState(false)
	const [pwd, setpwd] = useState('')
	const [ptype, setptype] = useState('')
	const [userName, setuserName] = useState('')
	const [accountNumber, setaccountNumber] = useState('')
	const [showIdx, setshowIdx] = useState('')
	const [confirmPwd, setconfirmPwd] = useState('')
	const [saved, setsaved] = useState([])
	// const [idx, setidx] = useState('')
	const columns = [
		{
			name: 'Edit',
			sortable: false,
			width: '60px',
			cell: function temp(row) {
				return (
					<EditComponent
						row={row}
						editRow={() => {
							editpwd(row)
						}}
					/>
				)
			}
		},
		{
			name: 'Alias',
			selector: 'pwdname',
			sortable: false,
			width: '160px'
		},
		{
			name: 'Type',
			selector: 'ptype',
			sortable: true,
			width: '160px'
		},
		{
			name: 'UserName',
			selector: 'userName',
			sortable: true,
			width: '120px',
			cell: function temp(row) {
				return <span>{row.showPass ? row.userName : '********'}</span>
			}
		},
		{
			name: 'Password',
			selector: 'pwd',
			width: '120px',
			cell: function temp(row) {
				return <span>{row.showPass ? row.pwd : '********'}</span>
			}
		},
		{
			name: '',
			sortable: false,
			width: '50px',
			cell: function temp(row) {
				return <DeleteComponent row={row} deleteRow={() => deletepwd(row)} />
			}
		},
		{
			name: '',
			sortable: false,
			width: '50px',
			cell: function temp(row) {
				return (
					<ViewComponent
						showPass={showPass}
						set={() => {
							setshowIdx(row)
							setmodal(!modal)
						}}
					/>
				)
			}
		}
	]
	useEffect(() => {
		update()
	}, [])

	const hashPassword2 = async password => {
		const salt = '0e09ca7a4644c68c6c002ed1338bb40b'
		const hash = await crypto
			.pbkdf2Sync(password, salt, 1000, 20, `sha512`)
			.toString(`hex`)
		return hash
	}

	const editpwd = data => {
		const {ptype, pwd, pwdname, userName} = data
		setptype(ptype)
		seteditItem(true)
		seteditData(data)
		setpwd(pwd)
		setuserName(userName)
		setaccountNumber(pwdname)
	}
	const update = () => {
		const logInUserData = JSON.parse(localStorage.getItem('logInUserData'))
		if (!logInUserData) return
		axios
			.post(
				'/backendapi/pwd/list',
				{
					user: logInUserData._id
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				}
			)
			.then(res => {
				for (let i = 0; i < res?.data?.length; i = i + 1) {
					res.data[i].ptype = decryptdata(res.data[i].ptype)
					res.data[i].pwd = decryptdata(res.data[i].pwd)
					res.data[i].pwdId = decryptdata(res.data[i].pwdId)
					res.data[i].pwdname = decryptdata(res.data[i].pwdname)
					res.data[i].userName = decryptdata(res.data[i].userName)
				}
				setsaved(res?.data?.reverse())
			})
	}
	const togglepwdshow = (value, row) => {
		const theLocations = saved.map(l => Object.assign({}, l))
		theLocations[row].showPass = value
		setsaved(theLocations)
		setshowPass(value)
	}
	const toggleModal = () => {
		setmodal(!modal)
		setconfirmPwd('')
		setshowIdx('')
	}
	const toggleModal2 = () => {
		let passwordShowTime = JSON.parse(
			localStorage.getItem('logInUserData')
		).pwdtime
		if (passwordShowTime > 10 || passwordShowTime < 2) {
			passwordShowTime = 3
		}

		hashPassword2(confirmPwd).then(encpassword => {
			if (encpassword === localStorage.getItem('secretkey')) {
				const index = saved.indexOf(showIdx)
				togglepwdshow(true, index)
				setTimeout(
					function () {
						togglepwdshow(false, index)
						setshowPass(false)
					},
					passwordShowTime ? passwordShowTime * 1000 : 3000
				)
				setmodal(!modal)
				setconfirmPwd('')
			} else {
				toast.warning('Wrong Password')
			}
		})
	}
	const clearSaved = e => {
		selectAssetRef.current.select.clearValue()
		setpwd('')
		setptype('')
		setuserName('')
		setaccountNumber('')
	}
	const updatePwd = e => {
		setisLoading(true)
		e.preventDefault()
		if (ptype === '' || pwd === '' || accountNumber === '') {
			toast.warning('Mandatory Field Missing !!')
			setisLoading(false)
		} else {
			// const newp = {
			//   pwdname: accountNumber,
			//   pwd,
			//   showPass: false,
			//   userName: userName,
			//   accountNumber: accountNumber
			//   // description: description
			// }
			const newp1 = {
				showPass: false,
				pwdname: encryptdata(accountNumber),
				pwd: encryptdata(pwd),
				ptype: encryptdata(ptype),
				userName: encryptdata(userName),
				user: JSON.parse(localStorage.getItem('logInUserData'))._id,
				_id: editData._id
			}

			// saved.push(newp)
			selectAssetRef.current.select.clearValue()
			setsaved('')
			setpwd('')
			seteditItem(false)
			seteditData(null)
			setptype('')
			setuserName('')
			setaccountNumber('')
			axios
				.post('/backendapi/pwd/update', newp1, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				})
				.then(res => {
					update()
					//setState({saved:res.data});
					setisLoading(false)
					toast.success('Password saved successfully')
				})
		}
	}
	const addToSaved = e => {
		setisLoading(true)
		e.preventDefault()
		if (ptype === '' || pwd === '' || accountNumber === '') {
			toast.warning('Mandatory Field Missing !!')
			setisLoading(false)
		} else {
			const newp = {
				pwdname: accountNumber,
				pwd,
				showPass: false,
				userName,
				accountNumber
				// description: description
			}
			const newp1 = {
				showPass: false,
				pwdname: encryptdata(accountNumber),
				pwd: encryptdata(pwd),
				ptype: encryptdata(ptype),
				userName: encryptdata(userName),
				user: JSON.parse(localStorage.getItem('logInUserData'))._id
			}

			saved.push(newp)
			selectAssetRef.current.select.clearValue()
			setsaved('')
			setpwd('')
			setptype('')
			setuserName('')
			setaccountNumber('')
			axios
				.post('/backendapi/savepwd', newp1, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				})
				.then(res => {
					update()
					//setState({saved:res.data});
					setisLoading(false)
					toast.success('Password saved successfully')
				})
		}
	}
	const deletepwd = row => {
		axios
			.post('/backendapi/pwd/delete', row, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authtoken')}`
				}
			})
			.then(res => {
				toast.warning('Password deleted successfully')
				const savedTemp = saved.filter(ex => {
					return ex._id !== row._id
				})
				setsaved(savedTemp)
			})
		toggleConfirm(false, null)
	}
	const toggleConfirm = (value, id) => {
		// setidx(id)
	}
	const setPassword = e => {
		const accountTemp = e.target.value.trim()
		accountTemp ? setaccountNumber(e.target.value) : setaccountNumber('')
	}
	const setUserName = e => {
		const userTemp = e.target.value.trim()
		userTemp ? setuserName(userTemp) : setuserName('')
	}
	const logInUserData = JSON.parse(localStorage.getItem('logInUserData'))
	let passwordShowTime = ''
	if (logInUserData) {
		passwordShowTime = logInUserData.pwdtime
		if (passwordShowTime > 10 || passwordShowTime < 2) {
			passwordShowTime = 3
		}
	}
	return (
		<React.Fragment>
			<Modal
				isOpen={modal}
				toggle={toggleModal}
				className='modal-dialog-centered'
				fade={false}
			>
				<ModalHeader style={{border: 'solid 1px'}} toggle={toggleModal}>
					Confirm your identity
				</ModalHeader>
				<ModalBody style={{border: 'solid 1px'}}>
					Enter your login password to continue
					<br />
					<br />
					<FormGroup>
						{/* <Label for="password">Password:</Label> */}
						<Input
							type='password'
							id='password'
							placeholder='Password'
							onChange={e => {
								setconfirmPwd(e.target.value)
							}}
						/>
					</FormGroup>
					<Alert className='mt-1' color='danger'>
						<span>
							Your password will only be visible for {passwordShowTime} seconds!
						</span>
					</Alert>
				</ModalBody>
				<ModalFooter>
					<Button
						color={confirmPwd === '' ? 'primary' : 'success'}
						disabled={confirmPwd === ''}
						onClick={toggleModal2}
					>
						Accept
					</Button>{' '}
				</ModalFooter>
			</Modal>
			<h2 className='warning spacing nodisplay'>Password Vault</h2>
			<Row>
				<Col lg='8' md='6' sm='12'>
					<div style={{width: window.screen.width < 500 ? '100%' : '150%'}}>
						<Row>
							<Col sm='12'>
								<TabContent activeTab='1'>
									<TabPane tabId='1'>
										<Row>
											<ToastContainer />
											<Col lg='8' md='6' sm='12'>
												<Card>
													<CardHeader>
														<CardTitle>Save new Password</CardTitle>
													</CardHeader>
													<CardBody>
														<Form>
															<Row>
																<Col md='6' sm='12'>
																	<FormGroup className='form-label-group'>
																		<Input
																			className='input-label'
																			type='text'
																			name='accountNumber'
																			id='accountNumberMulti'
																			placeholder='Password For *'
																			value={accountNumber}
																			onChange={setPassword}
																		/>
																		<Label
																			className={
																				themeConfig.theme === 'dark'
																					? 'dark-label'
																					: 'light-label'
																			}
																			for='accountNumberMulti'
																		>
																			Password For *
																		</Label>
																	</FormGroup>
																</Col>
																<Col md='6' sm='12'>
																	<FormGroup className='form-label-group'>
																		<Input
																			className='input-label'
																			type='text'
																			name='userName1'
																			id='userNameMulti1'
																			placeholder='User Name'
																			value={userName}
																			onChange={setUserName}
																		/>
																		<Label
																			className={
																				themeConfig.theme === 'dark'
																					? 'dark-label'
																					: 'light-label'
																			}
																			for='userNameMulti'
																		>
																			User Name
																		</Label>
																	</FormGroup>
																</Col>

																<Col md='6' sm='12'>
																	<FormGroup className='form-label-group'>
																		<Input
																			className='input-label'
																			type='password'
																			name='name'
																			id='nameMultiPassword'
																			placeholder='Password *'
																			value={pwd}
																			onChange={e => {
																				setpwd(e.target.value)
																			}}
																		/>
																		<Label
																			className={
																				themeConfig.theme === 'dark'
																					? 'dark-label'
																					: 'light-label'
																			}
																			for='nameMultiPassword'
																		>
																			Password *
																		</Label>
																	</FormGroup>
																</Col>
																{/* <FormGroup className="form-label-group">
                                      <Input
                                        type="text"
                                        name="description"
                                        id="descriptionMulti"
                                        placeholder="Note"
                                        value={this.state.description}
                                        onChange={(e) => {
                                          this.setState({
                                            description: e.target.value,
                                          });
                                        }}
                                      />
                                      <Label for="descriptionMulti">Note</Label>
                                    </FormGroup> */}
																<Col md='6' sm='12'>
																	<FormGroup className='form-label-group'>
																		<Select
																			className='React'
																			classNamePrefix='select'
																			value={colourOptions1.filter(
																				option => option.value === ptype
																			)}
																			ref={selectAssetRef}
																			name='color'
																			options={colourOptions1}
																			isClearable={true}
																			placeholder='Select Password Type *'
																			onChange={e => {
																				setptype(e ? e.value : '')
																			}}
																		/>
																	</FormGroup>
																</Col>
															</Row>
															<Row>
																<Col md='6' sm='12'></Col>
																<Col md='6' sm='12'>
																	<FormGroup
																		className='form-label-group'
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
																				clearSaved()
																			}}
																		>
																			Reset
																		</Button.Ripple>
																		<Button.Ripple
																			color='warning'
																			type='reset'
																			className='ml-1 button-label'
																			onClick={e => {
																				!isLoading &&
																					(editItem
																						? updatePwd(e)
																						: addToSaved(e))
																			}}
																		>
																			{isLoading ? (
																				<Spinner color='warning' size='sm' />
																			) : editItem ? (
																				'Update'
																			) : (
																				'Add'
																			)}
																		</Button.Ripple>
																	</FormGroup>
																</Col>
															</Row>
														</Form>
													</CardBody>
												</Card>
											</Col>
											<Ccube />
										</Row>

										<Row>
											<ToastContainer />
											<Col md='8'>
												<Card>
													<CardHeader>
														<CardTitle>Saved Passwords</CardTitle>
													</CardHeader>
													<CardBody style={{paddingTop: '0px'}}>
														<Form>
															{saved?.length === 0 && (
																<h3 style={{textAlign: 'center'}}>
																	No records found!!!
																</h3>
															)}
															{saved?.length > 0 && (
																<div
																	className={`data-list ${
																		props.thumbView ? 'thumb-view' : 'list-view'
																	}`}
																>
																	<DataTable
																		width='100'
																		data={saved}
																		columns={columns}
																		noHeader
																		selectableRows={
																			window.screen.width < 500 ? false : false
																		}
																		responsive
																		pointerOnHover
																		selectableRowsHighlight
																		// onSelectedRowsChange={(data) =>
																		//   setselected(data.selectedRows)
																		// }
																		customStyles={selectedStyle}
																		sortIcon={<ChevronDown />}
																	/>
																</div>
															)}
														</Form>
													</CardBody>
												</Card>
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId='2'></TabPane>
									<TabPane tabId='3'>Coming soon .......!</TabPane>
								</TabContent>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</React.Fragment>
	)
}
export default PasswordVault
