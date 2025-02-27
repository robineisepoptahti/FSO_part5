const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginform')).toBeVisible()
  })
})

describe('Login', () => {
    
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {data :{name: 'Salley',
          username: 'Servonen',
          password: 'salainen'
        }
    }
      
          )
        await page.goto('http://localhost:5173')
        })
    
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('Servonen')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText(`logout`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('zervo')
        await page.getByTestId('password').fill('dddddd')
        await page.getByRole('button', { name: 'login' }).click()
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
    })
  })


  
  describe('When logged in', () => {

    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
          data: {
              name: 'Kalle',
              username: 'zervo',
              password: 'salainen'
          }
        })
      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('zervo')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByTestId('author').fill('Kalle')
      await page.getByTestId('title').fill('Lintukirja')
      await page.getByTestId('url').fill('www.lintukirja.fi')
      await page.getByRole('button', { name: 'submit' }).click()
      const msgDiv = await page.locator('.msg')
      await expect(msgDiv).toContainText('a new blog Lintukirja by Kalle added')
      await expect(page.getByText(`logout`)).toBeVisible()
    })
  })
