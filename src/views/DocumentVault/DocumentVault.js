import React, {useState, useEffect} from 'react'
import {
	Row,
	Col,
	Card,
	FormGroup,
	Input,
	Button,
	CardHeader,
	CardBody,
	CardTitle,
	Label
} from 'reactstrap'
import {toast} from 'react-toastify'
import {encryptdata, decryptdata} from 'utility/context/SecurityTool'
import {Download} from 'react-feather'
import {useDropzone} from 'react-dropzone'
import img5 from 'assets/img/slider/banner-25.jpg'
import 'assets/scss/plugins/extensions/dropzone.scss'
import themeConfig from 'configs/themeConfig'
import axios from 'axios'

const token = localStorage.getItem('authtoken')
const ProgrammaticallyDropzone = props => {
	const [files, setFiles] = useState([])
	const {getRootProps, getInputProps, open} = useDropzone({
		//accept: "image/*",
		noClick: true,
		noKeyboard: true,
		onDrop: acceptedFiles => {
			props.setfilesOndrop(acceptedFiles)
			setFiles(
				acceptedFiles.map(file =>
					Object.assign(file, {
						preview: URL.createObjectURL(file)
					})
				)
			)
		}
	})

	const thumbs = files.map(file => (
		<div className='dz-thumb' key={file.name}>
			<div className='dz-thumb-inner'>
				<img
					src={file.preview}
					className='dz-img'
					onError={e => (e.target.src = img5)}
					alt={file.name}
				/>
				<br />
				<span> {file.name}</span>
			</div>
		</div>
	))

	useEffect(
		() => () => {
			files.forEach(file => URL.revokeObjectURL(file.preview))
		},
		[files]
	)

	return (
		<section>
			<div {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<p className='mx-1' onClick={open}>
					Drag `n` drop some files here, or Click to Select files
				</p>
			</div>
			{thumbs.length ? (
				<aside className='thumb-container-documents'>{thumbs}</aside>
			) : (
				<div {...getRootProps({className: 'dropzone-dummy'})}>
					<p className='mx-1'>Preview Selected files</p>
				</div>
			)}
		</section>
	)
}
const user = JSON.parse(localStorage.getItem('logInUserData'))
const DocumentVault = () => {
	const [files, setfiles] = useState([])
	const [reset, setreset] = useState(false)
	const [alias, setalias] = useState()
	const [expiry, setexpiry] = useState()
	const [desc, setdesc] = useState()
	const [documentList, setdocumentList] = useState([])

	const getDocuments = () => {
		axios
			.get(`/backendapi/documents/${user._id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => {
				const resp = res.data
				for (let l = 0; l < resp.length; l = l + 1) {
					resp[l].desc = decryptdata(resp[l].desc)
					resp[l].id = l + 1
					resp[l].expiry = decryptdata(resp[l].expiry)
					resp[l].alias = decryptdata(resp[l].alias)
					resp[l].attachment = decryptdata(resp[l].attachment)
					resp[l].filename = decryptdata(resp[l].filename)
				}
				setdocumentList(resp)
			})
			.catch(err => {
				console.log('err get docs', err)
			})
	}

	useEffect(() => {
		getDocuments()
	}, [])

	const setfilesOndrop = data => {
		setreset(false)
		setfiles(
			data.map(file =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			)
		)
	}
	const getBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = error => reject(error)
		})
	}
	const isDisabled = () => !files?.length || !expiry

	const resetDropzone = e => {
		e.preventDefault()
		setreset(true)
	}
	const submitDropzone = e => {
		e.preventDefault()
		if (!files.length) {
			toast.error('No File Selected')
			return
		}
		getBase64(files[0])
			.then(attachment => {
				const data = {}
				data.user = user._id
				data.type = 'Vault'
				data.alias = encryptdata(alias)
				data.filename = encryptdata(files[0].name)
				data.attachment = encryptdata(attachment)
				data.desc = encryptdata(desc)
				data.expiry = encryptdata(expiry)
				axios
					.post('/backendapi/documents/add', data, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then(res => {
						getDocuments()
					})
					.catch(err => {
						console.log('err docs', err)
					})
			})
			.catch()
	}

	return (
		<React.Fragment>
			<h2 className='warning spacing nodisplay'>My Documents</h2>
			<div key={Math.random()}></div>
			<Row>
				<Col sm='12'>
					<Card>
						<CardHeader>
							<CardTitle>Upload any file, scans, documents</CardTitle>
						</CardHeader>

						<CardBody>
							<Row>
								<Col md='6' sm='12'>
									<FormGroup className='form-label-group'>
										<Input
											type='text'
											name='name'
											id='nameMultiname'
											placeholder='Attachment Name / Alias'
											onChange={e => setalias(e.target.value)}
										/>
										<Label
											className={
												themeConfig.theme === 'dark'
													? 'dark-label'
													: 'light-label'
											}
											for='nameMultiname'
										>
											Attachment Name / Alias
										</Label>
									</FormGroup>

									<FormGroup className='form-label-group'>
										<Input
											className='input-label'
											type='text'
											name='name'
											id='nameMultiFile'
											placeholder='File Name'
										/>
										<Label
											className={
												themeConfig.theme === 'dark'
													? 'dark-label'
													: 'light-label'
											}
											for='nameMultiFile'
										>
											File Name
										</Label>
									</FormGroup>

									<FormGroup className='form-label-group'>
										<Input
											className='input-label'
											type='Date'
											name='name'
											id='nameMultiExpiry'
											placeholder='Expiry Date'
											onChange={date => setexpiry(date)}
										/>
										<Label
											className={
												themeConfig.theme === 'dark'
													? 'dark-label'
													: 'light-label'
											}
											for='nameMultiExpiry'
										>
											Expiry Date
										</Label>
									</FormGroup>
									<FormGroup className='form-label-group'>
										<Input
											className='input-label'
											type='textarea'
											name='name'
											id='nameMultiDescription'
											placeholder='Description'
											onChange={e => setdesc(e?.target?.value)}
										/>
										<Label
											className={
												themeConfig.theme === 'dark'
													? 'dark-label'
													: 'light-label'
											}
											for='nameMultiDescription'
										>
											Description
										</Label>
									</FormGroup>
									<FormGroup
										className='form-label-group last-row-form'
										style={{textAlign: 'right'}}
									>
										<Button.Ripple
											outline
											color='secondary'
											type='reset'
											className='button-label'
											onClick={resetDropzone}
										>
											Reset
										</Button.Ripple>{' '}
										<Button.Ripple
											color='warning'
											type='reset'
											className='button-label'
											onClick={submitDropzone}
											disable={isDisabled ? 'true' : 'false'}
										>
											Add
										</Button.Ripple>
									</FormGroup>
								</Col>
								<Col md='6' sm='12'>
									<ProgrammaticallyDropzone
										setfilesOndrop={setfilesOndrop}
										resetDropzone={reset}
									/>
								</Col>
							</Row>

							<Row>
								<Col sm='12'>
									<Card>
										<CardTitle>Download Documents</CardTitle>
										<CardBody>
											<div className='vx-collapse'>
												{documentList.map(collapseItem => {
													return (
														<CardHeader key={collapseItem.id}>
															<Col>{collapseItem?.alias}</Col>
															<Col>{collapseItem?.filename}</Col>
															<Col>
																{collapseItem?.createdAt?.split('T')?.[0]}
															</Col>
															<Col>{collapseItem?.type}</Col>

															<CardTitle>
																<a
																	href={collapseItem.attachment}
																	download={collapseItem?.filename}
																	tabIndex='_balnk'
																>
																	<Download
																		size={15}
																		className='collapse-icon'
																	/>
																</a>
															</CardTitle>
														</CardHeader>
													)
												})}
											</div>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</React.Fragment>
	)
}
export default DocumentVault
