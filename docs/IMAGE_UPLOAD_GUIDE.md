# Image Upload Implementation Guide

This guide explains how to use the Cloudinary image upload system in the admin panel.

## Overview

The image upload system consists of three main components:

1. **Backend API** (`/api/uploads/sign`) - Provides signed upload credentials
2. **Upload Utility** (`src/lib/cloudinary.js`) - Handles the upload logic
3. **ImageUploader Component** (`src/components/admin/common/ImageUploader.js`) - Reusable UI component

## Architecture

```
User selects image
    ↓
ImageUploader Component validates file
    ↓
Calls uploadImageToCloudinary()
    ↓
Gets signed credentials from backend (/api/uploads/sign)
    ↓
Uploads directly to Cloudinary
    ↓
Returns secure URL to component
    ↓
Component calls onChange with URL
```

## Backend Setup

The backend endpoint `/api/uploads/sign` returns:

```json
{
  "success": true,
  "data": {
    "cloudName": "your-cloud-name",
    "apiKey": "your-api-key",
    "timestamp": 1234567890,
    "folder": "cms-pages",
    "signature": "generated-signature"
  }
}
```

## Usage Examples

### Basic Usage

```jsx
import ImageUploader from '@/components/admin/common/ImageUploader';

function MyEditor({ data, onChange }) {
  return (
    <ImageUploader
      label="Background Image"
      value={data.backgroundImage || ''}
      onChange={(url) => onChange({ ...data, backgroundImage: url })}
    />
  );
}
```

### With Custom Settings

```jsx
<ImageUploader
  label="Product Image"
  value={data.image || ''}
  onChange={(url) => onChange({ ...data, image: url })}
  aspectRatio="1/1"           // Square aspect ratio
  maxSizeMB={5}               // 5MB max file size
  allowedFormats={[           // Only allow specific formats
    'image/jpeg',
    'image/png'
  ]}
/>
```

### Multiple Images

```jsx
function GalleryEditor({ data, onChange }) {
  const handleImageChange = (index, url) => {
    const newImages = [...(data.images || [])];
    newImages[index] = url;
    onChange({ ...data, images: newImages });
  };

  return (
    <div className="space-y-4">
      {[0, 1, 2].map((index) => (
        <ImageUploader
          key={index}
          label={`Image ${index + 1}`}
          value={data.images?.[index] || ''}
          onChange={(url) => handleImageChange(index, url)}
          aspectRatio="16/9"
        />
      ))}
    </div>
  );
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | - | Current image URL |
| `onChange` | function | - | Callback when image is uploaded `(url: string) => void` |
| `label` | string | 'Image' | Label text for the uploader |
| `maxSizeMB` | number | 10 | Maximum file size in megabytes |
| `allowedFormats` | string[] | ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] | Allowed MIME types |
| `aspectRatio` | string | null | CSS aspect ratio (e.g., '16/9', '4/3', '1/1') |
| `className` | string | '' | Additional CSS classes |

## Utility Functions

### uploadImageToCloudinary

```javascript
import { uploadImageToCloudinary } from '@/lib/cloudinary';

const result = await uploadImageToCloudinary(file, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});

console.log(result);
// {
//   url: 'https://res.cloudinary.com/...',
//   publicId: 'cms-pages/abc123',
//   width: 1920,
//   height: 1080,
//   format: 'jpg'
// }
```

### validateImageFile

```javascript
import { validateImageFile } from '@/lib/cloudinary';

const validation = validateImageFile(file, {
  maxSizeMB: 5,
  allowedFormats: ['image/jpeg', 'image/png']
});

if (!validation.valid) {
  console.error(validation.error);
}
```

## Features

### ✅ Drag and Drop
Users can drag and drop images directly onto the upload area.

### ✅ Progress Tracking
Real-time upload progress with visual feedback.

### ✅ Image Preview
Automatic preview of uploaded images with remove functionality.

### ✅ File Validation
- File type validation
- File size validation
- User-friendly error messages

### ✅ Responsive Design
Works seamlessly on desktop and mobile devices.

### ✅ Error Handling
Comprehensive error handling with clear user feedback.

## Aspect Ratios

Common aspect ratios for different use cases:

- **Hero Images**: `16/9` (widescreen)
- **Feature Images**: `4/3` (standard)
- **Profile/Avatar**: `1/1` (square)
- **Portrait**: `3/4` or `9/16`
- **Panorama**: `21/9` (ultra-wide)

## Error Handling

The component handles various error scenarios:

1. **Invalid file type**: Shows allowed formats
2. **File too large**: Shows maximum size
3. **Network errors**: Shows connection issues
4. **Upload failures**: Shows Cloudinary errors

## Styling

The component uses Tailwind CSS classes and can be customized:

```jsx
<ImageUploader
  className="my-custom-class"
  // ... other props
/>
```

## Best Practices

1. **Always validate on backend**: The frontend validation is for UX only
2. **Use appropriate aspect ratios**: Match the aspect ratio to your design
3. **Optimize file sizes**: Encourage users to upload reasonably sized images
4. **Handle errors gracefully**: Always show clear error messages
5. **Show upload progress**: Keep users informed during uploads

## Troubleshooting

### Upload fails with "Failed to get upload signature"
- Check that the backend API is running
- Verify the `/api/uploads/sign` endpoint is accessible
- Check environment variables for Cloudinary credentials

### Images not displaying after upload
- Check browser console for CORS errors
- Verify Cloudinary cloud name is correct
- Check that the returned URL is valid

### Upload is very slow
- Check file size (compress large images)
- Check network connection
- Consider implementing image compression before upload

## Advanced: Direct Upload Without Component

If you need more control, you can use the utility directly:

```javascript
import { uploadImageToCloudinary, validateImageFile } from '@/lib/cloudinary';

async function handleFileUpload(file) {
  // Validate
  const validation = validateImageFile(file);
  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  try {
    // Upload with progress
    const result = await uploadImageToCloudinary(file, (progress) => {
      console.log(`Uploading: ${progress}%`);
    });

    console.log('Upload complete:', result.url);
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
}
```

## Environment Variables Required

Make sure your backend has these environment variables:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Security Notes

- The signature is generated on the backend to keep the API secret secure
- Uploads are restricted to the `cms-pages` folder
- File validation happens on both client and server
- Signed uploads prevent unauthorized uploads
