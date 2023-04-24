import { MOVIES } from './moviesTypes';
import { TV } from './seriesTypes';

export type DISCOVER = {
    page: number,
    results: MOVIES[] | TV[],
    total_pages: number,
    total_results: number
}
