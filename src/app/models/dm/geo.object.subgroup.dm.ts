import { GeoObjectDm } from "./geo.object.dm";

export interface GeoObjectSubGroupDm {
  geoObjectTypeId: number;
  geoObjects: GeoObjectDm[]
}
