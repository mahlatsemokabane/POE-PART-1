# Brew & Bean Artisan Coffee Website

## Project Overview

The **Brew & Bean Artisan Coffee Website** is a responsive website prototype designed to provide customers with a modern digital experience for discovering coffee products, exploring café activities, planning visits, and making enquiries.

The website is designed around four main experiences:

* **Discover** — Explore coffee products, origins and brewing information.
* **Order Ahead** — Browse products and simulate an order for collection.
* **Belong** — Discover events, workshops and loyalty opportunities.
* **Connect** — Contact the café, request catering and find visit information.

The project is developed as an academic website prototype using HTML5, CSS3 and JavaScript.

---

## Project Objectives

The website aims to:

1. Create a distinctive online identity for Brew & Bean Artisan Coffee.
2. Make products easy for customers to discover.
3. Provide an Order Ahead prototype.
4. Promote community events and workshops.
5. Introduce a loyalty programme concept.
6. Provide clear contact and visit information.
7. Provide a responsive experience across desktop, tablet and mobile devices.
8. Demonstrate interactive functionality using JavaScript.
9. Provide an accessible and user-friendly interface.

---

## Website Structure

The website is organised around customer tasks rather than a traditional information-only structure.

```text
Brew & Bean Artisan Coffee
│
├── Home
│
├── Order Ahead
│
├── Discover
│   ├── Coffee Origins
│   ├── Brewing Guides
│   └── Product Stories
│
├── Community
│   ├── Events
│   ├── Workshops
│   └── Loyalty
│
├── Visit
│   ├── Opening Hours
│   ├── Location
│   └── Café Information
│
└── Contact
    ├── Catering
    ├── Private Events
    ├── Feedback
    └── General Enquiries
```

---

## Main Features

### 1. Responsive Navigation

The website includes navigation that adapts to different screen sizes.

On smaller screens, a menu button can be used to open and close the navigation menu.

### 2. Product Discovery

Customers can explore coffee and food products through organised information and recommendations.

The proposed website can include:

* Coffee origin information
* Flavour profiles
* Brewing information
* Product recommendations
* Dietary information
* Featured products

### 3. Order Ahead Prototype

The Order Ahead feature demonstrates how a customer could:

1. Select a product.
2. Choose available options.
3. Review the order.
4. Select a collection time.
5. Receive an order confirmation.

The current academic prototype does **not process real payments**.

A payment gateway can be integrated during a future development phase.

### 4. Community Events

The Community section can be used to promote:

* Coffee tastings
* Latte-art workshops
* Community activities
* Café announcements
* Other special events

### 5. Loyalty Programme

The website includes a concept for a loyalty area where customers can learn about rewards and benefits.

The prototype does not store real customer accounts or sensitive personal information.

### 6. Contact System

Customers can use the contact area for:

* General enquiries
* Catering requests
* Private events
* Feedback
* Partnership enquiries

---

# Technologies Used

The website uses the following technologies:

### HTML5

HTML5 provides the structure and semantic content of the website.

Examples include:

* Header
* Navigation
* Sections
* Articles
* Forms
* Footer

### CSS3

CSS3 is used to control:

* Colours
* Typography
* Layout
* Responsive design
* Cards
* Buttons
* Navigation
* Spacing
* Mobile layouts

CSS Grid and Flexbox are used for responsive layouts.

### JavaScript ES6+

JavaScript provides interactive functionality such as:

* Mobile navigation
* Product filtering
* Form interactions
* Dynamic interface behaviour

The project does not require a front-end framework.

---

# Project Files

```text
brew-and-bean/
│
├── index.html
├── order.html
├── discover.html
├── community.html
├── visit.html
├── contact.html
│
├── style.css
├── script.js
│
└── README.md
```

### `index.html`

The homepage introduces Brew & Bean and provides access to the main customer journeys.

### `order.html`

Contains the Order Ahead prototype.

### `discover.html`

Contains coffee discovery information, product stories and brewing content.

### `community.html`

Contains events, workshops and loyalty information.

### `visit.html`

Provides practical information such as opening hours, location and café facilities.

### `contact.html`

Contains contact forms and enquiry options.

### `style.css`

