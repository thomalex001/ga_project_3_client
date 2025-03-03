import { useEffect, useState } from 'react';
import {
  TextField,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize
} from '@mui/material';
import { API } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import BookRating from './common/BookRating';
import DashboardNav from './common/DashboardNav';

export default function AddBook() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0);
  const [availableGenres, setAvailableGenres] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    image: '',
    timeRead: '',
    diaryEntry: ''
  });

  useEffect(() => {
    API.GET(API.ENDPOINTS.allGenreNames)
      .then(({ data }) => setAvailableGenres(data))
      .catch((e) => console.log(e));
  }, []);

  const formDataWithRating = { ...formData, rating: rating };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.POST(API.ENDPOINTS.allBooks, formDataWithRating, API.getHeaders())
      .then(() => {
        navigate('/dashboard/my-library');
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <>
      <DashboardNav />
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              size="small"
              type="text"
              value={formData.title}
              onChange={handleChange}
              error={error}
              label="Title"
              name="title"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              size="small"
              type="text"
              value={formData.author}
              onChange={handleChange}
              error={error}
              label="Author"
              name="author"
            />
          </Box>
          <Box>
            <FormControl size="small" sx={{ mb: 2, width: '50%' }}>
              <InputLabel id="genre">Genre</InputLabel>
              <Select
                required
                labelId="genre"
                value={formData.genre}
                onChange={handleChange}
                label="Genre"
                name="genre"
              >
                {availableGenres?.map((genre) => (
                  <MenuItem key={genre._id} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              fullWidth
              size="small"
              type="text"
              value={formData.image}
              onChange={handleChange}
              error={error}
              label="Book Cover"
              name="image"
              placeholder="Paste link here"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              size="small"
              type="text"
              value={formData.timeRead}
              name="timeRead"
              onChange={handleChange}
              error={error}
              label="Time Read"
              placeholder="2 weeks, 1 month etc..."
            />
          </Box>
          <Box>
            <BookRating isReadOnly={false} setRating={setRating} rating={rating} />
          </Box>
          <Box>
            <TextareaAutosize
              name="diaryEntry"
              value={formData.diaryEntry}
              onChange={handleChange}
              placeholder="Leave your review"
              label="Review"
              minRows={10}
              style={{ width: 500 }}
            />
          </Box>
          <Button variant="contained" type="submit">
            ADD NEW BOOK
          </Button>
        </form>
      </Container>
    </>
  );
}
