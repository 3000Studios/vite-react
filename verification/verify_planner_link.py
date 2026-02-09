from playwright.sync_api import sync_playwright, expect

def verify_planner_link(page):
    # 1. Verify Main Page
    print("Navigating to Home...")
    page.goto("http://localhost:5173/")

    # Check Planner link in Desktop Nav
    # NewApp.tsx renders it.
    planner_link = page.get_by_role("link", name="Planner").first
    print(f"Checking Home Planner link href: {planner_link.get_attribute('href')}")
    expect(planner_link).to_have_attribute("href", "/planner")

    # Take screenshot of Home
    page.screenshot(path="verification/home_planner_link.png")

    # 2. Verify Static Page (Catering)
    print("Navigating to Catering...")
    page.goto("http://localhost:5173/catering.html")

    # Check Planner link in Static Nav
    planner_link_static = page.locator("a.filigree-link.filigree-planner")
    print(f"Checking Catering Planner link href: {planner_link_static.get_attribute('href')}")
    expect(planner_link_static).to_have_attribute("href", "/planner")

    # Take screenshot of Catering
    page.screenshot(path="verification/catering_planner_link.png")

    # 3. Verify Planner Page loads (Direct access)
    # Since /planner rewrite is Cloudflare only, we check /project-planner.html which works in Vite
    print("Navigating to Project Planner HTML...")
    page.goto("http://localhost:5173/project-planner.html")
    expect(page).to_have_title("The Cajun Menu | Project Planning Hub") # Title from project-planner.html
    page.screenshot(path="verification/project_planner_loaded.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_planner_link(page)
            print("Verification passed!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/failure.png")
            raise e
        finally:
            browser.close()
