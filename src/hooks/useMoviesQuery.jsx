import { useSelector } from 'react-redux';

import { TOP_LISTS } from '../constants';
import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
} from '../services/kinopoiskApi';

export default function useMoviesQuery() {
  const { countries, order, year, page } = useSelector(
    state => state.currentQuerySlice,
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    countries,
    genreId: '1',
    order,
    type: 'FILM',
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    countries,
    genreId: '1',
    order,
    type: 'TV_SERIES',
    year,
    page,
  });

  const responseCartoons = useGetFilmsQuery({
    countries,
    genreId: '18',
    order,
    type: 'FILM',
    year,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseFilms.isFetching ||
    responseSerials.isFetching ||
    responseCartoons.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilms.error ||
    responseSerials.error ||
    responseCartoons.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  };
}
