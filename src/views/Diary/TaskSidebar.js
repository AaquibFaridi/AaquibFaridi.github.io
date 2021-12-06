import React, {useEffect, useState} from 'react'
import {
	Input,
	Button,
	FormGroup,
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle
} from 'reactstrap'
import Select from 'react-select'
import {X, Bookmark, Star, Tag, Check} from 'react-feather'
import Checkbox from 'components/@vuexy/checkbox/CheckboxesVuexy'
import PerfectScrollbar from 'react-perfect-scrollbar'
import VideoRecorder from 'react-video-recorder'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import {connect} from 'react-redux'
import {
	starTask,
	completeTask,
	importantTask,
	updateTask,
	updateLabel,
	addNewTask
} from 'redux/actions/diary/index'
const colourOptions1 = [
	{
		value: 'Attachment',
		label: 'Attachment',
		color: '#00B8D9',
		isFixed: true
	},
	{
		value: 'Scribble',
		label: 'Scribble',
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
		value: 'Video',
		label: 'Video',
		color: '#0052CC',
		isFixed: true
	},
	{
		value: 'Voice',
		label: 'Voice',
		color: '#0052CC',
		isFixed: true
	}
]
const TaskSidebar = props => {
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
	const [newTask, setnewTask] = useState({
		title: '',
		desc: '',
		tags: [],
		isCompleted: false,
		isImportant: false,
		isStarred: false
	})
	const [ptype, setptype] = useState('')
	const [taskToUpdate, settaskToUpdate] = useState(null)
	const [taskTitle, settaskTitle] = useState('')
	const [taskDesc, settaskDesc] = useState('')
	const [taskStatus, settaskStatus] = useState(false)
	const [taskStarred, settaskStarred] = useState(false)
	const [validUpDate, setvalidUpDate] = useState(false)
	const [taskImportant, settaskImportant] = useState(false)
	const selectAssetRef = React.createRef()
	useEffect(() => {
		if (props.taskToUpdate) {
			const {title, id, desc, isCompleted, isStarred, isImportant} =
				props.taskToUpdate
			settaskToUpdate(props.taskToUpdate)
			id !== null && setvalidUpDate(true)
			settaskTitle(title)
			settaskDesc(desc)
			settaskStatus(isCompleted)
			settaskStarred(isStarred)
			settaskImportant(isImportant)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.taskToUpdate])
	const handleAudioStop = data => {
		setaudioDetails(data)
	}
	const handleAudioUpload = file => {
		console.log(file)
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

	const handleNewTaskTags = tag => {
		const tagsArr = newTask.tags
		if (tagsArr.includes(tag)) {
			tagsArr.splice(tagsArr.indexOf(tag), 1)
		} else {
			tagsArr.push(tag)
		}
		setnewTask({...newTask, tags: tag})
	}
	const renderTags = taskArr => {
		return taskArr.map((tag, i) => (
			<div className='chip mb-0 mr-50' key={i}>
				<div className='chip-body'>
					<span className='chip-text'>
						<span
							className={`bullet bullet-${
								tag === 'professional'
									? 'warning'
									: tag === 'others'
									? 'success'
									: tag === 'todo'
									? 'danger'
									: 'primary'
							} bullet-xs`}
						/>
						<span className='text-capitalize ml-25'>{tag}</span>
					</span>
				</div>
			</div>
		))
	}

	return (
		<div
			className={`task-sidebar ${props.addTaskState === true ? 'show' : ''}`}
		>
			<div className='task-header'>
				<div className='d-flex justify-content-between'>
					<div className='task-type-title text-bold-600'>
						<h3 style={{color: 'var(--warning)'}}>
							{props.taskToUpdate && props.taskToUpdate.id
								? 'Update Details'
								: 'Enter Details'}
						</h3>
					</div>
					<div className='close-icon'>
						<X
							className='cursor-pointer'
							size={20}
							onClick={() => {
								props.addTask('close')
							}}
						/>
					</div>
				</div>
			</div>

			<PerfectScrollbar>
				<div className='task-body'>
					<div className='d-flex justify-content-between mb-2'>
						<div className='mark-complete'>
							{props.taskToUpdate && props.taskToUpdate.id && (
								<Checkbox
									color='primary'
									className='user-checkbox'
									icon={<Check className='vx-icon' size={15} />}
									label={'Completed'}
									checked={taskStatus}
									onChange={e => {
										props.completeTask(props.taskToUpdate)
									}}
								/>
							)}
						</div>
						<div className='task-actions'>
							<Star
								size={20}
								className={`mr-50 ${
									(props.taskToUpdate !== null && taskImportant) ||
									newTask.isImportant
										? 'text-success'
										: ''
								}`}
								onClick={() => {
									if (props.taskToUpdate !== null) {
										props.importantTask(props.taskToUpdate)
									} else {
										setnewTask({
											...newTask,
											isImportant: !newTask.isImportant
										})
									}
								}}
							/>
							<Bookmark
								size={20}
								className={`mr-50 ${
									(props.taskToUpdate !== null && taskStarred) ||
									newTask.isStarred
										? 'text-warning'
										: ''
								}`}
								onClick={() => {
									if (props.taskToUpdate !== null) {
										props.starTask(props.taskToUpdate)
									} else {
										setnewTask({
											...newTask,
											isStarred: !newTask.isStarred
										})
									}
								}}
							/>
							<UncontrolledDropdown className='d-inline-block'>
								<DropdownToggle tag='span'>
									<Tag className='mr-50' size={20} />
								</DropdownToggle>
								<DropdownMenu tag='ul' right>
									<DropdownItem tag='li'>
										<Checkbox
											color='primary'
											className='user-checkbox'
											icon={<Check className='vx-icon' size={12} />}
											label={'Personal'}
											checked={
												(props.taskToUpdate !== null &&
													props.taskToUpdate.tags.includes('personal')) ||
												newTask.tags.includes('personal')
													? true
													: false
											}
											size='sm'
											onChange={e => {
												e.stopPropagation()
												if (props.taskToUpdate !== null)
													props.updateLabel(taskToUpdate.id, 'personal')
												else handleNewTaskTags('personal')
											}}
										/>
									</DropdownItem>
									<DropdownItem tag='li'>
										<Checkbox
											color='primary'
											labelColor='#ff9f43'
											className='user-checkbox'
											icon={<Check className='vx-icon' size={12} />}
											label={'Professional'}
											checked={
												(props.taskToUpdate !== null &&
													props.taskToUpdate.tags.includes('professional')) ||
												newTask.tags.includes('professional')
													? true
													: false
											}
											size='sm'
											onClick={e => e.stopPropagation()}
											onChange={e => {
												e.stopPropagation()
												if (props.taskToUpdate !== null)
													props.updateLabel(taskToUpdate.id, 'professional')
												else handleNewTaskTags('professional')
											}}
										/>
									</DropdownItem>
									<DropdownItem tag='li'>
										<Checkbox
											color='primary'
											className='user-checkbox'
											icon={<Check className='vx-icon' size={12} />}
											label={'Others'}
											labelColor='#25af63'
											checked={
												(props.taskToUpdate !== null &&
													props.taskToUpdate.tags.includes('others')) ||
												newTask.tags.includes('others')
													? true
													: false
											}
											size='sm'
											onClick={e => e.stopPropagation()}
											onChange={e => {
												e.stopPropagation()
												if (props.taskToUpdate !== null)
													props.updateLabel(taskToUpdate.id, 'others')
												else handleNewTaskTags('others')
											}}
										/>
									</DropdownItem>
									<DropdownItem tag='li'>
										<Checkbox
											color='primary'
											className='user-checkbox'
											labelColor='#ea5455'
											icon={<Check className='vx-icon' size={12} />}
											label={'TO DO List'}
											checked={
												(props.taskToUpdate !== null &&
													props.taskToUpdate.tags.includes('todo')) ||
												newTask.tags.includes('todo')
													? true
													: false
											}
											size='sm'
											onClick={e => e.stopPropagation()}
											onChange={e => {
												e.stopPropagation()
												if (props.taskToUpdate !== null)
													props.updateLabel(taskToUpdate.id, 'todo')
												else handleNewTaskTags('todo')
											}}
										/>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</div>
					</div>

					<FormGroup className='form-label-group'>
						<Select
							className='React'
							classNamePrefix='select'
							// defaultValue={colourOptions1[0]}

							ref={selectAssetRef}
							name='color'
							options={colourOptions1}
							isClearable={true}
							placeholder='Select Message Type...'
							onChange={e => {
								setptype(e ? e.value : '')
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type='text'
							placeholder='Title'
							value={props.taskToUpdate !== null ? taskTitle : newTask.title}
							onChange={e => {
								if (props.taskToUpdate !== null) {
									settaskTitle(e.target.value)
								} else {
									setnewTask({
										...newTask,
										title: e.target.value
									})
								}
							}}
						/>
					</FormGroup>
					<FormGroup>
						{ptype === 'Video' && (
							<VideoRecorder
								onRecordingComplete={videoBlob => {
									// Do something with the video...
									console.log('videoBlob', videoBlob)
								}}
							/>
						)}
						{ptype === 'Voice' && (
							<Recorder
								record={true}
								title={'New recording'}
								audioURL={audioDetails.url}
								showUIAudio
								handleAudioStop={data => handleAudioStop(data)}
								handleAudioUpload={data => handleAudioUpload(data)}
								handleRest={() => handleRest()}
							/>
						)}
					</FormGroup>
					<FormGroup>
						<Input
							type='textarea'
							placeholder='Description'
							rows='5'
							value={props.taskToUpdate !== null ? taskDesc : newTask.desc}
							onChange={e => {
								if (props.taskToUpdate !== null) {
									settaskDesc(e.target.value)
								} else {
									setnewTask({
										...newTask,
										desc: e.target.value
									})
								}
							}}
						/>
					</FormGroup>
					<div className='chip-wrapper my-1 d-flex flex-wrap'>
						{props.taskToUpdate !== null &&
						props.taskToUpdate.tags &&
						props.taskToUpdate.tags.length > 0
							? renderTags(props.taskToUpdate.tags)
							: null}
					</div>
					<div
						className='d-flex justify-content-end'
						style={{textAlign: 'right'}}
					>
						<Button.Ripple
							outline
							className='mr-1 mb-1 button-label'
							color='secondary'
							onClick={() => {
								props.addTask('close')
								props.handleUndoChanges()
								setnewTask({
									title: '',
									desc: '',
									tags: [],
									isCompleted: false,
									isImportant: false,
									isStarred: false
								})
							}}
						>
							Cancel
						</Button.Ripple>{' '}
						<Button.Ripple
							className='mb-1 button-label'
							color='warning'
							onClick={() => {
								if (props.taskToUpdate !== null) {
									const {isCompleted, isImportant, isStarred, tags} =
										taskToUpdate
									props.updateTask(
										taskToUpdate._id,
										taskTitle,
										taskDesc,
										taskToUpdate,
										isCompleted,
										isImportant,
										isStarred,
										tags
									)
								} else {
									props.addNewTask(newTask)
								}
								props.addTask('close')
								setnewTask({
									title: '',
									desc: '',
									tags: [],
									isCompleted: false,
									isImportant: false,
									isStarred: false
								})
							}}
							disabled={
								(taskTitle.length && taskDesc) ||
								(newTask.title && newTask.desc)
									? false
									: true
							}
						>
							{validUpDate ? 'Update' : 'Add'}
						</Button.Ripple>
					</div>
				</div>
			</PerfectScrollbar>
		</div>
	)
}
const mapStateToProps = state => {
	return {
		app: state.todoApp
	}
}

export default connect(mapStateToProps, {
	completeTask,
	importantTask,
	starTask,
	updateTask,
	updateLabel,
	addNewTask
})(TaskSidebar)
