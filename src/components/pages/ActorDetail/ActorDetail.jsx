import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';

export default function ActorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={4} pt={1}>
        <Grid item xs={12} md={4}>
          <img
            src={data.posterUrl}
            alt={data.nameRu}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack flexDirection="row">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            ></Button>
            <Stack flexDirection="column">
              <Typography variant="h5">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography gutterBottom variant="h5">
            Об актере
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Карьера</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Рост</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.growth} см</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Дата рождения</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {data.birthday} ({data.age} лет)
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Всего фильмов</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Факты об актере:</Typography>
            </Grid>
            <Grid item xs={12}>
              {data.facts.map((fact, index) => (
                <Typography gutterBottom key={fact}>
                  {index + 1}.{fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Фильмы
          </Typography>
        </Grid>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex(el => el.filmId === item.filmId),
          )
          .map((film, index) => (
            <Stack
              key={index}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography>{index + 1}</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating ? film.rating : '-'}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
