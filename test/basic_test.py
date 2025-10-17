import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions

TEST_URL = "http://localhost:8000/"

@pytest.fixture(scope="module")
def driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    yield driver
    driver.quit()

def test_page(driver):
    driver.get(TEST_URL)
    initial_element = driver.find_element(By.LINK_TEXT, "General")
    assert "General" in initial_element.text
    initial_element.click()
    next_page = driver.find_element(By.LINK_TEXT, "Lem Tek 18 based Quiz - BM")
    next_page.click()
    footer = driver.find_element(By.ID, "q-number")
    result = WebDriverWait(driver, 10).until(expected_conditions.text_to_be_present_in_element((By.ID, "q-number"), "Question"))
    if result:
        assert "test" in footer.text