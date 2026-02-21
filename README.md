# 🍽️ Menu & Order Management System

A full-stack, real-time solution for restaurants and cafes to manage digital menus and customer orders via QR codes or web links. Built with **Laravel (API)**, **Next.js (Frontend)**, **Docker**, and **Redis**.

## 🚀 Project Overview

This system is designed to bridge the gap between customers and kitchen staff. It allows diners to browse a digital menu from their mobile devices, customize their orders with variants, and track the status of their meal in real-time.

### Key Features

- **Online Ordering:** Customers can place orders via QR code or direct link.
- **Dynamic Menu:** Support for categories, products, and complex variants (e.g., "Add-ons" or "Sizes").
- **Real-Time Tracking:** Order status updates (Pending → Preparing → Ready → Delivered).
- **Admin Dashboard:** Centralized panel for managing the catalog, prices, and images.
- **Kitchen Notifications:** Instant alerts for staff when a new order is received.
- **Flexible Payments:** Support for "Cash on Pickup" with future integration for PayPal and Mercado Pago.

## 🛠️ Tech Stack

- **Backend:** Laravel (PHP)
- **Frontend:** Next.js (TypeScript + Tailwind CSS + Shadcn UI)
- **Database:** MySQL
- **Cache & Real-time:** Redis
- **Containerization:** Docker & Docker Compose

## 🏗️ Architecture

The project follows a decoupled architecture where the **Laravel API** handles business logic, database integrity, and order processing, while the **Next.js Frontend** provides a fast, responsive user interface for both customers and administrators.

## 🚦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-user/menu-pedidos.git](https://github.com/your-user/menu-pedidos.git)