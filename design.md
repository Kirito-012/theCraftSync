Create a web page section featuring a horizontal slider with 4 slides, each representing a step in a process. The slider should occupy nearly the full viewport width and height, with subtle margins or padding (e.g., 2-5% on all sides) for a clean look. Only one slide should be visible at a time.
Each slide's content:

Centered prominently in the middle: A large, bold heading like "STEP 1"
Below the heading: A brief descriptive paragraph (placeholder text like "Description of Step 1 here" – you can generate sample content if needed).
For the 4 slides: Step 1, Step 2, Step 3, Step 4, with corresponding descriptions.

Interaction and animation:
Implement scroll-based navigation: When the user scrolls down and reaches this section, the viewport locks onto the section (using position: sticky or full-screen pinning via JavaScript).
Vertical scrolling then triggers horizontal sliding to the next slide (e.g., scroll down to go from Step 1 to Step 2).
Slides transition horizontally from left to right.
Ensure only one slide is visible at a time, with no overlap or partial views.
Transitions must be super smooth: Use GSAP for easing (e.g., easeInOutExpo), with a duration of 0.5-1 second, and optimize for 60fps performance.

Theme and styling:
Professional, dark, premium, and clean aesthetic: Use a dark background , with high-contrast text in white.
Premium touches: Subtle gradients, minimal shadows and plenty of whitespace.
Responsive design: Ensure it works on desktop and mobile, adapting padding and font sizes accordingly.
No distractions: Keep it minimalistic, focusing on the steps without unnecessary elements.
