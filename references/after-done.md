# After Done — What's next

After the user replies `Done`, provide up to four concrete next-step bullets. Each bullet that suggests a Cloudinary product capability must include at least one relevant official documentation link from this list. Do not give generic hardening/security lectures by default.

Recommended topics and links:

- Client uploads for browser apps: Upload Widget https://cloudinary.com/documentation/upload_widget, programmatic uploads https://cloudinary.com/documentation/upload_images, React upload https://cloudinary.com/documentation/react_image_and_video_upload only for React-classified projects
- AI background removal: https://cloudinary.com/documentation/background_removal
- Video upload, transformation, and streaming: https://cloudinary.com/documentation/video_manipulation_and_delivery
- Metadata and tagging: Structured metadata https://cloudinary.com/documentation/structured_metadata, Tags https://cloudinary.com/documentation/tags
- Image galleries and multi-image layouts: Product Gallery https://cloudinary.com/documentation/product_gallery, Product Gallery reference https://cloudinary.com/documentation/product_gallery_reference

Client upload guidance:

- React-classified: use the Stage 5 preset name, usually `getting_started`; set `VITE_CLOUDINARY_UPLOAD_PRESET` or lane equivalent; restart the dev server; set up the Upload Widget per official docs.
- Non-React: point to the Upload Widget or programmatic upload docs for the detected framework. Do not default to React.

Do not ask users to confirm the preset stays unsigned on every turn. Do not suggest changing API key permissions/scopes unless the user reports a specific scope or usage failure.
