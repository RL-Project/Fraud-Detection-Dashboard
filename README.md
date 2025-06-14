# RL-Based Fraud Detection Dashboard

A comprehensive dashboard interface for monitoring and interacting with a Reinforcement Learning (RL) based fraud detection system for financial transactions.


## Overview

This project implements a modern, interactive dashboard for financial fraud detection powered by Reinforcement Learning algorithms. The system provides real-time monitoring of transactions, visualization of fraud patterns, and an interactive transaction checker to evaluate potential fraudulent activities.

## Features

### Dashboard & Analytics
- **Real-time Metrics**: Monitor key fraud detection statistics including transactions processed, fraud detected, detection rate, and false positives
- **Transaction Distribution**: Visual breakdown of legitimate, suspicious, and fraudulent transactions
- **Model Performance Tracking**: Charts showing accuracy, precision, recall, and F1 score over time

### Interactive Components
- **Transaction Fraud Checker**: Test if specific transactions are likely to be fraudulent
- **Transaction History**: Review recent transactions with their fraud detection status
- **Dark/Light Mode**: Toggle between themes for different working environments

### Technical Features
- Responsive design for all device sizes
- Modern UI with clean, professional aesthetics
- Data visualization for fraud patterns and model performance

## Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Visualization**: Recharts
- **Icons**: Lucide React

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdenourBouziane/fraud-detection-dashboard.git
   cd fraud-detection-dashboard

2. Install dependencies:

```shellscript
npm install
```


3. Run the development server:

```shellscript
npm run dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.


## Usage Guide

### Dashboard Navigation

The dashboard is organized into several sections:

- **Top Header**: Contains navigation, theme toggle, and user controls
- **Metrics Cards**: Shows key performance indicators at a glance
- **Charts Section**: Visualizes transaction distribution and model performance
- **Transaction Checker**: Allows testing of specific transactions for fraud
- **Transaction Table**: Lists recent transactions with their fraud status


### Using the Transaction Checker

1. Enter the transaction details:

1. Transaction amount
2. Account ID
3. Transaction type
4. Transaction location



2. Click "Check Transaction" to analyze the transaction
3. Review the results:

1. Fraud score percentage
2. Transaction status (legitimate, suspicious, or fraudulent)
3. Analysis factors that contributed to the assessment





## Project Structure

```
fraud-detection-dashboard/
├── app/
│   ├── layout.tsx        # Main layout with theme provider
│   ├── page.tsx          # Dashboard main page
│   └── globals.css       # Global styles
├── components/
│   ├── dashboard-header.tsx
│   ├── fraud-metrics-cards.tsx
│   ├── transaction-table.tsx
│   ├── model-performance.tsx
│   ├── fraud-distribution-chart.tsx
│   ├── transaction-checker.tsx
│   ├── mode-toggle.tsx
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md             # This file
```

## Integration with RL Model

This dashboard is designed to interface with a Reinforcement Learning model for fraud detection. In a production environment, you would:

1. Connect the dashboard to your RL model API
2. Replace the mock data with real-time data from your financial system
3. Implement the actual fraud detection logic in place of the simulated checks


The RL model should be implemented separately, likely using Python with libraries like TensorFlow or PyTorch, and would communicate with this interface through APIs.


## Acknowledgments

- This project was created as part of the RL for Fraud Detection in Financial Systems research project
- Inspired by real-world financial fraud detection systems
- Uses the Kaggle Credit Card Fraud Detection dataset for training examples
