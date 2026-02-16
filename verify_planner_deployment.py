from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Verify Main Page
        print("Navigating to home page...")
        page.goto("http://localhost:4173/")
        page.wait_for_selector("text=THE CAJUN MENU")

        # Check for Planner link
        planner_link = page.locator("a", has_text="Planner")
        if planner_link.count() > 0:
            href = planner_link.get_attribute("href")
            print(f"Found Planner link with href: {href}")
            if href != "/planner":
                print("ERROR: Planner link href is incorrect.")
        else:
            print("ERROR: Planner link not found.")

        page.screenshot(path="verification/home_page.png")
        print("Screenshot saved to verification/home_page.png")

        # 2. Verify Planner App (direct access to html file)
        print("Navigating to planner app directly...")
        page.goto("http://localhost:4173/project-planner.html")

        # Check for Planner specific text
        try:
            page.wait_for_selector("text=Cajun Project Console", timeout=5000)
            print("Planner app loaded successfully.")
        except:
            print("ERROR: Planner app content not found.")

        page.screenshot(path="verification/planner_page.png")
        print("Screenshot saved to verification/planner_page.png")

        browser.close()

if __name__ == "__main__":
    run()
