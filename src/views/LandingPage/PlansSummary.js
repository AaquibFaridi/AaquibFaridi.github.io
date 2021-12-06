import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { X } from 'react-feather'
import themeConfig from 'configs/themeConfig'

const Dark = themeConfig.theme === 'dark'

const Summary = (props) => {
  const { modal, plans, setModal, quantity } = props
  const [service, setService] = useState([])

  useEffect(() => {
    modal && setService(Object.entries(quantity[modal]))
  }, [modal, quantity])

  return (
    <>
      <Modal isOpen={modal} centered toggle={() => setModal(null)}>
        {plans.map((item) => {
          return (
            modal === item.id && (
              <>
                <ModalHeader toggle={() => setModal(null)}>
                  <h3 style={{ color: item.color ? item.color : '' }}>
                    {item.title} Plan -{' '}
                    <span style={{ color: item.priceColor }}>{item.price}</span>
                  </h3>
                </ModalHeader>
                <ModalBody>
                  <h4>{item.message}</h4>
                  <div className="mt-1">
                    {modal &&
                      service.map(([key, val], index) => {
                        return (
                          <div
                            key={index}
                            className="d-flex justify-content-between value_container"
                          >
                            <div className="d-flex justify-content-center align-items-center">
                              {key}
                            </div>
                            <div
                              className="d-flex justify-content-center align-items-center"
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
                              {val ? val : <X />}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </ModalBody>
              </>
            )
          )
        })}
      </Modal>
    </>
  )
}
export default Summary
