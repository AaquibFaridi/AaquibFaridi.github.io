/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react'
import {Row, Col, Card} from 'reactstrap'
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
import themeConfig from 'configs/themeConfig'
import './typewriter.css'

const Assets = themeConfig.theme === 'dark' ? AssetsDark : AssetsLight
const Diary = themeConfig.theme === 'dark' ? DiaryDark : DiaryLight
const Documents = themeConfig.theme === 'dark' ? DocumentsDark : DocumentsLight
const Liability = themeConfig.theme === 'dark' ? LiabilityDark : LiabilityLight
const Nominee = themeConfig.theme === 'dark' ? NomineeDark : NomineeLight
const Portfolio = themeConfig.theme === 'dark' ? PortfolioDark : PortfolioLight
const Sender = themeConfig.theme === 'dark' ? SenderDark : SenderLight
const Spend = themeConfig.theme === 'dark' ? SpendDark : SpendLight
const Vault = themeConfig.theme === 'dark' ? VaultDark : VaultLight
const Dark = themeConfig.theme === 'dark'

export const Features = props => {
	const {
		asset,
		assetText,
		liability,
		liabilityText,
		vault,
		vaultText,
		nominees,
		nomineesText,
		spends,
		spendsText,
		documents,
		documentsText,
		diary,
		diaryText,
		portfolio,
		portfolioText
	} = props
	const [dashboard, setDashboard] = useState([
		{
			id: 0,
			label: asset ? asset : 'Assets',
			description: assetText
				? assetText
				: 'Bank Holdings, FD, RD, Insurance, Properties etc.',
			background: Assets,
			selected: false,
			path: '/assets/add'
		},
		{
			id: 1,
			label: liability ? liability : 'Liabilties',
			description: liabilityText
				? liabilityText
				: 'Loan, EMI, Cash borrowed etc with collateral details',
			background: Liability,
			selected: false,
			path: '/liability/add'
		},
		{
			id: 2,
			label: vault ? vault : 'Vault',
			description: vaultText
				? vaultText
				: 'Save your passwords like cards, credentials in vault.',
			background: Vault,
			selected: false,
			path: '/vault/password'
		},
		{
			id: 3,
			label: nominees ? nominees : 'Nominees',
			description: nomineesText
				? nomineesText
				: 'Manage your nominees for your assets & liabities',
			background: Nominee,
			selected: false,
			path: '/nominee/list'
		},
		{
			id: 4,
			label: spends ? spends : 'Daily Spends',
			description: spendsText
				? spendsText
				: 'Log your thoughts and analyze your daily spends.',
			background: Spend,
			selected: false,
			path: '/spends'
		},
		{
			id: 5,
			label: documents ? documents : 'Documents',
			description: documentsText
				? documentsText
				: 'Upload you documents, pics in your own secret vault',
			background: Documents,
			selected: false,
			path: '/vault/document'
		},
		{
			id: 6,
			label: diary ? diary : 'Secret Diary',
			description: diaryText
				? diaryText
				: 'Log your thoughts and secrets in a personal space',
			background: Diary,
			selected: false,
			path: '/diary'
		},
		{
			id: 7,
			label: portfolio ? portfolio : 'Portfolio',
			description: portfolioText
				? portfolioText
				: 'View & analyze portfolio of saved assets and liabilties',
			background: Portfolio,
			selected: false,
			path: '/portfolio'
		},
		{
			id: 8,
			label: props?.sender?.heading ? props?.sender?.heading : 'Sender',
			description: props?.sender?.subHeading
				? props?.sender?.subHeading
				: 'Save, schedule, send text, audio, video messages',
			background: Sender,
			selected: false,
			path: '/contactUs'
		}
	])

	const calcWidth = () => {
		if (window.innerWidth > 1100) {
			return '4'
		} else if (window.innerWidth > 900 && window.innerWidth <= 1100) {
			return '6'
		} else {
			return '12'
		}
	}

	const setFlip = index => {
		setDashboard(
			dashboard.map(item => {
				return item.id === index ? {...item, selected: !item.selected} : item
			})
		)
	}

	return (
		<div
			id='feature'
			className='feature-menu-option'
			style={{backgroundColor: Dark ? '#21212a' : 'white'}}
		>
			{/* <h3
        style={{
          textAlign: 'center',
          color: 'var(--warning)',
          paddingTop: '5px'
        }}
      >
        Features
      </h3> */}
			<div style={{overflowX: window.innerWidth <= 500 ? 'overlay' : 'none'}}>
				<Row
					className='px-2'
					style={{
						flexWrap: window.innerWidth <= 500 ? 'nowrap' : 'wrap',
						width: window.innerWidth <= 500 ? '3100px' : ''
					}}
				>
					{dashboard?.map((item, index) => {
						return (
							<Col
								md={calcWidth()}
								sm='12'
								key={index}
								className={window.innerWidth <= 500 ? 'mr-1 px-0' : 'px-0'}
								style={{
									width: window.innerWidth <= 500 ? '340px' : ''
								}}
							>
								<div className='pointerCursor' onClick={() => setFlip(index)}>
									<Card
										id={`card-${index}`}
										className={
											item.selected ? 'whole-card card-rotate' : 'whole-card'
										}
										style={{
											maxWidth: window.innerWidth <= 500 ? '340px' : '380px',
											margin: window.innerWidth <= 500 ? '17px 0px' : ''
										}}
									>
										<div
											id={`back-image-${index}`}
											className={
												Dark
													? 'back-image-dark back-image-dark-normal'
													: 'back-image back-image-normal'
											}
											style={{
												backgroundImage: `url(${item.background})`,
												backgroundSize: (() => {
													if (item.label === 'Assets') {
														return '220px'
													} else if (item.label === 'Vault') {
														return '220px'
													} else if (item.label === 'Nominees') {
														return '185px'
													} else if (item.label === 'Daily Spends') {
														return window.innerWidth <= 500 ? '155px' : '185px'
													} else if (item.label === 'Documents') {
														return window.innerWidth <= 500 ? '170px' : '210px'
													} else if (item.label === 'Sender') {
														return window.innerWidth <= 500 ? '225px' : '250px'
													} else if (item.label === 'Secret Diary') {
														return window.innerWidth <= 500 ? '175px' : ''
													}
												})(),
												backgroundPosition: (() => {
													if (item.label === 'Vault') {
														return window.innerWidth <= 500 ? '95px' : '125px'
													} else if (item.label === 'Nominees') {
														return window.innerWidth <= 500 ? '135px' : '165px'
													} else if (item.label === 'Daily Spends') {
														return window.innerWidth <= 500 ? '165px' : '175px'
													} else if (item.label === 'Secret Diary') {
														return window.innerWidth <= 500 ? '155px' : '165px'
													} else if (item.label === 'Sender') {
														return window.innerWidth <= 500 ? '95px' : '110px'
													} else if (item.label === 'Assets') {
														return window.innerWidth <= 500 ? '105px' : '125px'
													} else if (item.label === 'Liabilties') {
														return window.innerWidth <= 500 ? '125px' : '150px'
													} else if (item.label === 'Portfolio') {
														return window.innerWidth <= 500 ? '120px' : ''
													}
												})()
											}}
										/>
										<div className='card-title-div' id={`card-title-${index}`}>
											<span
												id={`card-title-no-${index}`}
												style={{color: Dark ? 'white' : 'black'}}
												className='card_title'
											>
												{item.label}
											</span>
										</div>
									</Card>
									<Card
										id={`card-back-${index}`}
										className={
											item.selected
												? 'card-back-rotate whole-card-back'
												: 'whole-card-back'
										}
										style={{
											maxWidth: window.innerWidth <= 500 ? '340px' : '380px',
											margin: window.innerWidth <= 500 ? '17px 0px' : ''
										}}
									>
										<div
											id={`back-image-${index}`}
											className={
												Dark ? 'back-image-dark-revert' : 'back-image-revert'
											}
											style={{
												backgroundImage: `url(${item.background})`,
												backgroundPosition: 'center'
											}}
										/>
										<div
											style={{
												position: 'absolute',
												top: '0',
												width: '100%',
												height: '100%',
												color: 'white',
												fontSize: '2rem',
												textAlign: 'center'
											}}
										>
											{item.label}
										</div>
									</Card>
								</div>
							</Col>
						)
					})}
				</Row>
			</div>
		</div>
	)
}
