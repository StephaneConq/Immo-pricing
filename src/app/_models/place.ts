export interface Place {
  Display: string;
  Meta: {
    HierarchicalZones: {
      Id: string;
      Name: string;
      Poids: number;
      Type: string;
    }[];
    Quartiers: {
      Id: string;
      Name: string;
      Poids: number;
      Type: string;
    }[];
    Zips: string[];
  },
  Params: {
    Latitude: string;
    Longitude: string;
    ci: string;
  },
  Tag: string;
  Type: string;
}
