import React from 'react'

const ErrorMessage = ({ error }) => {
  return (
    <p class="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
  )
}

export default ErrorMessage