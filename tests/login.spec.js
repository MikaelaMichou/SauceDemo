const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
    // Visit the page
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify the URL
    await expect(page).toHaveURL(/.*inventory/);

    // Verify that the products are displayed
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
});


