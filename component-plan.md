## Project Context

My backend API manages donations, users, and orders for a restaurant. 
To improve user experience and system reliability, we are adding 
additional backend functionality that makes the system more interactive 
and informative. One such component is Nodemailer, which helps send 
automatic email notifications to users and administrators.

## Overview

Nodemailer is a Node.js library used for sending emails from a backend server. 
It allows applications to send automated or transactional emails such as 
account confirmations, receipts, alerts, and password recovery messages. 
It works with SMTP services, making it simple to integrate email features 
into an API.

## Use Case in Our Project

In this project, Nodemailer can support communication by sending:

Confirmation emails when a user registers or makes a donation.

Notification emails to admin users when a new donation is received.

Acknowledgment messages for completed transactions or processed orders.

This helps improve user trust and keeps admins informed in real time.

## Implementation Plan
Step 1: Install required packages

Install Nodemailer using npm.

Step 2: Set up the mail transporter

Configure the SMTP service (e.g., Gmail, Outlook, Mailtrap) with credentials 
stored in environment variables.

Step 3: Create a reusable mail utility

Create a module that handles sending emails so it can be reused across routes.

Step 4: Trigger emails from API events

Call the mail utility inside routes such as registration, donation creation, or 
order completion.