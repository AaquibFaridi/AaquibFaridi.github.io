// import React, {useState} from 'react'
import React from 'react'
// import PlansSummary from './PlansSummary'
import themeConfig from 'configs/themeConfig'
import './typewriter.css'
import {Table} from 'reactstrap'

const Dark = themeConfig.theme === 'dark'

export const Plans = props => {
	// const [modal, setModal] = useState('')
	// const plans = [
	// 	{
	// 		id: '1',
	// 		title: 'Basic',
	// 		priceColor: 'var(--success)',
	// 		price: 'Free',
	// 		message: 'This is our Basic Plan'
	// 	},
	// 	{
	// 		id: '2',
	// 		title: 'Advance',
	// 		priceColor: 'var(--danger)',
	// 		price: 'Coming Soon',
	// 		message: 'This is our Advance Plan'
	// 	},
	// 	{
	// 		id: '3',
	// 		title: 'Premium',
	// 		priceColor: 'var(--danger)',
	// 		price: 'Coming Soon',
	// 		message: 'This is our Premiun Plan',
	// 		color: '#FFD700'
	// 	}
	// ]

	// const quantity = {
	//   1: {
	//     Assets: '10',
	//     Liabilities: '10',
	//     'Secret Diary': '10',
	//     'Daily Spends': '10',
	//     'Password Vault': '10',
	//     'Document Locker': '10',
	//     'Declare Nominee': '10',
	//     'Record Audio/Video Messages': null,
	//     'Get legal help for will generation': null
	//   },
	//   2: {
	//     Assets: '50',
	//     Liabilities: '50',
	//     'Secret Diary': '50',
	//     'Daily Spends': '50',
	//     'Password Vault': '50',
	//     'Document Locker': '50',
	//     'Declare Nominee': '50',
	//     'Record Audio/Video Messages': '50',
	//     'Get legal help for will generation': null
	//   },
	//   3: {
	//     Assets: 'No Limit',
	//     Liabilities: 'No Limit',
	//     'Secret Diary': 'No Limit',
	//     'Daily Spends': 'No Limit',
	//     'Password Vault': 'No Limit',
	//     'Document Locker': 'No Limit',
	//     'Declare Nominee': 'No Limit',
	//     'Record Audio/Video Messages': 'No Limit',
	//     'Get legal help for will generation': 'No Limit'
	//   }
	// }

	// const showPlan = value => {
	// 	setModal(value)
	// }

	return (
		<div
			className='plan-menu-option'
			style={{
				animation: props.subs && 'none',
				backgroundColor: Dark ? '#21212a' : 'white'
			}}
			id='plan'
		>
			<Table
				borderless
				responsive
				className='m-0'
				style={{backgroundColor: 'transparent'}}
			>
				<thead>
					<tr>
						<th className='table_Topic'>Breakups</th>
						<th className='table_Basic'>Basic</th>
						<th className='table_Premium'>Premium</th>
						<th className='table_Elite'>Elite</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='table_topic'>Attachments</td>
						<td className='table_basic'>10 (1 MB each)</td>
						<td className='table_premium'>25 (5 MB each)</td>
						<td className='table_elite'>Unlimited (1 MB each)</td>
					</tr>
					<tr>
						<td className='table_topic'>Recordings</td>
						<td className='table_basic'>10 (2.5 MB each)</td>
						<td className='table_premium'>25 (25 MB each)</td>
						<td className='table_elite'>50 (50 MB each)</td>
					</tr>
					<tr>
						<td className='table_topic'>Legal Will</td>
						<td className='table_basic'>No</td>
						<td className='table_premium'>No</td>
						<td className='table_elite'>Supported</td>
					</tr>
					<tr>
						<td className='table_Topic'>Subscription Fees (per month)</td>
						<td className='table_Basic'>Free</td>
						<td className='table_Premium'>&#8377; 149</td>
						<td className='table_Elite'>&#8377; 249</td>
					</tr>
				</tbody>
			</Table>
			{/* <PlansSummary
        modal={modal}
        setModal={setModal}
        plans={plans}
        quantity={quantity}
      /> */}
			{/* {plans.map((item) => {
        return (
          <div key={item.id} className="plan_container">
            <div
              className="plan_title"
              style={{
                color: (() => {
                  if (item.color) {
                    return item.color
                  } else {
                    if (Dark) {
                      return 'white'
                    } else {
                      return 'black'
                    }
                  }
                })()
              }}
            >
              {item.title}
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="plan_price" style={{ color: item.priceColor }}>
                {(() => {
                  if (item.title === 'Basic') {
                    if (props.subs) {
                      return 'Active'
                    } else {
                      return item.price
                    }
                  } else {
                    return item.price
                  }
                })()}
              </div>
              <div className="know_more" onClick={() => showPlan(item.id)}>
                Know More...
              </div>
            </div>
          </div>
        )
      })} */}
		</div>
	)
}
