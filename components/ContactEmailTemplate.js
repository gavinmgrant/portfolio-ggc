import * as React from 'react'

export const ContactEmailTemplate = ({ firstName, lastName, email, message }) => (
  <div>
    <p>Follow up with this lead.</p>
    <p>First Name: {firstName}</p>
    <p>Last Name: {lastName}</p>
    <p>Email: {email}</p>
    <p>Message: {message}</p>
  </div>
)
