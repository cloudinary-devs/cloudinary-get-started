# What's next after setup

After the user says `Done`, give them up to four specific next steps. Keep them short, practical, and use-case focused. Include copy/paste prompts where helpful.

Use the delivery lane tracked during setup to pick the right set. Replace `[framework]` in copy/paste prompts with the detected framework name, such as Flask, Django, Rails, or Next.js.

## Next steps by delivery lane

### Front-end only and full-stack lanes

**Let users add profile photos, listings, or gallery images**
Allow users to upload media from your app and deliver it through Cloudinary.

Copy/paste the prompt: `I want users to upload images in my [framework] app`

**Make uploaded images load fast without manual resizing**
Serve optimized images for different screens and devices without creating separate versions by hand.

Copy/paste the prompt: `How do I automatically optimize user-uploaded images in my [framework] app?`

**Create polished images for cards, previews, or social sharing**
Generate cropped, padded, resized, or text-overlaid versions of images for your UI.

Copy/paste the prompt: `How do I generate transformed image URLs for previews in my [framework] app?`

**Build an admin workflow for finding and managing uploads**
Use tags and metadata to make uploaded assets easier to find, filter, and manage.

Copy/paste the prompt: `How do I tag and search uploaded assets in Cloudinary?`

### Back-end API-only lanes

**Accept image uploads from clients and store them in Cloudinary**
Receive uploads through your API, send them to Cloudinary, and return delivery URLs to callers.

Copy/paste the prompt: `How do I accept and store image uploads server-side in my [framework] API?`

**Generate signed delivery URLs for protected assets**
Create signed URLs on the server so protected assets can be delivered without exposing secrets or signing logic to the frontend.

Copy/paste the prompt: `Add a server-side endpoint in my [framework] API that generates signed Cloudinary delivery URLs without exposing secrets to clients.`

**Prepare transformed assets when files are uploaded**
Use eager transformations or upload presets to create resized, optimized, or watermarked versions during upload.

Copy/paste the prompt: `How do I apply transformations automatically when assets are uploaded in my [framework] API?`

**Build an admin workflow for finding and managing uploads**
Use tags and metadata to make uploaded assets easier to find, filter, and manage.

Copy/paste the prompt: `How do I tag and search uploaded assets in Cloudinary?`

## Rules

* Use the detected delivery lane to choose the next steps.
* Full-stack uses the front-end/full-stack set.
* Back-end API-only uses the back-end API-only set.
* Don't mix lane-specific suggestions.
* Don't suggest responsive image delivery for an API-only app.
* Don't ask repeatedly if the preset should stay unsigned.
* Don't suggest API key changes unless the user reports a specific permission problem.
* Keep the suggestions focused on user scenarios, not Cloudinary feature names.
* For framework-specific details, let the user copy/paste the prompt and let the relevant skill answer.
