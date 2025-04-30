export interface GenderStatistics {
  gender: string;
  count: number;
  average: number;
}

export interface BarrioGenderStatistics {
  barrio: string;
  statistics: GenderStatistics[];
}

export interface ZonaGenderStatistics {
  zona: string;
  statistics: GenderStatistics[];
}

export interface GenderStatisticsResponse {
  general: GenderStatistics[];
  byBarrio: BarrioGenderStatistics[];
  byZona: ZonaGenderStatistics[];
}