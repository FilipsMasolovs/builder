export default {
  getEditor (element, mode, value) {
    let editor
    if (typeof window.wp !== 'undefined' && typeof window.wp.codeEditor !== 'undefined') {
      let instance = window.wp.codeEditor.initialize(element, { codemirror: window.jQuery.extend({}, window.wp.codeEditor.defaultSettings.codemirror, { mode: mode }) })
      instance.codemirror.setValue(value)
      editor = instance.codemirror
    } else {
      editor = new this.DefaultTextAreaEditor(element)
      editor.setValue(value)
    }

    return editor
  },
  DefaultTextAreaEditor (element) {
    let $el = window.jQuery(element)
    return {
      setSize: () => {},
      refresh: () => {},
      setValue: (value) => { $el.val(value) },
      getValue: () => { return $el.val() },
      on: (event, callback) => { $el.on(event, callback) }
    }
  }
}
