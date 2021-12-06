/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import Sidebar from './components/menu/vertical-menu/Sidebar'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from 'utility/MyNav'

import {connect} from 'react-redux'
import {collapseSidebar} from '../redux/actions/customizer/index'

const VerticalLayout = props => {
	const user1 = JSON.parse(localStorage.getItem('logInUserData'))

	const [width, setwidth] = useState(window.innerWidth)
	const [sidebarState, setsidebarState] = useState(true)
	const [collapsedContent, setcollapsedContent] = useState(true)
	const [sidebarHidden, setsidebarHidden] = useState(user1 ? false : true)
	const [currentLang, setcurrentLang] = useState('en')
	const [appOverlay, setappOverlay] = useState(false)
	let collapsedPaths = []
	let mounted = false
	const updateWidth = () => {
		if (mounted) {
			setwidth(window.innerWidth)
		}
	}

	useEffect(() => {
		mounted = true
		const {
			location: {pathname},
			app: {
				customizer: {theme, direction}
			}
		} = props

		if (mounted) {
			if (window !== 'undefined') {
				window.addEventListener('resize', updateWidth, false)
			}
			if (collapsedPaths.includes(pathname)) {
				props.collapseSidebar(true)
			}

			const layout = theme
			const dir = direction
			if (dir === 'rtl')
				document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
			else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
			layout === 'dark' && document.body.classList.add('dark-layout')
			layout === 'semi-dark' && document.body.classList.add('semi-dark-layout')
		}
		return () => {
			mounted = false
		}
	}, [])

	useEffect(() => {
		const {
			app: {
				customizer: {theme}
			}
		} = props

		const layout = theme
		if (mounted) {
			if (layout === 'dark') {
				document.body.classList.remove('semi-dark-layout')
				document.body.classList.add('dark-layout')
			}
			if (layout === 'semi-dark') {
				document.body.classList.remove('dark-layout')
				document.body.classList.add('semi-dark-layout')
			}
			if (layout !== 'dark' && layout !== 'semi-dark') {
				document.body.classList.remove('dark-layout', 'semi-dark-layout')
			}
		}
	}, [props])

	const toggleSidebarMenu = val => {
		setsidebarState(!sidebarState)
		setcollapsedContent(!collapsedContent)
	}

	const sidebarMenuHover = val => {
		setsidebarState(val)
	}
	const handleCollapsedMenuPaths = item => {
		if (!collapsedPaths.includes(item)) {
			collapsedPaths.push(item)
			collapsedPaths = [...collapsedPaths]
		}
	}
	const handleSidebarVisibility = () => {
		if (window !== undefined) {
			window.addEventListener('resize', () => {
				if (sidebarHidden) {
					setsidebarHidden(!sidebarHidden)
				}
			})
		}
		setsidebarHidden(!sidebarHidden)
	}

	const handleCurrentLanguage = lang => {
		setcurrentLang(lang)
	}

	const handleAppOverlay = value => {
		if (value.length > 0) {
			setappOverlay(true)
		} else if (value.length < 0 || value === '') {
			setappOverlay(false)
		}
	}

	const handleAppOverlayClick = () => {
		setappOverlay(false)
	}

	const url = window.location.href.split('/#/#')[1]
	const appProps = props.app.customizer
	const menuThemeArr = [
		'primary',
		'success',
		'danger',
		'info',
		'warning',
		'dark'
	]
	const sidebarProps = {
		toggleSidebarMenu: props.collapseSidebar,
		toggle: toggleSidebarMenu,
		sidebarState: sidebarState,
		sidebarHover: sidebarMenuHover,
		sidebarVisibility: handleSidebarVisibility,
		visibilityState: sidebarHidden,
		activePath: props.match.path,
		collapsedMenuPaths: handleCollapsedMenuPaths,
		currentLang: currentLang,
		activeTheme: appProps.menuTheme,
		collapsed: collapsedContent,
		permission: props.permission,
		deviceWidth: width
	}
	const navbarProps = {
		toggleSidebarMenu: toggleSidebarMenu,
		sidebarState: sidebarState,
		sidebarVisibility: handleSidebarVisibility,
		currentLang: currentLang,
		changeCurrentLang: handleCurrentLanguage,
		handleAppOverlay: handleAppOverlay,
		appOverlayState: appOverlay,
		navbarColor: appProps.navbarColor,
		navbarType: appProps.navbarType
	}

	const footerProps = {
		footerType: appProps.footerType,
		hideScrollToTop: appProps.hideScrollToTop
	}

	return (
		<>
			{window.screen.width <= 500 && (
				<MyNav
					toggle={handleSidebarVisibility}
					currentLanguage={handleCurrentLanguage}
				/>
			)}
			<div
				className={classnames(
					`wrapper vertical-layout theme-${appProps.menuTheme}`,
					{
						'menu-collapsed': collapsedContent === true && width >= 1200,
						'fixed-footer': appProps.footerType === 'sticky',
						'navbar-static': appProps.navbarType === 'static',
						'navbar-sticky': appProps.navbarType === 'sticky',
						'navbar-floating': appProps.navbarType === 'floating',
						'navbar-hidden': appProps.navbarType === 'hidden',
						'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
					}
				)}
			>
				<Sidebar {...sidebarProps} />
				<div
					className={classnames(user1 ? 'app-content content' : 'margining', {
						'show-overlay': appOverlay === true
					})}
					onClick={handleAppOverlayClick}
				>
					<Navbar {...navbarProps} collapsedContent={collapsedContent} />
					<div
						className='content-wrapper'
						style={{
							padding:
								window.innerWidth > 500
									? '0px 2.2rem'
									: window.innerWidth <= 500 && url !== '/dashboard'
									? '1rem 1rem 5rem'
									: '0px'
						}}
					>
						{props.children}
					</div>
				</div>

				<Footer {...footerProps} />

				<div className='sidenav-overlay' onClick={handleSidebarVisibility} />
			</div>
		</>
	)
}
const mapStateToProps = state => {
	return {
		app: state.customizer
	}
}
export default connect(mapStateToProps, {
	collapseSidebar
})(VerticalLayout)
