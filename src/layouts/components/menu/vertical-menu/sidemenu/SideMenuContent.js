/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import classnames from 'classnames'
import {
	Home,
	DollarSign,
	Command,
	Lock,
	Users,
	Archive,
	FileText,
	FileMinus,
	Briefcase,
	Share
} from 'react-feather'
import SideMenuGroup from './SideMenuGroup'
import {Badge} from 'reactstrap'
import {ChevronRight} from 'react-feather'
import {FormattedMessage} from 'react-intl'
import {connect} from 'react-redux'

const mobileColor = '#ff7d00'
const SideMenuContent = props => {
	const history = useHistory()

	const parentArr = []
	let collapsedPath = null
	const redirectUnauthorized = () => {
		history.push('/misc/not-authorized')
	}
	const [activeGroups, setactiveGroups] = useState([])
	const [currentActiveGroup, setcurrentActiveGroup] = useState([])
	const [tempArr, settempArr] = useState([])
	const {messages} = props
	const [navigationConfig, setnavigationConfig] = useState([])

	const handleGroupClick = (id, parent = null, type = '') => {
		let open_group = activeGroups
		let active_group = currentActiveGroup
		let temp_arr = tempArr
		if (type === 'item' && parent === null) {
			active_group = []
			temp_arr = []
		} else if (type === 'item' && parent !== null) {
			active_group = []
			if (temp_arr.includes(parent)) {
				temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length)
			} else {
				temp_arr = []
				temp_arr.push(parent)
			}
			active_group = temp_arr.slice(0)
		} else if (type === 'collapse' && parent === null) {
			temp_arr = []
			temp_arr.push(id)
		} else if (type === 'collapse' && parent !== null) {
			if (active_group.includes(parent)) {
				temp_arr = active_group.slice(0)
			}
			if (temp_arr.includes(id)) {
				temp_arr.splice(temp_arr.indexOf(id), temp_arr.length)
			} else {
				temp_arr.push(id)
			}
		} else {
			temp_arr = []
		}

		if (type === 'collapse') {
			// If open group does not include clicked group item
			if (!open_group.includes(id)) {
				// Get unmatched items that are not in the active group
				let temp = open_group.filter(function (obj) {
					return active_group.indexOf(obj) === -1
				})
				// Remove those unmatched items from open group
				if (temp.length > 0 && !open_group.includes(parent)) {
					open_group = open_group.filter(function (obj) {
						return !temp.includes(obj)
					})
				}
				if (open_group.includes(parent) && active_group.includes(parent)) {
					open_group = active_group.slice(0)
				}
				// Add group item clicked in open group
				if (!open_group.includes(id)) {
					open_group.push(id)
				}
			} else {
				// If open group includes click group item, remove it from open group
				open_group.splice(open_group.indexOf(id), 1)
			}
		}
		if (type === 'item') {
			open_group = active_group.slice(0)
		}
		setactiveGroups(open_group)
		settempArr(temp_arr)
		setcurrentActiveGroup(active_group)
	}

	const initRender = parentArr => {
		setactiveGroups(parentArr.slice(0))
		setcurrentActiveGroup(parentArr.slice(0))
	}

	useEffect(() => {
		const list = [
			{
				id: 'assets',
				title: messages?.asset ? messages?.asset : 'Assets',
				type: 'item',
				icon: (
					<DollarSign
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/assets/add'
			},
			{
				id: 'Liabilties',
				title: messages?.liability ? messages?.liability : 'Liabilties',
				type: 'item',
				icon: (
					<Command
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/liability/add'
			},
			{
				id: 'nominee',
				title: messages?.nominees ? messages?.nominees : 'Nominees',
				type: 'item',
				icon: (
					<Users
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/nominee/list'
			},
			{
				id: 'portfolio',
				title: messages?.portfolio ? messages?.portfolio : 'Portfolio',
				type: 'item',
				icon: (
					<Briefcase
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/portfolio'
			},
			{
				id: 'pwd',
				title: messages?.vault ? messages?.vault : 'Vault',
				type: 'item',
				icon: (
					<Lock
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/vault/password'
			},
			{
				id: 'vault',
				title: messages?.documents ? messages?.documents : 'Documents',
				type: 'item',
				icon: (
					<Archive
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/vault/document'
			},
			{
				id: 'diary',
				title: messages?.diary ? messages?.diary : 'Secret Diary',
				type: 'item',
				icon: (
					<FileText
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/diary'
			},
			{
				id: 'dailyspends',
				title: messages?.spends ? messages?.spends : 'Daily Spends',
				type: 'item',
				icon: (
					<FileMinus
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/spends'
			},
			{
				id: 'contact',
				title: props?.sender?.heading ? props?.sender?.heading : 'Sender',
				type: 'item',
				icon: (
					<Share
						{...(window.screen.width <= 500 && {color: mobileColor})}
						size={20}
					/>
				),
				permissions: ['admin', 'editor'],
				navLink: '/contactUs'
			}
		]
		const home = {
			id: 'home',
			title: 'Home',
			type: 'item',
			icon: (
				<Home
					{...(window.screen.width <= 500 && {color: mobileColor})}
					size={20}
				/>
			),
			permissions: ['admin', 'editor'],
			navLink: '/dashboard'
		}

		const copyright = {
			id: 'copyright',
			title: ' ',
			type: 'item',
			icon: <div className='side_menu_icon'>©</div>,
			permissions: ['admin', 'editor'],
			navLink: '/license'
		}
		window.screen.width <= 500 && list.unshift(home)
		window.screen.width <= 500 && list.push(copyright)
		setnavigationConfig(list)
		initRender(parentArr[0] ? parentArr[0] : [])
	}, [])

	useEffect(() => {
		if (props.activePath !== collapsedPath) {
			props.collapsedMenuPaths(props.activePath)
			collapsedPath = props.activePath
			initRender(parentArr[0] ? parentArr[parentArr.length - 1] : [])
		}
	}, [props.activePath])

	const url = window.location.href.split('/#/#')
	const menuItems = navigationConfig.map(item => {
		const CustomAnchorTag = item.type === 'external-link' ? `a` : Link
		if (item.type === 'groupHeader') {
			return (
				<li
					className='navigation-header'
					key={`group-header-${item.groupTitle}`}
				>
					<span>{item.groupTitle}</span>
				</li>
			)
		}

		let renderItem = (
			<li
				className={classnames('nav-item', {
					'has-sub': item.type === 'collapse',
					'open': activeGroups.includes(item.id),
					'sidebar-group-active': currentActiveGroup.includes(item.id),
					'hover': props.hoverIndex === item.id,
					'active':
						(props.activeItemState === item.navLink && item.type === 'item') ||
						(item.parentOf && item.parentOf.includes(props.activeItemState)),
					'disabled': item.disabled
				})}
				key={item.id}
				onClick={e => {
					e.stopPropagation()
					if (item.type === 'item') {
						props.handleActiveItem(item.navLink)
						handleGroupClick(item.id, null, item.type)
						if (props.deviceWidth <= 1200 && item.type === 'item') {
							props.toggleMenu()
						}
					} else {
						handleGroupClick(item.id, null, item.type)
					}
				}}
			>
				<CustomAnchorTag
					to={
						item.filterBase
							? item.filterBase
							: item.navLink && item.type === 'item'
							? item.navLink
							: ''
					}
					href={item.type === 'external-link' ? item.navLink : ''}
					className={`d-flex ${
						item.badgeText ? 'justify-content-between' : 'justify-content-start'
					}`}
					onMouseEnter={() => {
						props.handleSidebarMouseEnter(item.id)
					}}
					onMouseLeave={() => {
						props.handleSidebarMouseEnter(item.id)
					}}
					key={item.id}
					onClick={e => {
						return item.type === 'collapse' ? e.preventDefault() : ''
					}}
					target={item.newTab ? '_blank' : undefined}
				>
					<div className='menu-text'>
						{item.icon}
						<span className='menu-item menu-title'>
							<FormattedMessage id={item.title} defaultMessage={item.title} />
						</span>
					</div>

					{item.badge ? (
						<div className='menu-badge'>
							<Badge color={item.badge} className='mr-1' pill>
								{item.badgeText}
							</Badge>
						</div>
					) : (
						''
					)}
					{item.type === 'collapse' ? (
						<ChevronRight className='menu-toggle-icon' size={13} />
					) : (
						''
					)}
				</CustomAnchorTag>
				{item.type === 'collapse' ? (
					<SideMenuGroup
						group={item}
						handleGroupClick={handleGroupClick}
						activeGroup={activeGroups}
						handleActiveItem={props.handleActiveItem}
						activeItemState={props.activeItemState}
						handleSidebarMouseEnter={props.handleSidebarMouseEnter}
						activePath={props.activePath}
						hoverIndex={props.hoverIndex}
						initRender={initRender}
						parentArr={parentArr}
						triggerActive={undefined}
						currentActiveGroup={currentActiveGroup}
						permission={props.permission}
						currentUser={props.currentUser}
						redirectUnauthorized={redirectUnauthorized}
						collapsedMenuPaths={props.collapsedMenuPaths}
						toggleMenu={props.toggleMenu}
						deviceWidth={props.deviceWidth}
					/>
				) : (
					''
				)}
			</li>
		)

		if (
			item.navLink &&
			item.collapsed !== undefined &&
			item.collapsed === true
		) {
			collapsedPath = item.navLink
			props.collapsedMenuPaths(item.navLink)
		}

		if (
			item.type === 'collapse' ||
			item.type === 'external-link' ||
			(item.type === 'item' &&
				item.permissions &&
				item.permissions.includes(props.currentUser)) ||
			item.permissions === undefined
		) {
			return renderItem
		} else if (
			item.type === 'item' &&
			item.navLink === props.activePath &&
			!item.permissions.includes(props.currentUser)
		) {
			return redirectUnauthorized()
		} else return ''
	})
	const sideOptions = navigationConfig.map((item, index) => {
		return (
			<div
				className='side-options'
				key={index}
				onClick={() => {
					props.toggleMenu()
					history.push(item.navLink)
				}}
				style={{
					background: url[1] === item.navLink ? '#ffd6af' : 'transparent'
				}}
			>
				<div className='side_menu_icon'>{item.icon}</div>
				<label
					className={url[1] === item.navLink ? 'side_menu_label' : 'selected'}
				>
					{item.title}
				</label>
			</div>
		)
	})

	return (
		<React.Fragment>
			{window.screen.width > 500 && menuItems}
			{window.screen.width <= 500 && sideOptions}
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	const {customizer} = state?.customizer
	return {
		messages: customizer?.language?.Dashboard,
		sender: customizer?.language?.Sender
	}
}

export default connect(mapStateToProps)(SideMenuContent)
