describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000/login')
    cy.contains("Login")
  })

  it("checking login redirecting or not",()=>{

    cy.get('[id="email-input"]').type("madhu123@gmail.com")
    cy.get('[id="pass-input"]').type("madhu123")
    cy.get('[id="loginbtn"]').click()
    cy.url({timeout:10000}).should('eq','http://localhost:3000/')
  })
 
 
})