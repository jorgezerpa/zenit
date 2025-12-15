'use client'
import React, { useState, useEffect, RefObject } from 'react';
import Image from 'next/image';

// Define the expected prop type for clarity
interface RenderUploadProps {
  fileInputRef: RefObject<HTMLInputElement|null>;
}

export function RenderUpload({ fileInputRef }: RenderUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const inputElement = fileInputRef.current;

    if (!inputElement) return;

    // --- Handler Function ---
    const handleFileChange = () => {
      const files = inputElement.files;
      
      // Check if a file was selected
      if (files && files.length > 0) {
        const file = files[0];
        
        // 1. Create a URL for the file
        const url = URL.createObjectURL(file);
        
        // 2. Update the state
        setImageUrl(url);

        // 3. Clean up the URL when the component unmounts or the file changes
        return () => {
          URL.revokeObjectURL(url);
        };
      } else {
        // Clear the URL if no file is selected -> i.e if user clears input (not happens in this app, but nice edge case to handle in case it happens in future updates)
        setImageUrl(null);
      }
    };
    // ------------------------

    // Add the event listener to the ref's current DOM element
    inputElement.addEventListener('change', handleFileChange);

    // Initial check (in case the ref already had a file when the component mounted)
    handleFileChange();

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      inputElement.removeEventListener('change', handleFileChange);
      // Ensure any existing Object URL is cleaned up on unmount
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };

  }, [fileInputRef]); // Dependency on fileInputRef ensures the effect runs when the ref object changes (though usually it doesn't)

  if (!imageUrl) {
    return (
      <div className="w-full h-64 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 rounded-lg">
        No hay imagen cargada
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
      {/* Using Next.js Image component requires setting layout or width/height 
        For full-bleed display, use fill and object-cover
      */}
      <Image
        src={imageUrl}
        alt="Uploaded Preview"
        layout="fill" 
        objectFit="contain" 
        className="transition duration-300 hover:scale-105"
      />
    </div>
  );
}