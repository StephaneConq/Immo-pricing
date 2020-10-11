export interface Address {
  Type: string;
  Display: string;
  Tag: string;
  Params: {
    Latitude: string;
    Longitude: string;
    Precision: string;
    Address: string;
    Street: string;
    City: string;
    PostalCode: string;
    ExternalId: string;
  }
}
