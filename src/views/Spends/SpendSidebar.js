import React, {useState, useEffect} from 'react'
import {Label, Input, FormGroup, Button} from 'reactstrap'
import {X} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Select from 'react-select'
import {Spinner} from 'reactstrap'
import classnames from 'classnames'
import themeConfig from 'configs/themeConfig'
import {toast} from 'react-toastify'
import handleKeyMobileNumber from 'utility/context/InputTypeNum'
const colourOptions1 = [
	{label: 'Cigarettes', value: 'Cigarettes'},
	{label: 'Drink', value: 'Drink'},
	{label: 'Fees', value: 'Fees'},
	{label: 'Fuel', value: 'Fuel'},
	{label: 'Groceries', value: 'Groceries'},
	{label: 'Party', value: 'Party'},
	{label: 'Rent', value: 'Rent'},
	{label: 'Snacks', value: 'Snacks'},
	{label: 'Travel', value: 'Travel'}
]
const SpendSidebar = props => {
	const [relation, setrelation] = useState('')
	const [relation1, setrelation1] = useState('other')
	const [date, setdate] = useState('')
	const [address, setaddress] = useState('')
	const [contact1, setcontact1] = useState('')
	const [id, setid] = useState('')
	const [name, setname] = useState('')
	const [addNew, setaddNew] = useState(false)
	const [errorrelation1, seterrorrelation1] = useState('')
	const [errorrelation, seterrorrelation] = useState('')
	const [erroraddress, seterroraddress] = useState('')
	const [errorcontact1, seterrorcontact1] = useState('')
	const [errorname, seterrorname] = useState('')
	const [errordate, seterrordate] = useState('')

	const nullData = () => {
		setid('')
		setname('')
		setrelation('')
		setrelation1('')
		setdate('')
		setaddress('')
		setcontact1('')
	}
	const nullError = () => {
		seterrorname('')
		seterroraddress('')
		seterrorcontact1('')
		seterrorrelation1('')
		seterrordate('')
	}
	useEffect(() => {
		if (props.data) {
			const {id, name, relation, address, date, primaryContact} = props.data
			nullError()
			setid(id)
			setname(name)
			setrelation(relation)
			if (
				relation !== 'Cigarettes' &&
				relation !== 'Drink' &&
				relation !== 'Fees' &&
				relation !== 'Fuel' &&
				relation !== 'Groceries' &&
				relation !== 'Party' &&
				relation !== 'Rent' &&
				relation !== 'Snacks' &&
				relation !== 'Travel'
			) {
				setrelation('others')
				setrelation1(relation)
			}
			setaddress(address)
			setdate(date)
			setcontact1(primaryContact)
			// setprice(price)
		}
		if (!props.data || addNew) {
			nullData()
			nullError()
		}
		setaddNew(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.data])

	const setnameFunc = () => seterrorname('Enter Valid Item')
	const setaddressFunc = () => seterroraddress('Enter Valid Description')
	const setcontact1Func = () => seterrorcontact1('Enter Valid Price')
	const setrelationFunc = () => seterrorrelation('Enter Valid Label')
	const setrelation1Func = () => seterrorrelation1('Enter Valid Label')
	const setdateFunc = () => seterrordate('Enter Valid date')
	const relationValue = e => {
		console.log('value', e)
		const value = e?.value
		setrelation(value)
		!(!value?.length || !value.trim()) && seterrorrelation('')
	}
	const handleValue = e => {
		const {name} = e.target
		const value = e.target.value
		switch (name) {
			case 'item':
				setname(value)
				!(!value?.length || !value.trim()) && seterrorname('')
				break
			case 'desc':
				setaddress(value)
				!(!value || !value.trim()) && seterroraddress('')
				break
			case 'date':
				setdate(value)
				!(!value || !value.trim()) && seterrordate('')
				break
			case 'price':
				setcontact1(value)
				!(!value?.length || !value.trim()) && seterrorcontact1('')
				break
			case 'otherLabel':
				setrelation1(value)
				!(!value?.length || !value.trim()) && seterrorrelation1('')
				break
			default:
				break
		}
	}
	const handleValueBlur = e => {
		const {name} = e.target
		const value = e.target.value
		switch (name) {
			case 'item':
				!value?.length || !value.trim() ? setnameFunc() : seterrorname('')
				break
			case 'desc':
				!value || !value.trim() ? setaddressFunc() : seterroraddress('')
				break
			case 'price':
				!value?.length || !value.trim()
					? setcontact1Func()
					: seterrorcontact1('')
				break
			case 'date':
				!value?.length || !value.trim() ? setdateFunc() : seterrordate('')
				break
			case 'label':
				!value?.length || !value.trim()
					? setrelationFunc()
					: seterrorrelation('')
				break
			case 'otherLabel':
				!value?.length || !value.trim()
					? setrelation1Func()
					: seterrorrelation1('')
				break
			default:
				break
		}
	}
	const validateValues = () => {
		!name?.length && setnameFunc()
		!date?.length && setdateFunc()
		!address?.length && setaddressFunc()
		!contact1?.length && setcontact1Func()
		!relation?.length && setrelationFunc()
		relation === 'others' && !relation1?.length && setrelation1Func()
		return (
			errorname ||
			!name?.length ||
			errorrelation ||
			!relation?.length ||
			errorrelation1 ||
			(relation === 'others' && !relation1?.length) ||
			erroraddress ||
			!address?.length ||
			errorcontact1 ||
			!contact1?.length ||
			errordate ||
			!date?.length
		)
	}

	const handleSubmit = () => {
		const inValid = validateValues()
		if (inValid) {
			toast.error('Kindly Fill Mandatory fields')
			return
		}
		if (props.isLoading) {
			props.data !== null
				? toast.warning('Updating still in process')
				: toast.warning('Adding Spend in process')
			return
		}
		const obj = {
			relation: relation?.trim(),
			relation1: relation1?.trim(),
			date: date?.trim(),
			address: address?.trim(),
			contact1: contact1?.trim(),
			_id: id?.trim(),
			name: name?.trim()
			// price: price?.trim()
		}
		if (props.data !== null) {
			obj._id = props.data._id
			obj.usage = props.data.usage
			props.updateData(obj)
		} else {
			setaddNew(true)
			props.addData(obj)
			nullData()
			nullError()
		}
	}

	const {show, handleSidebar, data} = props
	return (
		<div
			className={classnames('data-list-sidebar', {
				show: show
			})}
		>
			<div className='data-list-sidebar-header mt-2 px-2 d-flex justify-content-between'>
				<h4>{data !== null ? 'UPDATE SPEND DETAILS' : 'ADD NEW SPEND'}</h4>
				<X
					size={20}
					onClick={() => {
						handleSidebar(false, true)
						nullData()
						nullError()
					}}
				/>
			</div>
			<PerfectScrollbar
				className='data-list-fields px-2 pt-2'
				options={{wheelPropagation: false}}
			>
				<FormGroup className='form-label-group'>
					<Input
						className='input-label'
						type='text'
						name='item'
						value={name}
						placeholder='Item'
						// onChange={(e) => setname(e.target.value)}
						id='data-name'
						onChange={handleValue}
						onBlur={handleValueBlur}
						style={{borderColor: errorname ? 'red' : ''}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-name'
					>
						Item
					</Label>
					{errorname && (
						<span style={{color: 'red', fontSize: '0.8rem'}}>{errorname}</span>
					)}
				</FormGroup>
				<FormGroup className='form-label-group mt-2 mb-2'>
					<Select
						id='data-category'
						name='label'
						options={colourOptions1}
						value={colourOptions1.filter(option => option.value === relation)}
						isClearable={true}
						placeholder={'Select Label'}
						onChange={e => relationValue(e)}
						onBlur={handleValueBlur}
					/>
					<Label
						className={
							themeConfig.theme === 'dark'
								? 'dark-label select-label'
								: 'light-label select-label'
						}
						for='data-category'
					>
						Select Label*
					</Label>
				</FormGroup>
				{relation === 'others' && (
					<FormGroup>
						<Input
							className='input-label'
							type='text'
							value={relation1}
							name='otherLabel'
							placeholder='Label Name'
							// onChange={(e) => setrelation1(e.target.value)}
							id='data-name'
							onChange={handleValue}
							onBlur={handleValueBlur}
							style={{borderColor: errorrelation1 ? 'red' : ''}}
						/>
						{errorrelation1 && (
							<span style={{color: 'red', fontSize: '0.8rem'}}>
								{errorrelation1}
							</span>
						)}
					</FormGroup>
				)}
				<FormGroup className='form-label-group'>
					<Input
						className='input-label'
						type='date'
						value={date}
						name='date'
						placeholder='Enter Date'
						// onChange={(e) => setdate(e.target.value)}
						id='data-name'
						onChange={handleValue}
						onBlur={handleValueBlur}
						style={{borderColor: errordate ? 'red' : ''}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-name'
					>
						Date *
					</Label>
					{errordate && (
						<span style={{color: 'red', fontSize: '0.8rem'}}>{errordate}</span>
					)}
				</FormGroup>
				<FormGroup className='form-label-group'>
					<Input
						className='input-label'
						type='number'
						onKeyPress={event => handleKeyMobileNumber(event)}
						value={contact1}
						// onChange={(e) => setcontact1(e.target.value)}
						id='data-price'
						name='price'
						placeholder='Enter spend amount'
						onChange={handleValue}
						onBlur={handleValueBlur}
						style={{borderColor: errorcontact1 ? 'red' : ''}}
					/>
					<Label
						for='data-price'
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
					>
						Amount *
					</Label>
					{errorcontact1 && (
						<span style={{color: 'red', fontSize: '0.8rem'}}>
							{errorcontact1}
						</span>
					)}
				</FormGroup>

				<FormGroup className='form-label-group'>
					<Input
						className='input-label '
						type='textarea'
						value={address}
						name='desc'
						placeholder='Description'
						// onChange={(e) => setaddress(e.target.value)}
						id='data-name'
						onChange={handleValue}
						onBlur={handleValueBlur}
						style={{borderColor: erroraddress ? 'red' : '', height: '115px'}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-name'
					>
						Description *
					</Label>
					{erroraddress && (
						<span style={{color: 'red', fontSize: '0.8rem'}}>
							{erroraddress}
						</span>
					)}
				</FormGroup>
			</PerfectScrollbar>
			<div className='data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1'>
				<Button.Ripple
					// className="ml-1"
					className='button-label'
					color='secondary'
					outline
					onClick={() => {
						handleSidebar(false, true)
						nullData()
						nullError()
					}}
				>
					Cancel
				</Button.Ripple>
				<Button.Ripple
					color='warning'
					type='reset'
					className='button-label'
					onClick={() => handleSubmit()}
				>
					{props.isLoading && <Spinner color='warning' size='sm' />}{' '}
					{data !== null ? 'Update' : 'Add'}
				</Button.Ripple>
			</div>
		</div>
	)
}
export default SpendSidebar
