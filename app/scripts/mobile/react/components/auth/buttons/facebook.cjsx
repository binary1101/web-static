#TODO: i18n
BUTTON_TEXT = 'Войти с помощью Facebook'

AuthFacebookButton = React.createClass
  displayName: 'AuthFacebookButton'

  render: ->
    <button className="fb-auth-button"
            onClick={ @handleClick }>
      { BUTTON_TEXT }
    </button>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'facebook'

module.exports = AuthFacebookButton