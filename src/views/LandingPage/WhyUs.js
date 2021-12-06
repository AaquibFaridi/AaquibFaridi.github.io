/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import themeConfig from 'configs/themeConfig'
import './typewriter.css'
import {Row, Col} from 'reactstrap'

const Dark = themeConfig.theme === 'dark'

export const WhyUs = props => {
	const {msg1, msg2, msg3, msg4, msg5} = props
	return (
		<div
			className='why-menu-option'
			id='whyUs'
			style={{
				backgroundColor: Dark ? '#21212a' : 'white'
			}}
		>
			<Row style={{height: '200px'}}>
				<Col className='messagegAlwayson'>
					<p style={{color: 'black'}}>
						{msg1 || `Last action before you bid good-bye`}
					</p>
					<p className='mt-2' style={{color: 'black'}}>
						{msg2 || `You might not have control over your last moment,`}
						<br />
						{msg3 || `But now you can control your last acton in this world`}
					</p>
					<p className='mt-2' style={{color: 'black'}}>
						{msg4 || `Leave behind a peaceful world, free from family disputes`}
					</p>
					<p className='mt-2' style={{color: 'black'}}>
						{msg5 || `That's what we say, Rest In Peace`}
					</p>
				</Col>
			</Row>
		</div>
	)
}
