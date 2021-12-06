import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'
import classnames from 'classnames'
import { ChevronRight } from 'react-feather'
import { FormattedMessage } from 'react-intl'

const SideMenuGroup = (props) => {
  let flag = true
  const parentArray = []
  let childObj = {}
  const activeItem = props.activePath
  const {
    activePath,
    collapsedMenuPaths,
    activeItemState,
    parentArr,
    currentUser,
    hoverIndex,
    currentActiveGroup,
    deviceWidth,
    toggleMenu,
    handleSidebarMouseEnter,
    redirectUnauthorized,
    group,
    activeGroup,
    handleGroupClick
  } = props

  useEffect(() => {
    if (activePath !== activeItem) {
      if (childObj.navLink && childObj.collapsed) {
        collapsedMenuPaths(childObj.navLink)
      }
      if (
        activePath === childObj.navLink &&
        !parentArr.includes(parentArray[0])
      ) {
        parentArr.splice(0, parentArr.length)
        parentArr.push(parentArray)
      } else if (parentArr.includes(parentArray)) {
        parentArr.splice(0, parentArr.length)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath])

  const renderChild = (
    item,
    activeGroup,
    handleGroupClick,
    handleActiveItem,
    parent
  ) => {
    return (
      <ul className="menu-content">
        {item.children
          ? item.children.map((child) => {
              const CustomAnchorTag =
                child.type === 'external-link' ? `a` : Link
              if (!parentArray.includes(item.id) && flag) {
                parentArray.push(item.id)
              }

              if (child.navlink && child.collapsed) {
                collapsedMenuPaths(child.navLink)
              }

              if (activeItemState === child.navLink) {
                childObj = child
                parentArr.push(parentArray)
                flag = false
              }
              if (
                (child.permissions &&
                  child.permissions.includes(currentUser)) ||
                child.permissions === undefined
              ) {
                return (
                  <li
                    key={child.id}
                    className={classnames({
                      hover: hoverIndex === child.id,
                      'has-sub': child.type === 'collapse',
                      open:
                        child.type === 'collapse' &&
                        activeGroup.includes(child.id),
                      'sidebar-group-active': currentActiveGroup.includes(
                        child.id
                      ),
                      active:
                        (activeItemState === child.navLink &&
                          child.type === 'item') ||
                        (item.parentOf &&
                          item.parentOf.includes(activeItemState)),
                      disabled: child.disabled
                    })}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGroupClick(child.id, item.id, child.type)
                      if (child.navLink && child.navLink !== undefined) {
                        handleActiveItem(child.navLink)
                      }
                      if (deviceWidth <= 1200 && child.type === 'item') {
                        toggleMenu()
                      }
                    }}
                  >
                    <CustomAnchorTag
                      className={classnames({
                        'd-flex justify-content-between':
                          child.type === 'collapse'
                      })}
                      to={
                        child.navLink && child.type === 'item'
                          ? child.navLink
                          : ''
                      }
                      href={child.type === 'external-link' ? child.navLink : ''}
                      onMouseEnter={() => {
                        handleSidebarMouseEnter(child.id)
                      }}
                      onMouseLeave={() => {
                        handleSidebarMouseEnter(child.id)
                      }}
                      key={child.id}
                      onClick={(e) => {
                        return child.type === 'collapse'
                          ? e.preventDefault()
                          : ''
                      }}
                      target={child.newTab ? '_blank' : undefined}
                    >
                      <div className="menu-text">
                        {child.icon}
                        <span className="menu-item menu-title">
                          <FormattedMessage
                            id={child.title}
                            defaultMessage={child.title}
                          />
                        </span>
                      </div>
                      {child.badge ? (
                        <Badge
                          color={child.badge}
                          className="float-right mr-2"
                          pill
                        >
                          {child.badgeText}
                        </Badge>
                      ) : (
                        ''
                      )}
                      {child.type === 'collapse' ? (
                        <ChevronRight className="menu-toggle-icon" size={13} />
                      ) : (
                        ''
                      )}
                    </CustomAnchorTag>

                    {child.children
                      ? renderChild(
                          child,
                          activeGroup,
                          handleGroupClick,
                          handleActiveItem,
                          item.id
                        )
                      : ''}
                  </li>
                )
              } else if (
                child.navLink === activePath &&
                !child.permissions.includes(currentUser)
              ) {
                return redirectUnauthorized()
              } else {
                return null
              }
            })
          : null}
      </ul>
    )
  }
  return (
    <React.Fragment>
      {renderChild(
        group,
        activeGroup,
        handleGroupClick,
        props.handleActiveItem,
        null
      )}
    </React.Fragment>
  )
}
export default SideMenuGroup
