# 🍽️ Menu & Order Management System (Royal Suite)

A high-performance, full-stack ecosystem for restaurants to digitize
their menus and automate order fulfillment. Built with **Laravel 12
(API)**, **Next.js (Frontend)**, and **Redis** for real-time reactivity.

------------------------------------------------------------------------

## 🌟 What is this project?

This system is a **digital bridge** between diners and the kitchen. It
replaces traditional paper menus with an interactive, QR-code-ready web
interface where customers can browse, customize, and track their meals
in real-time, while providing administrators with a powerful **Command
Center** to manage operations.

### 🎯 The Problem it Solves

-   **Reduced Wait Times:** Eliminates the need for a waiter to take the
    initial order.
-   **Order Accuracy:** Customers select their own variants, reducing
    human error.
-   **Real-time Transparency:** Customers see the status *(Preparing /
    Ready / Delivered)* live.
-   **Menu Agility:** Admins can update prices, stock, or images
    instantly without reprinting.

------------------------------------------------------------------------

## 🛠️ How it Works

### 🥑 Customer Experience

-   **Interactive Menu:** A fluid, mobile-first UI to browse categories
    and products with high-quality images.
-   **Smart Checkout:** Fast-entry form for name, phone, and delivery
    details with **Sonner** notifications.
-   **Live Tracking:** An animated **Order Timeline** that updates as
    the kitchen processes the request.
-   **Order History:** Automatic redirection to `/account/order` to
    track current and past purchases.

### 🛡️ Admin Dashboard

-   **Inventory Control:** Full CRUD for products and categories with
    **Live Image Previews**.
-   **Order Management:** Real-time table view to update order statuses
    *(Pending → Preparing → Ready → Delivered)*.
-   **Print System:** Ability to generate and print order summaries for
    kitchen staff.
-   **Automated Logs:** Track every record with a modern, high-contrast
    interface.

------------------------------------------------------------------------

## 💻 Tech Stack

-   **Backend:** Laravel 12 (PHP 8.3+)
-   **Frontend:** Next.js (TypeScript, Tailwind CSS, Shadcn UI)
-   **Runtime:** Node.js
-   **Database:** MySQL 8.0
-   **Cache & Real-time:** Redis
-   **Containerization:** Docker & Docker Compose

------------------------------------------------------------------------

## ⚙️ Environment Configuration

Before starting the project, ensure you have a `.env` file in the
**backend** folder with the following critical credentials:

``` env
DB_DATABASE=menu_db
DB_PASSWORD=pass123
JWT_SECRET=mi_secreto
```

⚠️ Note: Ensure your `docker-compose.yml` matches these credentials for
a successful connection.

------------------------------------------------------------------------

## 🏗️ Architecture

The project follows a **Decoupled Headless Architecture**:

**RESTful API (Laravel 12)**\
Handles business logic, database integrity, and order processing.

**Client-Side App (Next.js)**\
A highly interactive interface for sub-second page transitions.

**Infrastructure**\
Fully containerized services communicating via a dedicated Docker
network.

------------------------------------------------------------------------

## 🚦 Getting Started (Automation Scripts)

We have simplified the setup process using custom **Bash scripts**.

### Prerequisites

-   Docker
-   Docker Compose

Give execution permissions to the scripts *(one-time setup)*:

``` bash
chmod +x start stop
```

------------------------------------------------------------------------

### 🚀 To Start the System

Run the following command in the root directory. This will:

-   Build images
-   Lift containers
-   Wait for the database
-   Run migrations and seeds automatically

``` bash
./start
```

------------------------------------------------------------------------

### 🛑 To Stop the System

To shut down all services and clean up the environment:

``` bash
./stop
```

------------------------------------------------------------------------

## 📈 Future Roadmap

-   [ ] Payments: Integration with Mercado Pago and PayPal
-   [ ] Analytics: Sales charts and most-ordered products report
-   [ ] PWA: Installable mobile app icon for regular customers

------------------------------------------------------------------------

Developed with 💙 for the **Food & Beverage industry**.