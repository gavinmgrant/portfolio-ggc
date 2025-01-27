import * as React from 'react'

export const ContactEmailTemplate = ({ firstName, lastName, email, message }) => (
  <div>
    <h1>New Gavin Grant Consulting Contact!</h1>
    <p>First Name: {firstName}</p>
    <p>Last Name: {lastName}</p>
    <p>Email: {email}</p>
    <p>Message: {message}</p>
  </div>
)
