import React from 'react'
import classNames from 'classnames'
import HelperContainer from './lib/HelperContainer'
import Welcome from './lib/welcome'

export default class Helpers extends React.Component {
  helpers = {
    'plus-control': {
      heading: 'Add Element',
      description: 'This is your element library. You can add an element to your page by dragging or simply clicking on it.',
      step: 1
    },
    'element-controls': {
      heading: 'Element Controls',
      description: 'Use element controls to see your layout structure or modify the particular row, column, or content element.',
      step: 2
    },
    'bottom-menu': {
      heading: 'Bottom Menu',
      description: 'Use bottom menu to quickly add most popular row/column layouts and elements.',
      step: 3,
    },
    'layout-control': {
      heading: 'Responsive View',
      description: 'Check how your page looks on different devices. Select the device type to preview your layout responsiveness.',
      step: 4
    },
    'hub-control': {
      heading: 'Visual Composer Hub',
      description: 'Access Visual Composer Hub in-built cloud library to download additional elements, templates, add-ons, stock images, and more.',
      step: 5
    },
    'settings-control': {
      heading: 'On-Page Settings',
      description: 'Change settings of your page or post, modify the layout, add custom CSS and Javascript.',
      step: 6
    },
    'save-control': {
      heading: 'Publishing Options',
      description: 'Preview, save and publish your content.',
      step: 7
    }
  }
  visibleItems = []

  constructor (props) {
    super(props)
    this.state = {
      activeStep: 1,
      isGuideVisible: true,
      loaded: false
    }

    // Todo set state when editor is loaded
    window.setTimeout(() => {
      this.setState({ loaded: true})
    }, 2000)

    this.resizeListener = this.resizeListener.bind(this)
    this.setActiveStep = this.setActiveStep.bind(this)
    this.setNextActiveStep = this.setNextActiveStep.bind(this)
    this.closeGuide = this.closeGuide.bind(this)

    window.addEventListener('resize', this.resizeListener)
  }

  resizeListener () {
    this.setState({ width: window.innerWidth })
  }

  setNextActiveStep () {
    const currentIndex = this.visibleItems.findIndex(item => item.step === this.state.activeStep)
    const nextIndex = currentIndex + 1
    if (this.visibleItems[nextIndex]) {
      const nextStep = this.visibleItems[nextIndex].step
      this.setState({ activeStep: nextStep })
    }
  }

  closeGuide () {
    this.setState({ isGuideVisible: false })
  }

  setActiveStep (step) {
    this.setState({ activeStep: step })
  }

  isInViewPort (elem) {
    let bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  render () {
    if (!this.state.isGuideVisible) {
      return null
    }

    const containerClasses = classNames({
      'vcv-helpers-container': true
    })
    const $helpers = document.querySelectorAll('[data-vcv-guide-helper]')
    const items = []
    this.visibleItems = []

    $helpers.forEach((item) => {
      const boundingRect = item.getBoundingClientRect()
      const left = boundingRect.left
      const top = boundingRect.top
      const width = boundingRect.width
      const height = boundingRect.height
      const helperId = item.getAttribute('data-vcv-guide-helper')
      const helperData = this.helpers[helperId]

      if (this.isInViewPort(item)) {
        helperData.top = top + (height / 2)
        helperData.left = left + width
        helperData.helperId = helperId
        this.visibleItems.push(helperData)
      }
    })

    this.visibleItems.sort((a, b) => (a.step > b.step) ? 1 : ((b.step > a.step) ? -1 : 0))

    this.visibleItems.forEach((item, index) => {
      items.push(
        <HelperContainer
          key={item.helperId}
          top={item.top}
          left={item.left}
          isActive={item.step === this.state.activeStep}
          helperData={item}
          isLast={this.visibleItems.length - 1 === index}
          onCloseGuide={this.closeGuide}
          onActiveChange={this.setActiveStep}
          onNextClick={this.setNextActiveStep}
        />
      )
    })

    return (
      <div className={containerClasses}>
        <div className='vcv-helpers-wrapper'>
          {items}
        </div>
        <Welcome />
      </div>
    )
  }
}
