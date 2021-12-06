import React, {useState, useEffect} from 'react'
import {Label, Input, FormGroup, Button} from 'reactstrap'
import {X} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import Select from 'react-select'
import themeConfig from 'configs/themeConfig'
import {toast} from 'react-toastify'
import handleKeyMobileNumber from 'utility/context/InputTypeNum'
const colourOptions1 = [
	{value: 'Husband', label: 'Husband'},
	{value: 'Wife', label: 'Wife'},
	{value: 'Son', label: 'Son'},
	{value: 'Daughter', label: 'Daughter'},
	{value: 'Father', label: 'Father'},
	{value: 'Mother', label: 'Mother'},
	{value: 'Brother', label: 'Brother'},
	{value: 'Sister', label: 'Sister'},
	{value: 'Cousin', label: 'Cousin'},
	{value: 'Nephew', label: 'Nephew'},
	{value: 'Niece', label: 'Niece'},
	{value: 'In-law', label: 'In-law'},
	{value: 'Friend', label: 'Friend'},
	{value: 'Colleague', label: 'Colleague'},
	{value: 'Others', label: 'Others'}
]
const NomineeSidebar = props => {
	const [relation, setrelation] = useState()
	const [relation1, setrelation1] = useState('')
	const [email, setemail] = useState('')
	const [address, setaddress] = useState('')
	const [contact1, setcontact1] = useState('')
	const [contact2, setcontact2] = useState('')
	const [img, setimg] = useState('')
	const [id, setid] = useState('')
	const [name, setname] = useState('')
	const [addNew, setaddNew] = useState(false)
	const [errorrelation1, seterrorrelation1] = useState('')
	const [errorrelation, seterrorrelation] = useState('')
	const [erroremail, seterroremail] = useState('')
	const [erroraddress, seterroraddress] = useState('')
	const [errorcontact1, seterrorcontact1] = useState('')
	const [errorcontact2, seterrorcontact2] = useState('')
	const [errorname, seterrorname] = useState('')

	useEffect(() => {
		if (props.data) {
			const {
				id,
				name,
				relation,
				address,
				email,
				primaryContact,
				secondaryContact
			} = props.data
			nullError()
			setid(id)
			setname(name)
			setrelation(relation)
			if (
				relation !== 'Collegue' &&
				relation !== 'Cousin' &&
				relation !== 'Daughter' &&
				relation !== 'Daughter-in-law' &&
				relation !== 'Friend' &&
				relation !== 'Husband' &&
				relation !== 'Son' &&
				relation !== 'Son-in-law' &&
				relation !== 'Wife'
			) {
				setrelation('others')
				setrelation1(relation)
			}
			setaddress(address)
			setemail(email)
			setcontact1(primaryContact)
			setcontact2(secondaryContact)
		} else if (props.data === null || addNew) {
			nullData()
			nullError()
		}
		setaddNew(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.data])
	const setnameFunc = () => seterrorname('Enter Valid Name')
	const setemailFunc = () => seterroremail('Enter Valid Email')
	const setaddressFunc = () => seterroraddress('Enter Valid Address')
	const setcontact1Func = () => seterrorcontact1('Enter Valid Primary No.')
	const setcontact2Func = () => seterrorcontact2('Enter Valid Secondary No.')
	const setrelationFunc = () => seterrorrelation('Enter Valid Relation')
	const setrelation1Func = () => seterrorrelation1('Enter Valid Relation')
	const relationValue = e => {
		const value = e?.value
		setrelation(value)
		value !== 'others' && seterrorrelation1('')
		!(!value?.length || !value.trim()) && seterrorrelation('')
	}
	const handleValue = e => {
		const {name} = e.target
		const value = e?.target?.value
		switch (name) {
			case 'name':
				setname(value)
				!(!value?.length || !value.trim()) && seterrorname('')
				break
			case 'email':
				setemail(value)
				const tempMAil = value.match(
					/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
				)
				!(!value || !tempMAil || !value.trim()) && seterroremail('')
				break
			case 'address':
				setaddress(value.replace(/[\n\r]/g, ', '))
				!(!value || !value.trim()) && seterroraddress('')
				break
			case 'phone':
				setcontact1(value)
				!(!value?.length || value.length !== 10 || !value.trim()) &&
					seterrorcontact1('')
				break
			case 'phoneC':
				setcontact2(value)
				!(value.length !== 10 || !value.trim()) && seterrorcontact2('')
				!value?.length && seterrorcontact2('')
				break
			case 'relation1':
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
			case 'name':
				!value?.length || !value.trim() ? setnameFunc() : seterrorname('')
				break
			case 'email':
				const tempMAil = value.match(
					/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
				)
				!value || !tempMAil || !value.trim()
					? setemailFunc()
					: seterroremail('')
				break
			case 'address':
				setaddress(value.replace(/[\n\r]/g, ', '))
				!value || !value.trim() ? setaddressFunc() : seterroraddress('')
				break
			case 'phone':
				!value?.length || value.length !== 10 || !value.trim()
					? setcontact1Func()
					: seterrorcontact1('')
				break
			case 'phoneC':
				value.length !== 10 || !value.trim()
					? setcontact2Func()
					: seterrorcontact2('')
				!value?.length && seterrorcontact2('')
				break
			case 'relation':
				!value?.length || !value.trim()
					? setrelationFunc()
					: seterrorrelation('')
				break
			case 'relation1':
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
		!email?.length && setemailFunc()
		!address?.length && setaddressFunc()
		!contact1?.length && setcontact1Func()
		!contact2?.length && setcontact1Func()
		!relation?.length && setrelationFunc()
		relation === 'others' && !relation1?.length && setrelation1Func()
		relation !== 'others' && seterrorrelation1('')
		return (
			errorname ||
			!name?.length ||
			errorrelation ||
			!relation?.length ||
			errorrelation1 ||
			(relation === 'others' && !relation1?.length) ||
			erroremail ||
			!email?.length ||
			erroraddress ||
			!address?.length ||
			errorcontact1 ||
			!contact1?.length ||
			errorcontact2
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
				: toast.warning('Adding nominee in process')
			return
		}
		const obj = {
			relation: relation?.trim(),
			relation1: relation1?.trim(),
			email: email?.trim(),
			address: address?.trim(),
			contact1: contact1?.trim(),
			contact2: contact2?.trim(),
			id: id?.trim(),
			name: name?.trim()
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

	const nullData = () => {
		setname('')
		setrelation('')
		setrelation1('')
		setemail('')
		setaddress('')
		setcontact1('')
		setcontact2('')
	}

	const nullError = () => {
		seterrorname('')
		seterroraddress('')
		seterrorcontact1('')
		seterrorcontact2('')
		seterroremail('')
		seterrorrelation1('')
	}

	const {show, handleSidebar, data} = props
	return (
		<div
			className={classnames('data-list-sidebar', {
				show
			})}
		>
			<div className='data-list-sidebar-header mt-2 px-2 d-flex justify-content-between'>
				<h4 style={{color: 'var(--warning)'}}>
					{data !== null ? 'UPDATE NOMINEE' : 'ADD NEW NOMINEE'}
				</h4>
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
				<FormGroup className='form-label-group mb-0'>
					<Input
						className='input-label'
						type='text'
						name='name'
						value={name}
						placeholder='Nominee Name*'
						onChange={handleValue}
						onBlur={handleValueBlur}
						id='data-name'
						style={{borderColor: errorname ? 'red' : ''}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-name'
					>
						Name*
					</Label>
				</FormGroup>
				{errorname && (
					<span style={{color: 'red', fontSize: '0.8rem'}}>{errorname}</span>
				)}
				<FormGroup className='form-label-group mt-2'>
					<Select
						id='data-category'
						name='relation'
						options={colourOptions1}
						value={colourOptions1.filter(option => option.value === relation)}
						isClearable={true}
						placeholder={'Select Relation'}
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
						Relation*
					</Label>
				</FormGroup>
				{relation === 'others' && (
					<FormGroup className='form-label-group mt-2 mb-0'>
						<Input
							type='text'
							name='relation1'
							value={relation1}
							placeholder='Relation Name*'
							onChange={handleValue}
							onBlur={handleValueBlur}
							id='data-Relation'
							style={{borderColor: errorrelation1 ? 'red' : ''}}
						/>
					</FormGroup>
				)}
				{errorrelation1 && (
					<span style={{color: 'red', fontSize: '0.8rem'}}>
						{errorrelation1}
					</span>
				)}
				<FormGroup className='form-label-group mt-2 mb-0'>
					<Input
						className='input-label'
						type='email'
						name='email'
						value={email}
						placeholder='Nominee Email*'
						onChange={handleValue}
						onBlur={handleValueBlur}
						id='data-email'
						style={{borderColor: erroremail ? 'red' : ''}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-email'
					>
						Nominee Email*
					</Label>
				</FormGroup>
				{erroremail && (
					<span style={{color: 'red', fontSize: '0.8rem'}}>{erroremail}</span>
				)}
				<FormGroup className='form-label-group mt-2 mb-0'>
					<Input
						className='input-label'
						type='type'
						maxLength={10}
						value={contact1}
						name='phone'
						onChange={handleValue}
						onBlur={handleValueBlur}
						onKeyPress={e => handleKeyMobileNumber(e)}
						id='data-price1'
						placeholder='Nominee Contact*'
						style={{borderColor: errorcontact1 ? 'red' : ''}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-price1'
					>
						Nominee Contact
					</Label>
				</FormGroup>
				{errorcontact1 && (
					<span style={{color: 'red', fontSize: '0.8rem'}}>
						{errorcontact1}
					</span>
				)}
				<FormGroup className='form-label-group mt-2 mb-0'>
					<Input
						className='input-label'
						type='text'
						maxLength={10}
						value={contact2}
						name='phoneC'
						onChange={handleValue}
						onBlur={handleValueBlur}
						onKeyPress={e => handleKeyMobileNumber(e)}
						id='data-price'
						placeholder='Alternate Contact'
						style={{borderColor: errorcontact2 ? 'red' : ''}}
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-price'
					>
						Alternate Contact
					</Label>
				</FormGroup>
				{errorcontact2 && (
					<span style={{color: 'red', fontSize: '0.8rem'}}>
						{errorcontact2}
					</span>
				)}
				<FormGroup className='form-label-group mt-2 mb-0'>
					<Input
						className='input-label '
						style={{
							height: '115px',
							borderColor: erroraddress ? 'red' : ''
						}}
						type='textarea'
						value={address}
						name='address'
						placeholder='Address*'
						onChange={handleValue}
						onBlur={handleValueBlur}
						id='data-Address'
					/>
					<Label
						className={
							themeConfig.theme === 'dark' ? 'dark-label' : 'light-label'
						}
						for='data-Address'
					>
						Address *
					</Label>
				</FormGroup>
				{erroraddress && (
					<span style={{color: 'red', fontSize: '0.8rem'}}>{erroraddress}</span>
				)}

				{props.thumbView && img.length <= 0 ? (
					<label
						className='btn btn-primary'
						htmlFor='upload-image'
						color='primary'
					>
						Upload Image
						<input
							type='file'
							id='upload-image'
							hidden
							onChange={e => setimg(URL.createObjectURL(e.target.files[0]))}
						/>
					</label>
				) : null}
			</PerfectScrollbar>
			<div className='data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1'>
				<Button.Ripple
					className='button-label'
					color='secondary'
					outline
					onClick={() => {
						nullData()
						nullError()
					}}
				>
					Reset
				</Button.Ripple>
				<Button.Ripple
					//disabled
					color='warning'
					type='reset'
					className='button-label'
					onClick={() => handleSubmit()}
				>
					{data !== null
						? props.isLoading
							? 'Updating...'
							: 'Update'
						: props.isLoading
						? 'Adding...'
						: 'Add'}
				</Button.Ripple>
			</div>
		</div>
	)
}
export default NomineeSidebar
