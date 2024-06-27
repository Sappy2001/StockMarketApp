import React from 'react'
import Login from './login'
import {MemoryRouter} from 'react-router-dom'
import {mount} from 'cypress/react'

describe('<Login />', () => {
  beforeEach(()=> {
    mount (
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

  })
  it('is input is working or not',()=>{
    cy.get('[id="email-input"]').type("madhu@gmail.com.com").should('have.value','madhu@gmail.com')
  })

  it('is input for password is working or not',()=>{
    cy.get('[id="pass-input"]').type("madhu123").should('have.value','madhu123')
  })
})