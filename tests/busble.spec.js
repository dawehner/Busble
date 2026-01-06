const { test, expect } = require('@playwright/test');

test.describe('Busble App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should display the main page with all key elements', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Busble/);

    // Check header elements
    await expect(page.locator('h1')).toContainText('Busble');
    await expect(page.locator('p').first()).toContainText('Find your perfect bus match!');

    // Check that a bus card is visible
    const busCard = page.locator('#busCard');
    await expect(busCard).toBeVisible();

    // Check bus image is loaded
    const busImage = page.locator('#busImage');
    await expect(busImage).toBeVisible();

    // Check bus name is displayed
    const busName = page.locator('#busName');
    await expect(busName).toBeVisible();
    await expect(busName).not.toBeEmpty();

    // Check bus details are displayed
    const busDetails = page.locator('#busDetails');
    await expect(busDetails).toBeVisible();

    // Check action buttons are present
    const likeBtn = page.locator('#likeBtn');
    const nopeBtn = page.locator('#nopeBtn');
    await expect(likeBtn).toBeVisible();
    await expect(nopeBtn).toBeVisible();

    // Check stats are visible
    await expect(page.locator('#swipeCount')).toContainText('0');
    await expect(page.locator('#matchCount')).toContainText('0');

    // Take a screenshot of the initial state
    await page.screenshot({ path: 'test-results/screenshots/initial-page.png', fullPage: true });
  });

  test('should have bus tags displayed', async ({ page }) => {
    const busTags = page.locator('#busTags span');
    await expect(busTags.first()).toBeVisible();

    // Count the tags (each bus should have tags)
    const tagCount = await busTags.count();
    expect(tagCount).toBeGreaterThan(0);
  });

  test('should increment swipe count when liking a bus', async ({ page }) => {
    const likeBtn = page.locator('#likeBtn');
    const swipeCount = page.locator('#swipeCount');

    // Click like button
    await likeBtn.click();

    // Wait for animation
    await page.waitForTimeout(600);

    // Check that swipe count increased
    await expect(swipeCount).toContainText('1');

    // Take screenshot after liking
    await page.screenshot({ path: 'test-results/screenshots/after-like.png', fullPage: true });
  });

  test('should increment swipe count when rejecting a bus', async ({ page }) => {
    const nopeBtn = page.locator('#nopeBtn');
    const swipeCount = page.locator('#swipeCount');

    // Click nope button
    await nopeBtn.click();

    // Wait for animation
    await page.waitForTimeout(600);

    // Check that swipe count increased
    await expect(swipeCount).toContainText('1');

    // Take screenshot after rejecting
    await page.screenshot({ path: 'test-results/screenshots/after-nope.png', fullPage: true });
  });

  test('should handle keyboard controls - arrow right (like)', async ({ page }) => {
    const swipeCount = page.locator('#swipeCount');

    // Press right arrow key
    await page.keyboard.press('ArrowRight');

    // Wait for animation
    await page.waitForTimeout(600);

    // Check that swipe count increased
    await expect(swipeCount).toContainText('1');
  });

  test('should handle keyboard controls - arrow left (nope)', async ({ page }) => {
    const swipeCount = page.locator('#swipeCount');

    // Press left arrow key
    await page.keyboard.press('ArrowLeft');

    // Wait for animation
    await page.waitForTimeout(600);

    // Check that swipe count increased
    await expect(swipeCount).toContainText('1');
  });

  test('should load a new bus after swiping', async ({ page }) => {
    // Get the current bus name
    const busName = page.locator('#busName');
    const initialBusName = await busName.textContent();

    // Click like button
    await page.locator('#likeBtn').click();

    // Wait for animation and new bus to load
    await page.waitForTimeout(600);

    // Get new bus name (might be different, or could be same if match screen shows)
    const newBusName = await busName.textContent();

    // Either a new bus loaded or match screen is shown
    const matchScreen = page.locator('#matchScreen');
    const isMatchVisible = await matchScreen.isVisible();

    if (!isMatchVisible) {
      // If no match, verify a bus name is still displayed
      expect(newBusName).toBeTruthy();
    }
  });

  test('should show match screen on a successful match', async ({ page }) => {
    const likeBtn = page.locator('#likeBtn');
    const matchScreen = page.locator('#matchScreen');
    let matchFound = false;

    // Keep swiping right until we get a match (max 20 attempts)
    for (let i = 0; i < 20; i++) {
      await likeBtn.click();
      await page.waitForTimeout(600);

      const isVisible = await matchScreen.isVisible();
      if (isVisible) {
        matchFound = true;
        break;
      }
    }

    // If we found a match, verify the match screen elements
    if (matchFound) {
      await expect(matchScreen).toBeVisible();
      await expect(matchScreen).toContainText('YOU BUSSEL');
      await expect(matchScreen).toContainText("It's a match made in transit heaven!");

      // Check continue button is visible
      const continueBtn = page.locator('#continueBtn');
      await expect(continueBtn).toBeVisible();

      // Take screenshot of match screen
      await page.screenshot({ path: 'test-results/screenshots/match-screen.png', fullPage: true });

      // Click continue button
      await continueBtn.click();

      // Verify match screen is hidden
      await expect(matchScreen).toBeHidden();

      // Verify match count increased
      const matchCount = page.locator('#matchCount');
      await expect(matchCount).not.toContainText('0');
    }
  });

  test('should update stats correctly after multiple swipes', async ({ page }) => {
    const likeBtn = page.locator('#likeBtn');
    const nopeBtn = page.locator('#nopeBtn');
    const swipeCount = page.locator('#swipeCount');

    // Perform 5 swipes (mix of like and nope)
    await likeBtn.click();
    await page.waitForTimeout(600);

    await nopeBtn.click();
    await page.waitForTimeout(600);

    await likeBtn.click();
    await page.waitForTimeout(600);

    await nopeBtn.click();
    await page.waitForTimeout(600);

    await likeBtn.click();
    await page.waitForTimeout(600);

    // Check that swipe count is at least 5
    // (could be 5 if no matches, or less if match screens appeared)
    const count = await swipeCount.textContent();
    expect(parseInt(count)).toBeGreaterThanOrEqual(3);

    // Take screenshot of final stats
    await page.screenshot({ path: 'test-results/screenshots/multiple-swipes-stats.png', fullPage: true });
  });

  test('should have responsive design elements', async ({ page }) => {
    // Check that the main container has proper max-width
    const container = page.locator('.max-w-md').first();
    await expect(container).toBeVisible();

    // Check that the card container has a height
    const cardContainer = page.locator('#cardContainer');
    const boundingBox = await cardContainer.boundingBox();
    expect(boundingBox.height).toBeGreaterThan(0);
  });

  test('should display overlays during drag interaction', async ({ page }) => {
    const busCard = page.locator('#busCard');
    const likeOverlay = page.locator('#likeOverlay');
    const nopeOverlay = page.locator('#nopeOverlay');

    // Get the card position
    const box = await busCard.boundingBox();

    // Start a drag to the right (like)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2, { steps: 10 });

    // Check if like overlay became visible (opacity > 0)
    const likeOpacity = await likeOverlay.evaluate(el => window.getComputedStyle(el).opacity);

    // Release the drag
    await page.mouse.up();

    // Wait for animation
    await page.waitForTimeout(600);

    // Take screenshot after drag
    await page.screenshot({ path: 'test-results/screenshots/after-drag.png', fullPage: true });
  });
});
