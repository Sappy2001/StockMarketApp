describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000/signup')
    cy.contains("Sign Up")
  })

  it("checking signup redirecting or not",()=>{

    cy.get('[id="email-input"]').type("madhu09@gmail.com")
    cy.get('[id="mobile-input"]').type("9345307166")
    cy.get('[id="pass-input"]').type("madhu012")
    cy.get('[id="cpass-input"]').type("madhu012")
    cy.get('[id="signupBtn"]').click()
    cy.url({timeout:10000}).should('eq','http://localhost:3000')
  })
 
 
})
    
    
    
    
 
 




