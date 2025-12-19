Jasně, zde je návrh Page Object Model (POM) pro automatizovaný test prvního nákupu na alza.cz podle tebou popsaných kroků. Pro ukázku použiji jazyk Java s frameworkem Selenium WebDriver. Model rozdělím do několika tříd reprezentujících různé stránky a komponenty nákupního procesu.

---

### 1. LoginPage.java

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    private WebDriver driver;

    @FindBy(id = "email") // ID inputu pro e-mail/prihlasovaci jmeno
    private WebElement emailInput;

    @FindBy(id = "password")
    private WebElement passwordInput;

    @FindBy(css = "button[type='submit']")
    private WebElement submitButton;

    @FindBy(linkText = "Registrace")
    private WebElement registrationLink;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void login(String email, String password) {
        emailInput.clear();
        emailInput.sendKeys(email);
        passwordInput.clear();
        passwordInput.sendKeys(password);
        submitButton.click();
    }

    public void navigateToRegistration() {
        registrationLink.click();
    }
}
```

---

### 2. SearchPage.java

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class SearchPage {
    private WebDriver driver;

    @FindBy(id = "search-input")
    private WebElement searchInput;

    @FindBy(id = "search-button")
    private WebElement searchButton;

    @FindBy(css = ".product-item")
    private List<WebElement> productItems;

    public SearchPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void searchProduct(String productName) {
        searchInput.clear();
        searchInput.sendKeys(productName);
        searchButton.click();
    }

    public void selectProductByName(String productName) {
        for (WebElement product : productItems) {
            if (product.getText().contains(productName)) {
                product.click();
                break;
            }
        }
    }
}
```

---

### 3. ProductPage.java

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ProductPage {
    private WebDriver driver;

    @FindBy(id = "add-to-cart")
    private WebElement addToCartButton;

    public ProductPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void addToCart() {
        addToCartButton.click();
    }
}
```

---

### 4. CartPage.java

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CartPage {
    private WebDriver driver;

    @FindBy(css = ".cart-product-name")
    private WebElement productName;

    @FindBy(css = ".cart-quantity")
    private WebElement quantity;

    @FindBy(css = ".cart-price")
    private WebElement price;

    @FindBy(css = ".cart-shipping-info")
    private WebElement shippingInfo;

    @FindBy(id = "continue-to-delivery")
    private WebElement continueButton;

    public CartPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public String getProductName() {
        return productName.getText();
    }

    public int getQuantity() {
        return Integer.parseInt(quantity.getAttribute("value"));
    }

    public String getPrice() {
        return price.getText();
    }

    public String getShippingInfo() {
        return shippingInfo.getText();
    }

    public void continueToDelivery() {
        continueButton.click();
    }
}
```

---

### 5. DeliveryAndPaymentPage.java

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class DeliveryAndPaymentPage {
    private WebDriver driver;

    @FindBy(name = "delivery-method")
    private List<WebElement> deliveryOptions;

    @FindBy(name = "payment-method")
    private List<WebElement> paymentOptions;

    @FindBy(id = "confirm-order")
    private WebElement confirmOrderButton;

    public DeliveryAndPaymentPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void selectDeliveryMethod(String methodName) {
        for (WebElement option : deliveryOptions) {
            if (option.getText().contains(methodName)) {
                option.click();
                break;
            }
        }
    }

    public void selectPaymentMethod(String methodName) {
        for (WebElement option : paymentOptions) {
            if (option.getText().contains(methodName)) {
                option.click();
                break;
            }
        }
    }

    public void confirmOrder() {
        confirmOrderButton.click();
    }
}
```

---

### 6. OrderConfirmationPage.java

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class OrderConfirmationPage {
    private WebDriver driver;

    @FindBy(css = ".order-number")
    private WebElement orderNumber;

    @FindBy(css = ".order-confirmation-message")
    private WebElement confirmationMessage;

    public OrderConfirmationPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public String getOrderNumber() {
        return orderNumber.getText();
    }

    public String getConfirmationMessage() {
        return confirmationMessage.getText();
    }
}
```

---

Ve svém testu pak můžeš jednotlivé objekty používat, například:

```java
LoginPage loginPage = new LoginPage(driver);
loginPage.login("user@example.com", "heslo123");

SearchPage searchPage = new SearchPage(driver);
searchPage.searchProduct("notebook");
searchPage.selectProductByName("Intel Core i7 Notebook");

ProductPage productPage = new ProductPage(driver);
productPage.addToCart();

CartPage cartPage = new CartPage(driver);
assertTrue(cartPage.getProductName().contains("notebook"));
cartPage.continueToDelivery();

DeliveryAndPaymentPage deliveryPage = new DeliveryAndPaymentPage(driver);
deliveryPage.selectDeliveryMethod("kurýr");
deliveryPage.selectPaymentMethod("kartou online");
deliveryPage.confirmOrder();

OrderConfirmationPage orderConfirmation = new OrderConfirmationPage(driver);
String orderNumber = orderConfirmation.getOrderNumber();
System.out.println("Objednávka vytvořena s číslem: " + orderNumber);
```

---

Pokud chceš, můžu ti pomoci i s implementací konkrétních locatorů podle skutečného kódu alza.cz nebo dalšími kroky testování. Stačí říct!