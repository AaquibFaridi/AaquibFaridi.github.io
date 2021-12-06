/* eslint-disable radix */
import React, {useState, useEffect} from 'react'
import {encryptdata} from 'utility/context/SecurityTool'
import {DropdownToggle, Input} from 'reactstrap'
import PopUp from 'utility/Popup'
import {toast} from 'react-toastify'
import DataTable from 'react-data-table-component'
import classnames from 'classnames'
// import { history } from 'history'
import {Edit, Info, Trash, ChevronDown} from 'react-feather'
import {connect} from 'react-redux'
import Spinner from 'components/@vuexy/spinner/Fallback-spinner'
import {
	getSpendData,
	deleteSpendData,
	updateData,
	addData,
	filterSpendData
} from 'redux/actions/data-list'
import 'react-toastify/dist/ReactToastify.css'
import 'assets/scss/plugins/extensions/toastr.scss'
import Sidebar from './SpendSidebar'
import axios from 'axios'

import 'assets/scss/plugins/extensions/react-paginate.scss'
import 'assets/scss/pages/data-list.scss'

const selectedStyle = {
	rows: {
		selectedHighlighStyle: {
			'backgroundColor': 'rgba(115,103,240,.05)',
			'color': '#7367F0 !important',
			'boxShadow': '0 0 1px 0 #7367F0 !important',
			'&:hover': {
				transform: 'translateY(0px) !important'
			}
		}
	}
}
const EditComponent = props => {
	return (
		<div className='data-list-action'>
			{window.screen.width > 500 ? (
				<Edit
					className='cursor-pointer mr-1'
					size={window.screen.width < 500 ? 13 : 20}
					onClick={() => {
						return props.currentData(props.row)
					}}
				/>
			) : (
				<Info
					className='cursor-pointer mr-1'
					size={window.screen.width < 500 ? 13 : 20}
					onClick={() => {
						return props.currentData(props.row)
					}}
				/>
			)}
		</div>
	)
}

