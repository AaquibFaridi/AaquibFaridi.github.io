/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {Navbar} from 'reactstrap'
import {connect, useDispatch} from 'react-redux'
import classnames from 'classnames'
import {NavLink, useHistory} from 'react-router-dom'
import NavbarUser from './NavbarUser'
import avatar1 from 'assets/img/avatar/female.png'
import avatar2 from 'assets/img/avatar/male.png'
import themeConfig from 'configs/themeConfig'
import {useLocation} from 'react-router-dom'
import Logo from 'assets/img/logo/favrm.png'
import './loginModalDiv.scss'
import LoginNew from 'views/Login/Login'
import ForgotPassword from 'views/Login/ForgotPassword'
import Register from 'views/Register'
import 'assets/scss/pages/authentication.scss'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
const user1 = JSON.parse(localStorage.getItem('logInUserData'))

const UserName = props => {
	const username = user1 ? (user1.name ? user1.name : user1.username) : null
	return username
}
const ThemeNavbar = props => {
	const history = useHistory()
	const dispatch = useDispatch()
	const location = useLocation()
	const [mobileTitle, setMobileTitle] = useState('Last Arzi')
	const [pwdChanged, setpwdChanged] = useState('')
	const [isLoading, setisLoading] = useState(false)
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [forgotPassword, setforgotPassword] = useState(false)
	const [isSignInSelected, setIsSignInSelected] = useState(true)
	const [loggedIn, setloggedIn] = useState(false)
	const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark']
	const navbarTypes = ['floating', 'static', 'sticky', 'hidden']
	const toggleLoginModal = data => {
		setShowLoginModal(!showLoginModal)
		setforgotPassword(false)
		dispatch({type: 'RESET_RECOVERY_ID'})
		dispatch({type: 'RESET_OTP'})
		data === 'SignIn' ? setIsSignInSelected(true) : setIsSignInSelected(false)
	}
	useEffect(() => {
		if (loggedIn) {
			toggleLoginModal()
			history.push('/dashboard')
			window.location.reload()
		}
	}, [loggedIn])
	useEffect(() => {
		props.pwdChanged && setpwdChanged(props.pwdChanged)
	}, [props.pwdChanged])

	useEffect(() => {
		if (location?.pathname) {
			const path = location?.pathname
			switch (path) {
				case '/diary':
					setMobileTitle('Secret Diary')
					break
				case '/spends':
					setMobileTitle('Daily Spends')
					break
				case '/vault/password':
					setMobileTitle('Vault')
					break
				case '/portfolio':
					setMobileTitle('Portfolio')
					break
				case '/assets/add':
					setMobileTitle('Assets')
					break
				case '/liability/add':
					setMobileTitle('Liabilities')
					break
				case '/nominee/list':
					setMobileTitle('Nominees')
					break
				case '/vault/document':
					setMobileTitle('Documents')
					break
				case '/contactUs':
					setMobileTitle('Sender')
					break
				case '/home/session':
					toggleLoginModal('SignIn')
					break
				default:
					setMobileTitle('Last Arzi')
					break
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])
	// const handleFooter = () => {
	//   'RESET_OTP'
	// }
	return (
		<React.Fragment>
			<div className='content-overlay' />
			<div className='' />
			<Navbar
				style={{
					background:
						themeConfig.theme === 'dark' ? '#21212a' : 'rgba(255,255,255)'
				}}
				className={classnames(
					`${
						props.collapsedContent ? (user1 ? 'full-width' : '') : 'fixed-width'
					} header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow`,
					{
						'navbar-light':
							props.navbarColor === 'default' ||
							!colorsArr.includes(props.navbarColor),
						'navbar-dark': colorsArr.includes(props.navbarColor),
						'bg-primary':
							props.navbarColor === 'primary' && props.navbarType !== 'static',
						'bg-danger':
							props.navbarColor === 'danger' && props.navbarType !== 'static',
						'bg-success':
							props.navbarColor === 'success' && props.navbarType !== 'static',
						'bg-info':
							props.navbarColor === 'info' && props.navbarType !== 'static',
						'bg-warning':
							props.navbarColor === 'warning' && props.navbarType !== 'static',
						'bg-dark':
							props.navbarColor === 'dark' && props.navbarType !== 'static',
						'd-none': props.navbarType === 'hidden' && !props.horizontal,
						'floating-nav':
							(props.navbarType === 'floating' && !props.horizontal) ||
							(!navbarTypes.includes(props.navbarType) && !props.horizontal),
						'navbar-static-top':
							props.navbarType === 'static' && !props.horizontal,
						'fixed-top': props.navbarType === 'sticky' || props.horizontal,
						'scrolling': props.horizontal && props.scrolling
					}
				)}
			>
				<div className='navbar-wrapper'>
					<div className='navbar-container content'>
						<div
							className={`"navbar-collapse d-flex  align-items-center" ${
								window.screen.width > 500 || !user1
									? 'justify-content-between'
									: 'justify-content-end mr-1'
							}`}
							cla='true'
							id='navbar-mobile'
						>
							<div className='bookmark-wrapper d-flex'>
								{props.collapsedContent && window.screen.width > 500 && (
									<NavLink to='/dashboard' className='navbar-brand d-flex'>
										{!user1 && (
											<img
												alt='logo'
												style={{marginRight: '25px'}}
												className='brand-logo'
												height='25'
												src={Logo}
											/>
										)}
										<h2
											className='brand-text mb-0'
											style={{
												fontWeight: '600',
												color:
													themeConfig.theme === 'dark'
														? '#ebeefd !important'
														: '#757488',
												paddingTop: 6
											}}
										>
											{mobileTitle}
										</h2>
									</NavLink>
								)}
								{window.screen.width <= 500 && (
									<div style={{display: 'flex'}}>
										<h3
											className='brand-text mb-0 ml-50'
											style={{
												fontWeight: '600',
												color: '#FF9F43',
												textAlign: 'center',
												paddingTop: '9px'
											}}
										>
											{mobileTitle}
										</h3>
									</div>
								)}
							</div>
							{props.horizontal ? (
								<div className='logo d-flex align-items-center'>
									<div className='brand-logo mr-50'></div>
									<h2 className='text-primary brand-text mb-0'>Last Arzi2</h2>
								</div>
							) : null}
							{/* {window.screen.width > 500 && ( */}
							<NavbarUser
								handleAppOverlay={props.handleAppOverlay}
								changeCurrentLang={props.changeCurrentLang}
								userName={<UserName {...props} />}
								userImg={
									JSON.parse(localStorage.getItem('logInUserData')) &&
									JSON.parse(localStorage.getItem('logInUserData'))
										.salutation === 'Mr'
										? avatar2
										: avatar1
								}
								loggedInWith={
									props.user !== undefined &&
									props.user.login.values !== undefined
										? props.user.login.values.loggedInWith
										: null
								}
								toggleLoginModal={toggleLoginModal}
								loggedIn={loggedIn}
								setloggedIn={setloggedIn}
								{...props}
							/>
							<Modal
								isOpen={showLoginModal}
								toggle={toggleLoginModal}
								centered={true}
							>
								<ModalHeader
									toggle={toggleLoginModal}
									tag='div'
									style={{
										color: 'var(--warning)',
										fontSize: '1.45rem',
										fontWeight: 'bold',
										letterSpacing: '1px',
										justifyContent: 'center'
									}}
								>
									{isSignInSelected
										? 'Sign In'
										: forgotPassword
										? 'Recover Password'
										: isLoading
										? 'Registering'
										: 'SignUp'}
								</ModalHeader>

								<ModalBody>
									<div className='loginModalDiv_container'>
										{forgotPassword ? (
											<>
												{pwdChanged === 'success' && (
													<div
														className='loginModalDiv_head'
														style={{paddingBottom: '10px'}}
														onClick={() => {
															setIsSignInSelected(true)
															setforgotPassword(false)
														}}
													>
														Password Changed successfully...
														<span style={{color: 'var(--warning)'}}>
															{' '}
															SignIn !!
														</span>
													</div>
												)}
												<ForgotPassword
													backtoLogin={() => {
														setforgotPassword(false)
														setIsSignInSelected(true)
														setpwdChanged('')
													}}
												/>
												{pwdChanged === 'failure' && (
													<div style={{color: 'red', textAlign: 'center'}}>
														Something went wrong!!!
													</div>
												)}
											</>
										) : isSignInSelected ? (
											<>
												<LoginNew
													loggedIn={loggedIn}
													setloggedIn={setloggedIn}
													{...props}
												/>
												<div
													className='loginModalDiv_head'
													onClick={() => {
														dispatch({type: 'RESET_OTP'})
														setforgotPassword(true)
													}}
												>
													<h5 style={{color: 'var(--warning)'}}>
														Forgot Password !!
													</h5>
												</div>
												<div
													className='loginModalDiv_head'
													onClick={() => {
														setIsSignInSelected(false)
														dispatch({type: 'RESET_OTP'})
													}}
												>
													Haven`t registered ...
													<span style={{color: 'var(--warning)'}}>
														SignUp!!
													</span>
												</div>
											</>
										) : (
											<>
												<Register
													loggedIn={loggedIn}
													setloggedIn={setloggedIn}
													isLoading={isLoading}
													setisLoading={setisLoading}
													{...props}
												/>
												<div
													className='loginModalDiv_head'
													onClick={() => setIsSignInSelected(true)}
												>
													Already registered ...
													<span style={{color: 'var(--warning)'}}>
														{' '}
														SignIn !!
													</span>
												</div>
											</>
										)}
									</div>
								</ModalBody>
							</Modal>
						</div>
					</div>
				</div>
			</Navbar>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	const {auth} = state
	const {phoneotp, user} = auth

	return {
		user,
		pwdChanged: phoneotp?.pwdChanged,
		plan: user?.login?.plan,
		why: user?.login?.why,
		feature: user?.login?.feature
	}
}

export default connect(mapStateToProps)(ThemeNavbar)
