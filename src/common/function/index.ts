import { encode } from 'html-entities';
import { SearchInterface } from '../interface/search.interface';

export const getFilterObject = (req) => {
  const filterObject: SearchInterface = {
    keyword: '',
    sort: [],
    filter: [],
    paging: {
      page: 1,
      size: 10,
    },
  };
  if (typeof req.query['keyword'] === 'string') {
    filterObject.keyword = encode(req.query['keyword']);
  }
  if (typeof req.query['sort'] === 'object') {
    for (const [key, value] of Object.entries(req.query['sort'])) {
      filterObject.sort.push({
        key,
        value: (value as string).toUpperCase() as 'ASC' | 'DESC',
      });
    }
  }
  if (typeof req.query['filter'] === 'object') {
    for (const [key, value] of Object.entries(req.query['filter'])) {
      filterObject.filter.push({
        key,
        value: (value as string).split(','),
      });
    }
  }
  if (typeof req.query['page'] === 'string') {
    filterObject.paging.page = parseInt(req.query['page']);
  }
  if (typeof req.query['size'] === 'string') {
    filterObject.paging.size = parseInt(req.query['size']);
  }

  return filterObject;
};