const DeleteComponent = props => {
	return (
		<div className='data-list-action'>
			<Trash
				style={{
					cursor: 'pointer'
				}}
				size={window.screen.width < 500 ? 13 : 20}
				onClick={() => props.setRow()}
			/>
		</div>
	)
}
const CustomHeader = props => {
	return (
		<div className='data-list-header d-flex justify-content-between'>
			<div className='actions-left d-flex'>
				<DropdownToggle
					color='white'
					className='sort-dropdown mx-50'
					style={{
						height: '75%',
						backgroundColor: 'var(--warning)',
						fontWeight: 'bold'
					}}
					outline
					onClick={() => props.handleSidebar(true, true)}
				>
					<span className='align-middle'>Add</span>
				</DropdownToggle>
			</div>
			<div className='actions-right d-flex'>
				<div className='filter-section'>
					<Input
						type='text'
						style={{
							height: '75%',
							borderRadius: '5rem',
							fontSize: '1rem'
						}}
						onChange={e => props.handleFilter(e)}
						placeholder='Find'
						className='placeholder'
					/>
				</div>
			</div>
			{/* <div className="actions-right d-none">
        <UncontrolledDropdown className="data-list-rows-dropdown d-md-block d-none">
          <DropdownToggle
            color=""
            className="sort-dropdown"
            style={{ height: '75%' }}
          >
            <span className="align-middle mx-50">Count : {props.total}</span>
          </DropdownToggle>
        </UncontrolledDropdown>
      </div> */}
		</div>
	)
}
const conditionalRowStyles = [
	{
		when: row => new Date(row.date) < new Date(),
		style: {
			backgroundColor: '#adadad',
			color: ''
			// '&:hover': {
			//   cursor: 'pointer'
			// }
		}
	}
	// You can also pass a callback to style for additional customization
	// {
	//   when: (row) => row.calories < 300,
	//   style: (row) => ({
	//     backgroundColor: row.isSpecia ? 'pink' : 'inerit'
	//   })
	// }
]
const DataListConfig = props => {
	const [data, setdata] = useState([])
	const [open, setopen] = useState(false)
	const [deleteThisRow, setDeleteRow] = useState('')
	// const [currentPage, setcurrentPage] = useState(0)
	const [allData, setallData] = useState([])
	const [value, setvalue] = useState('')
	const [rowsPerPage, setrowsPerPage] = useState(4)
	const [sidebar, setsidebar] = useState(false)
	const [currentData, setcurrentData] = useState(null)
	const [totalRecords, settotalRecords] = useState(0)
	const [sortIndex, setsortIndex] = useState([])
	const [addNew, setaddNew] = useState('')
	const [isLoading, setisLoading] = useState(false)
	const columns = [
			{
				name: 'Edit',
				cell: function temp(row) {
					return (
						<EditComponent
							row={row}
							getSpendData={props.getSpendData}
							parsedFilter={props.parsedFilter}
							currentData={handleCurrentData}
						/>
					)
				}
			},
			{
				name: 'Item',
				selector: 'item',
				sortable: true,
				minWidth: '200px',
				cell: function temp(row) {
					return (
						<p title={row.item} className='text-truncate text-bold-500 mb-0'>
							{row.item}
						</p>
					)
				}
			},
			{
				name: 'Description',
				selector: 'desc',
				minWidth: '150px',
				sortable: true
				//cell: row => `$${row.price}`
			},
			{
				name: 'Label',
				selector: 'label',
				sortable: true
			},
			{
				name: 'Date',
				minWidth: '200px',
				selector: 'date',
				sortable: true
			},
			{
				name: 'Amount',
				selector: 'amount',
				minWidth: '150px',
				sortable: true
				//cell: row => `$${row.price}`
			},
			{
				name: 'Delete',
				cell: function temp(row) {
					return (
						<DeleteComponent
							row={row}
							setRow={() => {
								setDeleteRow(row)
								setopen(true)
							}}
							getSpendData={props.getSpendData}
							parsedFilter={props.parsedFilter}
						/>
					)
				}
			}
		],
		mobilecolumns = [
			{
				name: 'Info',
				width: '50px',
				cell: function temp(row) {
					return (
						<EditComponent
							row={row}
							getData={props.getSpendData}
							parsedFilter={props.parsedFilter}
							currentData={handleCurrentData}
						/>
					)
				}
			},
			{
				name: 'Item',
				selector: 'item',
				sortable: true,
				minWidth: '50px',
				cell: function temp(row) {
					return (
						<p
							style={{fontSize: '10px'}}
							title={row.item}
							className='text-truncate text-bold-500 mb-0'
						>
							{row.item}
						</p>
					)
				}
			},
			{
				name: 'Amount',
				selector: 'amount',
				maxWidth: '50px',
				sortable: true,
				cell: function temp(row) {
					return (
						<p
							style={{fontSize: '10px'}}
							title={row.amount}
							className='text-truncate text-bold-500 mb-0'
						>
							{row.amount}
						</p>
					)
				}
			},
			{
				name: 'Trash',
				width: '50px',
				cell: function temp(row) {
					return (
						<DeleteComponent
							row={row}
							getSpendData={props.getSpendData}
							parsedFilter={props.parsedFilter}
							setRow={() => {
								setopen(true)
								setDeleteRow(row)
							}}
						/>
					)
				}
			}
		]
	useEffect(() => {
		if (props?.data) {
			setdata(props?.data)
			setallData(props.dataList.allData)
			//totalPages(props.dataList.totalPages)
			// setcurrentPage(parseInt(props.parsedFilter?.page) - 1)
			setrowsPerPage(parseInt(props.parsedFilter?.perPage))
			settotalRecords(props.dataList.totalRecords)
			setsortIndex(props.dataList.sortIndex)
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.data])

	useEffect(() => {
		props.getSpendData(props.parsedFilter)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleFilter = e => {
		setvalue(e.target.value)
		props.filterSpendData(e.target.value)
	}

	const handleRowsPerPage = value => {
		// let { parsedFilter, getSpendData } = props
		// let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		// history.push(`/nominee/list?page=${page}&perPage=${value}`)
		// setrowsPerPage(value)
		// getSpendData({ page: parsedFilter.page, perPage: value })
	}

	const handleSidebar = (boolean, addNew = false) => {
		setsidebar(boolean)
		if (addNew === true) {
			setcurrentData(null)
			setaddNew(true)
		}
	}

	const handleDelete = () => {
		props.deleteSpendData(deleteThisRow)
		props.getSpendData(props.parsedFilter)
	}
	const addData = obj => {
		if (
			obj.name === '' ||
			(obj.relation1 === '' && obj.relation === 'others') ||
			obj.relation === '' ||
			obj.email === '' ||
			obj.date === '' ||
			obj.contact1 === '' ||
			obj.address === ''
		) {
			toast.error('Please Fill All Mandatory Details')
		} else {
			setisLoading(true)
			const userData = localStorage.getItem('logInUserData')
				? JSON.parse(localStorage.getItem('logInUserData'))
				: {}
			const nominee = {
				userId: userData._id,
				item: encryptdata(obj.name),
				label: encryptdata(obj.relation),
				date: obj.date,
				amount: encryptdata(obj.contact1),
				desc: encryptdata(obj.address)
			}
			if (obj.relation === 'others' && obj.relation1)
				nominee.relation = encryptdata(obj.relation1, true)

			axios
				.post('/backendapi/spend/add', nominee, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				})
				.then(res => {
					setisLoading(false)
					toast.success('Spend Added Successfully')
					handleSidebar(false, true)

					props.getSpendData(props.parsedFilter)
				})
				.catch(e => {
					setisLoading(false)
					toast.error('Add Spend Failed! Please contact admin')
				})
		}
	}
	const updateData = obj => {
		if (
			obj.name === '' ||
			(obj.relation1 === '' && obj.relation === 'others') ||
			obj.relation === '' ||
			obj.email === '' ||
			obj.date === '' ||
			obj.contact1 === '' ||
			obj.address === ''
		) {
			toast.error('Please Fill All Mandatory Details')
		} else {
			setisLoading(true)
			const userData = localStorage.getItem('logInUserData')
				? JSON.parse(localStorage.getItem('logInUserData'))
				: {}
			const nominee = {
				_id: obj._id,
				userId: userData._id,
				item: encryptdata(obj.name),
				label: encryptdata(obj.relation1),
				date: obj.date,
				amount: encryptdata(obj.contact1),
				desc: encryptdata(obj.address)
			}
			axios
				.post('/backendapi/spend/update', nominee, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authtoken')}`
					}
				})
				.then(res => {
					setisLoading(false)
					toast.success('Spend Updated Successfully')
					handleSidebar(false, true)

					props.getSpendData(props.parsedFilter)
				})
				.catch(e => {
					setisLoading(false)
					toast.error('Add Nominee Failed! Please contact admin')
				})
		}
	}
	const handleCurrentData = obj => {
		obj.name = obj.item
		obj.relation1 = obj.label
		obj.relation = obj.label
		obj.address = obj.desc
		obj.primaryContact = obj.amount
		setcurrentData(obj)

		handleSidebar(true)
	}
	if (props.listLoading) {
		return (
			<div className='d-flex justify-content-center'>
				<Spinner color='warning' size='lg' />
			</div>
		)
	}
	return (
		<div
			className={`data-list ${props.thumbView ? 'thumb-view' : 'list-view'}`}
		>
			<PopUp
				handleConfirm={() => {
					handleDelete()
					setopen(false)
				}}
				isOpen={open}
				closeModal={() => setopen(false)}
			/>
			<DataTable
				width='200'
				columns={window.screen.width < 500 ? mobilecolumns : columns}
				data={value.length ? data : allData}
				noHeader
				subHeader
				selectableRows={window.screen.width < 500 ? false : false}
				responsive
				pointerOnHover
				selectableRowsHighlight
				conditionalRowStyles={conditionalRowStyles}
				// onSelectedRowsChange={(data) => setselected(data.selectedRows)}
				customStyles={selectedStyle}
				subHeaderComponent={
					<CustomHeader
						handleSidebar={handleSidebar}
						handleFilter={handleFilter}
						handleRowsPerPage={handleRowsPerPage}
						rowsPerPage={rowsPerPage}
						total={totalRecords}
						index={sortIndex}
					/>
				}
				sortIcon={<ChevronDown />}
			/>
			<Sidebar
				show={sidebar}
				data={currentData}
				updateData={updateData}
				addData={addData}
				isLoading={isLoading}
				handleSidebar={handleSidebar}
				thumbView={props.thumbView}
				getSpendData={props.getSpendData}
				dataParams={props.parsedFilter}
				addNew={addNew}
			/>
			<div
				className={classnames('data-list-overlay', {
					show: sidebar
				})}
				onClick={() => handleSidebar(false, true)}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	const {dataList} = state
	const {data} = dataList
	data.map(data => {
		const dateTemp = data?.date?.split('T')
		data.date = dateTemp?.[0]
		return data
	})
	return {
		dataList: state.dataList,
		listLoading: state.dataList.spendLoading,
		data
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteSpendData: state => dispatch(deleteSpendData(state)),
		getSpendData: state => dispatch(getSpendData(state)),
		addData: state => dispatch(addData(state)),
		updateData: state => dispatch(updateData(state)),
		filterSpendData: data => dispatch(filterSpendData(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DataListConfig)
