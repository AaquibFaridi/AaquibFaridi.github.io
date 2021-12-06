import React, {useState} from 'react'
import axios from 'axios'
import {Button} from 'reactstrap'
import Logo from 'assets/img/logo/favrm.png'
import {Plans} from 'views/LandingPage/Plans'

const loadScript = src => {
	return new Promise(resolve => {
		const script = document.createElement('script')
		script.src = src
		document.body.appendChild(script)
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
	})
}
const src = 'https://checkout.razorpay.com/v1/checkout.js'
const Payments = props => {
	const [plan, setplan] = useState(999)
	// const [planType, setplanType] = useState('')
	const domain = document.domain === 'lastarzi.com'
	const {loc} = props // user detail to show plans
	const displayRazorpay = async data => {
		const {amount, id} = data
		const res = await loadScript(src)
		if (!res) return alert('Loading Failed')
		const options = {
			key: !domain ? 'rzp_test_ppuCw11USIQQym' : 'unavailable',
			amount: amount?.toString(), //min currency unit,e.g. paise for INR
			currency: 'INR',
			name: 'LastArzi',
			description: 'Pay Dev',
			image: Logo,
			order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
			prefill: {
				name: 'Vipin Kumar',
				email: 'vksforum@gmail.com',
				contact: '9458706129'
			},
			notes: {
				address: 'LastArzi Corporate Office'
			},
			theme: {
				color: '#FF9F43'
			}
		}

		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	const createOrderRazorpay = async () => {
		const body = {
			amount: plan ? plan * 100 : 100,
			currency: 'INR',
			receipt: 'Receipt no. 1',
			payment_capture: 1,
			notes: {
				notes_key_1: 'Tea, Earl Grey, Hot',
				notes_key_2: 'Tea, Earl Grey… decaf.'
			}
		}
		var config = {
			method: 'post',
			url: '/backendapi/createorder',
			data: body
		}
		axios(config)
			.then(response => {
				displayRazorpay(response.data)
			})
			.catch(() => {
				alert('Failed api')
				return
			})
	}
	return (
		<>
			<Plans plan={plan} setplan={setplan} subs />
			<div className='d-flex justify-content-center flex-wrap mt-2'>
				{!loc && (
					<Button.Ripple
						color='warning'
						onClick={e => {
							createOrderRazorpay()
						}}
					>
						Pay Now <b>Rs. {plan}</b>
					</Button.Ripple>
				)}
			</div>
		</>
	)
}

export default Payments
