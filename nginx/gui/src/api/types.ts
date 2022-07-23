/* eslint-disable camelcase */

export interface User {
  url: string;
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_superuser: boolean | null;
  is_staff: boolean | null;
  profile_data: Profile | null;
  created: string;
}

export interface Profile {
  url: string;
  id: number;
  owner: User;
  filename: string;
  created: string;
}

export interface Member {
  url: string;
  id: number;
  user: User;
  phone: string;
  city: string;
  state: string;
  is_buyer: boolean;
  created: string;
}

export interface House {
  url: string;
  id: number;
  seller: Member;
  deal_type: DealType;
  sell_range_lower: number;
  sell_range_upper: number;
  display: boolean;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  num_bed: number;
  num_bath: number;
  sq_ft: number;
  basement_cond: string;
  occupancy: string;
  land_use: string;
  construct_type: string;
  property_tax: number;
  assess_value: number;
  notes: string;
  created: string;
}


export interface Picture {
  url: string;
  id: number;
  house: House;
  filename: string;
  description: string;
  created: string;
}


export interface DealType {
  url: string;
  id: number;
  deal: string;
  created: string;
}


export interface Testimonial {
  url: string;
  id: number;
  member_testimonial: string;
  member_data: Member;
  short_description: string;
  deal_data: Deal;
  created: string;
}


export interface Question {
  url: string;
  id: number;
  question: string;
  answer: string;
  created: string;
}

export interface State {
  url: string;
  id: number;
  state_long: string;
  state_short: string;
  created: string;
}


export interface Deal {
  url: string;
  id: number;
  stage: string;
  priority: string;
  house_data: House;
  buyer_data: Member;
  buyer_price: number;
  seller_price: number;
  deal_price: number;
}