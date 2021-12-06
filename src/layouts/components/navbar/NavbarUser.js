import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'
import {connect} from 'react-redux'
import themeConfig from 'configs/themeConfig'
import {setSection} from 'redux/actions/auth/loginActions'
import {changeLanguage} from 'redux/actions/customizer'
import {IntlContext} from 'utility/context/Internationalization'
import Ripples from 'react-ripples'
import {
	UncontrolledDropdown,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Button,
	Modal,
	ModalHeader,
	ModalBody
} from 'reactstrap'
import {
	Settings,
	Download,
	User,
	ArrowUpCircle,
	Mail,
	Bell,
	Power,
	Sun,
	Moon
} from 'react-feather'
import './badge.scss'
import Select from 'react-select'

const languages = [
	{
		value: 'عرب',
		label: 'Arabi',
		flag: 'sa',
		switch: 'sa'
	},
	{
		value: '中国人',
		label: 'Chinese',
		flag: 'ch',
		switch: 'ch'
	},
	{
		value: 'English',
		label: 'English',
		flag: 'us',
		switch: 'us'
	},
	{
		value: 'français',
		label: 'French',
		flag: 'fr',
		switch: 'fr'
	},
	{
		value: 'Deutsche',
		label: 'German',
		flag: 'de',
		switch: 'de'
	},
	{
		value: 'हिंदी',
		label: 'Hindi',
		flag: 'in',
		switch: 'in'
	},
	{
		value: 'русский',
		label: 'Russian',
		flag: 'rs',
		switch: 'rs'
	},
	{
		value: 'испанский',
		label: 'Spanish',
		flag: 'es',
		switch: 'es'
	},
	{
		value: 'اردو',
		label: 'Urdu',
		flag: 'pk',
		switch: 'ur'
	}
]

const customOptions = ({value, flag}) => {
	return (
		<div className='d-flex'>
			<ReactCountryFlag className='country-flag' countryCode={flag} svg />
			<div
				style={{
					marginLeft: '20px',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					fontSize: '1.2rem'
				}}
			>
				{value}
			</div>
		</div>
	)
}

