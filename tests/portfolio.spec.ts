import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("opening sequence completes, replays, skips, and remembers the visit", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("dialog", { name: "Portfolio introduction" }),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Portfolio introduction" }),
  ).toBeHidden({ timeout: 6000 });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("dialog", { name: "Portfolio introduction" }),
  ).toBeHidden();
  await page.getByRole("button", { name: "Replay intro" }).click();
  await expect(
    page.getByRole("button", { name: "Skip introduction" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Skip introduction" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Portfolio introduction" }),
  ).toBeHidden();
});

test("project filters, modal focus, keyboard dismissal, navigation and disclosure work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("button", { name: "AI & tools", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "View Expenso project details" }),
  ).toHaveCount(0);
  const opener = page.getByRole("button", {
    name: "View Tessera project details",
  });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Tessera" });
  await expect(dialog).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close project details" }),
  ).toBeFocused();
  await dialog
    .getByRole("link", { name: "Project website", exact: true })
    .focus();
  await expect(
    dialog.getByRole("link", { name: "Project website", exact: true }),
  ).toBeFocused();
  await expect(
    dialog.getByRole("link", { name: "Explore repository" }),
  ).toHaveAttribute("href", "https://github.com/Yuvrajg2107/Tessera");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await page.getByRole("button", { name: "Products", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(5);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(7);
  await page.locator("summary").filter({ hasText: "Interfaces" }).click();
  await expect(
    page.getByText("React, Next.js, TypeScript, Tailwind CSS"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(
    page.getByRole("button", { name: "Enable motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".email-link")).toHaveAttribute(
    "href",
    "mailto:yuvrajgandhmal@gmail.com",
  );
});

for (const width of [375, 768, 1440]) {
  test(`responsive rendering and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole("dialog", { name: "Portfolio introduction" }),
    ).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Replay intro" }),
    ).toHaveCount(0);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
    }
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
  });
}

test("resume downloads, requested project order and screenshot navigation", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".project-title h3")).toHaveText([
    "AICD",
    "Tessera",
    "Expenso",
    "MSBTE-Scrapper",
    "Railnova",
    "GPS Website",
    "GPS APP",
  ]);
  const resume = page.getByRole("link", { name: "See my résumé" });
  await expect(resume).toHaveAttribute("target", "_blank");
  const response = await request.get((await resume.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download résumé" }).click();
  expect((await downloadEvent).suggestedFilename()).toBe(
    "Yuvraj-Gandhmal-Resume.pdf",
  );
  for (const card of await page.locator(".project-card").all()) {
    const thumbs = card.locator(".preview-strip button");
    await thumbs.nth(1).click();
    await expect(thumbs.nth(1)).toHaveAttribute("aria-pressed", "true");
    await card.getByRole("button", { name: "Read project story" }).click();
    const dialog = page.locator("dialog[open]");
    await expect(dialog.locator("figure")).toHaveCount(await thumbs.count());
    for (const image of await dialog.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((img) => (img as HTMLImageElement).naturalWidth),
      ).toBeGreaterThan(0);
    }
    await page.keyboard.press("Escape");
  }
});
