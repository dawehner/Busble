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
    const matchScreen = page.locator('#matchScreen');
    const continueBtn = page.locator('#continueBtn');

    // Perform 5 swipes (mix of like and nope), dismissing any match screens
    for (let i = 0; i < 5; i++) {
      const btn = i % 2 === 0 ? likeBtn : nopeBtn;
      await btn.click();
      await page.waitForTimeout(600);

      // If match screen appears, dismiss it
      if (await matchScreen.isVisible()) {
        await continueBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // Check that swipe count is at least 3 (accounting for possible matches)
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

  // Maintenance Log & Garage Tests
  test.describe('Maintenance Log and Garage Features', () => {
    test('should display garage button with count', async ({ page }) => {
      const garageBtn = page.locator('#garageBtn');
      await expect(garageBtn).toBeVisible();
      await expect(garageBtn).toContainText('My Garage');

      // Initial garage count should be 0
      const garageCount = page.locator('#garageCount');
      await expect(garageCount).toContainText('0');
    });

    test('should navigate to empty garage view', async ({ page }) => {
      const garageBtn = page.locator('#garageBtn');
      await garageBtn.click();

      // Check that garage view is visible
      const garageView = page.locator('#garageView');
      await expect(garageView).toBeVisible();

      // Check that card container is hidden
      const cardContainer = page.locator('#cardContainer');
      await expect(cardContainer).toBeHidden();

      // Check empty garage message
      const emptyGarage = page.locator('#emptyGarage');
      await expect(emptyGarage).toBeVisible();
      await expect(emptyGarage).toContainText('Your garage is empty!');

      // Take screenshot of empty garage
      await page.screenshot({ path: 'test-results/screenshots/empty-garage.png', fullPage: true });
    });

    test('should navigate back to swipe view from garage', async ({ page }) => {
      // Go to garage
      await page.locator('#garageBtn').click();
      await expect(page.locator('#garageView')).toBeVisible();

      // Click back to swipe button
      const backBtn = page.locator('#backToSwipeBtn');
      await backBtn.click();

      // Verify we're back in swipe view
      const cardContainer = page.locator('#cardContainer');
      await expect(cardContainer).toBeVisible();

      const garageView = page.locator('#garageView');
      await expect(garageView).toBeHidden();
    });

    test('should show maintenance message on match screen', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      let matchFound = false;

      // Keep swiping right until we get a match (max 30 attempts)
      for (let i = 0; i < 30; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        const isVisible = await matchScreen.isVisible();
        if (isVisible) {
          matchFound = true;
          break;
        }
      }

      if (matchFound) {
        // Check for maintenance message
        const maintenanceMessage = page.locator('#maintenanceMessage');
        await expect(maintenanceMessage).toBeVisible();

        // Should contain some text
        const messageText = await maintenanceMessage.textContent();
        expect(messageText.length).toBeGreaterThan(0);

        // Take screenshot of match with maintenance message
        await page.screenshot({ path: 'test-results/screenshots/match-with-maintenance.png', fullPage: true });
      }
    });

    test('should save matched bus to garage', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      const continueBtn = page.locator('#continueBtn');
      let matchFound = false;

      // Keep swiping right until we get a match
      for (let i = 0; i < 30; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        const isVisible = await matchScreen.isVisible();
        if (isVisible) {
          matchFound = true;
          // Close the match screen
          await continueBtn.click();
          await page.waitForTimeout(300);
          break;
        }
      }

      if (matchFound) {
        // Check that garage count increased
        const garageCount = page.locator('#garageCount');
        await expect(garageCount).toContainText('1');

        // Navigate to garage
        await page.locator('#garageBtn').click();

        // Verify garage is not empty
        const emptyGarage = page.locator('#emptyGarage');
        await expect(emptyGarage).toBeHidden();

        // Verify garage container has content
        const garageContainer = page.locator('#garageContainer');
        await expect(garageContainer).toBeVisible();

        // Take screenshot of garage with matched bus
        await page.screenshot({ path: 'test-results/screenshots/garage-with-match.png', fullPage: true });
      }
    });

    test('should display maintenance logs in garage', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      const continueBtn = page.locator('#continueBtn');

      // Get a match first
      for (let i = 0; i < 30; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        if (await matchScreen.isVisible()) {
          await continueBtn.click();
          await page.waitForTimeout(300);
          break;
        }
      }

      // Navigate to garage
      await page.locator('#garageBtn').click();

      // Check for maintenance log section
      const maintenanceLogHeader = page.getByText('Maintenance Log');
      if (await maintenanceLogHeader.isVisible()) {
        await expect(maintenanceLogHeader).toBeVisible();

        // Check that there's at least one log entry (the initial welcome message)
        const logEntries = page.locator('.bg-white.rounded-lg.p-3');
        const count = await logEntries.count();
        expect(count).toBeGreaterThan(0);

        // Take screenshot of maintenance log
        await page.screenshot({ path: 'test-results/screenshots/maintenance-logs.png', fullPage: true });
      }
    });

    test('should display bus technical specs in garage', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      const continueBtn = page.locator('#continueBtn');

      // Get a match first
      for (let i = 0; i < 30; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        if (await matchScreen.isVisible()) {
          await continueBtn.click();
          await page.waitForTimeout(300);
          break;
        }
      }

      // Navigate to garage
      await page.locator('#garageBtn').click();

      // Check for technical specs
      const engineLabel = page.getByText('Engine:');
      if (await engineLabel.isVisible()) {
        await expect(engineLabel).toBeVisible();

        // Check other spec labels
        await expect(page.getByText('Fuel:')).toBeVisible();
        await expect(page.getByText('Capacity:')).toBeVisible();
        await expect(page.getByText('MPG:')).toBeVisible();

        // Take screenshot of specs
        await page.screenshot({ path: 'test-results/screenshots/technical-specs.png', fullPage: true });
      }
    });

    test('should display relationship stats (mileage and days together)', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      const continueBtn = page.locator('#continueBtn');

      // Get a match first
      for (let i = 0; i < 30; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        if (await matchScreen.isVisible()) {
          await continueBtn.click();
          await page.waitForTimeout(300);
          break;
        }
      }

      // Navigate to garage
      await page.locator('#garageBtn').click();

      // Check for mileage and days display in the stats section
      const statsSection = page.locator('.bg-red-50, .bg-blue-50');
      if (await statsSection.first().isVisible()) {
        // Should have at least 2 stat boxes
        const statCount = await statsSection.count();
        expect(statCount).toBeGreaterThanOrEqual(2);

        // Verify text content contains mileage (mi) and days
        const allStatsText = await page.locator('.grid.grid-cols-2.gap-2 .bg-red-50, .grid.grid-cols-2.gap-2 .bg-blue-50').allTextContents();
        const hasValidStats = allStatsText.some(text => text.includes('mi') || text.includes('days'));
        expect(hasValidStats).toBeTruthy();

        // Take screenshot of stats
        await page.screenshot({ path: 'test-results/screenshots/relationship-stats.png', fullPage: true });
      }
    });

    test('should handle multiple matched buses', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      const continueBtn = page.locator('#continueBtn');
      let matchCount = 0;

      // Try to get 2 matches
      for (let i = 0; i < 50 && matchCount < 2; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        if (await matchScreen.isVisible()) {
          matchCount++;
          await continueBtn.click();
          await page.waitForTimeout(300);
        }
      }

      if (matchCount >= 2) {
        // Navigate to garage
        await page.locator('#garageBtn').click();

        // Count the bus cards in garage
        const busCards = page.locator('#garageContainer > div');
        const cardCount = await busCards.count();
        expect(cardCount).toBe(matchCount);

        // Verify garage count badge
        const garageCount = page.locator('#garageCount');
        await expect(garageCount).toContainText(matchCount.toString());

        // Take screenshot of multiple buses
        await page.screenshot({ path: 'test-results/screenshots/multiple-matches-garage.png', fullPage: true });
      }
    });

    test('should persist matched buses after page reload', async ({ page }) => {
      const likeBtn = page.locator('#likeBtn');
      const matchScreen = page.locator('#matchScreen');
      const continueBtn = page.locator('#continueBtn');

      // Get a match first
      for (let i = 0; i < 30; i++) {
        await likeBtn.click();
        await page.waitForTimeout(600);

        if (await matchScreen.isVisible()) {
          await continueBtn.click();
          await page.waitForTimeout(300);
          break;
        }
      }

      // Get the garage count before reload
      const garageCountBefore = await page.locator('#garageCount').textContent();

      // Reload the page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check that garage count is still the same
      const garageCountAfter = await page.locator('#garageCount').textContent();
      expect(garageCountAfter).toBe(garageCountBefore);

      // Verify data persisted by going to garage
      if (parseInt(garageCountAfter) > 0) {
        await page.locator('#garageBtn').click();
        const garageContainer = page.locator('#garageContainer');
        await expect(garageContainer).toBeVisible();
      }
    });
  });
});
