import React, {useEffect, useState} from 'react'
import {Row, Col} from 'reactstrap'
import Banner from './Banner'
import AssetsLight from 'assets/img/cards/Assets/1.png'
import DiaryLight from 'assets/img/cards/Diary/1.png'
import DocumentsLight from 'assets/img/cards/Documents/1.png'
import LiabilityLight from 'assets/img/cards/Liability/1.png'
import NomineeLight from 'assets/img/cards/Nominee/1.png'
import PortfolioLight from 'assets/img/cards/Portfolio/1.png'
import SenderLight from 'assets/img/cards/Sender/1.png'
import SpendLight from 'assets/img/cards/Spend/1.png'
import VaultLight from 'assets/img/cards/Vault/1.png'

import AssetsDark from 'assets/img/cards/Assets/2.png'
import DiaryDark from 'assets/img/cards/Diary/2.png'
import DocumentsDark from 'assets/img/cards/Documents/2.png'
import LiabilityDark from 'assets/img/cards/Liability/2.png'
import NomineeDark from 'assets/img/cards/Nominee/2.png'
import PortfolioDark from 'assets/img/cards/Portfolio/2.png'
import SenderDark from 'assets/img/cards/Sender/2.png'
import SpendDark from 'assets/img/cards/Spend/2.png'
import VaultDark from 'assets/img/cards/Vault/2.png'
import 'swiper/css/swiper.css'
import {
	Users,
	Briefcase,
	Share,
	FileMinus,
	Command,
	DollarSign,
	Lock,
	Archive,
	FileText
} from 'react-feather'
import 'assets/scss/plugins/extensions/swiper.scss'

import 'assets/scss/plugins/charts/apex-charts.scss'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import 'assets/scss/plugins/extensions/toastr.scss'
import themeConfig from 'configs/themeConfig'
import DashboardCards from './DashboardCards'

import {connect} from 'react-redux'
import {changeLanguage} from 'redux/actions/customizer'

const mobileColor = '#ff7d00'
const desktopColor = themeConfig.theme === 'dark' ? '#757488' : 'white'

const Assets = themeConfig.theme === 'dark' ? AssetsDark : AssetsLight
const Diary = themeConfig.theme === 'dark' ? DiaryDark : DiaryLight
const Documents = themeConfig.theme === 'dark' ? DocumentsDark : DocumentsLight
const Liability = themeConfig.theme === 'dark' ? LiabilityDark : LiabilityLight
const Nominee = themeConfig.theme === 'dark' ? NomineeDark : NomineeLight
const Portfolio = themeConfig.theme === 'dark' ? PortfolioDark : PortfolioLight
const Sender = themeConfig.theme === 'dark' ? SenderDark : SenderLight
const Spend = themeConfig.theme === 'dark' ? SpendDark : SpendLight
const Vault = themeConfig.theme === 'dark' ? VaultDark : VaultLight

