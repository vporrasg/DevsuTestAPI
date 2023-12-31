describe('API spec', () => {
  it('Nuevo usuario', () => {
    var random = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
    random += possible.charAt(Math.floor(Math.random() * possible.length));

    cy.request('POST', 'https://api.demoblaze.com/signup', {username: random, password: "MTIzNDU="}).then(
      (response) => {
        expect(response.body).not.to.have.property('errorMessage', 'This user already exist.')
      }
    )  })

  it('Usuario ya existente', () => {
    cy.request('POST', 'https://api.demoblaze.com/signup', {username: "natinati", password: "MTIzNDU="}).then(
      (response) => {
        expect(response.body).to.have.property('errorMessage', 'This user already exist.')
      }
    )  })

    it('Login correcto', () => {
      cy.request('POST', 'https://api.demoblaze.com/login', {username: "victortest", password: "MTIzNDU="}).then(
        (response) => {
          expect(response.body).not.to.have.property('errorMessage', 'Wrong password.')
        }
      )  })

    it('Login incorrecto', () => {
      cy.request('POST', 'https://api.demoblaze.com/login', {username: "victortest", password: "NTQzMjE="}).then(
        (response) => {
          expect(response.body).to.have.property('errorMessage', 'Wrong password.')
        }
      )  })
})

