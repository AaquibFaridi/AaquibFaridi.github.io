import React, {useState, useEffect} from 'react'
import {
	Card,
	CardBody,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane
} from 'reactstrap'
import classnames from 'classnames'
import {Info, ArrowUpCircle, Bell, Mail} from 'react-feather'
import InfoTab from './Information'
import PaymentTab from './PaymentsIntegrated'
import Notifications from './Notifications'
import ContactUs from './ContactUs'
import 'assets/scss/pages/users.scss'

const Edit = props => {
	const [activeTab, setactiveTab] = useState('1')
	const [activeTab2, setactiveTab2] = useState(true)
	const [activeTab4, setactiveTab4] = useState(true)
	const [activeTab5, setactiveTab5] = useState(true)
	const [activeTab6, setactiveTab6] = useState(true)

	const {pathname: path} = props.location
	const size = window.screen.width
	const toggle = tab => {
		setactiveTab(tab)
	}

	useEffect(() => {
		if (path === '/user/Upgrade') {
			setactiveTab('4')
			if (size < 500) {
				setactiveTab4(true)
				setactiveTab5(false)
				setactiveTab6(false)
				setactiveTab2(false)
			}
		} else if (path === '/user/feed') {
			setactiveTab('5')
			if (size < 500) {
				setactiveTab4(false)
				setactiveTab5(true)
				setactiveTab6(false)
				setactiveTab2(false)
			}
		} else if (path === '/user/notify') {
			setactiveTab('6')
			if (size < 500) {
				setactiveTab4(false)
				setactiveTab5(false)
				setactiveTab6(true)
				setactiveTab2(false)
			}
		} else if (path === '/user/profile') {
			setactiveTab('2')
			if (size < 500) {
				setactiveTab4(false)
				setactiveTab5(false)
				setactiveTab6(false)
				setactiveTab2(true)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size])
	return (
		<Card
			style={{
				maxHeight: 'calc(100vh - 145px)',
				marginBottom: '0px'
			}}
		>
			<CardBody>
				<Row>
					<Col sm='12' className='d-flex justify-content-start flex-wrap'>
						<CardBody style={{padding: '0px'}}>
							<Nav tabs>
								{activeTab2 && (
									<NavItem className='mr-5'>
										<NavLink
											className={classnames({
												active: activeTab === '2'
											})}
											onClick={() => {
												toggle('2')
											}}
										>
											<Info size={16} />
											<span className='align-middle ml-50'>Information</span>
										</NavLink>
									</NavItem>
								)}
								{activeTab4 && (
									<NavItem className='mr-5'>
										<NavLink
											className={classnames({
												active: activeTab === '4'
											})}
											onClick={() => {
												toggle('4')
											}}
										>
											<ArrowUpCircle size={16} />
											<span className='align-middle ml-50'>Subscription</span>
										</NavLink>
									</NavItem>
								)}
								{activeTab5 && (
									<NavItem className='mr-5'>
										<NavLink
											className={classnames({
												active: activeTab === '5'
											})}
											onClick={() => {
												toggle('5')
											}}
										>
											<Mail size={16} />
											<span className='align-middle ml-50'>Contact Us</span>
										</NavLink>
									</NavItem>
								)}
								{activeTab6 && (
									<NavItem className='mr-5'>
										<NavLink
											className={classnames({
												active: activeTab === '6'
											})}
											onClick={() => {
												toggle('6')
											}}
										>
											<Bell size={16} />
											<span className='align-middle ml-50'>Notifications</span>
										</NavLink>
									</NavItem>
								)}
							</Nav>
							<TabContent activeTab={activeTab}>
								<TabPane
									className='card_body'
									tabId='2'
									style={{
										maxHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										minHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										overflowY: 'overlay'
									}}
								>
									<InfoTab />
								</TabPane>
								<TabPane
									className='card_body'
									tabId='4'
									style={{
										maxHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										minHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										overflowY: 'overlay'
									}}
								>
									<PaymentTab />
								</TabPane>
								<TabPane
									className='card_body'
									tabId='5'
									style={{
										maxHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										minHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										overflowY: 'overlay'
									}}
								>
									<ContactUs />
								</TabPane>
								<TabPane
									className=''
									tabId='6'
									style={{
										maxHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										minHeight:
											window.screen.width <= 500
												? 'calc(100vh - 245px)'
												: 'calc(100vh - 210px)',
										overflowY: 'overlay'
									}}
								>
									<Notifications />
								</TabPane>
							</TabContent>
						</CardBody>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}
export default Edit
