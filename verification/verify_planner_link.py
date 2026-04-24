from playwright.sync_api import sync_playwright, expect

def verify_planner_link(page):
    page.goto("http://localhost:4173/")

    # Wait for nav to load
    page.wait_for_selector("nav")

    # Check for Planner link
    # The link might be in desktop or mobile menu. I'll check desktop first since screenshot will likely show it if viewport is large enough.
    page.set_viewport_size({"width": 1280, "height": 720})

    # Locate the Planner link
    planner_link = page.get_by_role("link", name="Planner")

    # Verify it exists and is visible
    expect(planner_link).to_be_visible()

    # Verify href
    expect(planner_link).to_have_attribute("href", "/project-planner.html")

    print("Planner link found with correct href.")

    # Take screenshot
    page.screenshot(path="verification/planner_link_desktop.png")

    # Verify mobile menu as well
    page.set_viewport_size({"width": 375, "height": 667})

    # Open mobile menu
    menu_button = page.locator("button.lg\\:hidden") # Select button that is hidden on lg screens
    menu_button.click()

    # Wait for menu to open
    mobile_planner_link = page.get_by_role("link", name="Planner")
    expect(mobile_planner_link).to_be_visible()
    expect(mobile_planner_link).to_have_attribute("href", "/project-planner.html")

    print("Mobile Planner link found with correct href.")

    page.screenshot(path="verification/planner_link_mobile.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_planner_link(page)
        finally:
            browser.close()