Contains all website styling and responsive layouts.

### `script.js`

Contains JavaScript functionality and interactive components.

### `README.md`

Contains project documentation and setup instructions.

---

# How to Run the Website

No special server or software is required to run the basic prototype.

## Method 1 — Open Directly

1. Download the website project.
2. Extract the ZIP folder.
3. Open the project folder.
4. Double-click:

```text
index.html
```

5. The website will open in your web browser.

---

## Method 2 — Visual Studio Code

For development, Visual Studio Code can be used.

1. Install Visual Studio Code.
2. Open Visual Studio Code.
3. Select **File → Open Folder**.
4. Select the Brew & Bean website folder.
5. Open `index.html`.
6. Use a browser to preview the website.

The **Live Server** extension can also be used to preview changes automatically.

---

# Responsive Design

The website is designed to work on:

* Desktop computers
* Laptops
* Tablets
* Smartphones

CSS media queries are used to change the layout depending on the screen size.

The website uses:

```text
CSS Grid
CSS Flexbox
Media Queries
Responsive Images
Flexible Containers
```

---

# Accessibility

The website aims to provide an accessible experience by using:

* Semantic HTML
* Descriptive image alternative text
* Clear form labels
* Keyboard-friendly navigation
* Readable typography
* Sufficient colour contrast
* Visible interactive states
* Responsive layouts

Accessibility should be tested again before the website is published.

---

# Images

The prototype may use online image resources for demonstration purposes.

Before final deployment, images should be:

* Properly licensed
* Compressed for performance
* Given descriptive filenames
* Provided with suitable alternative text

---

# Forms

The contact and enquiry forms are currently designed as a prototype.

For a live website, the forms should be connected to a service such as:

```text
Formspree
```

or another suitable form-processing solution.

The final website should also include spam protection and server-side validation where appropriate.

---

# Maps

The Visit page can include a Google Maps embed.

Before deployment, replace the placeholder location with the confirmed Brew & Bean business address.

---

# Order System

The Order Ahead functionality is currently a demonstration feature.

It does not currently include:

* Real payment processing
* Customer accounts
* Real-time stock management
* Real café order management
* Database storage

These features can be added in a future version.

---

# Browser Compatibility

The website should be tested on modern versions of:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

Testing should also be performed on both mobile and desktop screen sizes.

---

# Future Improvements

Possible future development includes:

1. Online payment integration.
2. Customer account registration.
3. Real loyalty points.
4. Database integration.
5. Real-time order management.
6. Email notifications.
7. SMS collection notifications.
8. Online gift cards.
9. Customer reviews.
10. Advanced product recommendations.
11. Blog and coffee education section.
12. Google Analytics reporting.
13. Content management system integration.

---

# Deployment Requirements

Before deployment, the following information must be confirmed:

* Official business address
* Telephone number
* Business email address
* Opening hours
* Final menu
* Product prices
* Event dates
* Social media links
* Final photographs
* Domain name

The supplied project information establishes the Brew & Bean business context but does not provide all of these live-business details, so placeholder information should be replaced before publication.

---

# Version Control

Git and GitHub can be used to manage the project.

Example workflow:

```bash
git init

git add .

git commit -m "Initial Brew & Bean website"

git branch -M main

git remote add origin YOUR-GITHUB-REPOSITORY

git push -u origin main
```

The original project requirements also identify Git and GitHub as the intended version-control approach.

---

# Academic Project Note

This website is an academic prototype created for the **WED5020POE** project.

The website demonstrates:

* Web design
* HTML5
* CSS3
* JavaScript
* Responsive design
* User experience design
* Website architecture
* Accessibility
* Basic interactive functionality

It should not be considered a fully deployed commercial ordering system until the required backend, payment, security and business integrations have been implemented.

---

# Author

**Name:** Mahlatse Mokabane
**Student Number:** ST10442162
**Module:** WED5020POE

---

# Conclusion

The Brew & Bean Artisan Coffee website provides a modern digital experience focused on product discovery, ordering, community engagement and customer communication.

The project is designed to be simple enough to develop using HTML5, CSS3 and JavaScript while providing a foundation for future features such as online payments, customer accounts, loyalty systems and database integration.
