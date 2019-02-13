import React from 'react'
import lodash from 'lodash'
import PropTypes from 'prop-types'
import { env } from 'vc-cake'
import classNames from 'classnames'

export default class Field extends React.Component {
  static propTypes = {
    elementAccessPoint: PropTypes.object.isRequired,
    fieldKey: PropTypes.string.isRequired,
    onAttributeChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    let value = props.elementAccessPoint.cook().toJS()[ props.fieldKey ]
    if (props.options.nestedAttr) {
      value = props.options.activeParamGroup[ props.fieldKey ]
    }
    this.state = {
      value: value,
      dependenciesClasses: []
    }
    this.updateElement = this.updateElement.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  componentDidMount () {
    this.props.elementAccessPoint.onAttributeChange(this.props.fieldKey, this.updateValue)
    this.props.setFieldMount(this.props.fieldKey, {
      ref: this.refs.field,
      refComponent: this,
      refDomComponent: this.refs.domComponent
    }, 'field')
  }

  componentWillUnmount () {
    this.props.elementAccessPoint.ignoreAttributeChange(this.props.fieldKey, this.updateValue)
    this.props.setFieldUnmount(this.props.fieldKey, 'field')
  }

  updateValue (data) {
    if (!lodash.isEqual(data, this.state.value)) {
      this.setState({
        value: data
      })
    }
  }

  updateElement (fieldKey, value) {
    if (this.props.options.nestedAttr) {
      const { options, elementAccessPoint } = this.props
      options.customUpdater(options.activeParamGroupIndex, elementAccessPoint, fieldKey, value)
      this.props.onAttributeChange(fieldKey)
    } else {
      this.props.elementAccessPoint.set(fieldKey, value)
      this.props.onAttributeChange(fieldKey)
    }
  }

  render () {
    let { fieldKey, tab, fieldType, elementAccessPoint } = this.props
    let { value } = this.state

    let cookElement = elementAccessPoint.cook()
    let element = cookElement.toJS()
    let classes = classNames({
      'vcv-ui-form-dependency': true
    }, this.state.dependenciesClasses)

    if (fieldKey && element) {
      value = element[ fieldKey ]
    }
    let { type, settings } = cookElement.settings(fieldKey)
    if (this.props.options.nestedAttr) {
      let attrSettings = cookElement.settings(this.props.options.fieldKey).settings.options.settings
      let elSettings = cookElement.settings(fieldKey, attrSettings)
      type = elSettings.type
      settings = elSettings.settings
      settings.options.nestedAttrPath = `${this.props.options.fieldKey}:${this.props.options.activeParamGroupIndex}:${fieldKey}`
      value = element[ this.props.options.fieldKey ].value[ this.props.options.activeParamGroupIndex ][ fieldKey ]
    }
    let AttributeComponent = type.component
    if (!AttributeComponent) {
      env('VCV_DEBUG') && console.warn(`No component for attribute ${fieldKey}`)
      return null
    }
    if (!settings) {
      throw new Error(`Wrong attribute settings ${fieldKey}`)
    }
    if (!type) {
      throw new Error(`Wrong attribute type ${fieldKey}`)
    }
    const { options } = settings
    const tabTypeName = tab.data.type && tab.data.type.name ? tab.data.type.name : tab.data.type
    let label = ''
    const isOptionsLabel = options && typeof options.label === 'string'
    const isRegularAttributeField = tabTypeName === 'group' && fieldType !== 'paramsGroup'
    const isParamsGroupAttributeField = tabTypeName === 'paramsGroup'
    if (isOptionsLabel && (isRegularAttributeField || isParamsGroupAttributeField)) {
      label = (<span className='vcv-ui-form-group-heading'>{options.label}</span>)
    }
    let description = ''
    if (options && typeof options.description === 'string') {
      description = (<p className='vcv-ui-form-helper'>{options.description}</p>)
    }
    if (options && options.descriptionHTML) {
      description = (<p className='vcv-ui-form-helper' dangerouslySetInnerHTML={{ __html: options.descriptionHTML }} />)
    }
    let defaultValue = settings.defaultValue
    if (typeof defaultValue === `undefined`) {
      defaultValue = settings.value
    }

    return (
      <div ref='field' className={classes}>
        <div className='vcv-ui-form-group' key={`form-group-field-${element.id}-${fieldKey}`}>
          {label}
          <AttributeComponent
            key={'attribute-' + fieldKey + element.id}
            options={options}
            value={value}
            defaultValue={defaultValue}
            fieldKey={fieldKey}
            updater={this.updateElement}
            elementAccessPoint={elementAccessPoint}
            fieldType={fieldType}
            ref='domComponent'
          />
          {description}
        </div>
      </div>
    )
  }
}
