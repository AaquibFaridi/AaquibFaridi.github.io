import React, {useState, useEffect} from 'react'
import {Input, DropdownToggle, Row, Col} from 'reactstrap'
import PopUp from 'utility/Popup'
import Spinner from 'components/@vuexy/spinner/Fallback-spinner'
import {toast} from 'react-toastify'
import DataTable from 'react-data-table-component'
import classnames from 'classnames'
import {Edit, Info, Trash, ChevronDown} from 'react-feather'
import {connect} from 'react-redux'
import {
	getData,
	deleteData,
	updateData,
	addData,
	filterData
} from 'redux/actions/data-list/'
import 'react-toastify/dist/ReactToastify.css'
import 'assets/scss/plugins/extensions/toastr.scss'
import Sidebar from './NomineeSidebar'
import 'assets/scss/pages/data-list.scss'
import 'assets/scss/components/app-loader.scss'
import {ToastContainer} from 'react-toastify'

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

const DeleteComponent = props => {
	return (
		<div className='data-list-action'>
			<Trash
				style={{
					cursor: props.row.usage?.length ? 'no-drop' : 'pointer'
				}}
				size={window.screen.width < 500 ? 13 : 20}
				onClick={() => {
					!props.row.usage?.length && props.setRow()
				}}
			/>
		</div>
	)
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
						style={{height: '75%', borderRadius: '5rem', fontSize: '1rem'}}
						onChange={e => props.handleFilter(e)}
						placeholder='Find'
						className='placeholder'
					/>
				</div>
			</div>
			{/* <div className="d-none">
        <div className="data-list-rows-dropdown mr-1 d-none">
          <Button.Ripple
            color=""
            className="sort-dropdown"
            style={{ height: '75%' }}
          >
            <span className="align-middle mx-50">Count : {props.total}</span>
          </Button.Ripple>
        </div>
      </div> */}
		</div>
	)
}

