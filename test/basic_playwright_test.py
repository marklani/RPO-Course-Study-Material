import re
from playwright.sync_api import Page, expect

TEST_URL = "http://localhost:8000/"

def test_has_title(page: Page):
    page.goto(TEST_URL)

    # Expect a title "to contain" a substring.
    expect(page).to_have_title(re.compile("Main Menu"))

def test_get_started_link(page: Page):
    page.goto(TEST_URL)

    page.get_by_text("General").click()
    expect(page).to_have_title("NDT Categories")

    page.get_by_text("Lem Tek 18 based Quiz - BM").click()

    expect(page).to_have_title("LemTek Quiz - BM")
    expect(page.locator('id=q-number')).to_be_visible()