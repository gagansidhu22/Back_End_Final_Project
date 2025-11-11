## Project Context:
My backend API manages donations, users, and orders for a Homelessness 
Donation Tracker system. We aim to make the system more engaging and 
efficient by adding useful back-end functionality that enhances user 
experience and system reliability.

Selected component: Nodemailer

## Overview: 
Nodemailer is a Node.js library used to send emails directly from a 
backend server. It allows applications to send transactional or 
notification-based emails — such as user registration confirmations, 
donation receipts, or password resets.

## Use Case in Our Project

In our project, we can use Nodemailer to send:
Confirmation emails when a user registers or donates.
Notification emails to admin users when a new donation is received.
Acknowledgment messages for completed transactions.

## Implementation plan:

step 1: installation of packages.
step 2: set up mail transporter
step 3: Create a reusable mail utility
step 4: Trigger email
