import { DefinitionStatus } from './Status/DefinitionStatus';

export interface Definition {
  id?: number;
  label?: number;
  status?: DefinitionStatus
  term_id?: number;
  user_id?: number;
  vote_id?: number;
  created_at?: any;
  updated_at?: any;
}