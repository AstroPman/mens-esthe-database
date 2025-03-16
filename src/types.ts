export interface Therapist {
  id: number;
  name: string;
  age: number;
  height: number;
  bra_size: string;
  bust: number;
  waist: number;
  hip: number;
  img: string;
  salon_id: number;
  salon_name: string;
  area: string;
  score: number;
  reviews: number;
  skr: number;
  hj: number;
  f: number;
  nn: number;
  ns: number;
}

export type FilterOptions = {
  ageRange: [number, number];
  heightRange: [number, number];
  braSize: string[];
  minScore: number;
  minReviews: number;
  searchQuery: string;
  salon: string;
  area: string;
  services: {
    skr: boolean;
    hj: boolean;
    f: boolean;
    nn: boolean;
    ns: boolean;
  };
  includeLargerCups: boolean;
};