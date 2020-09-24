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
    const helperClasses = classNames({
      'vcv-helper-wrapper': true
    })

    const iconClasses = classNames({
      'vcv-ui-icon': true,
      'vcv-ui-icon-question': true,
      'vcv-ui-icon-selected': this.props.helperData.activeStep === this.props.helperData.step
    })

    const styleProps = {
      left: this.props.left,
      top: this.props.top
    }

    let buttonText = 'Next Tip'
    if (this.props.helperData.activeStep === 7) {
      buttonText = 'Done!'
    }
    let helperContent = null
    if (this.props.helperData.activeStep === this.props.helperData.step) {
      helperContent = (
        <div className={helperClasses}>
          <h2 className='vcv-helper-container-heading'>{this.props.helperData.heading}</h2>
          <p className='vcv-helper-container-description'>{this.props.helperData.description}</p>
          <div className='vcv-helper-container-actions'>
            <span className='vcv-helper-container-done'>Done?</span>
            <span
              className='vcv-helper-container-skip'
              onClick={() => { this.props.onClick(8) }}
            >
              Click here to skip
            </span>
            <button
              className='vcv-helper-container-next'
              onClick={() => { this.props.onClick(this.props.helperData.step + 1) }}
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
        <div className="vcv-helper-container-image element-controls"></div>
      )
    } else if (this.props.helperData.step === 3) {
      helperImage = (
        <div className="vcv-helper-container-image bottom-menu"></div>
      )
    }

    return (
      <div className='vcv-helper-container' style={styleProps}>
        <i
          className={iconClasses}
          onClick={() => { this.props.onClick(this.props.helperData.step ) }}
        />
        {helperContent}
        {helperImage}
      </div>
    )
  }
}
