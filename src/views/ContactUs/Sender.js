/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {Row, Col, Card, CardHeader, CardTitle, CardBody} from 'reactstrap'

import Ccube from 'utility/Ccube'
import MsgHistory from './MessageHistory'
import {ToastContainer} from 'react-toastify'
import {connect} from 'react-redux'
import Select from 'react-select'
import VideoRecorder from 'react-video-recorder'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import classnames from 'classnames'
import {
	scheduleNewMessage,
	getScheduledMessages,
	editMessage
} from 'redux/actions/sender/index'
import {getData, addData} from 'redux/actions/data-list/'
import {Input, Button, FormGroup, Label, Spinner} from 'reactstrap'
import 'assets/scss/pages/data-list.scss'
import 'assets/scss/components/app-loader.scss'
import {toast} from 'react-toastify'
import Sidebar from '../Nominee/NomineeSidebar'

import themeConfig from 'configs/themeConfig'
const colourOptions1 = [
	{
		value: 'Attachment',
		label: 'Attachment',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Text',
		label: 'Text',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Voice',
		label: 'Voice',
		color: '#0052CC',
		isFixed: true
	},
	{
		value: 'Video',
		label: 'Video',
		color: '#0052CC',
		isFixed: true
	}
]
const currdt = new Date()
currdt.setHours(currdt.getHours() + 1)
const ContactUs = props => {
	const selectNomineeRef = React.createRef()
	const selecttype = React.createRef()
	const [date, setdate] = useState(currdt.toISOString().substr(0, 10))
	const [time, settime] = useState(currdt.toTimeString().split(' ')[0])
	const [desc, setdesc] = useState('')
	const [type, settype] = useState('')
	const [edititem, setedititem] = useState(false)
	const [edititemId, setedititemId] = useState(null)
	const [file, setfile] = useState('')
	const [sidebar, setsidebar] = useState(false)
	const [title, settitle] = useState('')
	const [addNew, setaddNew] = useState(false)
	const [currentData, setcurrentData] = useState(null)
	const [isLoading, setisLoading] = useState(false)
	const [nominees, setnominees] = useState([])
	const [audioDetails, setaudioDetails] = useState({
		url: null,
		blob: null,
		chunks: null,
		duration: {
			h: 0,
			m: 0,
			s: 0
		}
	})
	const [nomineeOption, setnomineeOption] = useState([
		{
			value: 'Add Nominee',
			label: 'Add Nominee',
			color: '#00B8D9',
			isFixed: false
		}
	])

	useEffect(() => {
		props.getScheduledMessages()
		!props.listLoading && props.getData()
	}, [])
	const handleSidebar = (boolean, addNewTemp = false) => {
		setsidebar(boolean)
		if (addNewTemp) {
			setcurrentData(null)
			setaddNew(true)
		}
	}
	useEffect(() => {
		if (props.dataList.data.length) {
			const nomineeOptionTemp = nomineeOption
			props.dataList.data.forEach(e => {
				const temp = {
					value: e._id,
					label: `${e.name} - ${e.relation}`,
					color: '#00B8D9',
					isFixed: false
				}
				nomineeOptionTemp.push(temp)
			})
			setnomineeOption(nomineeOptionTemp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.dataList.data])
	const handleAudioStop = data => {
		setaudioDetails(data)
	}
	const handleAudioUpload = fileTemp => {
		console.log(fileTemp)
	}

	const handleRest = () => {
		const reset = {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: 0,
				m: 0,
				s: 0
			}
		}
		setaudioDetails(reset)
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
	const changeNominee = event => {
		const nomineesTemp = []
		event?.length &&
			event.forEach(e => {
				e.value === 'Add Nominee'
					? setsidebar(true)
					: nomineesTemp.push({id: e.value, name: e.label})
			})
		setnominees(nomineesTemp)
	}

	const editItem = item => {
		const {date, desc, nominees, time, title, type, _id} = item
		setedititem(true)
		setedititemId(_id)
		setdate(date.split('T')[0])
		setdesc(desc)
		setnominees(nominees)
		settime(time)
		settitle(title)
		settype(type)
	}
	return (
		<div
			className={`data-list ${props.thumbView ? 'thumb-view' : 'list-view'}`}
		>
			<Sidebar
				show={sidebar}
				data={currentData}
				updateData={props.addData}
				addData={addData}
				isLoading={isLoading}
				handleSidebar={handleSidebar}
				thumbView={props.thumbView}
				getData={props.getData}
				dataParams={props.parsedFilter}
				addNew={addNew}
			/>
			<div
				className={classnames('data-list-overlay', {
					show: sidebar
				})}
				onClick={() => handleSidebar(false, true)}
			/>
			<h2 className='warning spacing nodisplay'>Sender</h2>
			<Card>
				<CardHeader>
					<CardTitle>Schedule a Message</CardTitle>
				</CardHeader>
				<CardBody>
					<Row>
						<Col lg='8' md='6' sm='12'>
							<Row className='match-height'>
								<Col md='12'>
									<Row>
										<Col sm=''>
											<FormGroup className='form-label-group'>
												<Select
													className='React'
													classNamePrefix='select'
													name='color'
													options={colourOptions1}
													ref={selecttype}
													isClearable={true}
													isDisabled={edititem}
													placeholder={
														edititem ? type : 'Select Message Type...'
													}
													onChange={e => {
														const val = e ? e.value : ''
														settype(val)
													}}
												/>
											</FormGroup>
										</Col>
										<Col sm=''>
											<FormGroup className='form-label-group'>
												<Select
													isMulti
													name='nominee'
													options={nomineeOption}
													value={nominees.map(n => {
														return {value: n.id, label: n.name}
													})}
													ref={selectNomineeRef}
													className='React'
													classNamePrefix='select'
													placeholder='Select Nominee'
													id='nominee'
													onChange={changeNominee}
													//onChange={(e) => {{
													//   setnominee(e ? e.value : undefined)
													// }
												/>
												<Label>Select Nominee</Label>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormGroup className='form-label-group'>
												<Input
													type='text'
													id='title'
													className='input-label'
													placeholder='Title'
													value={title}
													onChange={e => {
														settitle(e.target.value)
													}}
												/>
												<Label
													for='title'
													className={
														themeConfig.theme === 'dark'
															? 'dark-label'
															: 'light-label'
													}
												>
													Title
												</Label>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col className='d-flex '>
											<FormGroup
												className='form-label-group'
												style={{width: '50%'}}
											>
												<Input
													type='date'
													className='input-label'
													name='date'
													id='exampleDate'
													placeholder='Enter Date'
													maxLength={10}
													onChange={e => setdate(e.target.value)}
													value={date}
												/>
												<Label
													for='exampleDate'
													className={
														themeConfig.theme === 'dark'
															? 'dark-label'
															: 'light-label'
													}
												>
													Date *
												</Label>
											</FormGroup>
											<FormGroup
												className='form-label-group'
												style={{width: '49%', marginLeft: '1%'}}
											>
												<Input
													type='time'
													className='input-label'
													name='time'
													id='exampleTime'
													placeholder='Time'
													onChange={e => settime(e.target.value)}
													value={time}
												/>
												<Label
													for='exampleTime'
													className={
														themeConfig.theme === 'dark'
															? 'dark-label'
															: 'light-label'
													}
												>
													Time *
												</Label>
											</FormGroup>
										</Col>
									</Row>
									{type === 'Attachment' && (
										<FormGroup className='form-label-group'>
											<Input
												type='file'
												name='file'
												id='exampleFile'
												className='input-label form-control'
												placeholder='File'
												onChange={e => setfile(e.target.value)}
												value={file}
											/>
											<Label
												for='exampleFile'
												className={
													themeConfig.theme === 'dark'
														? 'dark-label'
														: 'light-label'
												}
											>
												File *
											</Label>
										</FormGroup>
									)}
									{type === 'Video' && (
										<div className='video-recorder'>
											<VideoRecorder
												onRecordingComplete={videoBlob => {
													console.log('videoBlob', videoBlob)
												}}
											/>
										</div>
									)}
									{type === 'Voice' && (
										<div className='voice-recorder'>
											<Recorder
												record={true}
												title={'New recording'}
												audioURL={audioDetails.url}
												showUIAudio
												handleAudioStop={data => handleAudioStop(data)}
												handleAudioUpload={data => handleAudioUpload(data)}
												handleReset={() => handleRest()}
											/>
										</div>
									)}
									<FormGroup className='form-label-group'>
										<Input
											type='textarea'
											placeholder='Description'
											className='input-label'
											rows='5'
											id='description'
											value={desc}
											onChange={e => {
												setdesc(e.target.value)
											}}
										/>
										<Label
											for='description'
											className={
												themeConfig.theme === 'dark'
													? 'dark-label'
													: 'light-label'
											}
										>
											Description
										</Label>
									</FormGroup>
									<div
										className='d-flex justify-content-end'
										style={{textAlign: 'right'}}
									>
										<Button.Ripple
											outline
											className='button-label'
											color='secondary'
											onClick={() => {
												settitle('')
												setedititem(false)
												settype('')
												setdesc('')
												setdate('')
												settime('')
												setnominees([])
											}}
										>
											{edititem ? 'Cancel' : 'Reset'}
										</Button.Ripple>
										<Button.Ripple
											className='button-label'
											color='warning'
											onClick={() => {
												edititem
													? props.editMessage({
															_id: edititemId,
															desc,
															type,
															title,
															date,
															time,
															nominees
													  })
													: props.scheduleNewMessage({
															desc,
															type,
															title,
															date,
															time,
															nominees
													  })

												settitle('')
												settype('')
												setdesc('')
												setdate('')
												settime('')
											}}
											disabled={
												!desc.trim().length ||
												!type.trim().length ||
												!title.trim().length ||
												!date.trim().length ||
												!time.trim().length ||
												!nominees.length
											}
										>
											{edititem ? 'Update' : 'Add'}
										</Button.Ripple>
									</div>
								</Col>
							</Row>
							<Row>
								<ToastContainer />
								<Col>
									{props.loadingmsg && props.messages === null ? (
										<Spinner color='warning' size='lg' />
									) : (
										<MsgHistory
											heading={'Messages History'}
											collapseItems={props?.messages}
											colorOption={props?.messages?.colorOption}
											editItem={editItem}
										/>
									)}
								</Col>
							</Row>
						</Col>
						<Ccube />
					</Row>
				</CardBody>
			</Card>
		</div>
	)
}

const mapStateToProps = state => {
	const {dataList, sender} = state
	const messages = sender?.getmesssages?.length
		? sender.getmesssages.reverse()
		: []
	return {
		dataList: dataList,
		listLoading: dataList.totalRecordsLoading,
		messages: messages,
		loadingmsg: sender.loadingmsg
	}
}
export default connect(mapStateToProps, {
	scheduleNewMessage,
	getData,
	editMessage,
	addData,
	getScheduledMessages
})(ContactUs)
