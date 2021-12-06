/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
//import PropTypes from 'prop-types'
import {Row, Col} from 'reactstrap'
import Logo from 'assets/img/logo/favrm.png'
import './typewriter.css'
import {Plans} from './Plans'
import {Features} from './Features'
import {DownloadOptions} from './DownloadOptions'
import {WhyUs} from './WhyUs'
import {connect} from 'react-redux'

const AlwaysOn = props => {
	// const deviceWidth = useWindowSize().width
	// const deviceWidth = window.innerWidth

	const {
		plan,
		setplan,
		why,
		setwhy,
		feature,
		setfeature,
		download,
		msgAlwayson,
		featuresDashboard
	} = props
	// const { msg1, msg2, msg3, msg4, msg5 } = msgAlwayson
	const getStyle = check => {
		return `"btn-block" ${check ? 'tempFeaturetrue' : 'tempFeaturefalse'}`
	}
	const handleME = check => {
		switch (check) {
			case 'x':
				setplan(false)
				setfeature(true)
				setwhy(false)
				break
			case 'y':
				setplan(false)
				setfeature(false)
				setwhy(true)
				break
			case 'z':
				setplan(true)
				setfeature(false)
				setwhy(false)
				break
			default:
				return
		}
	}
	return (
		<div
			className='why-menu-option animate'
			id='AlwaysOn'
			style={{
				textAlign: 'center',
				height: 'fit-content'
			}}
		>
			<div className='video_placeholder'>
				<Row
					className='pt-3'
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<img
						alt='logo'
						style={{marginRight: '5px', height: '50px', background: 'white'}}
						className='brand-logo'
						height='25'
						src={Logo}
					/>
					<h2
						className='brand-text mb-0'
						style={{
							fontWeight: '600',
							fontSize: '50px',
							color: 'black'
						}}
					>
						Last Arzi
					</h2>
				</Row>
				<Row className='pt-2'>
					<Col
						style={{
							margin: '10px auto',
							color: 'white',
							fontSize: 'large',
							fontWeight: 'bold'
						}}
						className='typewriter pr-50'
					>
						What{' '}
						<span
							style={{
								fontWeight: 'bold',
								color: 'black'
							}}
						>
							WILL
						</span>{' '}
						you leave behind
						<span style={{color: 'black'}}> ...</span>
					</Col>
				</Row>
			</div>
			{/* {deviceWidth > 500 ? (
        <Row style={{ height: '420px' }}>
          <Col className="messagegAlwayson">
            <p style={{ color: 'black' }}>
              {msg1 || `Last action before you bid good-bye`}
            </p>
            <p className="mt-2" style={{ color: 'black' }}>
              {msg2 || `You might not have control over your last moment,`}
              <br />
              {msg3 || `But now you can control your last acton in this world`}
            </p>
            <p className="mt-2" style={{ color: 'black' }}>
              {msg4 ||
                `Leave behind a peaceful world, free from family disputes`}
            </p>
            <p className="mt-2" style={{ color: 'black' }}>
              {msg5 || `That's what we say, Rest In Peace`}
            </p>
          </Col>
          <Col
            className="messagegAlwayson"
            style={{
              backgroundColor: '#ffebd2'
            }}
          >
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img
                alt="logo"
                style={{ marginRight: '5px', height: '50px' }}
                className="brand-logo"
                height="25"
                src={Logo}
              />
              <h2
                className="brand-text mb-0"
                style={{
                  fontWeight: '600',
                  fontSize: '50px',
                  color: 'black'
                }}
              >
                Last Arzi
              </h2>
            </Row>
            <Row>
              <Col
                style={{
                  margin: '10px auto'
                }}
                className="typewriter pr-50"
              >
                What{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'var(--warning)'
                  }}
                >
                  WILL
                </span>{' '}
                you leave behind
                <span style={{ color: 'var(--warning)' }}> ...</span>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Col style={{ height: '600px' }}>
          <Row className="la_title">
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img
                alt="logo"
                style={{ marginRight: '5px', height: '50px' }}
                className="brand-logo"
                height="25"
                src={Logo}
              />
              <h2
                className="brand-text mb-0"
                style={{
                  fontWeight: '600',
                  fontSize: '50px',
                  color: 'black'
                }}
              >
                Last Arzi
              </h2>
            </Row>

            <Row
              style={{
                margin: '10px auto'
              }}
              className="typewriter pr-50"
            >
              What&nbsp;
              <span
                style={{
                  fontWeight: 'bold',
                  color: 'var(--warning)'
                }}
              >
                WILL&nbsp;
              </span>
              you leave behind
              <span style={{ color: 'var(--warning)' }}> ...</span>
            </Row>
          </Row>
          <Row
            className="messagegAlwayson"
            style={{
              height: '60%',
              padding: '0px 10px'
            }}
          >
            <p style={{ color: 'black' }}>
              Last action before you bid good-bye
            </p>
            <p className="mt-2" style={{ color: 'black' }}>
              You might not have control over your last moment,
              <br />
              But now you can control your last acton in this world
            </p>
            <p className="mt-2" style={{ color: 'black' }}>
              Leave behind a peaceful world, free from family disputes
            </p>
            <p className="mt-2" style={{ color: 'black' }}>
              That`s what we say, Rest In Peace
            </p>
          </Row>
        </Col>
      )} */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					margin: '30px 0'
				}}
			>
				<div className={getStyle(why)} onClick={() => handleME('y')}>
					Why US
				</div>
				<div className={getStyle(feature)} onClick={() => handleME('x')}>
					Feature
				</div>
				<div className={getStyle(plan)} onClick={() => handleME('z')}>
					Plans
				</div>
			</div>
			<div>
				{why && <WhyUs {...msgAlwayson} />}
				{feature && <Features {...featuresDashboard} />}
				{plan && <Plans {...msgAlwayson} />}
				{download && <DownloadOptions {...msgAlwayson} />}
			</div>
		</div>
	)
}
const mapStateToProps = state => {
	const {
		customizer: {language: {AlwaysOn = {}, Dashboard = {}} = {}}
	} = state?.customizer
	return {
		msgAlwayson: AlwaysOn ? AlwaysOn : {},
		featuresDashboard: Dashboard ? Dashboard : {}
	}
}
export default connect(mapStateToProps)(AlwaysOn)
