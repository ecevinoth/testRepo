# Year End Party Lucky Draw Web App: Detailed Requirements

## 1. Project Overview
The goal is to create a web app for a Year-End Party lucky draw where users can register and participate. Organizers will define prizes and conduct the draw, while participants can view the list of entrants and winners in real-time. The app will use Next.js, shadcn UI, Lucid, Supabase and Clerk for functionality, security, and user management.

## 2. Key Features
### a. Player Registration
- **Registration Page**: A page for players to submit their email IDs and register for the lucky draw.
  - **Input**: Email ID
  - **Display Name**: allow the user to enter their display name with multiple emojis.
  - **Data validation**: Ensure that the email is valid, unique, and not already registered. It should not be case sensitive. Input email id should be present in the users table.
  - **Registration Confirmation**: Provide a visual confirmation (e.g., success message or popup) upon registration. if the email id is already registered, provide a visual confirmation (e.g., success message or popup) to the user and do not allow the user to register again. if the email id is not present in the users table then ask the user to contact the game organizer to register.

### b. Game Organizer's Dashboard
- **Prize Definition Page**: Interface for organizers to define prizes, set up draw categories, prize sequence and image for each prize.
- **Participant Management**: Display the list of registered players and their details.
  - Ability to filter by registration status and prize eligibility.
- **Start Draw Button**: Button to initiate the draw process.
  - Real-time notification broadcast to all registered participants when the draw starts.

### c. Players List & Winners Page
- **Participants List**: Display all registered participants in ascending order (sorted by registered date time descending).
- **Winners List**: A dedicated section showing the current winners for each prize category.
  - Dynamic real-time updates after every draw, ensuring users can see the most up-to-date list of winners.
  - Visual indicators for winners (e.g., highlighted entries or badges).

### d. Real-time Draw & Winner Announcement
- **Random Selection Animation**: Incorporate engaging visual effects during the draw, such as:
  - Spinning wheel, lottery drum, or random name shuffling.
  - Countdown timers to build anticipation.
- **Winner Announcement**:
  - Modal popup displaying the winner’s display name and email.
  - Confetti animation for added excitement when the winner is announced.
  - Flashing lights and sound effects to celebrate the winner.
  - Automatic grid update that persists even after refreshing the page.
  - If the winner is not claimed, the winner's name should not be displayed in the winners list.

### e. Live Notifications & Countdown
- Real-time notifications to registered players about the start of the draw.
- WebSocket or Supabase real-time API integration for live updates.
- Countdown timers visible to players for upcoming draws.
- Live statistics of total registrations and remaining prizes.

## 3. Winner Selection Logic
### a. Automated Winner Selection
- **Random Draw**: Implement random number generation or name selection logic to ensure transparency.
  - The draw should follow the sequence defined in the game_config table.
- **Fairness**: Winners should be randomly selected, with each participant having an equal chance.
- **Real-time Updates**: Once a winner is selected irrespective of whether the winner is claimed or not, the name should be removed from the list of eligible names for all prize categories.
- **Player Eligibility**: The player should be selected based on the game category eligibility.

### b. Database Updates
- **Winners Flag**:
  - Once selected, the participant's record should be updated if the winner is claimed:
    - `is_winner`: True.
    - `is_winner_but_not_claimed`: False.
  - Once selected, the participant's record should be updated if the winner is not claimed:
    - `is_winner`: True.
    - `is_winner_but_not_claimed`: True.
  - The result should also be saved to the game_draw_logs table with the draw date, prize, and winner’s details.
- **Claim Mechanism**: After the winner claims their prize, update the `is_winner_but_not_claimed` flag to False.

## 4. UI & Animations
- **Winner Modal**: Upon selecting a winner, a modal pops up displaying the winner's display name and email.
- **Confetti Animation**: Dynamic confetti animations to celebrate winners in a visually appealing way.
- **Winners Grid**: Display all winners in a grid format that scrolls smoothly when new winners are added.
  - This grid should persist even after page refreshes.

## 5. Database Schema
### a. Users Table
Stores registered participants:
- `user_id`: Unique identifier.
- `email`: Primary Key.
- `display_name`: Name of the participant.
- `game_category`: List of categories for which the user is eligible.
- `is_registered`: Boolean (default false).
- `is_winner`: Boolean (default false).
- `is_winner_but_not_claimed`: Boolean (default null).
- `winner_game_category`: The category where the participant won, if applicable.

### b. Game_Config Table
Stores configurations for each game:
- `category`: Prize category (Primary Key).
- `prizes`: List of prizes associated with the category.
- `draw_sequence`: Sequence for the prize draw (e.g., 1st prize, 2nd prize).

### c. Game_Draw_Logs Table
Stores logs for each draw:
- `id`: Unique identifier.
- `draw_date_time`: Time of the draw.
- `game_category`: The category of the draw.
- `draw_sequence`: Sequence of the prize.
- `winner_email`: Email ID of the winner.
- `winner_id`: Foreign key to the users table.
- `winner_name`: Name of the winner.
- `is_winner_claimed`: Boolean (if the winner has claimed their prize).

## 6. API Endpoints
### a. `/api/register-user`
Registers a participant for the lucky draw.
- Validates user data (email format, uniqueness, display name uniqueness, email should be present in the users table).
- Returns a success message or error message.
- If the email is not present in the users table, return an error message and ask the user to contact the game organizer vinoth chellamuthu.

### b. `/api/start-draw`
Starts the lucky draw for the specified game category.
- Protected by authentication and authorization (only organizers can trigger this).
- allows the organizer to hit draw button via post request with valid payload including a predefined password phrase.
- The draw should follow the sequence defined in the game_config table.
- The draw should be conducted for all the categories defined in the game_config table.
- should allow the organizer to declare the winner claimed or not claimed

### c. `/api/get-winners`
Returns the list of winners.
- Real-time data to be updated on the UI for players.

## 7. Security
- **Authentication & Authorization**:
  - Use Clerk for user authentication and session management.
  - Organizers should be authenticated before starting the draw.
  - Player registration, prize configuration, and draw initiation should be protected with appropriate role-based authorization.

## 8. Additional Requirements
### a. Clerk Authentication
#### How to use clerk for authentication
Install @clerk/nextjs
The package to use with Clerk and NextJS.

npm
yarn
pnpm
terminal

npm install @clerk/nextjs
2
Set your environment variables
Add these keys to your .env.local or create the file if it doesn't exist. Retrieve these keys anytime from the API keys page.

.env.local

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
3
Update middleware.ts

Update your middleware file or create one at the root of your project or src/ directory if you're using a src/ directory structure.

The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.

middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
4
Add ClerkProvider to your app

All Clerk hooks and components must be children of the ClerkProvider component.

You can control which content signed in and signed out users can see with Clerk's prebuilt components.

App Router
Pages Router
/src/app/layout.tsx

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

### b. Current File Structure (you have to follow this structure)
FWD_LUCKY_DRAW
├── .next
├── app
│   ├── fonts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components
│       └── ui
│           ├── alert-dialog.tsx
│           ├── alert.tsx
│           ├── badge.tsx
│           ├── button.tsx
│           ├── card.tsx
│           ├── form.tsx
│           ├── hover-card.tsx
│           ├── input.tsx
│           ├── label.tsx
│           ├── select.tsx
│           ├── separator.tsx
│           ├── slider.tsx
│           ├── toggle.tsx
│           └── tooltip.tsx
├── lib
├── node_modules
├── project requirements
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json

### c. Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go in /app.
- All new API routes go in /app/api.
