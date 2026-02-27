from playwright.sync_api import sync_playwright

def verify_planner():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # 1. Navigate to the project planner directly
            print("Navigating to /project-planner.html...")
            response = page.goto("http://localhost:3000/project-planner.html")

            # Check if the response status is 200 (OK)
            if response.status == 200:
                print("Successfully accessed /project-planner.html (Status 200)")
            else:
                print(f"Failed to access /project-planner.html (Status {response.status})")

            # 2. Wait for the page content to load (checking for title or specific element)
            # Based on project-planner.html content
            try:
                page.wait_for_selector("title:has-text('Project Plan Dashboard')", timeout=5000)
                print("Page title verified.")
            except Exception as e:
                print(f"Title verification failed or timed out: {e}")
                print(f"Actual title: {page.title()}")

            # 3. Take a screenshot
            page.screenshot(path="verification_planner.png")
            print("Screenshot saved to verification_planner.png")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_planner()
