const { test, expect } = require('@playwright/test');

test('cart test', async ({ page }) => {
    // Visit the page
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Find the 'Sauce Labs Backpack' item and save its title, description and price
    const productDiv = page.locator('[data-test="inventory-item"]:has([data-test="inventory-item-name"]:text("Sauce Labs Backpack"))');
    const title = await productDiv.locator('[data-test="inventory-item-name"]').innerText();
    const description = await productDiv.locator('[data-test="inventory-item-desc"]').innerText();
    const price = await productDiv.locator('[data-test="inventory-item-price"]').innerText();

    // Add the 'Sauce Labs Backpack' item to the cart
    await productDiv.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Add shipping information
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Anna');
    await page.locator('[data-test="lastName"]').fill('Hath');
    await page.locator('[data-test="postalCode"]').fill('13162');
    await page.locator('[data-test="continue"]').click();

    // Verify the product details in the summary
    const summaryDiv = page.locator('[data-test="cart-list"]:has([data-test="inventory-item"])');
    const titleSummary = await summaryDiv.locator('[data-test="inventory-item-name"]').innerText();
    const descSummary = await summaryDiv.locator('[data-test="inventory-item-desc"]').innerText();
    const priceSummary = await summaryDiv.locator('[data-test="inventory-item-price"]').innerText();

    expect(title).toEqual(titleSummary);
    expect(description).toEqual(descSummary);
    expect(price).toEqual(priceSummary);

    // Finish the order
    await page.locator('[data-test="finish"]').click();

    // Check that the message is displayed 
    expect(await page.locator('[data-test="complete-header"]').innerText()).toEqual('Thank you for your order!');

});


