import React from 'react'
import Signup from './signup'
import {MemoryRouter} from 'react-router-dom'
import {mount} from 'cypress/react'

describe('<Signup />', () => {
  beforeEach(()=> {
    mount (
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

  })
  it('is input is working or not',()=>{
    cy.get('[id="email-input"]').type("madhu@gmail.com").should('have.value','madhu@gmail.com')
  })

  it('is input is working or not',()=>{
    cy.get('[id="mobile-input"]').type("9345307191").should('have.value','9345307191')
  })

  it('is input for password is working or not',()=>{
    cy.get('[id="pass-input"]').type("madhu123").should('have.value','madhu123')
  })

  
  it('is input for confirm password is working or not',()=>{
    cy.get('[id="cpass-input"]').type("madhu123").should('have.value','madhu123')
  })
})