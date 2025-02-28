const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      loginWith(page, 'zervo', 'salainen')
      })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'Lintukirja', 'Kalle', 'www.lintukirja.fi')
      const msgDiv = await page.locator('.msg')
      await expect(msgDiv).toContainText('a new blog Lintukirja by Kalle added')
      await expect(page.getByText(`Lintukirja Kalle`)).toBeVisible()
    })
    test ('a blog can be liked', async ({page}) => {
    createBlog(page, 'Lintukirja', 'Kalle', 'www.lintukirja.fi')
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByText('likes 0').waitFor()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('likes 1').waitFor()
    }
    )
  })
