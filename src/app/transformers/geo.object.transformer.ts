import { GeoObjectDm } from "../models/dm/geo.object.dm";
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
      name1: geoObjectDto.name,
      name2: geoObjectDto.info,
      connType: geoObjectDto.connStrength
    };
  }
}
