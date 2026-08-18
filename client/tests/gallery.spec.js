import { test, expect } from "@playwright/test";

test("gallery page loads with heading", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(
    page.getByRole("heading", { name: "Selected Works" }),
  ).toBeVisible();
});
test('clicking an artwork navigates to detail page', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for at least one artwork link to appear, then click the first one
  const firstArtwork = page.locator('a[href^="/artwork/"]').first();
  await firstArtwork.click();

  // We should now be on a URL matching /artwork/123
  await expect(page).toHaveURL(/\/artwork\/\d+/);
});