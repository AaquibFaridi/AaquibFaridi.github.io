import React from 'react'
//import PropTypes from 'prop-types'
import { Table, CardHeader, CardTitle } from 'reactstrap'

const Summary = ({ setplan, plan }) => {
  const premiumPlan = (data) => {
    return (
      <Table>
        <tbody>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Assets
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Liabilities
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Secret Diary
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Daily Spends
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Password Vault
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Document Locker
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Declare Nominees
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Record Audio/Video messages
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
          <tr>
            <th scope="row" style={{ padding: '0.4rem' }}>
              Get legal help for will generation
            </th>
            <td style={{ padding: '0.4rem' }}>
              {data?.b ? 10 : data?.a ? 50 : 'Unlimited'}
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
  return (
    <div
      className={
        window.screen.width <= 500
          ? 'd-block justify-content-around mt-0 col'
          : 'd-flex justify-content-around mt-0 row'
      }
    >
      <div
        className={window.screen.width <= 500 ? 'row' : 'col'}
        style={{
          border: plan === 399 ? '3px solid #ff9f43' : '3px solid #e3e3e3',
          cursor: 'pointer ',
          borderRadius: '15px',
          padding: '10px',
          maxWidth: '350px'
        }}
        onClick={() => {
          setplan(399)
        }}
      >
        <CardHeader
          style={{
            justifyContent: 'center',
            padding: '3px',
            borderRadius: '10px'
          }}
        >
          <CardTitle
            style={{
              color: plan === 399 ? '#ff9f43' : '#b8c2cc'
            }}
          >
            Basic Plan
          </CardTitle>
        </CardHeader>
        {premiumPlan({ b: 'b' })}
      </div>
      <div
        className={window.screen.width <= 500 ? 'mt-0 row' : 'col'}
        style={{
          border: plan === 999 ? '3px solid #ff9f43' : '3px solid #e3e3e3',
          cursor: 'pointer ',
          borderRadius: '15px',
          padding: '10px',
          maxWidth: '350px'
        }}
        onClick={() => {
          setplan(999)
        }}
      >
        <CardHeader
          style={{
            justifyContent: 'center',
            padding: '3px',
            borderRadius: '10px'
          }}
        >
          <CardTitle
            style={{
              color: plan === 999 ? '#ff9f43' : '#b8c2cc'
            }}
          >
            Premium Plan
          </CardTitle>
        </CardHeader>
        {premiumPlan()}
      </div>
      <div
        className={window.screen.width <= 500 ? 'mt-0 row' : 'col'}
        style={{
          border: plan === 699 ? '3px solid #ff9f43' : '3px solid #e3e3e3',
          cursor: 'pointer ',
          borderRadius: '15px',
          padding: '10px',
          maxWidth: '350px'
        }}
        onClick={() => {
          setplan(699)
        }}
      >
        <CardHeader
          style={{
            justifyContent: 'center',
            background: plan === 699 ? '#ff9f43' : '#b8c2cc',
            padding: '3px',
            borderRadius: '10px'
          }}
        >
          <CardTitle
            style={{
              color: plan === 699 ? '#ff9f43' : '#b8c2cc'
            }}
          >
            Advanced Plan
          </CardTitle>
        </CardHeader>
        {premiumPlan({ a: 'a' })}
      </div>
    </div>
  )
}
export default Summary
