// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3002');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Learn Jenkins/);
});

test('has Jenkins in the body', async ({ page }) => {
  await page.goto('http://localhost:3002');

  await page.locator('a')
            .filter({ hasText: 'Learn Jenkins on Udemy' })
            .isVisible() 
});
