import { test, expect } from '@playwright/test';
test('staff can open the library search page', async ({ page }) => { await page.goto('/library?q=BIN%200001'); await expect(page.getByRole('heading', { name: 'Library' })).toBeVisible(); });
test('administrator can open label printing page', async ({ page }) => { await page.goto('/labels?bin=1'); await expect(page.getByText('CORE COMPASS').first()).toBeVisible(); });
