from playwright.sync_api import sync_playwright
import time

def verify(page):
    # Check Project Planner directly via .html file first to verify clean load
    print("Navigating to project-planner.html...")
    try:
        response = page.goto("http://localhost:4173/project-planner.html")
        if response.status != 200:
             print(f"Failed to load page: {response.status}")
             return
    except Exception as e:
        print(f"Navigation failed: {e}")
        return

    time.sleep(2) # Wait for React to mount

    # Verify static nav is gone (e.g. "filigree-nav" class shouldn't exist)
    # The React app has a header "Cajun Project Console"

    try:
        # Wait for React content
        page.wait_for_selector('text="Cajun Project Console"', timeout=5000)
        print("Found React app header: Cajun Project Console")
    except:
        print("Failed to find React app header. Check screenshot.")

    # Check that the old static nav is GONE.
    # The old nav had class "site-nav filigree-shell"
    if page.locator('.site-nav.filigree-shell').count() == 0:
        print("Static nav is GONE (Success)")
    else:
        print("Static nav is STILL PRESENT (Failure)")

    page.screenshot(path="verification/planner_view.png")
    print("Screenshot saved to verification/planner_view.png")

    # Check Main App link
    print("Navigating to Main App...")
    page.goto("http://localhost:4173/")
    time.sleep(2)

    # Check if "Planner" link exists and points to /planner
    planner_link = page.get_by_role("link", name="Planner").first
    if planner_link.is_visible():
        href = planner_link.get_attribute("href")
        print(f"Planner link found. Href: {href}")
        if href == "/planner":
             print("Planner link href is correct (/planner).")
        else:
             print(f"Planner link href is INCORRECT: {href}")
    else:
        print("Planner link NOT found.")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify(page)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()
