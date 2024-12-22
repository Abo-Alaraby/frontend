

describe('Full expereince test', () => {
    it("should guide user from login untill order placed", () => {
        cy.visit('/')//visit the homepage
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('a', 'Login').click()//click login
        cy.wait(1000)//Wait a second so the user can see the action
        cy.get('input[type="email"]').type('omarsheriff5656@gmail.com')//Enter user email
        cy.get('input[type="password"]').type("12345678")//Enter user password
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('button', 'Login').click()//Click login, login successful and redirected to home page with products

        //Find the product available and add it to cart
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('button', 'Add to Cart').click();
        cy.wait(5000)//Wait for the toast message to dissappear
        //Check your cart
        cy.contains('a', 'Cart').click()
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('button', 'Checkout').click();//Click checkout
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('button', 'View Order').click();//Click View Orders
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('button', 'Complete Purchase').click();//Click complete purchase
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('button', 'Go Back to Home').click();//Navigate back to home
        cy.wait(1000)//Wait a second so the user can see the action
        cy.contains('a', 'Orders').click()//click orders to view your past orders
    })
})