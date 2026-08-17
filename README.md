# Sania — 15th Birthday Website 🎀

A mobile-first birthday microsite for Sania.

## Experience flow

1. Password gate — password: `1310` (normal alphanumeric keyboard input)
2. Cute cat GIF welcome on the first screen
3. Interactive dark-room “turn the lights on” scene
4. Lit birthday cake — Sania is asked to close her eyes, make a wish, then blow the candles
5. Background song starts only after the candles are blown, softly faded in and slightly slowed
6. Stardust / love-themed loading transition
7. Photos reveal one-by-one with cinematic scroll animations and hover interactions
8. Three muted video-memory cards so the song can remain in the background
9. Sealed envelope fades away in place instead of flying upward
10. A full-screen paper takes over with a readable handwritten typewriter effect
11. “Skip animation” is available throughout the letter sequence; skipping reveals the complete letter immediately
12. After the final typed character, a “One last click” button appears
13. Final “Happy 15th Birthday, Sania!” screen with multi-wave confetti
14. Bottom credit bar: Made with love by projectarthouse.com + Instagram link

## Files

- `index.html` — page structure
- `styles.css` — complete responsive styling and animations
- `script.js` — interactions, password, candle/music flow, loading, reveal animation, envelope/typewriter and finale

## Run locally

Open `index.html` directly, or serve this folder with a local web server for the most reliable media behavior.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

Upload `index.html`, `styles.css`, and `script.js` to the root of a GitHub repository. In **Settings → Pages**, select **Deploy from a branch**, choose your main branch and `/ (root)`, then save.

## Note about password protection

This is a static website. The `1310` gate is appropriate for keeping the birthday experience private from casual visitors, but it is not server-side security because the password exists in client-side JavaScript.
