import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BookRating({
  rating = 0,
  setRating,
  isReadOnly = true
}) {

  return (
    <Box sx={{ ml: 0.4 }}>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={({ target: { value } }) => setRating(parseInt(value))}
        readOnly={isReadOnly}
      />
    </Box>
  );
}
