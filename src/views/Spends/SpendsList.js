import React from 'react'
//import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import SpendsListConfig from './SpendsListConfig'
import queryString from 'query-string'
import { ToastContainer } from 'react-toastify'
const SpendsList = (props) => {
  return (
    <React.Fragment>
      <h2 className="warning spacing nodisplay">Daily Spends</h2>
      <Row>
        <ToastContainer />
        <Col sm="12">
          <SpendsListConfig
            parsedFilter={queryString.parse(props.location.search)}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default SpendsList
