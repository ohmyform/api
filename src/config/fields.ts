
export const fieldTypes = [
  'textfield',
  'date',
  'email',
  'legal',
  'textarea',
  'link',
  'statement',
  'dropdown',
  'rating',
  'radio',
  'hidden',
  'yes_no',
  'number',
]

export const matchType = {
  color: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  email: /.+@.+\..+/,
}

export const validatePassword = (password: string): true | string => {
  if (password.length < 4) {
    return 'password is too short'
  }

  return true
}
