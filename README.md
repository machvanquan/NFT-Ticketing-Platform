# NFT Ticketing Platform

## Problem to Solve

This is a responsive NFT marketplace theme built using ReactJS. It includes various components such as Navbar, Main Banner, NFT Collection List, NFT Item List, Top Sellers and Creators, Newsletter, and Footer.

## Possible Solution

A Ticketing Platform that empowers event managers to seamlessly vend tickets and oversee attendees through the utilization of NFTs (Non-Fungible Tokens). Event teams can establish publicly shareable links for their occasions, enabling users to acquire tickets by making payments in SOL and SPL tokens facilitated by CandyPay Checkout. Following each successful payment, users have airdropped an NFT, which subsequently serves to track attendees and verify their ownership at the event venue.

## Resources

- Employ the Webhooks API to detect the customer's wallet address post each successful payment - `https://docs.candypay.fun/checkout/webhooks.html`
- Utilize Metaplex JS SDKs to create an NFT function for airdropping NFTs to the customer's wallet address - `https://github.com/metaplex-foundation/js#create`
- Verify ownership of these NFTs using the Metaplex JS SDKs findAllByOwner - `https://github.com/metaplex-foundation/js#findallbyowner`
- CandyPay Documentation - `https://docs.candypay.fun/`

## Technologies Used

- React JS
- Node JS
- CSS
- HTML
- Blockchain
- Solana
- Shyft SDK

## Installation

1. Clone the repository using `git clone https://github.com/machvanquan/NFTick.git`
2. Install dependencies using `npm install`
3. Run the development server using `npm run dev`

## Usage

Once the development server is running, you can view the theme by visiting `http://localhost:5173` in your web browser.