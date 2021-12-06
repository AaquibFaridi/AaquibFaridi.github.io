/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import {ContextLayout} from 'utility/context/Layout'
import {connect} from 'react-redux'
import SidebarHeader from './SidebarHeader'
import Hammer from 'react-hammerjs'
import SideMenuContent from './sidemenu/SideMenuContent'
import PerfectScrollbar from 'react-perfect-scrollbar'
const user1 = JSON.parse(localStorage.getItem('logInUserData'))

const Sidebar = props => {
	const [width, setwidth] = useState(window.innerWidth)
	const [activeIndex, setactiveIndex] = useState(null)
	const [hoveredMenuItem, sethoveredMenuItem] = useState(null)
	const [activeItem, setactiveItem] = useState(props.activePath)
	const [menuShadow, setmenuShadow] = useState(false)
	const [ScrollbarTag, setScrollbarTag] = useState(true)

	let mounted = false

	useEffect(() => {
		mounted = true
		if (props.activePath !== activeItem) {
			setactiveItem(props.activePath)
		}
		if (mounted) {
			if (window !== 'undefined') {
				window.addEventListener('resize', updateWidth, false)
			}
			checkDevice()
		}
		return () => {
			mounted = false
		}
	}, [])

	const updateWidth = () => {
		if (mounted) {
			setwidth(window.innerWidth)
			checkDevice()
		}
	}

	const checkDevice = () => {
		var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
		var mq = function (query) {
			return window.matchMedia(query).matches
		}
		setScrollbarTag('ontouchstart' in window || window.DocumentTouch)
		var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
		return mq(query)
	}

	const changeActiveIndex = id => {
		if (id !== activeIndex) {
			setactiveIndex(id)
		} else {
			setactiveIndex(null)
		}
	}

	const handleSidebarMouseEnter = id => {
		if (id !== hoveredMenuItem) {
			sethoveredMenuItem(id)
		} else {
			sethoveredMenuItem(null)
		}
	}

	const handleActiveItem = url => {
		setactiveItem(url)
	}

	let {
		visibilityState,
		toggleSidebarMenu,
		sidebarHover,
		toggle,
		color,
		sidebarVisibility,
		activeTheme,
		collapsed,
		activePath,
		sidebarState,
		currentLang,
		permission,
		currentUser,
		collapsedMenuPaths
	} = props

	let scrollShadow = (container, dir) => {
		if (container && dir === 'up' && container.scrollTop >= 100) {
			setmenuShadow(true)
		} else if (container && dir === 'down' && container.scrollTop < 100) {
			setmenuShadow(false)
		} else {
			return
		}
	}
	const size = window.screen.width > 500 ? true : false
	return (
		<ContextLayout.Consumer>
			{context => {
				let dir = context.state.direction
				return user1 ? (
					<React.Fragment>
						<Hammer
							onSwipe={e => {
								sidebarVisibility()
							}}
							direction={dir === 'rtl' ? 'DIRECTION_LEFT' : 'DIRECTION_RIGHT'}
						>
							<div className='menu-swipe-area d-xl-none d-block'></div>
						</Hammer>

						<div
							className={classnames(
								`main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`,
								{
									'collapsed': sidebarState === true,
									'hide-sidebar':
										width <= 500
											? visibilityState === false
											: width > 500 && width <= 1200
											? visibilityState === false
											: visibilityState === true
								}
							)}
							onMouseEnter={() => sidebarHover(false)}
							onMouseLeave={() => sidebarHover(true)}
						>
							{size && (
								<SidebarHeader
									toggleSidebarMenu={toggleSidebarMenu}
									toggle={toggle}
									sidebarBgColor={color}
									sidebarVisibility={sidebarVisibility}
									activeTheme={activeTheme}
									collapsed={collapsed}
									menuShadow={menuShadow}
									activePath={activePath}
									sidebarState={sidebarState}
								/>
							)}
							{ScrollbarTag ? (
								<div
									className={classnames('main-menu-content', {
										'overflow-hidden': false,
										'overflow-scroll': true
									})}
								>
									<Hammer
										onSwipe={() => {
											sidebarVisibility()
										}}
										direction={
											dir === 'rtl' ? 'DIRECTION_RIGHT' : 'DIRECTION_LEFT'
										}
									>
										<ul className='navigation navigation-main'>
											<SideMenuContent
												setActiveIndex={changeActiveIndex}
												activeIndex={activeIndex}
												hoverIndex={hoveredMenuItem}
												handleSidebarMouseEnter={handleSidebarMouseEnter}
												activeItemState={activeItem}
												handleActiveItem={handleActiveItem}
												activePath={activePath}
												lang={currentLang}
												permission={permission}
												currentUser={currentUser}
												collapsedMenuPaths={collapsedMenuPaths}
												toggleMenu={sidebarVisibility}
												deviceWidth={props.deviceWidth}
											/>
										</ul>
									</Hammer>
								</div>
							) : (
								<PerfectScrollbar
									className={classnames('main-menu-content', {
										'overflow-hidden': true,
										'overflow-scroll': false
									})}
									{...{
										options: {wheelPropagation: false},
										onScrollDown: container => scrollShadow(container, 'down'),
										onScrollUp: container => scrollShadow(container, 'up'),
										onYReachStart: () =>
											menuShadow === true && setmenuShadow(false)
									}}
								>
									<Hammer
										onSwipe={() => {
											sidebarVisibility()
										}}
										direction={
											dir === 'rtl' ? 'DIRECTION_RIGHT' : 'DIRECTION_LEFT'
										}
									>
										<ul className='navigation navigation-main'>
											<SideMenuContent
												setActiveIndex={changeActiveIndex}
												activeIndex={activeIndex}
												hoverIndex={hoveredMenuItem}
												handleSidebarMouseEnter={handleSidebarMouseEnter}
												activeItemState={activeItem}
												handleActiveItem={handleActiveItem}
												activePath={activePath}
												lang={currentLang}
												permission={permission}
												currentUser={currentUser}
												collapsedMenuPaths={collapsedMenuPaths}
												toggleMenu={sidebarVisibility}
												deviceWidth={props.deviceWidth}
											/>
										</ul>
									</Hammer>
								</PerfectScrollbar>
							)}
							<div className='copyright-div'>
								<a href='/#/#/license' className='copyright'>
									©
								</a>
								{(!sidebarState || !collapsed) && (
									<a href='/#/#/license' className='copyright-text'>
										{new Date().getFullYear()}, Last Arzi
									</a>
								)}
							</div>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment></React.Fragment>
				)
			}}
		</ContextLayout.Consumer>
	)
}

const mapStateToProps = state => {
	return {
		currentUser: state.auth.login.userRole
	}
}

export default connect(mapStateToProps)(Sidebar)
