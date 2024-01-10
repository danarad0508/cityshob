import { GeoObjectSubGroupDm } from "./geo.object.subgroup.dm";

export interface GeoObjectGroupDm {
  getObjectType: number;
  subGroups: GeoObjectSubGroupDm[]
}