const Nominee = props => {
	const columns = [
			{
				name: 'Edit',
				sortable: false,
				minWidth: '110px',
				cell: function EditComp(row) {
					return <EditComponent row={row} currentData={handleCurrentData} />
				}
			},
			{
				name: 'Name',
				selector: 'name',
				sortable: true,
				maxWidth: '240px',
				cell: function EditComp(row) {
					return (
						<p title={row.name} className='text-truncate text-bold-500 mb-0'>
							{row.name}
						</p>
					)
				}
			},
			{
				name: 'Relation',
				selector: 'relation',
				sortable: true,
				width: '170px',
				cell: function EditComp(row) {
					return (
						<p
							title={row?.relation}
							className='text-truncate text-bold-500 mb-0'
						>
							{row?.relation}
						</p>
					)
				}
			},
			{
				name: 'Contact',
				selector: 'primaryContact',
				maxWidth: '170px',
				sortable: true
			},
			{
				name: 'Email',
				maxWidth: '235px',
				selector: 'email',
				sortable: true
			},
			{
				name: 'Status',
				maxWidth: '120px',
				selector: 'unused',
				sortable: true,
				cell: function EditComp(row) {
					return (
						<span className={!row.usage?.length ? 'chipunused' : 'chipused'}>
							{!row.usage?.length ? 'Unused' : 'Used'}
						</span>
					)
				}
			},
			{
				name: '',
				sortable: false,
				width: '110px',
				cell: function EditComp(row) {
					return (
						<DeleteComponent
							row={row}
							setRow={() => {
								setopen(true)
								setdeleteThisRow(row)
							}}
							deleteRow={handleDelete}
						/>
					)
				}
			}
		],
		mobilecolumns = [
			{
				name: 'Info',
				sortable: true,
				width: '50px',
				cell: function EditComp(row) {
					return <EditComponent row={row} currentData={handleCurrentData} />
				}
			},
			{
				name: 'Name',
				selector: 'name',
				sortable: true,
				minWidth: '50px',
				cell: function EditComp(row) {
					return (
						<p
							style={{fontSize: '10px'}}
							title={row.name}
							className='text-truncate text-bold-500 mb-0'
						>
							{row.name}
						</p>
					)
				}
			},
			{
				name: 'Relation',
				selector: 'relation',
				maxWidth: '50px',
				sortable: true,
				cell: function EditComp(row) {
					return (
						<p
							title={row?.relation}
							className='text-truncate text-bold-500 mb-0'
						>
							{row?.relation === 'others' ? row?.relation1 : row?.relation}
						</p>
					)
				}
			},
			{
				name: 'Trash',
				sortable: true,
				width: '50px',
				cell: function EditComp(row) {
					return (
						<DeleteComponent
							row={row}
							currentData={handleCurrentData}
							deleteRow={handleDelete}
						/>
					)
				}
			}
		]
	const [data, setdata] = useState([])
	const [deleteThisRow, setdeleteThisRow] = useState(null)
	const [open, setopen] = useState(false)
	const [allData, setallData] = useState([])
	const [value, setvalue] = useState('')
	const [sidebar, setsidebar] = useState(false)
	const [currentData, setcurrentData] = useState(null)
	const [totalRecords, settotalRecords] = useState(0)
	const [sortIndex, setsortIndex] = useState([])
	const [addNew, setaddNew] = useState('')
	const [isLoading, setisLoading] = useState(false)

	useEffect(() => {
		if (props.dataList.data.length !== data.length) {
			setdata(props.dataList.data)
			setallData(props.dataList.filteredData)
			//settotalPages(props.dataList.totalPages)
			// settotalPages(props.dataList.data.length / 5)
			settotalRecords(props.dataList.totalRecords)
			setsortIndex(props.dataList.sortIndex)
			// setdataLoading(false)
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.dataList])

	useEffect(() => {
		props.getData()
		props.dataTest()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleFilter = e => {
		setvalue(e.target.value)
		props.filterData(e.target.value)
	}

	const handleRowsPerPage = value => {
		// let { parsedFilter, getData } = props
		// let page = parsedFilter?.page !== undefined ? parsedFilter?.page : 1
		// history.push(`/nominee/list?page=${page}&perPage=${value}`)
		// setrowsPerPage(value)
		// getData({ page: parsedFilter?.page, perPage: value })
	}

	const handleSidebar = (boolean, addNew = false) => {
		setsidebar(boolean)
		if (addNew === true) {
			setcurrentData(null)
			setaddNew(addNew)
		}
	}

	const handleDelete = row => {
		props.deleteData(row)
		props.getData()
	}
	const addData = async obj => {
		setisLoading(true)
		try {
			await props.addData(obj)
			setisLoading(false)
			handleSidebar(false, true)
		} catch {
			setisLoading(false)
			toast.error('Add Nominee Failed! Please contact admin')
		}
	}
	const updateData = async obj => {
		if (
			obj.name === '' ||
			obj.relation === '' ||
			obj.email === '' ||
			obj.contact1 === '' ||
			obj.address === ''
		) {
			toast.error('Please Fill All Mandatory Details')
		} else {
			setisLoading(true)
			try {
				await props.updateData(obj)
				props.getData()
				setisLoading(false)
				handleSidebar(false, true)
			} catch {
				setisLoading(false)
				toast.error('Unable to update! Please try again')
			}
		}
	}
	const handleCurrentData = obj => {
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
		<React.Fragment>
			<h2 className='warning spacing nodisplay'>Nominees</h2>
			<Row>
				<ToastContainer />
				<Col sm='12'>
					<div
						className={`data-list ${
							props.thumbView ? 'thumb-view' : 'list-view'
						}`}
					>
						<PopUp
							handleConfirm={() => {
								handleDelete(deleteThisRow)
								setopen(false)
							}}
							isOpen={open}
							closeModal={() => setopen(false)}
						/>
						<DataTable
							width='200'
							columns={window.screen.width < 500 ? mobilecolumns : columns}
							data={value.length ? allData : data}
							noHeader
							subHeader
							selectableRows={window.screen.width < 500 ? false : false}
							responsive
							pointerOnHover
							selectableRowsHighlight
							customStyles={selectedStyle}
							subHeaderComponent={
								<CustomHeader
									className='data-table'
									handleSidebar={handleSidebar}
									handleFilter={handleFilter}
									handleRowsPerPage={handleRowsPerPage}
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
							getData={props.getData}
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
				</Col>
			</Row>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		dataList: state.dataList,
		listLoading: state.dataList.totalRecordsLoading
	}
}
const mapDispatchToProps = dispatch => {
	return {
		deleteData: state => dispatch(deleteData(state)),
		updateData: state => dispatch(updateData(state)),
		addData: state => dispatch(addData(state)),
		getData: state => dispatch(getData(state)),
		filterData: data => dispatch(filterData(data)),
		dataTest: () => dispatch({type: 'GET_ALL_DATA_LOADING', data: true})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nominee)