const colortext = themeConfig.theme === 'dark' ? '#ebeefd' : '#757488'
const UserDropdown = props => {
	return (
		<DropdownMenu right>
			<DropdownItem onClick={e => props.editMyProfile('profile')}>
				<User size={14} className='mr-50' />
				<span className='align-middle'>Edit Profile</span>
			</DropdownItem>
			<DropdownItem onClick={e => props.editMyProfile('Upgrade')}>
				<ArrowUpCircle size={14} className='mr-50' />
				<span className='align-middle'>Subscription</span>
			</DropdownItem>
			<DropdownItem onClick={e => props.editMyProfile('feed')}>
				<Mail size={14} className='mr-50' />
				<span className='align-middle'>Contact Us</span>
			</DropdownItem>
			<DropdownItem onClick={e => props.editMyProfile('notify')}>
				<Bell size={14} className='mr-50' />
				<span className='align-middle'>Notifications</span>
			</DropdownItem>

			<DropdownItem divider />
			<DropdownItem
				href='#'
				onClick={e => {
					e.preventDefault()
					localStorage.removeItem('logInUserData')
					props.logout()
				}}
			>
				<div
					onClick={() => {
						props.logout()
					}}
				>
					<Power size={14} className='mr-50' />
					<span className='align-middle'>Log Out</span>
				</div>
			</DropdownItem>
		</DropdownMenu>
	)
}
const user1 = localStorage.getItem('logInUserData')
const NavbarUser = props => {
	const [themeCheck, setthemeCheck] = useState(
		localStorage.getItem('theme') === 'light' ? false : true
	)
	const [down, setdown] = useState(false)
	// const [notificationCount, setnotificationCount] = useState(
	//   localStorage.getItem('notList')
	//     ? JSON.parse(localStorage.getItem('notList')).length
	//     : 0
	// )
	const [notList, setnotList] = useState(
		localStorage.getItem('notList')
			? JSON.parse(localStorage.getItem('notList'))
			: []
	)
	const [langDropdown, setlangDropdown] = useState(false)
	const [gear, setgear] = useState(false)
	const history = useHistory()
	const handleDownload = e => {
		e.preventDefault()
		setdown(!down)
	}
	const updatetheme = () => {
		if (themeCheck) {
			localStorage.setItem('theme', 'light')
		} else {
			localStorage.setItem('theme', 'dark')
		}
		setthemeCheck(!themeCheck)
		window.location.reload()
	}
	const setnot = event => {
		notList.push(event.detail.data)
		localStorage.setItem('notList', JSON.stringify(notList))
		setnotList(notList)
		// setnotificationCount(notList.length)
	}
	window.addEventListener('newnot', setnot)

	const editprofile = value => {
		const url = `/user/${value}`
		history.push(url)
	}

	const logout2 = () => {
		localStorage.setItem('theme', 'light')
		window.location.reload()
	}
	useEffect(() => {
		down ? props.setSection('download') : props.setSection('undownload')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [down])

	const handleLangDropdown = () => setlangDropdown(!langDropdown)
	const handleGear = () => setgear(!gear)
	const DropdownLang = () => {
		return (
			<Modal
				isOpen={langDropdown}
				toggle={handleLangDropdown}
				className='modal-dialog-centered'
				backdrop={true}
			>
				<ModalHeader toggle={handleLangDropdown}>Select Language</ModalHeader>
				<IntlContext.Consumer>
					{context => {
						return (
							<ModalBody style={{minHeight: '380px'}}>
								<Select
									options={languages}
									menuIsOpen
									className='select-dropdown'
									placeholder='Find Language . . .'
									styles={{
										menu: () => ({
											boxShadow: 'none',
											marginTop: '1rem'
										})
									}}
									formatOptionLabel={customOptions}
									onChange={e => {
										context.switchLanguage(e.switch)
										props.changeLanguage(e.label)
									}}
								></Select>
							</ModalBody>
						)
					}}
				</IntlContext.Consumer>
			</Modal>
		)
	}
	return (
		<div className='d-flex'>
			{window.screen.width > 500 && <DropdownLang />}

			{window.screen.width > 500 && (
				<div
					className={'navbar-brand'}
					data-badge=''
					style={{
						cursor: 'pointer'
					}}
				>
					<Dropdown isOpen={gear} toggle={handleGear} data-tour='gear'>
						<DropdownToggle tag='div'>
							<Settings size='25' color={colortext} style={{margin: '0px'}} />
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem tag='a' color='warning' onClick={handleDownload}>
								{' '}
								<span className='ml-1'>Download</span> <Download size='15' />
							</DropdownItem>
							<DropdownItem tag='a'>
								<div
									onClick={() => {
										updatetheme()
									}}
									style={{
										cursor: 'pointer'
									}}
								>
									{themeCheck ? (
										<div>
											<span className='ml-1'>Light Theme</span>
											<Sun size={15} fill='true' stroke='#c2c8dc' />
										</div>
									) : (
										<div style={{color: '#68696d'}}>
											<span className='ml-1'>Dark Theme</span>
											<Moon fill='true' size={15} />
										</div>
									)}
								</div>
							</DropdownItem>
							<DropdownItem tag='a' onClick={handleLangDropdown}>
								<div style={{color: {colortext}}}>
									<span className='ml-1'>Select Language</span>
								</div>
							</DropdownItem>
							<DropdownItem tag='a'>
								<div style={{color: {colortext}}}>
									<span className='ml-1'>Contact Us</span>
								</div>
							</DropdownItem>{' '}
							<DropdownItem>
								<div style={{color: {colortext}}}>
									<a href='/#/#/privacy' className='ml-1'>
										Privacy Policy
									</a>
								</div>
							</DropdownItem>{' '}
							<DropdownItem>
								<div style={{color: {colortext}}}>
									<a href='/#/#/terms_conditions' className='ml-1'>
										Terms & Conditions
									</a>
								</div>
							</DropdownItem>
							<DropdownItem tag='div'></DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			)}
			{!user1 ? (
				window.screen.width <= 500 ? (
					<div className='button__div'>
						<Ripples color='var(--warning)' className='different-ripple'>
							<Button
								className='button-label register-button'
								onClick={() => {
									props.toggleLoginModal('SignUp')
								}}
							>
								SignUp
							</Button>
						</Ripples>
						<Ripples color='var(--warning)' className='different-ripple'>
							<Button
								className='button-label login-button'
								onClick={() => {
									props.toggleLoginModal('SignIn')
								}}
							>
								SignIn
							</Button>
						</Ripples>
					</div>
				) : (
					<>
						<Button
							className='button-label register-button'
							onClick={() => {
								props.toggleLoginModal('SignUp')
							}}
						>
							SignUp
						</Button>
						<Button
							color='warning'
							className='button-label login-button'
							onClick={() => {
								props.toggleLoginModal('SignIn')
							}}
							style={{
								color: {colortext}
							}}
						>
							SignIn
						</Button>
					</>
				)
			) : (
				window.screen.width > 500 && (
					<UncontrolledDropdown className='dropdown-user nav-item'>
						<DropdownToggle
							tag='div'
							className='dropdown-user-link d-flex justify mt-1'
						>
							<div className=''>
								<span
									className='user-name text-bold-600'
									style={{fontSize: '1.14rem', marginRight: '.5rem'}}
								>
									{props.userName}
								</span>
							</div>
							<span data-tour='user'>
								<img
									src={props.userImg}
									className='round'
									height='28'
									width='28'
									alt='avatar'
								/>
							</span>
						</DropdownToggle>
						<UserDropdown
							{...props}
							editMyProfile={editprofile}
							themeCheck={themeCheck}
							updateTheme={updatetheme}
							logout={logout2}
						/>
					</UncontrolledDropdown>
				)
			)}
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		changeLanguage: state => dispatch(changeLanguage(state)),
		setSection: state => dispatch(setSection(state))
	}
}
export default connect(null, mapDispatchToProps)(NavbarUser)
