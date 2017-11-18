import EntityCommonStatus from '@constants/Status/EntityCommonStatus';

export interface Definition {
  id?: number;
  label?: number;
  status?: EntityCommonStatus
  term_id?: number;
  user_id?: number;
  vote_id?: number;
  created_at?: any;
  updated_at?: any;
}