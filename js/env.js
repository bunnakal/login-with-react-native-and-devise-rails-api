const defaultEndpoint = {
  apiHost:               'http://locationcode.rotati.com',
  apiUrl:                '/api/v1',
  signOutPath:           '/auth/sign_out',
  emailSignInPath:       '/auth/sign_in',
  emailRegistrationPath: '/auth',
  accountUpdatePath:     '/auth',
  accountDeletePath:     '/auth',
  passwordResetPath:     '/auth/password',
  passwordUpdatePath:    '/auth/password',
  tokenValidationPath:   '/auth/validate_token'
}

export default defaultEndpoint;
