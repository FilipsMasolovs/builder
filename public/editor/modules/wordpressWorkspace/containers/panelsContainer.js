import React from 'react'
import classNames from 'classnames'
import ContentStart from '../../../../resources/components/contentParts/contentStart'
import ContentEnd from '../../../../resources/components/contentParts/contentEnd'
import AddElementPanel from '../../../../resources/components/addElement/addElementPanel'
import AddTemplatePanel from '../../../../resources/components/addTemplate/addTemplatePanel'
import TreeViewLayout from '../../../../resources/components/treeView/treeViewLayout'
import SettingsPanel from '../../../../resources/components/settings/settingsPanel'
import EditElementPanel from '../../../../resources/components/editElement/editElementPanel'
import {getService} from 'vc-cake'

const cook = getService('cook')

export default class PanelsContainer extends React.Component {
  static propTypes = {
    start: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    end: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    settings: React.PropTypes.object,
    contentStartId: React.PropTypes.string
  }

  getStartContent () {
    const { start, contentStartId } = this.props
    if (start === 'treeView') {
      return <TreeViewLayout contentStartId={contentStartId} />
    }
  }

  getEndContent () {
    const { end, settings } = this.props
    if (end === 'addElement') {
      return <AddElementPanel options={settings || {}} />
    } else if (end === 'addTemplate') {
      return <AddTemplatePanel />
    } else if (end === 'settings') {
      return <SettingsPanel />
    } else if (end === 'editElement') {
      if (settings && settings.element) {
        const activeTabId = settings.tag || ''
        const cookElement = cook.get(settings.element)
        return <EditElementPanel key={`panels-container-edit-element-${cookElement.get('id')}`} element={cookElement} activeTabId={activeTabId} />
      }
    }
  }

  render () {
    const { start, end } = this.props
    let layoutClasses = classNames({
      'vcv-layout-bar-content': true,
      'vcv-ui-state--visible': !!(start || end)
    })

    return (
      <div className={layoutClasses}>
        <ContentStart>
          {this.getStartContent()}
        </ContentStart>
        <ContentEnd content={end} >
          {this.getEndContent()}
        </ContentEnd>
      </div>
    )
  }
}
