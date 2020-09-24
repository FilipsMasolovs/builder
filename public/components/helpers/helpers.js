import React from 'react'
import classNames from 'classnames'
import HelperContainer from './lib/HelperContainer'
import Welcome from './lib/welcome'


export default class Helpers extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeStep: 1,
      loaded: false
    }

    this.guideData = {
      'plus-control': {
        heading: 'Add Element',
        description: 'This is your element library. You can add an element to your page by dragging or simply clicking on it.',
        activeStep: this.state.activeStep,
        step: 1
      },
      'hub-control': {
        heading: 'Visual Composer Hub',
        description: 'Access Visual Composer Hub in-built cloud library to download additional elements, templates, add-ons, stock images, and more.',
        activeStep: this.state.activeStep,
        step: 5
      },
      'settings-control': {
        heading: 'On-Page Settings',
        description: 'Change settings of your page or post, modify the layout, add custom CSS and Javascript.',
        activeStep: this.state.activeStep,
        step: 6
      },
      'element-controls': {
        heading: 'Element Controls',
        description: 'Use element controls to see your layout structure or modify the particular row, column, or content element.',
        activeStep: this.state.activeStep,
        step: 2
      },
      'layout-control': {
        heading: 'Responsive View',
        description: 'Check how your page looks on different devices. Select the device type to preview your layout responsiveness.',
        activeStep: this.state.activeStep,
        step: 4
      },
      'bottom-menu': {
        heading: 'Bottom Menu',
        description: 'Use bottom menu to quickly add most popular row/column layouts and elements.',
        activeStep: this.state.activeStep,
        step: 3
      },
      'save-control': {
        heading: 'Publishing Options',
        description: 'Preview, save and publish your content.',
        activeStep: this.state.activeStep,
        step: 7
      }
    }

    // Todo set state when editor is loaded
    window.setTimeout(() => {
      this.setState({ loaded: true})
    }, 2000)



    this.resizeListener = this.resizeListener.bind(this)
    this.setActiveStep = this.setActiveStep.bind(this)

    window.addEventListener('resize', this.resizeListener)
  }

  resizeListener () {
    this.setState({ width: window.innerWidth })
  }

  setActiveStep (step) {
    this.setState({ activeStep: step })
  }

  render () {
    const containerClasses = classNames({
      'vcv-helpers-container': true,
      'vcv-helpers-container--hidden': this.state.activeStep > 7
    })

    const $helpers = document.querySelectorAll('[data-vcv-guide-helper]')
    const items = []

    $helpers.forEach((item) => {
      const boundingRect = item.getBoundingClientRect()
      const left = boundingRect.left
      const top = boundingRect.top
      const width = boundingRect.width
      const height = boundingRect.height

      const helperId = item.getAttribute('data-vcv-guide-helper')

      const helpers = {
        'plus-control': {
          heading: 'Add Element',
          description: 'This is your element library. You can add an element to your page by dragging or simply clicking on it.',
          activeStep: this.state.activeStep,
          step: 1
        },
        'hub-control': {
          heading: 'Visual Composer Hub',
          description: 'Access Visual Composer Hub in-built cloud library to download additional elements, templates, add-ons, stock images, and more.',
          activeStep: this.state.activeStep,
          step: 5
        },
        'settings-control': {
          heading: 'On-Page Settings',
          description: 'Change settings of your page or post, modify the layout, add custom CSS and Javascript.',
          activeStep: this.state.activeStep,
          step: 6
        },
        'element-controls': {
          heading: 'Element Controls',
          description: 'Use element controls to see your layout structure or modify the particular row, column, or content element.',
          activeStep: this.state.activeStep,
          step: 2
        },
        'layout-control': {
          heading: 'Responsive View',
          description: 'Check how your page looks on different devices. Select the device type to preview your layout responsiveness.',
          activeStep: this.state.activeStep,
          step: 4
        },
        'bottom-menu': {
          heading: 'Bottom Menu',
          description: 'Use bottom menu to quickly add most popular row/column layouts and elements.',
          activeStep: this.state.activeStep,
          step: 3,
        },
        'save-control': {
          heading: 'Publishing Options',
          description: 'Preview, save and publish your content.',
          activeStep: this.state.activeStep,
          step: 7
        }
      }
      const helperData = helpers[helperId]

      items.push(
        <HelperContainer
          key={helperId}
          top={top + (height / 2)}
          left={left + width}
          helperData={helperData}
          onClick={this.setActiveStep}
        />
      )
    })

    return (
      <div className={containerClasses}>
        <div className='vcv-helpers-wrapper'>
          {items}
        </div>
      </div>
    )
  }
}
