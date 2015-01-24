#TODO: i18n
INPUT_PLACEHOLDER_TEXT = 'Пароль'

AuthEmailPasswordField = React.createClass
  displayName: 'AuthEmailPasswordField'

  render: ->
    <div className="auth__field">
      <label htmlFor="auth-password"
             className="auth__field-icon">
        <i className="icon icon--lock" />
      </label>
      <input ref="input"
             type="password"
             placeholder={ INPUT_PLACEHOLDER_TEXT }
             id="auth-password"
             className="auth__field-input" />
    </div>

  getValue: ->
    @refs.input.getDOMNode().value.trim()

module.exports = AuthEmailPasswordField