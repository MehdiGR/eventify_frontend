import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useController, useFormContext } from 'react-hook-form';

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
  existingImageUrl?: string; // Optional prop for existing image URL
}

const ImageUploadField = ({ name, label, existingImageUrl }: ImageUploadFieldProps) => {
  const { t } = useTranslation(['event']);
  const [previewUrl, setPreviewUrl] = useState<string>(existingImageUrl || '');
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  useEffect(() => {
    return () => {
      if (previewUrl && !existingImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, existingImageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size (e.g., 5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert(t('event:image_too_large'));
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      alert(t('event:unsupported_format'));
      return;
    }

    onChange(selectedFile);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="2px dashed"
        borderColor={error ? 'error.main' : 'grey.300'}
        borderRadius="12px"
        padding={3}
        sx={{
          cursor: 'pointer',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            borderColor: error ? 'error.main' : 'primary.main',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
        onClick={() => document.getElementById(name)?.click()}
      >
        {previewUrl || existingImageUrl ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 250,
              height: 150,
              overflow: 'hidden',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: error ? 'error.main' : 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={previewUrl || existingImageUrl}
              alt="Uploaded Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        ) : (
          <>
            <Typography variant="body1" color={error ? 'error' : 'textSecondary'}>
              {label}
            </Typography>
            <CameraAltIcon sx={{ fontSize: 40, color: error ? 'error.main' : 'grey.500', my: 2 }} />
          </>
        )}
        <VisuallyHiddenInput
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          onBlur={onBlur}
          ref={ref}
          aria-label={t('event:upload_image')}
        />
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color={error ? 'error' : 'primary'}
          startIcon={<CameraAltIcon />}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById(name)?.click();
          }}
          sx={{ mt: 2 }}
        >
          {t('event:upload_image')}
        </Button>
        {previewUrl && (
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              if (previewUrl && !existingImageUrl) {
                URL.revokeObjectURL(previewUrl);
              }
              setPreviewUrl(existingImageUrl || '');
            }}
            sx={{ mt: 1 }}
          >
            {t('event:remove_image')}
          </Button>
        )}
        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageUploadField;
