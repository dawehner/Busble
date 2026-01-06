# 🚌 Busble - The Bus Dating App

Find your perfect bus match! Swipe through a curated selection of buses and discover your transit soulmate.

## Features

- **Swipe Mechanics**: Swipe right to like, left to pass
- **Touch & Mouse Support**: Works on desktop and mobile
- **Keyboard Controls**: Use arrow keys (← →) to swipe
- **Match Animation**: When you match, you'll see the exciting "YOU BUSSEL!!" animation
- **25% Match Rate**: Matches occur on 1 in 4 right swipes
- **Stats Tracking**: Keep track of your swipes and matches
- **10 Unique Buses**: Each with their own personality and charm

## How to Use

### Local Development
1. Open `index.html` in your web browser
2. Swipe right (like) or left (nope) on buses
3. When you match, celebrate your "BUSSEL!!" moment
4. Keep swiping to find more bus matches!

### Deploy to Netlify

The easiest way to deploy Busble is with Netlify:

1. **Deploy via Netlify CLI**:
   ```bash
   # Install Netlify CLI globally
   npm install -g netlify-cli

   # Deploy to Netlify
   netlify deploy

   # For production deployment
   netlify deploy --prod
   ```

2. **Deploy via Netlify Dashboard**:
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will automatically detect the `netlify.toml` configuration
   - Click "Deploy site"

3. **Deploy via drag-and-drop**:
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop your project folder
   - Your site will be live instantly!

The Netlify configuration is in `netlify.toml` and includes security headers and proper routing.

### Deploy to GitHub Pages

This project also includes automatic deployment to GitHub Pages. To set it up:

1. **Enable GitHub Pages in your repository**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"

2. **Push to main/master branch**:
   - The GitHub Actions workflow will automatically deploy your site
   - Your site will be available at: `https://[username].github.io/[repository-name]/`

3. **Manual deployment** (optional):
   - Go to the **Actions** tab in your repository
   - Click on "Deploy to GitHub Pages"
   - Click "Run workflow" to manually trigger a deployment

The deployment workflow is configured in `.github/workflows/deploy.yml` and will run automatically whenever you push to the main or master branch.

## Controls

- **Mouse**: Click and drag the card left or right
- **Touch**: Swipe on mobile devices
- **Buttons**: Click the ❤️ (like) or ✖️ (nope) buttons
- **Keyboard**: Use left/right arrow keys

## Technical Details

- Built with HTML, CSS, and vanilla JavaScript
- Styled with Tailwind CSS
- No build process required - just open and run!
- Responsive design works on all screen sizes

## The Buses

Meet our diverse roster:
- Red Double-Decker - Classic British charm
- Yellow School Bus - Cheerful and reliable
- Sleek City Express - Modern and efficient
- Vintage VW Bus - Free spirit beach lover
- Electric Green Bus - Eco-friendly future
- Party Bus Deluxe - Life of the party
- Articulated Bendy - Flexible and spacious
- Tourist Sightseeing Bus - Loves showing you around
- Night Rider Express - Mysterious late-night cruiser
- Airport Shuttle - Always ready for adventure

## Match Probability

The app uses a 25% match rate (1 in 4) when you swipe right, creating just the right amount of excitement without being too easy!

---

Made with ❤️ and 🚌
