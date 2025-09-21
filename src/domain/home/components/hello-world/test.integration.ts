import { test, expect } from '@playwright/test'

test('counter increments on click', async ({ page }) => {
	await page.goto('/')

	// Find the counter button by data-testid and click it
	const counterButton = page.getByTestId('hello-world-counter')
	await counterButton.click()

	// Check that the value element has updated to "1"
	const counterValue = page.getByTestId('hello-world-value')
	await expect(counterValue).toHaveText('1')
})
