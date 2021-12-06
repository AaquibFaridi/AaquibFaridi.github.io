import React, {useEffect, useState} from 'react'
import {Check} from 'react-feather'
import DataTable from 'react-data-table-component'
import 'assets/scss/plugins/extensions/dropzone.scss'

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
// const user = JSON.parse(localStorage.getItem('logInUserData'))

const NotificationTab = () => {
	const columns = [
		{
			title: 'title',
			selector: 'title',
			sortable: false
		},
		{
			name: 'check',
			sortable: false,
			width: '50px',
			cell: function temp(row) {
				return (
					<div className='data-list-action'>
						<Check
							className='cursor-pointer'
							size={window.screen.width < 500 ? 13 : 20}
							onClick={() => {
								markAsRead(row)
							}}
						/>
					</div>
				)
			}
		}
	]
	const [notificationList, setnotificationList] = useState([])
	// const [mobile, setmobile] = useState(user?.mobile)
	// const [email, setemail] = useState(user?.email)

	useEffect(() => {
		const notifications = []
		const notification1 = {
			title: 'test title 1',
			status: 0,
			id: 'testid1',
			description: 'THis is test description',
			createdOn: new Date()
		}
		notifications.push(notification1)
		const notification2 = {
			title: 'test title 1',
			status: 0,
			id: 'testid2',
			description: 'THis is test description',
			createdOn: new Date()
		}
		notifications.push(notification2)
		const notification3 = {
			title: 'test title 1',
			status: 0,
			id: 'testid3',
			description: 'THis is test description',
			createdOn: new Date()
		}
		notifications.push(notification3)

		setnotificationList(notifications)
	}, [])

	const markAsRead = data => {
		if (data.id !== null) {
			const notifications = [...notificationList]
			const rowIndex = notifications.findIndex(
				resource => resource.key === data.id
			)
			notifications.splice(rowIndex, 1)
			setnotificationList(notifications)
		}
	}

	// const postContactUsForm = (e) => {
	//   e.preventDefault()
	//   this.setState({ saveButtonText: 'Saving ...' })
	//   let { firstname, middlename, lastname, mobile } = this.state
	//   let user = JSON.parse(localStorage.getItem('logInUserData'))
	//   user.salutation = salutation
	//   user.name = firstname + ' ' + middlename + ' ' + lastname
	//   user.mobile = mobile
	//   localStorage.setItem('logInUserData', JSON.stringify(user))
	//   axios
	//     .post('/backendapi/adddetails', user, {
	//       headers: {
	//         Authorization: 'Bearer ' + localStorage.getItem('authtoken')
	//       }
	//     })
	//     .then((res) => {
	//       console.log('aaa')
	//     })
	//     .catch()
	// }

	return (
		<>
			<DataTable
				title='Updates'
				width='200'
				columns={columns}
				data={notificationList}
				noTableHead
				selectableRows={false}
				responsive
				pointerOnHover
				selectableRowsHighlight
				onSelectedRowsChange={data => null}
				customStyles={selectedStyle}
			/>
		</>
	)
}
export default NotificationTab
