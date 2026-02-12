export interface Module {
  id: number;
  name: string;
  order: number;
  route: string | null;
  parent_module_id: number | null;
  children: Module[];
  active: boolean;
  created_at: string;
  updated_at: string;
}
