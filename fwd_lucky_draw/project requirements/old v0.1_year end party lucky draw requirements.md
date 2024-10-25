# project overview

Use this guide to build a web app where players can register their email ID to the year end party lucky draw. clicking a draw button shows a random name in a list of names. you can consider various transmission effects that enhance user engagement and excitement.

# Feature requirements

- We will use Next.js, shadcn UI, Lucid, Supabase, Clerk and Replicate.
- build page for game organizer to define lucky draw prizes, set the list of names and also start the draw.
- build page for players to register their email ID to the year end party lucky draw.
- build page for players to see the list of names in ascending order and also see the list of winners for each category of prizes as of the current time.
- Use real-time notifications to inform players for the lucky draw start notification. This can include countdown timers and live updates on entries, enhancing engagement.
- Random Selection Animation, Implement animations that visually represent the selection process. For example, a spinning wheel or a lottery drum effect can create anticipation as the winner is chosen.
- Incorporate dynamic visual effects during the announcement of winners. Flashing lights or confetti animations can add excitement and make the moment memorable.

# winner selection

- Automated Winner Selection: Utilize software that randomly selects winners from entries, ensuring transparency and fairness in the process.
- The draw sequence should be followed as defined in the game_config table.
- The draw should be done in real-time.
- The draw result should be displayed in the UI.
- The draw result should be stored in the game_draw_logs table.
database and the user record should be updated with the winner flag in users table.
- the draw result should be removed from the list of names and the user record should be updated with the winner but not claimed flag in users table.
- 


# UI & Animations

- Have a nice UI & animations when the winner is selected.
- show the winner name in a modal popup.
- show the winner name in a confetti animation.
- Display all winners in a grid with scrolling animation when new winners are generated.
- For each winner, display the name, email.
- persist the grid of winners after refreshing the page.

# database schema

- users table to store the list of names allowed to join the lucky draw. user unique ID, List of email IDs (Primary Key), display names, eligibility game category (list of categories) and is registered boolean (default false), is winner boolean (default false), is winner but not claimed boolean (default false), winner game category.
- game_config table to store the game configuration. List of game categories (Primary Key), list of prizes and draw sequence.
- game_draw_logs table to store the draw logs for each game category. store id, draw date time, game category, draw sequence, winner email ID, winner id (fk of users table user's unique id), winner name, is winner claimed boolean.

# API endpoints

- /api/register-user
- /api/start-draw
- /api/get-winners

# Security

- All API endpoints should be protected with authentication and authorization.
- Only the game organizer should be able to start the draw.
