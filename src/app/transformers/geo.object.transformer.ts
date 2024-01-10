import { GeoObjectTypeEnum } from "../enums/geo.object.type.enum";
import { GeoObjectDm } from "../models/dm/geo.object.dm";
import { GeoObjectGroupDm } from "../models/dm/geo.object.group.dm";
import { GeoObjectSubGroupDm } from "../models/dm/geo.object.subgroup.dm";
import { GeoObjectDto } from "../models/dto/geo.object.dto";

export class GeoObjectTransformer {
  public static transform(geoObjectDtos: GeoObjectDto[]): GeoObjectDm[] {
    const geoObjectDms: GeoObjectDm[] = [];

    for (const geoObjectDto of geoObjectDtos) {
      geoObjectDms.push(this.transformGeoObjectDto(geoObjectDto));
    }

    return geoObjectDms;
  }

  public static transformGeoObjectDto(geoObjectDto: GeoObjectDto): GeoObjectDm {
    return {
      id: geoObjectDto.id,
      type: geoObjectDto.type,
      typeId: geoObjectDto.typeId,
      name1: geoObjectDto.name,
      name2: geoObjectDto.info,
      connType: geoObjectDto.connStrength
    };
  }

  public static groupAndTransform(geoObjectDtos: GeoObjectDto[]) {
    const geoObjectGroups: GeoObjectGroupDm[] = [];
    const geoObjectDms = this.transform(geoObjectDtos);

    //Main groups of geo object types (Site, Zone, Layer, Placemark)
    for (const getObjectType of Object.keys(GeoObjectTypeEnum).filter((v) => !isNaN(Number(v)))) {
      geoObjectGroups.push({ getObjectType: +getObjectType, subGroups: [] })
    }

    //add each geo object to the subgroup of main groups - based on geoObjectTypeId (i.e. Zone 1 or Zone 2 under "Zone" type)
    geoObjectDms.forEach(geoObjectDm => {
      const group = geoObjectGroups.find(group => group.getObjectType === geoObjectDm.type);
      if (group) {
        let subGroup = group.subGroups.find((subGroup: GeoObjectSubGroupDm) => subGroup.geoObjectTypeId === geoObjectDm.typeId);

        if (!subGroup) {
          group.subGroups.push({ geoObjectTypeId: geoObjectDm.typeId, geoObjects: [] });
          subGroup = group.subGroups[group.subGroups.length - 1];
        }

        subGroup.geoObjects.push(geoObjectDm);
      }
    });

    return geoObjectGroups;
  }
}
