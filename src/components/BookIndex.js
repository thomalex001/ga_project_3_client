import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import { Container, Grid, Typography, Box } from '@mui/material';

import BookCard from './common/BookCard';

const BookIndex = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBooks)
      .then(({ data }) => {
        setBooks(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <>
      <Container
        maxWidth="1000px"
        sx={{
          display: 'flex',
          justifyContents: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContents: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography sx={{ mb: 2 }} variant="h5">
            Library
          </Typography>
        </Box>
        <Grid
          maxWidth={'900px'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContents: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {books?.map((book) => (
            <Grid sx={{ mb: 2 }} item xs={4} key={book._id}>
              <BookCard
                title={book.title}
                author={book.author}
                genre={book.genre}
                image={book.image}
                id={book._id}
                alt={book.title}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default BookIndex;
