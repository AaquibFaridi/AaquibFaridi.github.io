import React, {useState} from 'react'
import {
	Collapse,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	TabContent,
	TabPane,
	Spinner
} from 'reactstrap'
import classnames from 'classnames'
import {ChevronDown} from 'react-feather'

const AssetAccordion = props => {
	const [collapseID, setcollapseID] = useState('')
	const [status, setstatus] = useState('Closed')
	const {collapseItems, colorOption} = props

	const toggleCollapse = collapseIDnew => {
		setcollapseID(collapseID !== collapseIDnew ? collapseIDnew : '')
	}

	const onEntered = id => {
		if (id === collapseID) setstatus('Opened')
	}
	const onEntering = id => {
		if (id === collapseID) setstatus('Opening...')
	}

	const onExited = id => {
		if (id === collapseID) setstatus('Closed')
	}
	const onExiting = id => {
		if (id === collapseID) setstatus('Closing...')
	}
	const formatme = val => {
		const title = colorOption?.[val] ? colorOption[val] : val
		return title
	}
	const accordionMarginItems =
		collapseItems.length > 0 ? (
			collapseItems.map(collapseItem => {
				return (
					<div className='collapse-margin' key={collapseItem.id}>
						<Card
							onClick={() => toggleCollapse(collapseItem.id)}
							className={classnames({
								'collapse-collapsed':
									status === 'Closed' && collapseID === collapseItem.id,
								'collapse-shown':
									status === 'Opened' && collapseID === collapseItem.id,
								'closing':
									status === 'Closing...' && collapseID === collapseItem.id,
								'opening':
									status === 'Opening...' && collapseID === collapseItem.id
							})}
						>
							<CardHeader>
								<CardTitle className='lead collapse-title collapsed'>
									{formatme(collapseItem.title)}
								</CardTitle>
								<ChevronDown size={15} className='collapse-icon' />
							</CardHeader>
							<Collapse
								isOpen={collapseItem.id === collapseID}
								onEntering={() => onEntering(collapseItem.id)}
								onEntered={() => onEntered(collapseItem.id)}
								onExiting={() => onExiting(collapseItem.id)}
								onExited={() => onExited(collapseItem.id)}
							>
								<CardBody>{collapseItem.content}</CardBody>
							</Collapse>
						</Card>
					</div>
				)
			})
		) : props.isLoading ? (
			<div className='d-flex justify-content-center'>
				<Spinner color='warning' size='lg' />
			</div>
		) : (
			<span style={{fontSize: '12px', marginTop: '-10px'}}>No Asset Found</span>
		)

	return (
		<React.Fragment>
			<Card
				style={{
					paddingBottom: '1.5rem',
					paddingRight: '0.5rem',
					marginBottom: props.page === 'portfolio' ? '2.2rem' : '1rem'
				}}
			>
				<CardHeader>
					<CardTitle>{props.heading}</CardTitle>
				</CardHeader>
				<CardBody
					className='card_body'
					style={{
						maxHeight:
							props.page === 'portfolio' ? '260px' : ' calc(100vh - 165px)'
					}}
				>
					<TabContent activeTab={'1'}>
						<TabPane tabId='1'>
							<div className='vx-collapse'>{accordionMarginItems}</div>
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</React.Fragment>
	)
}
export default AssetAccordion
export const LiabilityKeys = [
	'Lendor Details',
	'Card Details *',
	'Account Details',
	'EMI Details *',
	'Loan Details*',
	'Scheme Details',
	'Payments Details *',
	'Amount',
	'Amount *',
	'Liability Name',
	'Scheme Details *',
	'Remarks'
]

export const AssetKeys = [
	'Bank Name',
	'Debtor Name',
	'Details',
	'Currency Details',
	'Depositor',
	'Depositor *',
	'Account Details',
	'Account Details *',
	'Bank Name *',
	'Debtor Name *',
	'Investment Firm *',
	'Policy Number *',
	'Amount *',
	'Amount / Quantity',
	'Policy Number',
	'Property Type',
	'Property Area',
	'Retirals Details *',
	'Amount',
	'Remarks'
]
