import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class HelperContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeStep: false
    }
  }

  static propTypes = {
    heading: PropTypes.string,
    description: PropTypes.string
  }

  render () {
    const { onActiveChange, onNextClick, onCloseGuide, isActive, isLast } = this.props
    const helperClasses = classNames({
      'vcv-helper-wrapper': true
    })

    const iconClasses = classNames({
      'vcv-ui-icon': true,
      'vcv-ui-icon-question': true,
      'vcv-ui-icon-selected': isActive
    })

    const styleProps = {
      left: this.props.left,
      top: this.props.top
    }

    let buttonText = 'Next Tip'
    if (isLast) {
      buttonText = 'Done!'
    }
    let helperContent = null
    if (isActive) {
      helperContent = (
        <div className={helperClasses}>
          <h2 className='vcv-helper-container-heading'>{this.props.helperData.heading}</h2>
          <p className='vcv-helper-container-description'>{this.props.helperData.description}</p>
          <div className='vcv-helper-container-actions'>
            <span className='vcv-helper-container-done'>Done?</span>
            <span
              className='vcv-helper-container-skip'
              onClick={onCloseGuide}
            >
              Click here to skip
            </span>
            <button
              className='vcv-helper-container-next'
              onClick={isLast ? onCloseGuide : onNextClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )
    }

    let helperImage = null
    if (this.props.helperData.step === 2) {
      helperImage = (
        <div className='vcv-helper-container-image element-controls' />
      )
    } else if (this.props.helperData.step === 3) {
      helperImage = (
        <div className='vcv-helper-container-image bottom-menu' />
      )
    }

    return (
      <div className='vcv-helper-container' style={styleProps}>
        <i
          className={iconClasses}
          onClick={onActiveChange.bind(this, this.props.helperData.step)}
        />
        {helperContent}
        {helperImage}
      </div>
    )
  }
}
