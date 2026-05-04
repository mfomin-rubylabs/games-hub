import { test, expect } from "@playwright/test";

test.describe("Games page", () => {
  test("should display a list of game cards on /en/games", async ({ page }) => {
    await page.goto("/en/games");

    const gameCards = page.locator("[data-testid='game-card']");

    await expect(gameCards.first()).toBeVisible();

    const count = await gameCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to game detail page and display the game title", async ({
    page,
  }) => {
    await page.goto("/en/games");

    const firstCard = page.locator("[data-testid='game-card']").first();
    await expect(firstCard).toBeVisible();

    // Read the title from the card before clicking
    const cardTitle = await firstCard
      .locator("[data-testid='game-card-title']")
      .innerText();

    // Click the card itself — no nested link to target
    await firstCard.click();

    // Assert navigation happened
    await expect(page).toHaveURL(/\/en\/games\/.+/);

    // Assert detail page title matches what was on the card
    const detailTitle = page.locator("[data-testid='game-detail-title']");
    await expect(detailTitle).toBeVisible();
    await expect(detailTitle).toHaveText(cardTitle);
  });

  test("should add a game to favorites and appear on the favorites page", async ({
    page,
  }) => {
    await page.goto("/en/games");

    const firstCard = page.locator("[data-testid='game-card']").first();
    await expect(firstCard).toBeVisible();

    const gameTitle = await firstCard
      .locator("[data-testid='game-card-title']")
      .innerText();

    const favButton = firstCard.locator("[data-testid='favorite-button']");
    await expect(favButton).toBeVisible();
    await favButton.click();

    // Assert that the favorites state is true
    await expect(favButton).toHaveAttribute("data-favorited", "true");

    const favNavLink = page.locator("[data-testid='nav-favorites-link']");
    await expect(favNavLink).toBeVisible();
    await favNavLink.click();

    await expect(page).toHaveURL(/\/en\/games\/favorites/);

    // Assert the favorited game appears in the list by title
    const favoritedGame = page.locator("[data-testid='game-card']").filter({
      has: page.locator(
        `[data-testid='game-card-title']:has-text("${gameTitle}")`,
      ),
    });

    await expect(favoritedGame).toBeVisible();
  });
});
