import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
// import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/image';

// Visually Hidden Input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '1px',
});

interface ImageUploadFieldProps {
  name: string;
  label: string;
}

const ImageUploadField = ({ name, label }: ImageUploadFieldProps) => {
  const { t } = useTranslation(['event']);
  const [file, setFile] = useState<File | null>(null); // To store the selected file
  const [previewUrl, setPreviewUrl] = useState<string>(''); // To store the preview URL of the image

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null; // Get the first file if available
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Create a preview URL for the image
    } else {
      setFile(null);
      setPreviewUrl('');
    }
  };

  return (
    <Box>
      {/* Outer Container */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="2px dashed"
        borderColor="grey.300"
        borderRadius="8px"
        padding={4}
        sx={{
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
        onClick={(e) => {
          // Trigger the hidden file input when the box is clicked
          const fileInput = document.getElementById(name);
          if (fileInput) {
            fileInput.click();
          }
        }}
      >
        {/* Display the selected image preview */}
        {previewUrl ? (
          <Box
            sx={{
              width: '100%', // Full width of the container
              height: 'auto', // Maintain aspect ratio
              mb: 2,
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            <img
              src={previewUrl}
              alt="Uploaded Preview"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            {/* <AspectRatio variant="outlined" ratio="1" objectFit="cover"> */}
              {/* only layout="fill" makes sense for using with AspectRatio */}
              {/* <Image alt="Uploaded Preview" src={previewUrl} objectFit='cover' width={100} height={100} /> */}
            {/* </AspectRatio> */}
          </Box>
        ) : (
          <>
            {/* Label */}
            <Typography variant="body1" color="textSecondary">
              {label}
            </Typography>

            {/* Camera Icon */}
            <CameraAltIcon sx={{ fontSize: 48, color: 'grey.500', my: 2 }} />
          </>
        )}

        {/* Hidden File Input */}
        <VisuallyHiddenInput
          id={name} // Use the `name` as the ID for the input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Upload Button */}
        <Button
          component="label" // Use Material-UI's Button as a label
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="primary"
          startIcon={<CameraAltIcon />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent Box's click event
            const fileInput = document.getElementById(name);
            if (fileInput) {
              fileInput.click();
            }
          }}
        >
          {t('event:upload_image')}
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUploadField;
