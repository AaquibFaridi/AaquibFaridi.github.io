import React from 'react'
import { Card } from 'reactstrap'
import themeConfig from 'configs/themeConfig'
import { ArrowRightCircle } from 'react-feather'

const DashboardCards = (props) => {
  const Dark = themeConfig.theme === 'dark'

  const addClass = () => {
    document
      .getElementById(`back-image-${props.index}`)
      .classList.add('back-image-scale')
    document
      .getElementById(`card-title-${props.index}`)
      .classList.add('card-title-div-up')
    document
      .getElementById(`description-div-${props.index}`)
      .classList.add('description-div-up')
    document.getElementById(`card-title-no-${props.index}`).style.color = Dark
      ? 'white'
      : 'white'
  }
  const removeClass = () => {
    document
      .getElementById(`back-image-${props.index}`)
      .classList.remove('back-image-scale')
    document
      .getElementById(`card-title-${props.index}`)
      .classList.remove('card-title-div-up')
    document
      .getElementById(`description-div-${props.index}`)
      .classList.remove('description-div-up')
    document.getElementById(`card-title-no-${props.index}`).style.color = Dark
      ? 'white'
      : 'black'
  }

  const colorDecide = (title) => {
    if (title === 'Daily Spends' || title === 'Documents') {
      return 'rgb(197, 248, 242)'
    } else if (
      title === 'Secret Diary' ||
      title === 'Portfolio' ||
      title === 'Sender' ||
      title === 'Liabilties'
    ) {
      return '#bdd0fb'
    } else if (title === 'Nominees') {
      return '#ffffff'
    } else {
      return '#c796ef'
    }
  }

  return (
    <Card
      className="whole-card"
      onMouseEnter={addClass}
      onMouseLeave={removeClass}
    >
      <div
        id={`back-image-${props.index}`}
        className={
          Dark
            ? 'back-image-dark back-image-dark-normal'
            : 'back-image back-image-normal'
        }
        style={{
          backgroundImage: `url(${props.background})`,
          backgroundSize: (() => {
            if (props.stat === 'Assets') {
              return '220px'
            } else if (props.stat === 'Vault') {
              return '220px'
            } else if (props.stat === 'Nominees') {
              return '185px'
            } else if (props.stat === 'Daily Spends') {
              return '185px'
            } else if (props.stat === 'Documents') {
              return '210px'
            } else if (props.stat === 'Sender') {
              return '250px'
            }
          })(),
          backgroundPosition: (() => {
            if (props.stat === 'Vault') {
              return '125px'
            } else if (props.stat === 'Nominees') {
              return '165px'
            } else if (props.stat === 'Daily Spends') {
              return '175px'
            } else if (props.stat === 'Secret Diary') {
              return '165px'
            } else if (props.stat === 'Sender') {
              return '110px'
            } else if (props.stat === 'Assets') {
              return '125px'
            }
          })()
        }}
      />
      <div className="card-title-div" id={`card-title-${props.index}`}>
        <span
          id={`card-title-no-${props.index}`}
          style={{ color: Dark ? 'white' : 'black' }}
          className="card_title"
        >
          {props.stat}
        </span>
      </div>
      <div
        className="description-div d-flex justify-content-between"
        id={`description-div-${props.index}`}
        style={{
          backgroundColor: colorDecide(props.stat)
        }}
      >
        <div>
          <h2
            className="card_description"
            style={{ color: Dark ? 'black' : 'black' }}
          >
            {props.statTitle}
          </h2>
        </div>
        <div
          style={{
            padding: '15px'
          }}
        >
          <ArrowRightCircle
            style={{
              height: '2.5rem',
              width: '2.5rem'
            }}
          />
        </div>
      </div>
    </Card>
  )
}
export default DashboardCards