const LADashboard = props => {
	const [width, setwidth] = useState(window.innerWidth)
	const {messages} = props
	const columns = [
		{
			label: messages?.spends ? messages?.spends : 'Daily Spends',
			icon: <FileMinus color={mobileColor} className='danger' size='auto' />,
			path: '/spends'
		},
		{
			label: messages?.vault ? messages?.vault : 'Password Vault',
			icon: <Lock color={mobileColor} className='warning' size='auto' />,
			path: '/vault/password'
		},
		{
			label: messages?.diary ? messages?.diary : 'Secret Diary',
			icon: <FileText color={mobileColor} className='success' size='auto' />,
			path: '/diary'
		},
		{
			label: messages?.asset ? messages?.asset : 'Assets',
			icon: <DollarSign color={mobileColor} className='primary' size='auto' />,
			path: '/assets/add'
		},
		{
			label: messages?.liability ? messages?.liability : 'Liabilties',
			icon: <Command color={mobileColor} className='danger' size='auto' />,
			path: '/liability/add'
		},
		{
			label: messages?.nominees ? messages?.nominees : 'Nominees',
			icon: <Users color={mobileColor} className='warning' size='auto' />,
			path: '/nominee/list'
		},
		{
			label: messages?.documents ? messages?.documents : 'Documents',
			icon: <Archive color={mobileColor} className='primary' size='auto' />,
			path: '/vault/document'
		},
		{
			label: messages?.portfolio ? messages?.portfolio : 'Portfolio',
			icon: <Briefcase color={mobileColor} className='success' size='auto' />,
			path: '/portfolio'
		},
		{
			label: props?.sender?.heading ? props?.sender?.heading : 'Sender',
			icon: <Share color={mobileColor} className='success' size='auto' />,
			path: '/contactUs'
		}
	]
	const dashboard = [
		{
			label: messages?.asset ? messages?.asset : 'Assets',
			description: messages?.assetText
				? messages?.assetText
				: 'Bank Holdings, FD, RD, Insurance, Properties etc.',
			background: Assets,
			icon: <DollarSign color={desktopColor} className='primary' size='auto' />,
			path: '/assets/add'
		},
		{
			label: messages?.liability ? messages?.liability : 'Liabilties',
			description: messages?.liabilityText
				? messages?.liabilityText
				: 'Loan, EMI, Cash borrowed etc with collateral details',
			background: Liability,
			icon: <Command color={desktopColor} className='danger' size='auto' />,
			path: '/liability/add'
		},
		{
			label: messages?.vault ? messages?.vault : 'Vault',
			description: messages?.vaultText
				? messages?.vaultText
				: 'Save your passwords like cards, credentials in vault.',
			background: Vault,
			icon: <Lock color={desktopColor} className='warning' size='auto' />,
			path: '/vault/password'
		},
		{
			label: messages?.nominees ? messages?.nominees : 'Nominees',
			description: messages?.nomineesText
				? messages?.nomineesText
				: 'Manage your nominees for your assets & liabities',
			background: Nominee,
			icon: <Users color={desktopColor} className='warning' size='auto' />,
			path: '/nominee/list'
		},
		{
			label: messages?.spends ? messages?.spends : 'Daily Spends',
			description: messages?.spendsText
				? messages?.spendsText
				: 'Log your thoughts and analyze your daily spends.',
			background: Spend,
			icon: <FileMinus color={desktopColor} className='danger' size='auto' />,
			path: '/spends'
		},
		{
			label: messages?.documents ? messages?.documents : 'Documents',
			description: messages?.documentsText
				? messages?.documentsText
				: 'Upload you documents, pics in your own secret vault',
			background: Documents,
			icon: <Archive color={desktopColor} className='primary' size='auto' />,
			path: '/vault/document'
		},
		{
			label: messages?.diary ? messages?.diary : 'Secret Diary',
			description: messages?.diaryText
				? messages?.diaryText
				: 'Log your thoughts and secrets in a personal space',
			background: Diary,
			icon: <FileText color={desktopColor} className='success' size='auto' />,
			path: '/diary'
		},
		{
			label: messages?.portfolio ? messages?.portfolio : 'Portfolio',
			description: messages?.portfolioText
				? messages?.portfolioText
				: 'View & analyze portfolio of saved assets and liabilties',
			background: Portfolio,
			icon: <Briefcase color={desktopColor} className='success' size='auto' />,
			path: '/portfolio'
		},
		{
			label: props?.sender?.heading ? props?.sender?.heading : 'Sender',
			description: props?.sender?.subHeading
				? props?.sender?.subHeading
				: 'Save, schedule, send text, audio, video messages',
			background: Sender,
			icon: <Share color={desktopColor} className='success' size='auto' />,
			path: '/contactUs'
		}
	]
	useEffect(() => {
		// props.changeLanguage('english')
		if (localStorage.getItem('logInGreeting')) {
			toast.success('Good to see you back !!!!!!!!')
			//toast.error('Abhi tak mare nhi');
			localStorage.removeItem('logInGreeting')
		}
		window.addEventListener('resize', updateWidthAndHeight)
		return () => window.removeEventListener('resize', updateWidthAndHeight)
	}, [])
	const updateWidthAndHeight = () => {
		setwidth(window.innerWidth)
	}

	const calcWidth = () => {
		if (width > 1100) {
			return '4'
		} else if (width > 900 && width <= 1100) {
			return '6'
		} else {
			return '12'
		}
	}

	const {loc} = props
	return (
		<div className='mobile_content'>
			{!loc && (
				<>
					<ToastContainer />

					<div
						style={{
							width: '100%',
							marginLeft: width <= 500 ? '0px' : '-2px'
						}}
					>
						<Banner />
					</div>
				</>
			)}
			{width <= 500 && (
				<div className='menu_content mt-1'>
					{columns.map((item, index) => {
						return (
							<div
								className='menu_options'
								key={index}
								onClick={() => {
									props.history.push(item.path)
								}}
							>
								<div className='menu_icon'>{item.icon}</div>
								<div className='menu_label'>{item.label}</div>
							</div>
						)
					})}
				</div>
			)}
			{width > 500 && (
				<Row className='mt-2 px-2'>
					{dashboard.map((item, index) => {
						return (
							<Col md={calcWidth()} sm='12' key={index}>
								<div
									onClick={() => {
										props.history.push(item.path)
									}}
									className='pointerCursor'
								>
									<DashboardCards
										size={width}
										icon={item.icon}
										background={item.background}
										iconBg={desktopColor}
										stat={item.label}
										statTitle={item.description}
										hideChart={true}
										index={index}
									/>
								</div>
							</Col>
						)
					})}
				</Row>
			)}
		</div>
	)
}
const mapStateToProps = state => {
	const {customizer} = state?.customizer
	return {
		messages: customizer?.language?.Dashboard,
		sender: customizer?.language?.Sender
	}
}

export default connect(mapStateToProps, {changeLanguage})(LADashboard)
