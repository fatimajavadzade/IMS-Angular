export interface Customer {
  id: number;
  companyName: string;
  voen: string | null;
  contactPerson: string;
  phone: string;
  email: string;
  address: string | null;
}

export interface PageResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}